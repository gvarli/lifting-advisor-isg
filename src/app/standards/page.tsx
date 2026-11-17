'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  Scale,
  FileCheck,
  Tag,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { StandardComparisonMatrix } from '@/components/standards/StandardComparisonMatrix';
import { RegulationSearchAndScenarios } from '@/components/standards/RegulationSearchAndScenarios';
import { TaggingAndMarkingGuide } from '@/components/standards/TaggingAndMarkingGuide';

export default function StandardsPage() {
  const { locale, t } = useTranslation();
  const [activeMainTab, setActiveMainTab] = useState<'matrix' | 'regulations' | 'tagging'>('matrix');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#23314d] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Scale className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                [Modül 03] • Yasal Mevzuat & Standartlar
              </span>
              <span className="text-[10px] font-mono text-safety-400 bg-safety-500/10 px-2 py-0.5 rounded border border-safety-500/30">
                TR / EN / ISO / ASME / LOLER
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
              {t('nav.standards.title')}
            </h1>
            <p className="text-xs text-slate-300">
              {t('nav.standards.desc')}
            </p>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-300 bg-[#111827] px-3.5 py-2 rounded-xl border border-[#23314d]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>6331 & İş Ekipmanları Yön.</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-safety-400" />
            <span>ASME & LOLER Uyumlu</span>
          </div>
        </div>
      </div>

      {/* 3 Primary Navigation Section Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          onClick={() => setActiveMainTab('matrix')}
          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
            activeMainTab === 'matrix'
              ? 'bg-safety-500 text-black border-safety-400 shadow-md shadow-safety-500/10 font-bold'
              : 'bg-[#111827] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeMainTab === 'matrix' ? 'bg-black/20 text-black' : 'bg-[#1a253c] text-safety-400'}`}>
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold block leading-tight">
              {locale === 'tr' ? 'Standart Karşılaştırma Matrisi' : 'Standards Comparison Matrix'}
            </span>
            <span className={`text-[10px] font-mono ${activeMainTab === 'matrix' ? 'text-black/80 font-semibold' : 'text-slate-400'}`}>
              TR vs EN/ISO vs ASME vs LOLER
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveMainTab('regulations')}
          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
            activeMainTab === 'regulations'
              ? 'bg-safety-500 text-black border-safety-400 shadow-md shadow-safety-500/10 font-bold'
              : 'bg-[#111827] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeMainTab === 'regulations' ? 'bg-black/20 text-black' : 'bg-[#1a253c] text-red-400'}`}>
            <FileCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold block leading-tight">
              {locale === 'tr' ? 'Mevzuat Maddeleri & Senaryolar' : 'Legislation Articles & Scenarios'}
            </span>
            <span className={`text-[10px] font-mono ${activeMainTab === 'regulations' ? 'text-black/80 font-semibold' : 'text-slate-400'}`}>
              6331, EK-II, EK-III Tablo 2, CE
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveMainTab('tagging')}
          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
            activeMainTab === 'tagging'
              ? 'bg-safety-500 text-black border-safety-400 shadow-md shadow-safety-500/10 font-bold'
              : 'bg-[#111827] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeMainTab === 'tagging' ? 'bg-black/20 text-black' : 'bg-[#1a253c] text-blue-400'}`}>
            <Tag className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold block leading-tight">
              {locale === 'tr' ? 'Zorunlu Etiketleme Rehberi' : 'Mandatory Tagging & Marking'}
            </span>
            <span className={`text-[10px] font-mono ${activeMainTab === 'tagging' ? 'text-black/80 font-semibold' : 'text-slate-400'}`}>
              Görsel Etiket Şemaları & Yasaklar
            </span>
          </div>
        </button>
      </div>

      {/* Render Active Section */}
      <div className="pt-2">
        {activeMainTab === 'matrix' && <StandardComparisonMatrix />}
        {activeMainTab === 'regulations' && <RegulationSearchAndScenarios />}
        {activeMainTab === 'tagging' && <TaggingAndMarkingGuide />}
      </div>
    </div>
  );
}
