'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { calculateSlingTension } from '@/lib/calculations/slingTension';
import { SlingLegCount, HitchType } from '@/lib/calculations/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  BookmarkPlus,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const SlingTensionCalculator: React.FC = () => {
  const router = useRouter();
  const { locale } = useTranslation();

  // Inputs state
  const [totalLoadTon, setTotalLoadTon] = useState<number>(10);
  const [legCount, setLegCount] = useState<SlingLegCount>(2);
  const [hitchType, setHitchType] = useState<HitchType>('straight');
  const [inputMode, setInputMode] = useState<'angle' | 'dimensions'>('angle');
  const [verticalAngleDeg, setVerticalAngleDeg] = useState<number>(30);
  const [slingLengthM, setSlingLengthM] = useState<number>(3.0);
  const [spanDistanceM, setSpanDistanceM] = useState<number>(3.0);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // Calculation Result
  const result = useMemo(() => {
    return calculateSlingTension({
      totalLoadKg: totalLoadTon * 1000,
      legCount,
      hitchType,
      inputMode,
      verticalAngleDeg,
      slingLengthM,
      distanceBetweenPointsM: spanDistanceM,
    });
  }, [totalLoadTon, legCount, hitchType, inputMode, verticalAngleDeg, slingLengthM, spanDistanceM]);

  // Save calculation to session
  const handleSaveToSession = async () => {
    const record = {
      id: `calc-sling-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'calculation',
      title: `${totalLoadTon} Ton - ${legCount} Kollu Sapan (${result.calculatedAngleDeg}° Açı)`,
      moduleName: 'Çok Kollu Sapan Açı ve Gerilim Hesaplayıcı',
      inputs: { totalLoadTon, legCount, hitchType, verticalAngleDeg: result.calculatedAngleDeg },
      outputs: {
        loadFactor: result.loadFactor,
        tensionPerLegTon: result.tensionPerLegTon,
        tensionPerLegKn: result.tensionPerLegKn,
        recommendedWllPerLegTon: result.recommendedWllPerLegTon,
      },
      safetyStatus: result.isDangerousAngle ? 'critical' : result.isCriticalWarning ? 'warning' : 'safe',
      summaryMessage: result.statusMessage[locale],
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSendToAi = () => {
    const scenario = `Toplam Yük: ${totalLoadTon} Ton, Kol Sayısı: ${legCount}, Bağlama Şekli: ${hitchType}, Düşey Açı: ${result.calculatedAngleDeg}°, Kol Başı Gerilim: ${result.tensionPerLegTon} Ton. ${
      result.isDangerousAngle
        ? 'AÇI 60 DERECEYİ AŞTI VE STANDART GEREĞİ YASAKLANDI (Ölümcül Risk).'
        : 'Gerilim katsayısı yüksek riskli seviyede.'
    } Alternatif kaldırma konfigürasyonu, travers (spreader beam) kullanımı veya sapan boyu uzatma önerisi talep ediliyor.`;
    
    const query = new URLSearchParams({
      mode: 'audit',
      scenario,
    });
    router.push(`/ai-consultant?${query.toString()}`);
  };

  // SVG Coordinates calculation for dynamic technical diagram
  const svgWidth = 360;
  const svgHeight = 260;
  const apexX = svgWidth / 2;
  const apexY = 40;
  const legVisualLength = 140;

  const betaRad = (result.calculatedAngleDeg * Math.PI) / 180;
  const spreadX = legVisualLength * Math.sin(betaRad);
  const dropY = legVisualLength * Math.cos(betaRad);

  const leftX = apexX - spreadX;
  const rightX = apexX + spreadX;
  const baseY = apexY + dropY;

  // Dynamic stroke color based on angle severity
  const strokeColor = result.isDangerousAngle
    ? '#EF4444' // Red
    : result.isCriticalWarning
    ? '#F59E0B' // Amber
    : '#10B981'; // Emerald Green

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-wider block">
            [Hesaplama 01] • Trigonometrik Yük Analizi
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'tr'
              ? 'Çok Kollu Sapan Açı, Gerilim ve WLL Hesaplayıcı'
              : 'Multi-Leg Sling Angle, Tension & WLL Calculator'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            EN 818-4, EN 13414 ve ASME B30.9 standartlarına uygun rijit yük ve gerilim çarpanları
          </p>
        </div>

        <button
          onClick={handleSaveToSession}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a253c] border border-safety-500/40 text-safety-400 hover:bg-safety-500 hover:text-black text-xs font-mono font-bold transition-all shrink-0 self-start sm:self-center"
        >
          <BookmarkPlus className="h-4 w-4" />
          <span>{saveToast ? (locale === 'tr' ? 'Kaydedildi!' : 'Saved!') : (locale === 'tr' ? 'Oturuma Kaydet' : 'Save to Session')}</span>
        </button>
      </div>

      {/* Grid: Inputs + Dynamic SVG Diagram + Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#111827] p-4 sm:p-5 rounded-xl border border-[#23314d] space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-safety-500" />
            <span>Girdi Parametreleri</span>
          </h3>

          {/* Input 1: Total Load */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Toplam Yük Ağırlığı:</span>
              <span className="font-mono text-safety-400 font-bold">{totalLoadTon} Ton</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={totalLoadTon}
                onChange={(e) => setTotalLoadTon(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
              />
              <span className="px-3 py-2 rounded-lg bg-[#1a253c] border border-[#293853] text-xs font-mono text-slate-300 flex items-center">
                Ton
              </span>
            </div>
          </div>

          {/* Input 2: Leg Count Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Sapan Kol Sayısı:</label>
            <div className="grid grid-cols-4 gap-1.5">
              {([1, 2, 3, 4] as SlingLegCount[]).map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setLegCount(count)}
                  className={`py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                    legCount === count
                      ? 'bg-safety-500 text-black border-safety-400'
                      : 'bg-[#131b2e] text-slate-300 border-[#23314d] hover:border-slate-500'
                  }`}
                >
                  {count} Kol
                </button>
              ))}
            </div>
          </div>

          {/* Input 3: Hitch Mode */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Bağlama Şekli:</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'straight', label: 'Düz (1.0)' },
                { id: 'choker', label: 'Boğma (0.8)' },
                { id: 'basket', label: 'Sepet (2.0)' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setHitchType(m.id as HitchType)}
                  className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all ${
                    hitchType === m.id
                      ? 'bg-[#1a253c] text-safety-400 border-safety-500 font-bold'
                      : 'bg-[#131b2e] text-slate-400 border-[#23314d] hover:border-slate-500'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input 4: Mode Switcher (Angle vs Dimensions) */}
          <div className="pt-2 border-t border-[#1f2c44] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Açı Giriş Yöntemi:</span>
              <div className="inline-flex rounded-lg bg-[#0e1526] p-0.5 border border-[#23314d] text-[11px]">
                <button
                  onClick={() => setInputMode('angle')}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    inputMode === 'angle' ? 'bg-[#1e2b47] text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Düşey Açı (β)
                </button>
                <button
                  onClick={() => setInputMode('dimensions')}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    inputMode === 'dimensions' ? 'bg-[#1e2b47] text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Boy & Açıklık (L, S)
                </button>
              </div>
            </div>

            {inputMode === 'angle' ? (
              /* Angle Slider */
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Düşey Açı (β):</span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      verticalAngleDeg > 60
                        ? 'text-red-400 animate-pulse'
                        : verticalAngleDeg > 45
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {verticalAngleDeg}° (Tepe: {verticalAngleDeg * 2}°)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="75"
                  step="1"
                  value={verticalAngleDeg}
                  onChange={(e) => setVerticalAngleDeg(parseInt(e.target.value, 10))}
                  className="w-full accent-safety-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0° (Dikey)</span>
                  <span className="text-emerald-400">45°</span>
                  <span className="text-amber-400">60° Sınır</span>
                  <span className="text-red-500">75° YASAK</span>
                </div>
              </div>
            ) : (
              /* Dimensions Inputs */
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 block">Sapan Boyu (L):</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.1"
                    value={slingLengthM}
                    onChange={(e) => setSlingLengthM(parseFloat(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
                  />
                  <span className="text-[10px] text-slate-500">Metre</span>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 block">Noktalar Arası (S):</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.1"
                    value={spanDistanceM}
                    onChange={(e) => setSpanDistanceM(parseFloat(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#131b2e] border border-[#23314d] text-white font-mono text-xs"
                  />
                  <span className="text-[10px] text-slate-500">Metre (Span)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center / Right Column: Dynamic SVG Diagram + Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dynamic Technical SVG Diagram */}
          <div className="bg-[#0b0f19] rounded-xl border border-[#23314d] p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Dinamik Kuvvet Vektör Çizimi (CAD Render)
            </span>

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full max-w-[380px] h-[210px] transition-all"
            >
              {/* Background Reference Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2c44" strokeWidth="0.5" />
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Crane Hook at Apex */}
              <circle cx={apexX} cy={apexY} r="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <line x1={apexX} y1={10} x2={apexX} y2={apexY - 8} stroke="#f59e0b" strokeWidth="3" />

              {/* Vertical Center Reference Plumb Line */}
              <line
                x1={apexX}
                y1={apexY}
                x2={apexX}
                y2={baseY + 20}
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Left Sling Leg */}
              <line
                x1={apexX}
                y1={apexY}
                x2={leftX}
                y2={baseY}
                stroke={strokeColor}
                strokeWidth="3.5"
                className="transition-all duration-150"
              />

              {/* Right Sling Leg */}
              <line
                x1={apexX}
                y1={apexY}
                x2={rightX}
                y2={baseY}
                stroke={strokeColor}
                strokeWidth="3.5"
                className="transition-all duration-150"
              />

              {/* Force Vector Arrows on Legs */}
              <line
                x1={leftX + (apexX - leftX) * 0.4}
                y1={baseY - (baseY - apexY) * 0.4}
                x2={leftX + (apexX - leftX) * 0.6}
                y2={baseY - (baseY - apexY) * 0.6}
                stroke={strokeColor}
                strokeWidth="3"
                markerEnd="url(#arrow)"
              />
              <line
                x1={rightX - (rightX - apexX) * 0.4}
                y1={baseY - (baseY - apexY) * 0.4}
                x2={rightX - (rightX - apexX) * 0.6}
                y2={baseY - (baseY - apexY) * 0.6}
                stroke={strokeColor}
                strokeWidth="3"
                markerEnd="url(#arrow)"
              />

              {/* Angle Arc Indicator */}
              <path
                d={`M ${apexX - 25 * Math.sin(betaRad)} ${apexY + 25 * Math.cos(betaRad)} A 25 25 0 0 1 ${apexX + 25 * Math.sin(betaRad)} ${apexY + 25 * Math.cos(betaRad)}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              <text
                x={apexX}
                y={apexY + 45}
                fill="#f59e0b"
                fontSize="11"
                textAnchor="middle"
                fontFamily="ui-monospace"
                fontWeight="bold"
              >
                2β = {result.includedAngleDeg}°
              </text>

              {/* Lifted Load Block */}
              <rect
                x={leftX - 15}
                y={baseY}
                width={Math.max(30, (rightX - leftX) + 30)}
                height="30"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="2"
                rx="4"
              />
              <text
                x={apexX}
                y={baseY + 19}
                fill="#ffffff"
                fontSize="11"
                textAnchor="middle"
                fontFamily="ui-monospace"
                fontWeight="bold"
              >
                YÜK: {totalLoadTon} Ton
              </text>
            </svg>

            {/* Diagram Bottom Indicator Pill */}
            <div className="mt-2 text-xs font-mono font-bold flex items-center gap-2">
              <span className="text-slate-400">Yük Çarpanı (K_L = 1/cos β):</span>
              <span className="text-safety-400 text-sm">x{result.loadFactor.toFixed(3)}</span>
            </div>
          </div>

          {/* Critical Warnings / Banners */}
          {result.isDangerousAngle ? (
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-600/60 text-red-200 text-xs flex items-start gap-3">
                <AlertOctagon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-red-400 font-bold">
                    {locale === 'tr' ? 'ÖLÜMCÜL RİSK: AÇI LİMİTİ AŞILDI!' : 'FATAL RISK: ANGLE LIMIT EXCEEDED!'}
                  </strong>
                  <span>{result.warningNotice?.tr || result.statusMessage.tr}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSendToAi}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>
                  {locale === 'tr'
                    ? 'Bu Senaryoyu AI Denetçisine Gönder ve Alternatif Yöntem İste'
                    : 'Send Scenario to AI Auditor & Request Alternative Rigging'}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : result.isCriticalWarning ? (
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/50 text-amber-200 text-xs flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-400 font-bold">
                    {locale === 'tr' ? 'DİKKAT: YÜKSEK GERİLİM BÖLGESİ' : 'CAUTION: HIGH TENSION ZONE'}
                  </strong>
                  <span>{result.statusMessage.tr}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSendToAi}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {locale === 'tr'
                    ? 'AI Danışmanından Dengeleme / Travers Tavsiyesi Al'
                    : 'Get Spreader / Balancing Advice from AI'}
                </span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{result.statusMessage.tr}</span>
            </div>
          )}

          {/* Results Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
            <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d]">
              <span className="text-[10px] text-slate-400 uppercase block">Kola Düşen Gerilim</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                {result.tensionPerLegTon} <span className="text-xs font-normal text-slate-400">Ton</span>
              </span>
              <span className="text-[10px] text-slate-400">({result.tensionPerLegKn} kN)</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d]">
              <span className="text-[10px] text-slate-400 uppercase block">Önerilen Kol WLL</span>
              <span className="text-base sm:text-lg font-bold text-safety-400 block">
                ≥ {result.recommendedWllPerLegTon} <span className="text-xs font-normal text-slate-400">Ton</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-sans">Min. Kol Kapasitesi</span>
            </div>

            <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d] col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase block">Taşıyıcı Kol Sayısı</span>
              <span className="text-base sm:text-lg font-bold text-white block">
                {result.effectiveLegs} <span className="text-xs font-normal text-slate-400">Kol</span>
              </span>
              <span className="text-[10px] text-slate-400">Rijit Yük Kuralı</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
