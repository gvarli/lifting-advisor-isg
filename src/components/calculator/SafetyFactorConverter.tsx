'use client';

import React, { useState, useMemo } from 'react';
import { calculateSafetyFactor } from '@/lib/calculations/safetyFactorConverter';
import { InspectionEquipmentType } from '@/lib/calculations/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  ShieldCheck,
  BookmarkPlus,
  AlertOctagon,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export const SafetyFactorConverter: React.FC = () => {
  const { locale } = useTranslation();

  const [mode, setMode] = useState<'calc_wll' | 'calc_mbl' | 'calc_sf'>('calc_wll');
  const [equipmentType, setEquipmentType] = useState<InspectionEquipmentType>('textile_sling');
  const [wllTon, setWllTon] = useState<number>(3);
  const [mblTon, setMblTon] = useState<number>(21);
  const [sf, setSf] = useState<number>(7);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateSafetyFactor({
      mode,
      equipmentType,
      wllTon,
      mblTon,
      sf,
    });
  }, [mode, equipmentType, wllTon, mblTon, sf]);

  const handleSaveToSession = async () => {
    const record = {
      id: `calc-sf-${Date.now()}`,
      timestamp: new Date().toISOString(),
      moduleName: 'Emniyet Katsayısı (SF) ve MBL / WLL Dönüştürücü',
      inputs: { mode, equipmentType, wllTon, mblTon, sf },
      outputs: {
        calculatedWllTon: result.calculatedWllTon,
        calculatedMblTon: result.calculatedMblTon,
        calculatedSf: result.calculatedSf,
        standardRequiredMinSf: result.standardRequiredMinSf,
      },
      safetyStatus: result.isCompliant ? 'safe' : 'critical',
      summaryMessage: result.complianceMessage[locale],
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const equipmentStandards: { id: InspectionEquipmentType; label: string; minSf: string }[] = [
    { id: 'textile_sling', label: 'Polyester Bez Sapan (EN 1492)', minSf: '7:1' },
    { id: 'steel_wire_rope', label: 'Çelik Halat Sapan (EN 13414)', minSf: '5:1' },
    { id: 'chain_sling', label: 'Zincir Sapan (EN 818)', minSf: '4:1' },
    { id: 'shackle', label: 'Dövme Mapa / Kilit (EN 13889)', minSf: '6:1' },
    { id: 'plate_clamp', label: 'Sac Kapma Aparatı (EN 13155)', minSf: '3:1' },
    { id: 'manual_hoist', label: 'Caraskal / Hubzug (EN 13157)', minSf: '4:1' },
    { id: 'overhead_crane', label: 'Köprülü Vinç Mekanizması', minSf: '5:1' },
  ];

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-wider block">
            [Hesaplama 07] • Emniyet Katsayısı & Kopma Yükü Dönüşümü
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'tr'
              ? 'Güvenlik Katsayısı (Safety Factor) ve MBL / WLL Dönüştürücü'
              : 'Safety Factor (SF) & MBL / WLL Converter'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            MBL = WLL x SF formülü ve ilgili EN/ISO standartlarının asgari güvenlik katsayısı doğrulaması
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
            <span>Hesaplama Modu & Ekipman</span>
          </h3>

          {/* Mode Switcher */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Hesaplanacak Değişken:</label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('calc_wll')}
                className={`py-2 px-1 rounded-lg border text-center transition-all ${
                  mode === 'calc_wll'
                    ? 'bg-safety-500 text-black border-safety-400 font-bold'
                    : 'bg-[#131b2e] text-slate-300 border-[#23314d]'
                }`}
              >
                WLL Bul
              </button>
              <button
                type="button"
                onClick={() => setMode('calc_mbl')}
                className={`py-2 px-1 rounded-lg border text-center transition-all ${
                  mode === 'calc_mbl'
                    ? 'bg-safety-500 text-black border-safety-400 font-bold'
                    : 'bg-[#131b2e] text-slate-300 border-[#23314d]'
                }`}
              >
                MBL Bul
              </button>
              <button
                type="button"
                onClick={() => setMode('calc_sf')}
                className={`py-2 px-1 rounded-lg border text-center transition-all ${
                  mode === 'calc_sf'
                    ? 'bg-safety-500 text-black border-safety-400 font-bold'
                    : 'bg-[#131b2e] text-slate-300 border-[#23314d]'
                }`}
              >
                SF Bul
              </button>
            </div>
          </div>

          {/* Equipment selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Ekipman Türü (Standart Referansı):</label>
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value as InspectionEquipmentType)}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-safety-500"
            >
              {equipmentStandards.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label} (Asgari {st.minSf})
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic input fields based on mode */}
          <div className="space-y-3 pt-2 border-t border-[#1f2c44]">
            {mode !== 'calc_wll' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Çalışma Yük Sınırı (WLL):</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={wllTon}
                    onChange={(e) => setWllTon(Math.max(0.01, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
                  />
                  <span className="px-3 py-2 rounded-lg bg-[#1a253c] border border-[#293853] text-xs font-mono text-slate-300 flex items-center">
                    Ton
                  </span>
                </div>
              </div>
            )}

            {mode !== 'calc_mbl' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Minimum Kopma Yükü (MBL):</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={mblTon}
                    onChange={(e) => setMblTon(Math.max(0.01, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
                  />
                  <span className="px-3 py-2 rounded-lg bg-[#1a253c] border border-[#293853] text-xs font-mono text-slate-300 flex items-center">
                    Ton
                  </span>
                </div>
              </div>
            )}

            {mode !== 'calc_sf' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tasarım Emniyet Katsayısı (SF):</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="15"
                    step="0.5"
                    value={sf}
                    onChange={(e) => setSf(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
                  />
                  <span className="px-3 py-2 rounded-lg bg-[#1a253c] border border-[#293853] text-xs font-mono text-slate-300 flex items-center">
                    :1
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output & Standards Check (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Converted Output Card */}
          <div className="bg-[#0b0f19] rounded-xl border border-[#23314d] p-5 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              {mode === 'calc_wll' ? 'HESAPLANAN ÇALIŞMA YÜK SINIRI (WLL)' : mode === 'calc_mbl' ? 'HESAPLANAN MİNİMUM KOPMA YÜKÜ (MBL)' : 'HESAPLANAN GÜVENLİK KATSAYISI (SF)'}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-safety-400">
              {mode === 'calc_wll'
                ? `${result.calculatedWllTon} Ton`
                : mode === 'calc_mbl'
                ? `${result.calculatedMblTon} Ton`
                : `${result.calculatedSf}:1`}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {mode === 'calc_wll'
                ? `WLL = ${mblTon}t / ${sf} = ${result.calculatedWllTon} Ton`
                : mode === 'calc_mbl'
                ? `MBL = ${wllTon}t x ${sf} = ${result.calculatedMblTon} Ton`
                : `SF = ${mblTon}t / ${wllTon}t = ${result.calculatedSf}:1`}
            </div>
          </div>

          {/* Compliance Status Banner */}
          <div
            className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
              result.isCompliant
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                : 'bg-red-950/40 border-red-600/60 text-red-200'
            }`}
          >
            {result.isCompliant ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertOctagon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="block text-sm font-bold">
                {result.isCompliant ? 'STANDARTLARA TAM UYGUNLUK' : 'STANDART DIŞI EMNİYET KATSAYISI (YASAK)'}
              </strong>
              <span>{result.complianceMessage[locale]}</span>
            </div>
          </div>

          {/* Mandatory Standards Table */}
          <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
              Uluslararası Standartların Zorunlu Emniyet Katsayıları
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
              <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#1f2c44]">
                <span className="text-[10px] text-slate-400 block">Tekstil / Bez</span>
                <span className="font-bold text-safety-400 text-sm block">7:1</span>
                <span className="text-[10px] text-slate-500">EN 1492</span>
              </div>
              <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#1f2c44]">
                <span className="text-[10px] text-slate-400 block">Çelik Halat</span>
                <span className="font-bold text-white text-sm block">5:1</span>
                <span className="text-[10px] text-slate-500">EN 13414</span>
              </div>
              <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#1f2c44]">
                <span className="text-[10px] text-slate-400 block">Zincir Sapan</span>
                <span className="font-bold text-white text-sm block">4:1</span>
                <span className="text-[10px] text-slate-500">EN 818-4</span>
              </div>
              <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#1f2c44]">
                <span className="text-[10px] text-slate-400 block">Dövme Mapa</span>
                <span className="font-bold text-white text-sm block">6:1</span>
                <span className="text-[10px] text-slate-500">EN 13889</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
