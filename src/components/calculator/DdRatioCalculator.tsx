'use client';

import React, { useState, useMemo } from 'react';
import { calculateDdRatio } from '@/lib/calculations/ddRatio';
import { EquipmentDdType } from '@/lib/calculations/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  AlertTriangle,
  BookmarkPlus,
  AlertOctagon,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export const DdRatioCalculator: React.FC = () => {
  const { locale } = useTranslation();

  const [equipmentType, setEquipmentType] = useState<EquipmentDdType>('wire_rope');
  const [dMm, setDMm] = useState<number>(20); // Rope diameter
  const [dCapMm, setDCapMm] = useState<number>(80); // Pin diameter
  const [nominalWllTon, setNominalWllTon] = useState<number>(10);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateDdRatio({
      equipmentType,
      dMm,
      dCapMm,
      nominalWllTon,
    });
  }, [equipmentType, dMm, dCapMm, nominalWllTon]);

  const handleSaveToSession = async () => {
    const record = {
      id: `calc-dd-${Date.now()}`,
      timestamp: new Date().toISOString(),
      moduleName: 'D/d Bükülme Oranı ve Verimlilik Kaybı Hesaplayıcı',
      inputs: { equipmentType, dMm, dCapMm, nominalWllTon },
      outputs: {
        ratioDd: result.ratioDd,
        efficiencyPercentage: result.efficiencyPercentage,
        capacityLossPercentage: result.capacityLossPercentage,
        effectiveWllTon: result.effectiveWllTon,
      },
      safetyStatus: result.severity,
      summaryMessage: result.recommendation[locale],
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // SVG Drawing calculations
  const svgWidth = 360;
  const svgHeight = 220;
  const centerX = svgWidth / 2;
  const centerY = 110;

  // Scale pin visual radius proportional to D/d
  const pinVisualRadius = Math.min(65, Math.max(18, result.ratioDd * 12));
  const ropeThickness = Math.max(6, Math.min(20, (dMm / 40) * 16));

  const strokeColor = result.severity === 'critical'
    ? '#EF4444'
    : result.severity === 'warning'
    ? '#F59E0B'
    : '#10B981';

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-wider block">
            [Hesaplama 03] • Bükülme Yorulması & Keskin Kenar
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'tr'
              ? 'D/d Oranı (Bükülme Çapı) Verimlilik Kaybı Hesaplayıcı'
              : 'D/d Bending Ratio & Efficiency Loss Calculator'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pim, kanca veya yük köşesi çapına bağlı mukavemet düşümü ve efektif WLL tayini
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
            <span>Ekipman ve Boyut Girişi</span>
          </h3>

          {/* Equipment Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Ekipman Türü:</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'wire_rope', label: 'Çelik Halat' },
                { id: 'chain', label: 'Zincir' },
                { id: 'polyester_sling', label: 'Bez Sapan' },
              ].map((eq) => (
                <button
                  key={eq.id}
                  type="button"
                  onClick={() => setEquipmentType(eq.id as EquipmentDdType)}
                  className={`py-2 px-1 rounded-lg border text-xs font-semibold transition-all ${
                    equipmentType === eq.id
                      ? 'bg-safety-500 text-black border-safety-400 font-bold'
                      : 'bg-[#131b2e] text-slate-300 border-[#23314d] hover:border-slate-500'
                  }`}
                >
                  {eq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input: Rope / Sling thickness d */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Halat / Sapan Çapı (d):</span>
              <span className="font-mono text-safety-400 font-bold">{dMm} mm</span>
            </label>
            <input
              type="number"
              min="2"
              max="150"
              value={dMm}
              onChange={(e) => setDMm(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>

          {/* Input: Pin / Edge Diameter D */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Büküldüğü Pim / Kenar Çapı (D):</span>
              <span className="font-mono text-safety-400 font-bold">{dCapMm} mm</span>
            </label>
            <input
              type="number"
              min="2"
              max="2000"
              value={dCapMm}
              onChange={(e) => setDCapMm(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>

          {/* Input: Nominal WLL */}
          <div className="space-y-1.5 pt-2 border-t border-[#1f2c44]">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Nominal Etiket WLL Değeri:</span>
              <span className="font-mono text-white font-bold">{nominalWllTon} Ton</span>
            </label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={nominalWllTon}
              onChange={(e) => setNominalWllTon(Math.max(0.1, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>
        </div>

        {/* Right Output & Dynamic SVG (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dynamic SVG Visualizer */}
          <div className="bg-[#0b0f19] rounded-xl border border-[#23314d] p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              D/d Temas Geometrisi & Bükülme Yarıçapı
            </span>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[360px] h-[190px]">
              {/* Pin Center Cross Section */}
              <circle
                cx={centerX}
                cy={centerY}
                r={pinVisualRadius}
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="2.5"
              />
              <text
                x={centerX}
                y={centerY + 4}
                fill="#ffffff"
                fontSize="12"
                textAnchor="middle"
                fontFamily="ui-monospace"
                fontWeight="bold"
              >
                D={dCapMm}mm
              </text>

              {/* Rope / Sling Wrapping Around Pin */}
              <path
                d={`M ${centerX - pinVisualRadius - ropeThickness / 2} 15 L ${centerX - pinVisualRadius - ropeThickness / 2} ${centerY} A ${pinVisualRadius + ropeThickness / 2} ${pinVisualRadius + ropeThickness / 2} 0 0 0 ${centerX + pinVisualRadius + ropeThickness / 2} ${centerY} L ${centerX + pinVisualRadius + ropeThickness / 2} 15`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={ropeThickness}
                strokeLinecap="round"
              />

              {/* Dimension Labels */}
              <text
                x={centerX + pinVisualRadius + ropeThickness + 10}
                y={30}
                fill={strokeColor}
                fontSize="11"
                fontFamily="ui-monospace"
                fontWeight="bold"
              >
                d = {dMm}mm
              </text>
            </svg>

            {/* Ratio Output Pill */}
            <div className="mt-1 text-xs font-mono font-bold flex items-center gap-2">
              <span className="text-slate-400">Hesaplanan D/d Oranı:</span>
              <span className="text-base text-safety-400">{result.ratioDd}</span>
              <span className="text-slate-500">({result.ratioDd >= 25 ? 'İdeal' : result.ratioDd >= 5 ? 'Kabul Edilebilir' : 'Düşük'})</span>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
              result.severity === 'critical'
                ? 'bg-red-950/40 border-red-600/60 text-red-200'
                : result.severity === 'warning'
                ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
            }`}
          >
            {result.severity === 'critical' ? (
              <AlertOctagon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            ) : result.severity === 'warning' ? (
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="block text-sm font-bold">
                {result.severity === 'critical'
                  ? 'KESKİN KENAR / HASAR TEHLİKESİ'
                  : result.severity === 'warning'
                  ? 'KAPASİTE DÜŞÜM İKAZI'
                  : 'GÜVENLİ BÜKÜLME ORANI'}
              </strong>
              <span>{result.recommendation[locale]}</span>
            </div>
          </div>

          {/* Results Metric Cards */}
          <div className="grid grid-cols-3 gap-3 font-mono">
            <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d]">
              <span className="text-[10px] text-slate-400 uppercase block">Kalan Verimlilik</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                %{result.efficiencyPercentage}
              </span>
              <span className="text-[10px] text-emerald-400">Bükülme Mukavemeti</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-red-900/30">
              <span className="text-[10px] text-red-400 uppercase block font-bold">Kapasite Kaybı</span>
              <span className="text-base sm:text-lg font-bold text-red-400 block">
                -%{result.capacityLossPercentage}
              </span>
              <span className="text-[10px] text-slate-400">Ezilme / Gerilme</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-safety-500/40">
              <span className="text-[10px] text-safety-400 uppercase block font-bold">Düşürülmüş WLL</span>
              <span className="text-base sm:text-lg font-bold text-safety-400 block">
                {result.effectiveWllTon} <span className="text-xs text-slate-400">Ton</span>
              </span>
              <span className="text-[10px] text-slate-400">Efektif Taşıma</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
