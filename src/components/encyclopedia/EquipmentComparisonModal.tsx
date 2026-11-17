'use client';

import React from 'react';
import { LiftingEquipmentItem } from '@/data/equipment/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { X, Scale, Trash2, CheckCircle2 } from 'lucide-react';

interface EquipmentComparisonModalProps {
  items: LiftingEquipmentItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const EquipmentComparisonModal: React.FC<EquipmentComparisonModalProps> = ({
  items,
  onClose,
  onRemoveItem,
  onClearAll,
}) => {
  const { locale } = useTranslation();

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0b0f19] border border-[#23314d] rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#23314d] bg-[#111827] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-safety-500/10 text-safety-400">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                {locale === 'tr' ? 'Ekipman Karşılaştırma Matrisi' : 'Equipment Comparison Matrix'}
              </h2>
              <span className="text-xs text-slate-400">
                {items.length} {locale === 'tr' ? 'ekipman karşılaştırılıyor' : 'items selected'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-lg border border-red-900/60 bg-red-950/40 text-red-300 hover:bg-red-900/60 text-xs font-mono transition-colors"
            >
              {locale === 'tr' ? 'Tümünü Temizle' : 'Clear All'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1a253c] text-slate-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Comparison Grid */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#23314d]">
                <th className="p-3 text-slate-400 uppercase w-48 bg-[#0e1526]">Özellik / Kriter</th>
                {items.map((item) => (
                  <th key={item.id} className="p-3 bg-[#111827] border-l border-[#23314d] align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-safety-400 block">{item.code}</span>
                        <span className="text-sm font-bold text-white block mt-0.5">{item.name[locale]}</span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="Kaldır"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2c44]">
              {/* Row 1: Emniyet Katsayısı */}
              <tr>
                <td className="p-3 font-bold text-slate-300 bg-[#0e1526]">Emniyet Katsayısı (SF)</td>
                {items.map((it) => (
                  <td key={it.id} className="p-3 border-l border-[#23314d] font-bold text-safety-400">
                    {it.safetyFactor}
                  </td>
                ))}
              </tr>

              {/* Row 2: WLL Aralığı */}
              <tr>
                <td className="p-3 font-bold text-slate-300 bg-[#0e1526]">WLL Kapasite Aralığı</td>
                {items.map((it) => (
                  <td key={it.id} className="p-3 border-l border-[#23314d] text-white">
                    {it.wllRange}
                  </td>
                ))}
              </tr>

              {/* Row 3: Sıcaklık Limiti */}
              <tr>
                <td className="p-3 font-bold text-slate-300 bg-[#0e1526]">Sıcaklık Limitleri</td>
                {items.map((it) => (
                  <td key={it.id} className="p-3 border-l border-[#23314d] text-slate-200">
                    {it.selectionCriteria.environment.minTempC}°C ile {it.selectionCriteria.environment.maxTempC}°C
                  </td>
                ))}
              </tr>

              {/* Row 4: Keskin Kenar Hassasiyeti */}
              <tr>
                <td className="p-3 font-bold text-slate-300 bg-[#0e1526]">Keskin Kenar Duyarlılığı</td>
                {items.map((it) => (
                  <td key={it.id} className="p-3 border-l border-[#23314d] font-bold uppercase text-safety-400">
                    {it.selectionCriteria.environment.sharpEdgeSensitivity}
                  </td>
                ))}
              </tr>

              {/* Row 5: Asit & Alkali Direnci */}
              <tr>
                <td className="p-3 font-bold text-slate-300 bg-[#0e1526]">Asit / Alkali Direnci</td>
                {items.map((it) => (
                  <td key={it.id} className="p-3 border-l border-[#23314d] text-slate-300">
                    Asit: <span className="text-white font-bold">{it.selectionCriteria.environment.chemicalResistance.acids}</span> / Alkali: <span className="text-white font-bold">{it.selectionCriteria.environment.chemicalResistance.alkalis}</span>
                  </td>
                ))}
              </tr>

              {/* Row 6: Standartlar */}
              <tr>
                <td className="p-3 font-bold text-slate-300 bg-[#0e1526]">İlgili Standartlar</td>
                {items.map((it) => (
                  <td key={it.id} className="p-3 border-l border-[#23314d] text-emerald-400 font-bold">
                    {it.standards.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Row 7: Ana Iskarta Kriteri */}
              <tr>
                <td className="p-3 font-bold text-slate-300 bg-[#0e1526]">Kritik Iskarta Kuralı</td>
                {items.map((it) => (
                  <td key={it.id} className="p-3 border-l border-[#23314d] text-slate-300 text-[11px] leading-relaxed">
                    {it.discardCriteria.physicalDefects[locale][0]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#23314d] bg-[#111827] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-safety-500 text-black font-bold text-xs hover:bg-safety-400 transition-colors"
          >
            {locale === 'tr' ? 'Kapat' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
