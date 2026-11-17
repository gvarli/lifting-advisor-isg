'use client';

import React, { useState, useMemo } from 'react';
import { calculateInspectionSchedule } from '@/lib/calculations/inspectionSchedule';
import { InspectionEquipmentType, DutyCycle } from '@/lib/calculations/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  Calendar,
  BookmarkPlus,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';

export const InspectionScheduleCalculator: React.FC = () => {
  const { locale } = useTranslation();

  const [equipmentType, setEquipmentType] = useState<InspectionEquipmentType>('chain_sling');
  const [dutyCycle, setDutyCycle] = useState<DutyCycle>('heavy');
  const [wllTon, setWllTon] = useState<number>(5);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateInspectionSchedule({
      equipmentType,
      dutyCycle,
    });
  }, [equipmentType, dutyCycle]);

  const staticTestWeightTon = wllTon * result.staticProofTestMultiplier;
  const dynamicTestWeightTon = wllTon * result.dynamicTestMultiplier;

  const handleSaveToSession = async () => {
    const record = {
      id: `calc-inspection-${Date.now()}`,
      timestamp: new Date().toISOString(),
      moduleName: 'Periyodik Kontrol Takvimi ve Test Yükü Hesaplayıcı',
      inputs: { equipmentType, dutyCycle, wllTon },
      outputs: {
        legalPeriodicIntervalMonths: result.legalPeriodicIntervalMonths,
        recommendedIntervalMonths: result.recommendedIntervalMonths,
        staticTestWeightTon,
        dynamicTestWeightTon,
      },
      safetyStatus: 'safe',
      summaryMessage: `${result.recommendedIntervalMonths} ayda bir periyodik kontrol gereklidir.`,
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const equipmentOptions: { id: InspectionEquipmentType; label: string }[] = [
    { id: 'chain_sling', label: 'Zincir Sapan (EN 818)' },
    { id: 'steel_wire_rope', label: 'Çelik Halat & Sapan (ISO 4309)' },
    { id: 'textile_sling', label: 'Polyester Bez Sapan (EN 1492)' },
    { id: 'overhead_crane', label: 'Köprülü Tavan Vinci (EN 15011)' },
    { id: 'manual_hoist', label: 'Caraskal / Hubzug (EN 13157)' },
    { id: 'shackle', label: 'Mapa / Kilit (EN 13889)' },
    { id: 'plate_clamp', label: 'Sac Kapma (EN 13155)' },
  ];

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-wider block">
            [Hesaplama 06] • İş Ekipmanları Yönetmeliği EK-III & Standartlar
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {locale === 'tr'
              ? 'Periyodik Kontrol Takvimi & Muayene Test Hesaplayıcı'
              : 'Periodic Inspection Schedule & Proof Load Calculator'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            İşletme risk sınıfına göre denetim sıklığı, statik/dinamik aşırı yük katsayıları ve kontrol listesi
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
            <span>Ekipman ve Kullanım Koşulları</span>
          </h3>

          {/* Equipment Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Ekipman Türü:</label>
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value as InspectionEquipmentType)}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-safety-500"
            >
              {equipmentOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duty Cycle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Kullanım Yoğunluğu / Ortam:</label>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'normal', title: 'Normal İşletme Şartları', desc: 'Haftada birkaç kez tek vardiya' },
                { id: 'heavy', title: 'Ağır Hizmet (Dökümhane/Şantiye)', desc: 'Sürekli çift/üç vardiya yüksek döngü' },
                { id: 'severe_corrosive', title: 'Aşındırıcı / Kimyasal / Offshore', desc: 'Asit, tuzlu sis veya aşırı sıcaklık' },
              ].map((dt) => (
                <button
                  key={dt.id}
                  type="button"
                  onClick={() => setDutyCycle(dt.id as DutyCycle)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all ${
                    dutyCycle === dt.id
                      ? 'bg-safety-500/10 text-white border-safety-500 shadow-sm'
                      : 'bg-[#131b2e] text-slate-400 border-[#23314d] hover:border-slate-500'
                  }`}
                >
                  <div className="font-bold">{dt.title}</div>
                  <div className="text-[10px] text-slate-400">{dt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Nominal WLL */}
          <div className="space-y-1.5 pt-2 border-t border-[#1f2c44]">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Nominal Ekipman WLL Değeri:</span>
              <span className="font-mono text-safety-400 font-bold">{wllTon} Ton</span>
            </label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={wllTon}
              onChange={(e) => setWllTon(Math.max(0.1, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-sm font-mono focus:outline-none focus:border-safety-500"
            />
          </div>
        </div>

        {/* Right Output & Schedule Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Inspection Interval Comparison Banner */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="bg-[#111827] p-3.5 rounded-xl border border-[#23314d]">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Yasal Azami Süre</span>
              <span className="text-lg font-bold text-white block">
                {result.legalPeriodicIntervalMonths} Ay <span className="text-xs font-normal text-slate-400">(1 Yıl)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-sans">Yönetmelik EK-III Tavanı</span>
            </div>

            <div className="bg-[#111827] p-3.5 rounded-xl border border-safety-500/40">
              <span className="text-[10px] text-safety-400 uppercase block font-bold">İşletme İçi Önerilen</span>
              <span className="text-lg font-bold text-safety-400 block">
                {result.recommendedIntervalMonths} Ayda Bir
              </span>
              <span className="text-[10px] text-emerald-400 font-sans">Risk Odaklı Muayene</span>
            </div>
          </div>

          {/* Proof Test Load Calculations */}
          <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center justify-between">
              <span>Aşırı Yük Testi Ağırlıkları (Proof Load Tests)</span>
              <span className="text-safety-400 font-normal">WLL = {wllTon} Ton</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#131b2e] p-3 rounded-lg border border-[#1f2c44]">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>Statik Yük Testi:</span>
                  <span className="font-bold text-safety-400">x{result.staticProofTestMultiplier}</span>
                </div>
                <div className="text-base font-bold text-white">
                  {staticTestWeightTon.toFixed(2)} Ton
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Havada 10-15 dk askıda tutma</div>
              </div>

              <div className="bg-[#131b2e] p-3 rounded-lg border border-[#1f2c44]">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>Dinamik Yük Testi:</span>
                  <span className="font-bold text-blue-400">x{result.dynamicTestMultiplier}</span>
                </div>
                <div className="text-base font-bold text-white">
                  {dynamicTestWeightTon.toFixed(2)} Ton
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tüm hareket limitlerinde test</div>
              </div>
            </div>
          </div>

          {/* Checklist of Defects to Inspect */}
          <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Zorunlu Periyodik Muayene Kontrol Maddeleri</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {result.keyInspectionChecklist[locale].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#131b2e] p-2 rounded-lg border border-[#1f2c44]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-safety-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
