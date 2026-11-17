'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LiftingEquipmentItem } from '@/data/equipment/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  X,
  BookOpen,
  CheckCircle2,
  AlertOctagon,
  Wrench,
  Archive,
  AlertTriangle,
  Trash2,
  Thermometer,
  ShieldAlert,
  FileCheck,
  ChevronRight,
  Info,
  Calculator,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface EquipmentDetailModalProps {
  item: LiftingEquipmentItem | null;
  onClose: () => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  item,
  onClose,
}) => {
  const router = useRouter();
  const { locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(1);

  if (!item) return null;

  const handleNavigateToCalculator = () => {
    onClose();
    const query = new URLSearchParams({
      equipment: item.name[locale],
      category: item.groupId,
      sf: String(item.safetyFactor),
    });
    router.push(`/calculator?${query.toString()}`);
  };

  const handleNavigateToAi = () => {
    onClose();
    const query = new URLSearchParams({
      context: item.name[locale],
      category: item.groupId,
      sf: String(item.safetyFactor),
    });
    router.push(`/ai-consultant?${query.toString()}`);
  };

  const sections = [
    { id: 1, title: locale === 'tr' ? '1. Tanım & Teknik' : '1. Specs & Design', icon: BookOpen },
    { id: 2, title: locale === 'tr' ? '2. Seçim Kriterleri' : '2. Selection & Env', icon: Thermometer },
    { id: 3, title: locale === 'tr' ? '3. Güvenli Kullanım' : '3. Safe Rigging', icon: CheckCircle2 },
    { id: 4, title: locale === 'tr' ? '4. Bakım & Yağlama' : '4. Maintenance', icon: Wrench },
    { id: 5, title: locale === 'tr' ? '5. Muhafaza & Depo' : '5. Storage', icon: Archive },
    { id: 6, title: locale === 'tr' ? '6. Hatalar & Riskler' : '6. Field Risks', icon: AlertTriangle },
    { id: 7, title: locale === 'tr' ? '7. Iskarta Kriterleri' : '7. Discard Rules', icon: Trash2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0b0f19] border border-[#23314d] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#23314d] bg-[#111827] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-safety-500 text-black">
                {item.code}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {item.groupName[locale]}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a253c] text-safety-400 border border-[#293853]">
                SF {item.safetyFactor}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {item.name[locale]}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1a253c] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 7 Section Tab Navigation Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto p-2 bg-[#0e1526] border-b border-[#23314d] scrollbar-none text-xs">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-safety-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#152037]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* TAB 1: Tanım ve Teknik Özellikler */}
          {activeTab === 1 && (
            <div className="space-y-5 animate-in fade-in duration-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#23314d]">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Yapı & Malzeme</span>
                  <span className="font-bold text-white text-xs sm:text-sm">{item.technicalSpecs.construction}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#23314d]">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Emniyet Katsayısı (SF)</span>
                  <span className="font-bold text-safety-400 font-mono text-sm">{item.safetyFactor}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#23314d]">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Standart Uyumluluk</span>
                  <span className="font-bold text-emerald-400 font-mono text-xs sm:text-sm">{item.standards.join(', ')}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Info className="h-4 w-4 text-safety-500" />
                  <span>Temel Mühendislik ve Tasarım Özellikleri</span>
                </h3>
                <ul className="space-y-2">
                  {item.technicalSpecs.summaryPoints[locale].map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-safety-500 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Doğru Seçim Kriterleri */}
          {activeTab === 2 && (
            <div className="space-y-5 animate-in fade-in duration-100">
              {/* Temperature De-Rating Table */}
              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-amber-400" />
                  <span>Sıcaklık Dayanımı ve Kapasite Düşüm (De-Rating) Tablosu</span>
                </h3>
                {item.selectionCriteria.environment.tempDeRating ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#18233c] text-slate-300 uppercase">
                        <tr>
                          <th className="p-2.5">Sıcaklık Aralığı</th>
                          <th className="p-2.5">Kapasite Çarpanı</th>
                          <th className="p-2.5">Mühendislik Notu</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1f2c44]">
                        {item.selectionCriteria.environment.tempDeRating.map((row, idx) => (
                          <tr key={idx} className={row.capacityMultiplier === 0 ? 'bg-red-950/20 text-red-300' : 'text-slate-300'}>
                            <td className="p-2.5 font-bold">{row.tempRange}</td>
                            <td className="p-2.5 font-bold text-safety-400">x{row.capacityMultiplier.toFixed(2)}</td>
                            <td className="p-2.5">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Standart çalışma sıcaklığı: {item.selectionCriteria.environment.minTempC}°C ile {item.selectionCriteria.environment.maxTempC}°C arasındadır.
                  </p>
                )}
              </div>

              {/* Chemical & Sharp Edge Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                  <h4 className="font-bold text-xs uppercase text-slate-300 tracking-wider">Kimyasal Dayanım Matrisi</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-[#131b2e] p-2 rounded">
                      <span className="text-slate-400 block text-[10px]">Asitler:</span>
                      <span className="font-bold uppercase text-white">{item.selectionCriteria.environment.chemicalResistance.acids}</span>
                    </div>
                    <div className="bg-[#131b2e] p-2 rounded">
                      <span className="text-slate-400 block text-[10px]">Alkaliler:</span>
                      <span className="font-bold uppercase text-white">{item.selectionCriteria.environment.chemicalResistance.alkalis}</span>
                    </div>
                    <div className="bg-[#131b2e] p-2 rounded">
                      <span className="text-slate-400 block text-[10px]">Solventler:</span>
                      <span className="font-bold uppercase text-white">{item.selectionCriteria.environment.chemicalResistance.solvents}</span>
                    </div>
                    <div className="bg-[#131b2e] p-2 rounded">
                      <span className="text-slate-400 block text-[10px]">Deniz Suyu:</span>
                      <span className="font-bold uppercase text-white">{item.selectionCriteria.environment.chemicalResistance.salineWater}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                  <h4 className="font-bold text-xs uppercase text-slate-300 tracking-wider">Mekanik Hassasiyetler</h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between p-2 rounded bg-[#131b2e]">
                      <span className="text-slate-400">Keskin Kenar Duyarlılığı:</span>
                      <span className="font-bold uppercase text-safety-400">{item.selectionCriteria.environment.sharpEdgeSensitivity}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[#131b2e]">
                      <span className="text-slate-400">Güneş UV Işığı Duyarlılığı:</span>
                      <span className="font-bold uppercase text-white">{item.selectionCriteria.environment.uvSensitivity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller & Engineer Guidance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                    Satıcı & Tedarikçi İçin Seçim İpuçları
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.selectionCriteria.selectionTipsForSellers[locale].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Mühendis & İSG Uzmanı İçin Boyutlandırma Rehberi
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.selectionCriteria.selectionTipsForEngineers[locale].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Güvenli Kullanım Kuralları */}
          {activeTab === 3 && (
            <div className="space-y-5 animate-in fade-in duration-100">
              {/* Pre-use Checks */}
              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Kullanım Öncesi (Pre-use) Kontrol Adımları</span>
                </h3>
                <ul className="space-y-2">
                  {item.safeOperation.preUseChecks[locale].map((chk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-[#131b2e] p-2.5 rounded-lg border border-[#1f2c44]">
                      <span className="font-mono text-emerald-400 font-bold shrink-0">[0{i+1}]</span>
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hitching Modes Table */}
              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                <h3 className="font-bold text-white text-sm">Bağlama Şekilleri & Kapasite Çarpanları (Mode Factors)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#18233c] text-slate-300">
                      <tr>
                        <th className="p-2.5">Bağlama Modu</th>
                        <th className="p-2.5">Çarpan</th>
                        <th className="p-2.5">Geometrik Not</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2c44]">
                      {item.safeOperation.hitchingModes.map((hm, i) => (
                        <tr key={i} className="text-slate-300">
                          <td className="p-2.5 font-bold">{hm.mode}</td>
                          <td className="p-2.5 font-bold text-safety-400">x{hm.modeMultiplier.toFixed(2)}</td>
                          <td className="p-2.5">{hm.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Prohibited Uses */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-3">
                <h3 className="font-bold text-red-400 text-sm flex items-center gap-2">
                  <AlertOctagon className="h-4 w-4 text-red-400" />
                  <span>Kesinlikle Yasaklı Kullanım Şekilleri</span>
                </h3>
                <ul className="space-y-1.5">
                  {item.safeOperation.prohibitedUses[locale].map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-200">
                      <span className="text-red-400 font-bold">✕</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: Bakım ve Yağlama */}
          {activeTab === 4 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Temizlik Yöntemi</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{item.maintenance.cleaning[locale]}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Yağlama Periyodu</span>
                  <p className="text-xs text-safety-400 font-bold">{item.maintenance.lubricationInterval[locale]}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Uygun Yağlama Tipi</span>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">{item.maintenance.lubricantType[locale]}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Hareketli Parça Muayene Noktaları</span>
                <ul className="space-y-1.5">
                  {item.maintenance.movingPartsInspection[locale].map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-safety-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 5: Muhafaza ve Depolama */}
          {activeTab === 5 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Archive className="h-4 w-4 text-safety-400" />
                  <span>Saha Depolama & Askı Standartları</span>
                </h3>
                <ul className="space-y-2">
                  {item.storage.guidelines[locale].map((g, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-safety-500 mt-1.5 shrink-0" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase block">Ortamsal Tehlikeler</span>
                <div className="flex flex-wrap gap-2">
                  {item.storage.environmentalHazards[locale].map((h, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-black/40 text-amber-200 text-xs border border-amber-800/40">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Öngörülebilecek Hatalar ve Riskler */}
          {activeTab === 6 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="space-y-3">
                {item.commonFailures.map((fail, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-red-400 uppercase">
                        Saha Hatası [0{i + 1}]
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                        {fail.severity.toUpperCase()} RİSK
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {fail.fieldError[locale]}
                    </h4>
                    <div className="p-2.5 rounded bg-red-950/20 border border-red-900/30 text-xs text-red-200">
                      <strong>Doğuracağı Kaza / Sonuç:</strong> {fail.consequence[locale]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Hurdaya Ayırma (Discard) Kriterleri */}
          {activeTab === 7 && (
            <div className="space-y-5 animate-in fade-in duration-100">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-3">
                <h3 className="font-bold text-red-400 text-sm flex items-center gap-2">
                  <AlertOctagon className="h-4 w-4 text-red-400" />
                  <span>Derhal Hurdaya Ayırma / Kullanım Dışı Bırakma Kriterleri</span>
                </h3>
                <ul className="space-y-2">
                  {item.discardCriteria.physicalDefects[locale].map((def, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-red-200 bg-black/40 p-2.5 rounded border border-red-900/40">
                      <span className="font-mono text-red-400 font-bold shrink-0">✕</span>
                      <span>{def}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#111827] border border-[#23314d] space-y-1.5">
                  <span className="font-mono text-slate-400 uppercase font-bold text-[10px]">Aşınma Tolerans Sınırı</span>
                  <p className="text-white font-medium">{item.discardCriteria.wearLimits[locale]}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#111827] border border-[#23314d] space-y-1.5">
                  <span className="font-mono text-slate-400 uppercase font-bold text-[10px]">Deformasyon / Uzama Sınırı</span>
                  <p className="text-white font-medium">{item.discardCriteria.deformationLimits[locale]}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] space-y-2">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase block">Önleyici İSG Tedbirleri</span>
                <ul className="space-y-1.5">
                  {item.discardCriteria.preventiveMeasures[locale].map((meas, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{meas}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Cross-Module Navigation */}
        <div className="p-4 border-t border-[#23314d] bg-[#111827] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleNavigateToCalculator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold transition-colors"
              title={locale === 'tr' ? 'Bu ekipman verileriyle hesaplama motoruna geç' : 'Calculate with this equipment'}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>{locale === 'tr' ? 'Bu Ekipman İçin Açı/Yük Hesapla' : 'Calculate Rigging Tension'}</span>
            </button>

            <button
              onClick={handleNavigateToAi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold transition-colors"
              title={locale === 'tr' ? 'Bu ekipmanı AI danışmanına sor' : 'Ask AI about this equipment'}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{locale === 'tr' ? 'Bu Ekipmanı AI\'ya Sor' : 'Consult AI Advisor'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="font-mono hidden sm:inline">
              {activeTab} / {sections.length} • {sections[activeTab - 1].title}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-safety-500 text-black font-bold hover:bg-safety-400 transition-colors"
            >
              {locale === 'tr' ? 'Pencereyi Kapat' : 'Close Window'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
