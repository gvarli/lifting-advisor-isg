'use client';

import React, { useState } from 'react';
import { equipmentTaggingSpecsData } from '@/data/standards/taggingGuide';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  FileCheck,
  AlertOctagon,
  CheckCircle2,
  Tag,
  ShieldAlert,
  Info,
} from 'lucide-react';

export const TaggingAndMarkingGuide: React.FC = () => {
  const { locale } = useTranslation();
  const [selectedTagId, setSelectedTagId] = useState<string>(
    equipmentTaggingSpecsData[0].id
  );

  const currentTag =
    equipmentTaggingSpecsData.find((t) => t.id === selectedTagId) ||
    equipmentTaggingSpecsData[0];

  return (
    <div className="space-y-6">
      {/* Equipment Tag Switcher */}
      <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d]">
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
          {locale === 'tr' ? 'Ekipman Etiket Şeması Seçin:' : 'Select Tag Specification:'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {equipmentTaggingSpecsData.map((tag) => {
            const isSelected = tag.id === selectedTagId;

            return (
              <button
                key={tag.id}
                onClick={() => setSelectedTagId(tag.id)}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all border text-left ${
                  isSelected
                    ? 'bg-safety-500 text-black border-safety-400 shadow-sm font-black'
                    : 'bg-[#131b2e] text-slate-300 border-[#23314d] hover:border-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono opacity-80 mb-0.5">
                  {tag.equipmentCategory.toUpperCase()}
                </div>
                <div className="line-clamp-1">{tag.title[locale]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header Info */}
      <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-widest block">
            Yasal Markalama & İzlenebilirlik Rehberi
          </span>
          <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
            {currentTag.title[locale]}
          </h2>
          <span className="text-xs font-mono text-emerald-400">
            {currentTag.standardReference}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-safety-500/10 text-safety-400 border border-safety-500/20 shrink-0 self-start sm:self-center">
          <Tag className="h-6 w-6" />
        </div>
      </div>

      {/* Visual Render of the Tag / Markings */}
      <div className="bg-[#0b0f19] p-5 rounded-2xl border border-[#23314d] flex flex-col items-center justify-center">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
          Standartlaştırılmış Etiket / Künye Görseli
        </span>

        {/* Dynamic Tag Visual rendering based on equipment category */}
        {currentTag.equipmentCategory === 'textile_sling' && (
          /* Blue Polyester Webbing Tag */
          <div className="w-full max-w-md bg-blue-600 rounded-lg p-4 text-white shadow-xl border-2 border-blue-400 font-mono text-xs space-y-2 select-none">
            <div className="flex items-center justify-between border-b border-blue-400/60 pb-1.5 font-bold">
              <span>CE 2026-TR</span>
              <span className="text-[11px] bg-black/30 px-1.5 py-0.5 rounded">PES 100%</span>
              <span>EN 1492-1</span>
            </div>
            <div className="text-center py-2 bg-blue-700/80 rounded border border-blue-400/40">
              <span className="text-[10px] text-blue-200 block">ÇALIŞMA YÜK SINIRI / WLL</span>
              <span className="text-xl font-black text-white block">WLL: 3.0 TON</span>
              <span className="text-[10px] text-blue-100">Düz: 3.0t | Boğma: 2.4t | Sepet: 6.0t</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
              <div>Üretici: XYZ SLING SAN. A.Ş.</div>
              <div className="text-right">SF: 7:1 (Emniyet)</div>
              <div>Seri No: PES-2026-8841</div>
              <div className="text-right">Boy: 3.0 m / Gen: 90 mm</div>
            </div>
          </div>
        )}

        {currentTag.equipmentCategory === 'chain_sling' && (
          /* Octagonal Grade 80 Tag */
          <div className="w-64 h-64 bg-slate-800 border-4 border-amber-500 text-white flex flex-col items-center justify-center p-4 text-center font-mono text-xs shadow-2xl relative select-none rounded-[40px]">
            <div className="text-[10px] font-bold text-safety-400 uppercase">GRADE 80 / EN 818-4</div>
            <div className="text-2xl font-black text-white my-1">G80</div>
            <div className="border-t border-b border-slate-600 py-1.5 w-full my-1">
              <div className="text-[11px] font-bold text-safety-400">0°-45°: 6.7 TON</div>
              <div className="text-[10px] text-slate-300">45°-60°: 4.75 TON</div>
            </div>
            <div className="text-[10px] text-slate-300">Ø 10 mm - 2 Kollu</div>
            <div className="text-[9px] text-slate-400 mt-1">CE / XYZ CHAIN / S/N: 9941</div>
          </div>
        )}

        {currentTag.equipmentCategory === 'wire_rope_sling' && (
          /* Aluminum Ferrule Swage Tag */
          <div className="w-full max-w-sm bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 text-slate-900 rounded-xl p-4 shadow-xl border border-slate-200 font-mono text-xs space-y-1.5 font-bold select-none text-center">
            <div className="text-[10px] uppercase text-slate-700">EN 13414-1 PRES BASKILI MARKALAMA</div>
            <div className="text-lg font-black text-black">WLL: 5.2 TON</div>
            <div className="text-xs text-slate-800">Ø 22 mm - 6x36 WS IWRC</div>
            <div className="text-[10px] text-slate-700">CE / S/N: 2026-WRS-102 / SF 5:1</div>
          </div>
        )}

        {currentTag.equipmentCategory === 'shackle' && (
          /* Forged Shackle Relief */
          <div className="w-full max-w-sm bg-[#1e293b] rounded-xl p-4 border-2 border-slate-600 text-white font-mono text-center space-y-2 select-none shadow-xl">
            <div className="text-[10px] text-safety-400 font-bold uppercase">EN 13889 DÖVME KABARTMA İŞARET</div>
            <div className="text-2xl font-black text-safety-400 tracking-wider">W.L.L. 8.5 T</div>
            <div className="text-sm font-bold text-slate-200">1" - GRADE 6 - CE</div>
            <div className="text-[10px] text-slate-400">Üretici: XYZ / Parti (Batch): 44A</div>
          </div>
        )}

        <p className="mt-4 text-xs text-slate-400 max-w-lg text-center font-medium">
          {currentTag.shapeOrColorSpec[locale]}
        </p>
      </div>

      {/* Mandatory Fields Table */}
      <div className="bg-[#111827] rounded-xl border border-[#23314d] p-4 sm:p-5 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-safety-500" />
          <span>Yasal Olarak Bulunması Zorunlu Bilgiler (Kanuni Şartlar)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#18233c] text-slate-300 uppercase">
              <tr>
                <th className="p-3">Zorunlu Alan</th>
                <th className="p-3">Örnek Değer</th>
                <th className="p-3">Hukuki / Mühendislik Gerekçesi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2c44]">
              {currentTag.mandatoryFields.map((field, i) => (
                <tr key={i} className="text-slate-200">
                  <td className="p-3 font-bold text-white flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-safety-500" />
                    <span>{field.fieldName}</span>
                  </td>
                  <td className="p-3 font-bold text-safety-400">{field.exampleValue}</td>
                  <td className="p-3 text-slate-300 text-[11px]">{field.explanation[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strict Forbidden Practices */}
      <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-2.5">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider font-mono">
          <AlertOctagon className="h-4 w-4 shrink-0" />
          <span>Saha Etiketleme İhlalleri ve Yasaklı Uygulamalar</span>
        </div>
        <ul className="space-y-1.5 text-xs text-red-200">
          {currentTag.forbiddenPractices[locale].map((p, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
