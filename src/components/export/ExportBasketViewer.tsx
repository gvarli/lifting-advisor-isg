'use client';

import React, { useState } from 'react';
import { ExportSessionItem } from '@/lib/export/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  Layers,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calculator,
  Eye,
  BookOpen,
} from 'lucide-react';

interface Props {
  items: ExportSessionItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onLoadDemo: () => void;
}

export function ExportBasketViewer({
  items,
  onRemoveItem,
  onClearAll,
  onLoadDemo,
}: Props) {
  const { locale } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getStatusBadge = (status: ExportSessionItem['safetyStatus']) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/60 border border-red-700/60 text-red-400 text-[11px] font-bold">
            <XCircle className="h-3 w-3" />
            {locale === 'tr' ? 'KRİTİK RED' : 'CRITICAL RED'}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-700/60 text-amber-400 text-[11px] font-bold">
            <AlertTriangle className="h-3 w-3" />
            {locale === 'tr' ? 'UYARI / ŞARTLI' : 'WARNING / COND.'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 text-[11px] font-bold">
            <CheckCircle2 className="h-3 w-3" />
            {locale === 'tr' ? 'UYGUN / GÜVENLİ' : 'SAFE / COMPLIANT'}
          </span>
        );
    }
  };

  const getTypeIcon = (type: ExportSessionItem['type']) => {
    switch (type) {
      case 'ai_audit':
        return <Eye className="h-4 w-4 text-purple-400" />;
      case 'equipment_spec':
        return <BookOpen className="h-4 w-4 text-cyan-400" />;
      default:
        return <Calculator className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-[#23314d] bg-[#111827] p-5 shadow-lg">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23314d] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {locale === 'tr' ? 'Oturum Çıktı Sepeti' : 'Session Export Basket'}
          </h2>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-cyan-300 font-bold">
            {items.length} {locale === 'tr' ? 'Kayıt' : 'Items'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {items.length === 0 && (
            <button
              onClick={onLoadDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {locale === 'tr' ? 'Örnek Test Verisi Yükle' : 'Load Demo Sample'}
            </button>
          )}

          {items.length > 0 && (
            <button
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-800/40 text-xs font-semibold transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {locale === 'tr' ? 'Sepeti Temizle' : 'Clear Basket'}
            </button>
          )}
        </div>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-lg border border-dashed border-[#23314d] bg-[#0a0f1d]">
          <Layers className="h-10 w-10 text-slate-500 mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-bold text-slate-300 mb-1">
            {locale === 'tr' ? 'Oturum Sepetiniz Henüz Boş' : 'Your Export Basket is Empty'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            {locale === 'tr'
              ? 'Hesaplama Motoru veya AI Danışmanı modüllerinde yapılan analizler anında bu sepete aktarılır. Rapor şablonunu hemen test etmek için örnek veri yükleyebilirsiniz.'
              : 'Analyses performed in Calculation Engine or AI Consultant are automatically collected here. You can load demo items to preview the report.'}
          </p>
          <button
            onClick={onLoadDemo}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-xs transition-colors shadow-md"
          >
            <Sparkles className="h-4 w-4" />
            {locale === 'tr' ? 'Örnek Mühendislik Hesapları Yükle' : 'Load Demo Calculations'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-lg border border-[#23314d] bg-[#0d1322] hover:border-slate-600 transition-colors overflow-hidden"
              >
                {/* Item Card Header */}
                <div
                  className="p-3.5 flex flex-wrap items-center justify-between gap-2 cursor-pointer select-none"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded bg-[#1e293b] border border-slate-700">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          #{idx + 1} • {item.moduleName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(item.timestamp).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.safetyStatus)}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      className="p-1.5 rounded hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors"
                      title={locale === 'tr' ? 'Kaldır' : 'Remove'}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-[#1e293b] p-3.5 bg-[#0a0f1d] space-y-3 text-xs">
                    <div className="bg-[#111827] border-l-2 border-amber-400 p-2.5 rounded-r text-slate-300">
                      <span className="font-semibold text-amber-300">
                        {locale === 'tr' ? 'Değerlendirme: ' : 'Summary: '}
                      </span>
                      {item.summary}
                    </div>

                    {item.details && Object.keys(item.details).length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(item.details).map(([k, v]) => (
                          <div
                            key={k}
                            className="bg-[#111827] border border-[#1e293b] p-2 rounded"
                          >
                            <span className="text-[10px] font-medium text-slate-400 block uppercase">
                              {k}
                            </span>
                            <span className="font-mono text-xs font-semibold text-white break-words">
                              {typeof v === 'object' && v !== null
                                ? JSON.stringify(v)
                                : String(v)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
