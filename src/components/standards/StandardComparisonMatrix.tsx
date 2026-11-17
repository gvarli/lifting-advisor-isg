'use client';

import React, { useState } from 'react';
import { standardComparisonMatrixData } from '@/data/standards/comparisonMatrix';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  Scale,
  Compass,
  Calendar,
  Layers,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';

export const StandardComparisonMatrix: React.FC = () => {
  const { locale } = useTranslation();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    standardComparisonMatrixData[0].topicId
  );

  const currentTopic =
    standardComparisonMatrixData.find((t) => t.topicId === selectedTopicId) ||
    standardComparisonMatrixData[0];

  return (
    <div className="space-y-6">
      {/* Topic Switcher Pills */}
      <div className="bg-[#111827] p-3 rounded-xl border border-[#23314d]">
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
          {locale === 'tr' ? 'Karşılaştırma Konusu Seçin:' : 'Select Comparison Topic:'}
        </div>
        <div className="flex flex-wrap gap-2">
          {standardComparisonMatrixData.map((topic) => {
            const isSelected = topic.topicId === selectedTopicId;

            return (
              <button
                key={topic.topicId}
                onClick={() => setSelectedTopicId(topic.topicId)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-safety-500 text-black border-safety-400 shadow-md font-black'
                    : 'bg-[#131b2e] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
                }`}
              >
                {topic.topicTitle[locale]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Topic Header */}
      <div className="p-4 rounded-xl bg-[#111827] border border-[#23314d] flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-widest block">
            Çapraz Standart Analizi
          </span>
          <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
            {currentTopic.topicTitle[locale]}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {currentTopic.topicDescription[locale]}
          </p>
        </div>

        <div className="hidden sm:flex p-2.5 rounded-lg bg-safety-500/10 text-safety-400 border border-safety-500/20 shrink-0">
          <Scale className="h-6 w-6" />
        </div>
      </div>

      {/* 4-Column Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Column 1: Turkish Legislation */}
        <div className="bg-[#111827] rounded-xl border border-red-900/40 flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase font-mono">
                <span>🇹🇷</span> Türk Mevzuatı
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                Yasal Zorunlu
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {currentTopic.comparison.turkishRegulation.sourceRef}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {currentTopic.comparison.turkishRegulation.ruleText[locale]}
            </p>
          </div>
          <div className="p-2.5 bg-[#0e1422] border-t border-[#1f2c44] text-[10px] font-mono text-red-400 text-center font-bold">
            Türkiye Cumhuriyeti Resmi Gazete
          </div>
        </div>

        {/* Column 2: EN / ISO Norms */}
        <div className="bg-[#111827] rounded-xl border border-blue-900/40 flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 uppercase font-mono">
                <span>🇪🇺</span> EN / ISO Normları
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                Avrupa / TSE
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {currentTopic.comparison.enIso.sourceRef}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {currentTopic.comparison.enIso.ruleText[locale]}
            </p>
          </div>
          <div className="p-2.5 bg-[#0e1422] border-t border-[#1f2c44] text-[10px] font-mono text-blue-400 text-center font-bold">
            CEN / ISO Standartlar Komitesi
          </div>
        </div>

        {/* Column 3: ASME B30 (USA) */}
        <div className="bg-[#111827] rounded-xl border border-purple-900/40 flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 uppercase font-mono">
                <span>🇺🇸</span> ASME B30 (ABD)
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                ANSI / OSHA
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {currentTopic.comparison.asmeB30.sourceRef}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {currentTopic.comparison.asmeB30.ruleText[locale]}
            </p>
          </div>
          <div className="p-2.5 bg-[#0e1422] border-t border-[#1f2c44] text-[10px] font-mono text-purple-400 text-center font-bold">
            Amerikan Makine Mühendisleri Odası
          </div>
        </div>

        {/* Column 4: LOLER 1998 / LEEA (UK) */}
        <div className="bg-[#111827] rounded-xl border border-emerald-900/40 flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono">
                <span>🇬🇧</span> LOLER / LEEA
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                En İyi Uygulama
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {currentTopic.comparison.lolerLeea.sourceRef}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {currentTopic.comparison.lolerLeea.ruleText[locale]}
            </p>
          </div>
          <div className="p-2.5 bg-[#0e1422] border-t border-[#1f2c44] text-[10px] font-mono text-emerald-400 text-center font-bold">
            UK HSE & LEEA Uluslararası Standart
          </div>
        </div>
      </div>

      {/* Field Takeaway Golden Rule Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-safety-500/10 via-[#131b2e] to-[#111827] border border-safety-500/40 space-y-1.5">
        <div className="flex items-center gap-2 text-safety-400 text-xs font-bold uppercase tracking-wider font-mono">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Saha Mühendisi & İSG Pratiği Özeti (Altın Kural)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
          {currentTopic.fieldTakeaway[locale]}
        </p>
      </div>
    </div>
  );
};
