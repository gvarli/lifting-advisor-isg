'use client';

import React, { useState, useMemo } from 'react';
import { calculateAsymmetricCoG } from '@/lib/calculations/asymmetricCoG';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  AlertTriangle,
  BookmarkPlus,
  Scale,
  CheckCircle2,
  AlertOctagon,
  ArrowDown,
} from 'lucide-react';

export const AsymmetricCoGCalculator: React.FC = () => {
  const { locale } = useTranslation();

  const [totalLoadTon, setTotalLoadTon] = useState<number>(12);
  const [totalDistanceD, setTotalDistanceD] = useState<number>(4.0);
  const [d1, setD1] = useState<number>(1.2); // Closer to left pick point
  const [slingLengthL1, setSlingLengthL1] = useState<number>(2.5);
  const [slingLengthL2, setSlingLengthL2] = useState<number>(3.5);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateAsymmetricCoG({
      totalLoadTon,
      totalDistanceD,
      d1,
      slingLengthL1,
      slingLengthL2,
    });
  }, [totalLoadTon, totalDistanceD, d1, slingLengthL1, slingLengthL2]);

  const handleSaveToSession = async () => {
    const record = {
      id: `calc-cog-${Date.now()}`,
      timestamp: new Date().toISOString(),
      moduleName: 'Asimetrik Yük ve Ağırlık Merkezi (CoG) Hesaplayıcı',
      inputs: { totalLoadTon, totalDistanceD, d1, d2: result.d2 },
      outputs: {
        loadShare1Ton: result.loadShare1Ton,
        loadShare2Ton: result.loadShare2Ton,
        percentageLeg1: result.percentageLeg1,
        percentageLeg2: result.percentageLeg2,
        heaviestLegTon: result.heaviestLegTon,
      },
      safetyStatus: result.isTilted ? 'warning' : 'safe',
      summaryMessage: result.equilibriumWarning[locale],
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // SVG Coordinates
  const svgWidth = 380;
  const svgHeight = 240;
  const beamY = 160;
  const leftX = 50;
  const rightX = 330;
  const beamLengthPx = rightX - leftX; // 280px

  const cogRatio = totalDistanceD > 0 ? d1 / totalDistanceD : 0.5;
  const cogX = leftX + beamLengthPx * Math.min(0.95, Math.max(0.05, cogRatio));

  // Crane hook position (Plumb directly above CoG for balance)
  const hookX = cogX;
  const hookY = 40;

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-wider block">
            [Hesaplama 02] • Moment Dengesi & Ağırlık Merkezi
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'tr'
              ? 'Asimetrik Yükleme ve Ağırlık Merkezi (CoG) Hesaplayıcı'
              : 'Asymmetric Rigging & Center of Gravity (CoG) Calculator'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kollara binen farklı gerilimler, eğilme momentleri ve asimetrik WLL tayini
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
            <span>Geometrik Girişler</span>
          </h3>

          {/* Input: Total Load */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Toplam Yük Ağırlığı (W):</span>
              <span className="font-mono text-safety-400 font-bold">{totalLoadTon} Ton</span>
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={totalLoadTon}
              onChange={(e) => setTotalLoadTon(Math.max(0.1, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>

          {/* Input: Total Span D */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Askı Noktaları Arası Mesafe (D):</span>
              <span className="font-mono text-white font-bold">{totalDistanceD} Metre</span>
            </label>
            <input
              type="number"
              min="1"
              step="0.2"
              value={totalDistanceD}
              onChange={(e) => setTotalDistanceD(Math.max(0.5, parseFloat(e.target.value) || 1))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>

          {/* Input: CoG distance d1 slider */}
          <div className="space-y-2 pt-2 border-t border-[#1f2c44]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">CoG Sol Mesafesi (d1):</span>
              <span className="font-mono text-safety-400 font-bold">{d1} m (Sağ d2: {result.d2} m)</span>
            </div>
            <input
              type="range"
              min="0.1"
              max={totalDistanceD - 0.1}
              step="0.1"
              value={d1}
              onChange={(e) => setD1(parseFloat(e.target.value))}
              className="w-full accent-safety-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Sol Uç (0 m)</span>
              <span>Merkez ({totalDistanceD / 2} m)</span>
              <span>Sağ Uç ({totalDistanceD} m)</span>
            </div>
          </div>

          {/* Input: Leg lengths L1 and L2 */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1f2c44]">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-300 font-semibold">Sol Sapan Boyu (L1):</label>
              <input
                type="number"
                min="0.5"
                step="0.1"
                value={slingLengthL1}
                onChange={(e) => setSlingLengthL1(parseFloat(e.target.value) || 1)}
                className="w-full px-2.5 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
              />
              <span className="text-[10px] text-slate-500">Metre</span>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-300 font-semibold">Sağ Sapan Boyu (L2):</label>
              <input
                type="number"
                min="0.5"
                step="0.1"
                value={slingLengthL2}
                onChange={(e) => setSlingLengthL2(parseFloat(e.target.value) || 1)}
                className="w-full px-2.5 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
              />
              <span className="text-[10px] text-slate-500">Metre</span>
            </div>
          </div>
        </div>

        {/* Right Output & Dynamic SVG (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dynamic SVG Visualizer */}
          <div className="bg-[#0b0f19] rounded-xl border border-[#23314d] p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Ağırlık Merkezi & Yük Paylaşım Çizimi
            </span>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[400px] h-[210px]">
              <defs>
                <marker id="cog-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
              </defs>
              {/* Crane Hook */}
              <circle cx={hookX} cy={hookY} r="7" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <line x1={hookX} y1={10} x2={hookX} y2={hookY - 7} stroke="#f59e0b" strokeWidth="2.5" />

              {/* Slings */}
              <line
                x1={hookX}
                y1={hookY}
                x2={leftX}
                y2={beamY}
                stroke="#38bdf8"
                strokeWidth={Math.max(2, (result.percentageLeg1 / 100) * 6)}
              />
              <line
                x1={hookX}
                y1={hookY}
                x2={rightX}
                y2={beamY}
                stroke="#a855f7"
                strokeWidth={Math.max(2, (result.percentageLeg2 / 100) * 6)}
              />

              {/* Lifted Beam Body */}
              <rect
                x={leftX}
                y={beamY}
                width={beamLengthPx}
                height="24"
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="2"
                rx="3"
              />

              {/* Center of Gravity (CoG) Symbol */}
              <circle cx={cogX} cy={beamY + 12} r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
              <line x1={cogX - 9} y1={beamY + 12} x2={cogX + 9} y2={beamY + 12} stroke="#ffffff" strokeWidth="1.5" />
              <line x1={cogX} y1={beamY + 3} x2={cogX} y2={beamY + 21} stroke="#ffffff" strokeWidth="1.5" />

              {/* Downward Total Force Arrow at CoG */}
              <line x1={cogX} y1={beamY + 24} x2={cogX} y2={beamY + 55} stroke="#ef4444" strokeWidth="3" markerEnd="url(#cog-arrow)" />
              <text x={cogX} y={beamY + 68} fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="ui-monospace" fontWeight="bold">
                CoG (W={totalLoadTon}t)
              </text>

              {/* Pick Point Labels */}
              <text x={leftX} y={beamY - 8} fill="#38bdf8" fontSize="11" fontFamily="ui-monospace" fontWeight="bold">
                Sol: {result.loadShare1Ton}t (%{result.percentageLeg1})
              </text>
              <text x={rightX} y={beamY - 8} fill="#a855f7" textAnchor="end" fontSize="11" fontFamily="ui-monospace" fontWeight="bold">
                Sağ: {result.loadShare2Ton}t (%{result.percentageLeg2})
              </text>
            </svg>
          </div>

          {/* Warning Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
              result.isTilted
                ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
            }`}
          >
            {result.isTilted ? (
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="block text-sm font-bold">
                {result.isTilted ? (locale === 'tr' ? 'Asimetrik Yük Uyarısı' : 'Asymmetry Alert') : (locale === 'tr' ? 'Dengeli Yükleme' : 'Balanced Load')}
              </strong>
              <span>{result.equilibriumWarning.tr}</span>
            </div>
          </div>

          {/* Results Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
            <div className="bg-[#111827] p-3 rounded-xl border border-blue-900/40">
              <span className="text-[10px] text-blue-400 uppercase block font-bold">Sol Kol Yükü (F1)</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                {result.loadShare1Ton} <span className="text-xs text-slate-400">Ton</span>
              </span>
              <span className="text-[11px] text-blue-300 font-bold">%{result.percentageLeg1} Pay</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-purple-900/40">
              <span className="text-[10px] text-purple-400 uppercase block font-bold">Sağ Kol Yükü (F2)</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                {result.loadShare2Ton} <span className="text-xs text-slate-400">Ton</span>
              </span>
              <span className="text-[11px] text-purple-300 font-bold">%{result.percentageLeg2} Pay</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-safety-500/40 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-safety-400 uppercase block font-bold">Tavsiye Sapan WLL</span>
              <span className="text-base sm:text-lg font-bold text-safety-400 block">
                ≥ {result.recommendedSlingWllTon} <span className="text-xs text-slate-400">Ton</span>
              </span>
              <span className="text-[10px] text-slate-400 font-sans">En ağır kola göre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
