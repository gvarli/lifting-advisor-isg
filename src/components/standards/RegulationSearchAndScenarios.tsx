'use client';

import React, { useState, useMemo } from 'react';
import { turkishRegulationsData } from '@/data/standards/turkishRegulations';
import { legalScenariosData } from '@/data/standards/scenarios';
import { LegalArticle, ScenarioFilter } from '@/data/standards/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  Search,
  X,
  FileText,
  AlertOctagon,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Gavel,
} from 'lucide-react';

export const RegulationSearchAndScenarios: React.FC = () => {
  const { locale } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  // Active scenario details
  const activeScenario = useMemo(() => {
    return legalScenariosData.find((s) => s.id === activeScenarioId) || null;
  }, [activeScenarioId]);

  // Filtered Articles based on search or active scenario
  const filteredArticles = useMemo(() => {
    if (activeScenario) {
      return turkishRegulationsData.filter((art) =>
        activeScenario.relevantArticleIds.includes(art.id)
      );
    }

    if (!searchQuery.trim()) return turkishRegulationsData;

    const q = searchQuery.toLowerCase().trim();
    return turkishRegulationsData.filter((art) => {
      const title = art.title[locale].toLowerCase();
      const summary = art.summary[locale].toLowerCase();
      const source = art.sourceLaw.toLowerCase();
      const artNum = art.articleNumber.toLowerCase();

      return title.includes(q) || summary.includes(q) || source.includes(q) || artNum.includes(q);
    });
  }, [searchQuery, activeScenario, locale]);

  const toggleExpand = (id: string) => {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* 1-Click Scenario Filters */}
      <div className="bg-[#111827] p-4 rounded-xl border border-[#23314d] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-safety-400" />
            <h3 className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider">
              {locale === 'tr' ? 'Hızlı Saha Senaryosu Filtreleri' : 'Quick Field Scenarios'}
            </h3>
          </div>
          {activeScenarioId && (
            <button
              onClick={() => setActiveScenarioId(null)}
              className="text-[11px] font-mono text-safety-400 hover:underline"
            >
              {locale === 'tr' ? 'Senaryoyu Temizle' : 'Clear Scenario'}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {legalScenariosData.map((scenario) => {
            const isActive = activeScenarioId === scenario.id;

            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setSearchQuery('');
                  setActiveScenarioId(isActive ? null : scenario.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isActive
                    ? 'bg-safety-500 text-black border-safety-400 font-bold shadow-sm'
                    : 'bg-[#131b2e] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
                }`}
              >
                {scenario.title[locale]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Scenario Checklist Box */}
      {activeScenario && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-[#131b2e] to-[#111827] border border-blue-500/50 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>📋</span> {activeScenario.title[locale]} - Saha İcra Kontrol Listesi
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Uygulama Rehberi
            </span>
          </div>

          <ul className="space-y-2">
            {activeScenario.recommendedChecklist[locale].map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-safety-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Free Text Search Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setActiveScenarioId(null);
            setSearchQuery(e.target.value);
          }}
          placeholder={
            locale === 'tr'
              ? 'Kanun veya yönetmelik maddesi ara (Örn: Madde 13, EK-III Tablo 2, CE işareti, 6331)...'
              : 'Search articles (e.g. Article 13, Annex-III, CE marking, 6331)...'
          }
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#111827] border border-[#23314d] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-safety-500 font-mono transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((article) => {
          const isExpanded = expandedArticleId === article.id;

          return (
            <div
              key={article.id}
              className="bg-[#111827] rounded-xl border border-[#23314d] overflow-hidden hover:border-slate-500 transition-colors"
            >
              <div
                onClick={() => toggleExpand(article.id)}
                className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800">
                      {article.sourceLaw}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1a253c] text-safety-400 border border-[#293853]">
                      {article.articleNumber}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {article.title[locale]}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {article.summary[locale]}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-[#131b2e] text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              {/* Expandable Legal Details */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 border-t border-[#1f2c44] bg-[#0d1322] space-y-4 text-xs">
                  {/* Full Legal Text */}
                  <div className="p-3.5 rounded-lg bg-[#111827] border border-[#23314d] space-y-1.5 mt-4">
                    <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
                      Resmi Mevzuat Hüküm Metni
                    </span>
                    <p className="text-slate-200 leading-relaxed font-serif italic text-xs sm:text-sm">
                      "{article.fullText[locale]}"
                    </p>
                  </div>

                  {/* Key Enforcement Points */}
                  <div className="space-y-2">
                    <span className="font-mono text-safety-400 uppercase font-bold text-[10px] block">
                      Saha İSG Denetim ve Uygulama Maddeleri
                    </span>
                    <ul className="space-y-1.5">
                      {article.keyEnforcementPoints[locale].map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-safety-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Legal Penalties / Liability */}
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 text-red-200 flex items-start gap-2.5">
                    <Gavel className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-red-300 font-bold mb-0.5">
                        Cezai Yaptırımlar ve Hukuki Sorumluluk
                      </strong>
                      <span>{article.penaltiesOrLegalImplications[locale]}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
