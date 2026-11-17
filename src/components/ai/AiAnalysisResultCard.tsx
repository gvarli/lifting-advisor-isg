'use client';

import React, { useState } from 'react';
import { AiAnalysisResponse } from '@/types/ai';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  BookmarkPlus,
  ShieldAlert,
  FileCheck,
  Compass,
  LineChart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface AiAnalysisResultCardProps {
  result: AiAnalysisResponse;
}

export const AiAnalysisResultCard: React.FC<AiAnalysisResultCardProps> = ({ result }) => {
  const { locale } = useTranslation();
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const handleSaveToSession = async () => {
    const record = {
      id: `ai-audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'ai_audit',
      title: result.summaryTitle,
      moduleName: `AI Danışman (${result.taskMode})`,
      safetyStatus:
        result.overallRisk === 'CRITICAL'
          ? 'critical'
          : result.overallRisk === 'HIGH'
          ? 'warning'
          : 'safe',
      summary: result.primaryObservations[0] || result.summaryTitle,
      details: {
        'Görev Modu': result.taskMode,
        'Nihai Karar': result.verdict,
        'Risk Seviyesi': result.overallRisk,
        'Standartlar': (result.citedStandards || []).join(', '),
        'Kritik Gözlem': result.primaryObservations.join(' | '),
        'Önerilen Eylem': result.recommendedActionPlan.slice(0, 2).join(' | '),
      },
    };

    const existing = (await offlineStore.getItem<any[]>('session_calculations')) || [];
    await offlineStore.setItem('session_calculations', [record, ...existing]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Verdict Styling
  let verdictColorClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-300';
  let verdictText = locale === 'tr' ? '[KULLANIMA UYGUN]' : '[SUITABLE FOR SERVICE]';

  if (result.verdict === 'SCRAP_IMMEDIATE') {
    verdictColorClass = 'bg-red-950 border-red-500 text-red-300 animate-pulse';
    verdictText = locale === 'tr' ? '[DERHAL HURDAYA AYIR - KULLANIM DIŞI]' : '[CONDEMN / SCRAP IMMEDIATELY]';
  } else if (result.verdict === 'CONDITIONAL') {
    verdictColorClass = 'bg-amber-950 border-amber-500 text-amber-300';
    verdictText = locale === 'tr' ? '[ŞARTLI - YAKIN TAKİP]' : '[CONDITIONAL - MONITOR CLOSELY]';
  }

  // Risk Badge Styling
  const riskColor =
    result.overallRisk === 'CRITICAL'
      ? 'bg-red-950 border-red-700 text-red-400'
      : result.overallRisk === 'HIGH'
      ? 'bg-amber-950 border-amber-700 text-amber-400'
      : result.overallRisk === 'MEDIUM'
      ? 'bg-blue-950 border-blue-700 text-blue-400'
      : 'bg-emerald-950 border-emerald-700 text-emerald-400';

  return (
    <div className="bg-[#111827] rounded-2xl border border-purple-500/40 shadow-2xl p-5 sm:p-7 space-y-6 animate-in fade-in">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#23314d] pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${riskColor}`}>
              RİSK SEVİYESİ: {result.overallRisk}
            </span>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
              AI Baş Denetçi Raporu
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white">{result.summaryTitle}</h3>
        </div>

        <button
          onClick={handleSaveToSession}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1a253c] border border-safety-500/40 text-safety-400 hover:bg-safety-500 hover:text-black text-xs font-mono font-bold transition-all shrink-0 self-start sm:self-center"
        >
          <BookmarkPlus className="h-4 w-4" />
          <span>{saveToast ? (locale === 'tr' ? 'Kaydedildi!' : 'Saved!') : (locale === 'tr' ? 'Oturuma Kaydet' : 'Save Report')}</span>
        </button>
      </div>

      {/* Decision Verdict Banner (If present) */}
      {result.verdict && (
        <div className={`p-4 rounded-xl border-2 flex items-center justify-between gap-4 font-mono ${verdictColorClass}`}>
          <div className="flex items-center gap-3">
            {result.verdict === 'SCRAP_IMMEDIATE' ? (
              <AlertOctagon className="h-7 w-7 text-red-400 shrink-0" />
            ) : result.verdict === 'CONDITIONAL' ? (
              <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="h-7 w-7 text-emerald-400 shrink-0" />
            )}
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                Mühendislik ve İSG Nihai Hükmü
              </span>
              <span className="text-base sm:text-lg font-black tracking-wide">{verdictText}</span>
            </div>
          </div>
        </div>
      )}

      {/* Primary Observations */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-purple-400" />
          <span>Baş Denetçi Gözlemleri & Tespitler</span>
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-200">
          {result.primaryObservations.map((obs, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-[#131b2e] p-2.5 rounded-lg border border-[#1f2c44]">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detected Defects Table */}
      {result.detectedDefectsOrErrors && result.detectedDefectsOrErrors.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
            <AlertOctagon className="h-4 w-4 text-red-400" />
            <span>Tespit Edilen Kusurlar ve Mevzuat İhlalleri</span>
          </h4>
          <div className="space-y-2">
            {result.detectedDefectsOrErrors.map((defect, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-300 text-sm">{defect.issue}</span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 text-red-400 border border-red-800">
                    {defect.standardClause}
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Olası Sonuç / Tehlike:</strong> {defect.consequence}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revised Rigging Plan (If Task 1 or Task 3) */}
      {result.revisedRiggingPlan && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#16233d] to-[#111827] border border-blue-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span>Revize Edilmiş Güvenli Rigging Planı (Teknik Şartname)</span>
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Doğru Yöntem
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Önerilen Sapan</span>
              <span className="font-bold text-white block mt-0.5">{result.revisedRiggingPlan.recommendedSlings}</span>
            </div>
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Bağlama Şekli</span>
              <span className="font-bold text-safety-400 block mt-0.5">{result.revisedRiggingPlan.hitchingMethod}</span>
            </div>
            <div className="bg-[#131b2e] p-2.5 rounded-lg border border-[#23314d]">
              <span className="text-[10px] text-slate-400 block uppercase">Gerekli Donanım</span>
              <span className="font-bold text-emerald-400 block mt-0.5">{result.revisedRiggingPlan.requiredHardware}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 block font-bold">Kritik Saha Önlemleri:</span>
            <ul className="space-y-1 text-xs text-slate-300">
              {result.revisedRiggingPlan.criticalPrecautions.map((prec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{prec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Predictive Insights (If Task 4) */}
      {result.predictiveInsights && result.predictiveInsights.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Kestirimci Gizli Arıza Modları & Kuluçka Süreleri</span>
          </h4>
          <div className="space-y-2 text-xs">
            {result.predictiveInsights.map((pred, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#131b2e] border border-[#23314d] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300">{pred.hiddenFailureMode}</span>
                  <span className="font-mono text-[10px] text-safety-400 font-bold bg-black/40 px-2 py-0.5 rounded">
                    Kuluçka: {pred.incubationTimeEstimate}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Önleyici İzleme / NDT Adımı:</strong> {pred.preventiveMonitoringStep}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Action Plan */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono font-bold text-safety-400 uppercase tracking-wider">
          Adım Adım Güvenli İcra Prosedürü (Eylem Planı)
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-200">
          {result.recommendedActionPlan.map((act, i) => (
            <li key={i} className="flex items-start gap-2 bg-[#131b2e] p-2.5 rounded-lg border border-[#1f2c44]">
              <span className="font-mono text-safety-400 font-bold shrink-0">{i + 1}.</span>
              <span className="leading-relaxed">{act}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Standards & Legal References Footer */}
      <div className="pt-3 border-t border-[#1f2c44] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500">Standartlar:</span>
          {result.citedStandards.map((std) => (
            <span key={std} className="bg-black/40 px-1.5 py-0.5 rounded border border-[#2a3854] text-slate-300">
              {std}
            </span>
          ))}
        </div>
        <div className="text-red-400 font-bold">
          Yasal Dayanak: {result.legalReference}
        </div>
      </div>
    </div>
  );
};
