'use client';

import React, { useState, useMemo } from 'react';
import { calculateDynamicAndWind } from '@/lib/calculations/dynamicAndWind';
import { HoistOperationType } from '@/lib/calculations/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  Wind,
  BookmarkPlus,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export const DynamicWindCalculator: React.FC = () => {
  const { locale } = useTranslation();

  const [staticLoadTon, setStaticLoadTon] = useState<number>(15);
  const [operationType, setOperationType] = useState<HoistOperationType>('normal');
  const [windSpeedMs, setWindSpeedMs] = useState<number>(12);
  const [windAreaM2, setWindAreaM2] = useState<number>(10);
  const [dragCoefficientCd, setDragCoefficientCd] = useState<number>(1.2); // Box/flat shape
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateDynamicAndWind({
      staticLoadTon,
      operationType,
      windSpeedMs,
      windAreaM2,
      dragCoefficientCd,
    });
  }, [staticLoadTon, operationType, windSpeedMs, windAreaM2, dragCoefficientCd]);

  const handleSaveToSession = async () => {
    const record = {
      id: `calc-wind-${Date.now()}`,
      timestamp: new Date().toISOString(),
      moduleName: 'Dinamik Yük Katsayısı (DAF) ve Rüzgar Yükü Hesaplayıcı',
      inputs: { staticLoadTon, operationType, windSpeedMs, windAreaM2, dragCoefficientCd },
      outputs: {
        daf: result.daf,
        totalDynamicLoadTon: result.totalDynamicLoadTon,
        windForceKn: result.windForceKn,
        windForceTon: result.windForceTon,
      },
      safetyStatus: result.windAlertLevel === 'red' ? 'critical' : result.windAlertLevel === 'amber' ? 'warning' : 'safe',
      summaryMessage: result.windActionAdvice[locale],
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const alertColor = result.windAlertLevel === 'red'
    ? '#EF4444'
    : result.windAlertLevel === 'amber'
    ? '#F59E0B'
    : '#10B981';

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-wider block">
            [Hesaplama 04] • Şok Yükü & Aerodinamik Rüzgar Kuvveti
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'tr'
              ? 'Dinamik Yük Katsayısı (DAF) ve Rüzgar Yükü Hesaplayıcı'
              : 'Dynamic Amplification Factor (DAF) & Wind Load Calculator'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ani kalkış/frenleme şokları (EN 13001-2) ve rüzgar hızı durdurma limitleri (EN 1991)
          </p>
        </div>

        <button
          onClick={handleSaveToSession}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a253c] border border-safety-500/40 text-safety-400 hover:bg-safety-500 hover:text-black text-xs font-mono font-bold transition-all shrink-0"
        >
          <BookmarkPlus className="h-4 w-4" />
          <span>{saveToast ? (locale === 'tr' ? 'Kaydedildi!' : 'Saved!') : (locale === 'tr' ? 'Oturuma Kaydet' : 'Save')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-[#111827] p-4 sm:p-5 rounded-xl border border-[#23314d] space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-safety-500" />
            <span>Kaldırma Şartları & Rüzgar</span>
          </h3>

          {/* Input: Static Load */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Statik Yük Ağırlığı:</span>
              <span className="font-mono text-safety-400 font-bold">{staticLoadTon} Ton</span>
            </label>
            <input
              type="number"
              min="0.5"
              step="1"
              value={staticLoadTon}
              onChange={(e) => setStaticLoadTon(Math.max(0.1, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>

          {/* Input: Operation Type (DAF) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Kaldırma Operasyon Hızı & Tipi:</label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { id: 'precision', label: 'Hassas/Yavaş VFD (1.10)' },
                { id: 'normal', label: 'Standart Tavan Vinci (1.25)' },
                { id: 'harsh', label: 'Şoklu/Hızlı Şantiye (1.45)' },
                { id: 'offshore', label: 'Açık Deniz / Gemi (1.70)' },
              ].map((op) => (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => setOperationType(op.id as HoistOperationType)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    operationType === op.id
                      ? 'bg-safety-500 text-black border-safety-400 font-bold'
                      : 'bg-[#131b2e] text-slate-300 border-[#23314d] hover:border-slate-500'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input: Wind Speed Slider */}
          <div className="space-y-2 pt-2 border-t border-[#1f2c44]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Anlık Rüzgar Hızı:</span>
              <span className="font-mono font-bold text-sm" style={{ color: alertColor }}>
                {windSpeedMs} m/s ({result.windSpeedKmh} km/h)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="28"
              step="0.5"
              value={windSpeedMs}
              onChange={(e) => setWindSpeedMs(parseFloat(e.target.value))}
              className="w-full accent-safety-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0 m/s</span>
              <span className="text-emerald-400">10 m/s</span>
              <span className="text-amber-400">14 m/s (Dikkat)</span>
              <span className="text-red-500 font-bold">20 m/s (DURDUR)</span>
            </div>
          </div>

          {/* Input: Wind Area & Drag Coefficient */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1f2c44]">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-300 font-semibold">Rüzgar Alanı (A):</label>
              <input
                type="number"
                min="0.5"
                step="1"
                value={windAreaM2}
                onChange={(e) => setWindAreaM2(Math.max(0.1, parseFloat(e.target.value) || 1))}
                className="w-full px-2.5 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
              />
              <span className="text-[10px] text-slate-500">m² (Yelkenleme Yüzeyi)</span>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-300 font-semibold">Şekil Katsayısı (Cd):</label>
              <select
                value={dragCoefficientCd}
                onChange={(e) => setDragCoefficientCd(parseFloat(e.target.value))}
                className="w-full px-2 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
              >
                <option value="1.2">1.2 (Düz Sac / Levha)</option>
                <option value="1.0">1.0 (Kutu / Konteyner)</option>
                <option value="0.7">0.7 (Silindirik / Boru)</option>
              </select>
              <span className="text-[10px] text-slate-500">Aerodinamik Sürtünme</span>
            </div>
          </div>
        </div>

        {/* Right Output & Dynamic SVG (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dynamic Visualizer */}
          <div className="bg-[#0b0f19] rounded-xl border border-[#23314d] p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Rüzgar Basıncı & Dinamik Büyütme Şeması
            </span>

            <svg viewBox="0 0 380 200" className="w-full max-w-[380px] h-[180px]">
              <defs>
                <marker id="wind-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={alertColor} />
                </marker>
              </defs>
              {/* Wind Speed Lines on the Left */}
              {[40, 70, 100, 130, 160].map((y, i) => (
                <path
                  key={i}
                  d={`M 15 ${y} Q 60 ${y - 8} 110 ${y} T 150 ${y}`}
                  fill="none"
                  stroke={alertColor}
                  strokeWidth={Math.min(5, Math.max(1, (windSpeedMs / 10) * 2))}
                  strokeDasharray="8 4"
                />
              ))}

              {/* Suspended Load Rectangle */}
              <rect
                x="165"
                y="60"
                width="120"
                height="80"
                fill="#1e293b"
                stroke={alertColor}
                strokeWidth="2.5"
                rx="4"
              />
              <text x="225" y="95" fill="#ffffff" fontSize="12" textAnchor="middle" fontFamily="ui-monospace" fontWeight="bold">
                YÜK: {staticLoadTon} Ton
              </text>
              <text x="225" y="115" fill={alertColor} fontSize="11" textAnchor="middle" fontFamily="ui-monospace" fontWeight="bold">
                DAF = x{result.daf}
              </text>

              {/* Sling lines to hook */}
              <line x1="225" y1="20" x2="185" y2="60" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="225" y1="20" x2="265" y2="60" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="225" cy="20" r="5" fill="#f59e0b" />

              {/* Wind Force Vector Arrow */}
              <line x1="285" y1="100" x2="350" y2="100" stroke={alertColor} strokeWidth="3" markerEnd="url(#wind-arrow)" />
              <text x="318" y="90" fill={alertColor} fontSize="10" textAnchor="middle" fontFamily="ui-monospace" fontWeight="bold">
                F_w: {result.windForceKn} kN
              </text>
            </svg>

            {/* Beaufort Pill */}
            <div className="mt-1 text-xs font-mono font-bold flex items-center gap-2">
              <span className="text-slate-400">Beaufort Durumu:</span>
              <span className="text-white px-2 py-0.5 rounded bg-black/40 border border-[#2a3854]">
                {result.beaufortDescription.tr}
              </span>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
              result.windAlertLevel === 'red'
                ? 'bg-red-950/40 border-red-600/60 text-red-200'
                : result.windAlertLevel === 'amber'
                ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
            }`}
          >
            {result.windAlertLevel === 'red' ? (
              <AlertOctagon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            ) : result.windAlertLevel === 'amber' ? (
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="block text-sm font-bold">
                {result.windAlertLevel === 'red'
                  ? 'YASAL İSG DURDURMA ALARMI (RÜZGAR > 20 m/s)'
                  : result.windAlertLevel === 'amber'
                  ? 'YÜKSEK RÜZGAR SALINIM İKAZI'
                  : 'GÜVENLİ RÜZGAR KOŞULLARI'}
              </strong>
              <span>{result.windActionAdvice[locale]}</span>
            </div>
          </div>

          {/* Results Metric Cards */}
          <div className="grid grid-cols-3 gap-3 font-mono">
            <div className="bg-[#111827] p-3 rounded-xl border border-safety-500/40">
              <span className="text-[10px] text-safety-400 uppercase block font-bold">Dinamik Toplam Yük</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                {result.totalDynamicLoadTon} <span className="text-xs text-slate-400">Ton</span>
              </span>
              <span className="text-[10px] text-slate-400">DAF Çarpanlı</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d]">
              <span className="text-[10px] text-slate-400 uppercase block">İlave Şok Kuvveti</span>
              <span className="text-base sm:text-lg font-bold text-safety-400 block">
                +{result.dynamicAdditionalForceKn} <span className="text-xs text-slate-400">kN</span>
              </span>
              <span className="text-[10px] text-slate-400">Dinamik Artış</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d]">
              <span className="text-[10px] text-slate-400 uppercase block">Rüzgar İtme Kuvveti</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                {result.windForceKn} <span className="text-xs text-slate-400">kN</span>
              </span>
              <span className="text-[10px] text-slate-400">({result.windForceTon} Ton Yanal)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
