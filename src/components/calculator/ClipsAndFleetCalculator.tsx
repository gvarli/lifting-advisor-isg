'use client';

import React, { useState, useMemo } from 'react';
import { calculateClipsAndFleetAngle } from '@/lib/calculations/clipsAndFleetAngle';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  BookmarkPlus,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
} from 'lucide-react';

export const ClipsAndFleetCalculator: React.FC = () => {
  const { locale } = useTranslation();

  const [ropeDiameterMm, setRopeDiameterMm] = useState<number>(16);
  const [drumType, setDrumType] = useState<'grooved' | 'plain'>('grooved');
  const [drumWidthMm, setDrumWidthMm] = useState<number>(800);
  const [distanceToSheaveMm, setDistanceToSheaveMm] = useState<number>(12000); // 12 meters
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateClipsAndFleetAngle({
      ropeDiameterMm,
      drumType,
      drumWidthMm,
      distanceToSheaveMm,
    });
  }, [ropeDiameterMm, drumType, drumWidthMm, distanceToSheaveMm]);

  const handleSaveToSession = async () => {
    const record = {
      id: `calc-clip-fleet-${Date.now()}`,
      timestamp: new Date().toISOString(),
      moduleName: 'Halat Klemensi ve Tambur Sarım Açısı (Fleet Angle) Hesaplayıcı',
      inputs: { ropeDiameterMm, drumType, drumWidthMm, distanceToSheaveMm },
      outputs: {
        minClipCount: result.minClipCount,
        clipSpacingMm: result.clipSpacingMm,
        tighteningTorqueNm: result.tighteningTorqueNm,
        fleetAngleDeg: result.fleetAngleDeg,
        isFleetAngleCompliant: result.isFleetAngleCompliant,
      },
      safetyStatus: result.isFleetAngleCompliant ? 'safe' : 'critical',
      summaryMessage: result.fleetAngleAdvice[locale],
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-wider block">
            [Hesaplama 05] • EN 13411-5 Klemens & Tambur Geometrisi
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'tr'
              ? 'Halat Klemensi, Tork ve Tambur Sarım Açısı (Fleet Angle) Hesaplayıcı'
              : 'Wire Rope Clips & Drum Fleet Angle Calculator'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Dövme klemens adedi, 6d aralık, torklama tablosu ve tambur sapma açısı kontrolü
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

      {/* Two Column Layout: Module A (Clips) & Module B (Fleet Angle) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SUB-MODULE A: WIRE ROPE CLIPS */}
        <div className="bg-[#111827] p-4 sm:p-5 rounded-xl border border-[#23314d] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-safety-500" />
              <span>Modül A: Klemens Donatımı (EN 13411-5)</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-safety-400 border border-slate-700">
              Dövme Çelik
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Halat Çapı (d):</span>
              <span className="font-mono text-safety-400 font-bold">{ropeDiameterMm} mm</span>
            </label>
            <input
              type="number"
              min="3"
              max="60"
              value={ropeDiameterMm}
              onChange={(e) => setRopeDiameterMm(Math.max(3, parseFloat(e.target.value) || 3))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>

          {/* SVG Diagram: "Never Saddle a Dead Horse" */}
          <div className="bg-[#0b0f19] rounded-xl border border-[#23314d] p-3 flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-safety-400 font-bold mb-1 uppercase tracking-wider">
              ALTIN KURAL: Köprü Canlı Kola, U-Cıvata Ölü Kola Basar!
            </span>
            <svg viewBox="0 0 340 100" className="w-full max-w-[340px] h-[90px]">
              {/* Live line (continuous straight line) */}
              <line x1="20" y1="35" x2="320" y2="35" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              <text x="25" y="25" fill="#38bdf8" fontSize="10" fontFamily="ui-monospace" fontWeight="bold">
                CANLI KOL (Yük Çeken)
              </text>

              {/* Thimble loop at right */}
              <path d="M 320 35 A 25 25 0 0 1 320 75" fill="none" stroke="#64748b" strokeWidth="5" />

              {/* Dead line (folded back under) */}
              <line x1="320" y1="75" x2="140" y2="75" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
              <text x="145" y="90" fill="#f59e0b" fontSize="10" fontFamily="ui-monospace" fontWeight="bold">
                ÖLÜ KUYRUK (Turnback: {result.turnbackLengthMm}mm)
              </text>

              {/* Clamps drawn along the lines */}
              {[200, 245, 290].map((x, i) => (
                <g key={i}>
                  {/* Saddle on live line */}
                  <rect x={x - 6} y="27" width="12" height="16" fill="#10b981" rx="2" />
                  {/* U-bolt on dead line */}
                  <path d={`M ${x - 5} 35 L ${x - 5} 78 A 5 5 0 0 0 ${x + 5} 78 L ${x + 5} 35`} fill="none" stroke="#ef4444" strokeWidth="2.5" />
                </g>
              ))}
            </svg>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Min. Klemens</span>
              <span className="text-base font-bold text-white block">{result.minClipCount} Adet</span>
            </div>
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Aralık (6d)</span>
              <span className="text-base font-bold text-safety-400 block">{result.clipSpacingMm} mm</span>
            </div>
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Sıkma Torku</span>
              <span className="text-base font-bold text-emerald-400 block">{result.tighteningTorqueNm} Nm</span>
            </div>
          </div>
        </div>

        {/* SUB-MODULE B: FLEET ANGLE */}
        <div className="bg-[#111827] p-4 sm:p-5 rounded-xl border border-[#23314d] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Modül B: Tambur Sarım Açısı (Fleet Angle)</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-blue-400 border border-slate-700">
              ISO / FEM
            </span>
          </div>

          {/* Drum Type selection */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setDrumType('grooved')}
              className={`p-2 rounded-lg border font-bold transition-all ${
                drumType === 'grooved'
                  ? 'bg-blue-950/80 border-blue-500 text-blue-300'
                  : 'bg-[#131b2e] border-[#23314d] text-slate-400'
              }`}
            >
              Yivli / Kanallı Tambur (Maks 2.0°)
            </button>
            <button
              onClick={() => setDrumType('plain')}
              className={`p-2 rounded-lg border font-bold transition-all ${
                drumType === 'plain'
                  ? 'bg-blue-950/80 border-blue-500 text-blue-300'
                  : 'bg-[#131b2e] border-[#23314d] text-slate-400'
              }`}
            >
              Düz Tambur (Maks 1.5°)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-300 font-semibold">Tambur Genişliği (W):</label>
              <input
                type="number"
                min="100"
                step="50"
                value={drumWidthMm}
                onChange={(e) => setDrumWidthMm(Math.max(50, parseFloat(e.target.value) || 100))}
                className="w-full px-2.5 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
              />
              <span className="text-[10px] text-slate-500">mm</span>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-300 font-semibold">Makaraya Mesafe (L):</label>
              <input
                type="number"
                min="500"
                step="500"
                value={distanceToSheaveMm}
                onChange={(e) => setDistanceToSheaveMm(Math.max(500, parseFloat(e.target.value) || 500))}
                className="w-full px-2.5 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
              />
              <span className="text-[10px] text-slate-500">mm ({distanceToSheaveMm / 1000} m)</span>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
              result.isFleetAngleCompliant
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                : 'bg-red-950/40 border-red-600/60 text-red-200'
            }`}
          >
            {result.isFleetAngleCompliant ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertOctagon className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="block font-bold">
                {result.isFleetAngleCompliant ? 'UYGUN FLEET AÇISI' : 'AŞIRI SAPMA AÇISI!'}
              </strong>
              <span>{result.fleetAngleAdvice[locale]}</span>
            </div>
          </div>

          {/* Metric Row */}
          <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Hesaplanan Açı</span>
              <span
                className={`text-base font-bold block ${
                  result.isFleetAngleCompliant ? 'text-white' : 'text-red-400'
                }`}
              >
                {result.fleetAngleDeg}°
              </span>
            </div>
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Azami İzin Verilen</span>
              <span className="text-base font-bold text-blue-400 block">
                {result.maxPermissibleAngleDeg}°
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
