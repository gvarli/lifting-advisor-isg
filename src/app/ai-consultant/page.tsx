'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { subscribeNetworkStatus } from '@/lib/offline/serviceWorkerRegistration';
import {
  AiTaskMode,
  AiProvider,
  AiAnalysisResponse,
  RiggingPlannerInput,
  VisualDefectInspectorInput,
  MethodAuditInput,
  PredictiveRiskInput,
} from '@/types/ai';
import {
  Cpu,
  WifiOff,
  Settings,
  Calculator,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { generateExpertOfflineAnalysis } from '@/lib/ai/expertEvaluator';
import { TaskSelectorBar } from '@/components/ai/TaskSelectorBar';
import { RiggingPlannerForm } from '@/components/ai/RiggingPlannerForm';
import { VisualDefectInspectorForm } from '@/components/ai/VisualDefectInspectorForm';
import { MethodAuditForm } from '@/components/ai/MethodAuditForm';
import { PredictiveRiskForm } from '@/components/ai/PredictiveRiskForm';
import { AiAnalysisResultCard } from '@/components/ai/AiAnalysisResultCard';
import { AiSettingsDrawer } from '@/components/ai/AiSettingsDrawer';

export default function AiConsultantPage() {
  const { locale, t } = useTranslation();

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeTask, setActiveTask] = useState<AiTaskMode>('rigging_planner');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AiAnalysisResponse | null>(null);
  const [currentProvider, setCurrentProvider] = useState<AiProvider>('gemini');
  const [apiKey, setApiKey] = useState<string>('');
  const [initialScenario, setInitialScenario] = useState<string>('');

  useEffect(() => {
    const unsubscribe = subscribeNetworkStatus((online) => {
      setIsOnline(online);
    });

    if (typeof window !== 'undefined') {
      const storedP = (sessionStorage.getItem('ai_provider') as AiProvider) || 'gemini';
      const storedK = sessionStorage.getItem('ai_api_key') || '';
      setCurrentProvider(storedP);
      setApiKey(storedK);

      // Read cross-module query parameters
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get('mode');
      const scenarioParam = params.get('scenario');
      const contextParam = params.get('context');

      if (modeParam === 'audit' || scenarioParam) {
        setActiveTask('method_audit');
        if (scenarioParam) setInitialScenario(scenarioParam);
      } else if (contextParam) {
        setActiveTask('rigging_planner');
        setInitialScenario(
          `Ekipman Analizi: ${contextParam}. Bu ekipman için güvenli çalışma yükü (WLL), sapan açı limitleri ve İSG emniyet kuralları önerisi isteniyor.`
        );
      }
    }

    return () => unsubscribe();
  }, []);

  const handleSettingsSaved = (newProvider: AiProvider, newKey: string) => {
    setCurrentProvider(newProvider);
    setApiKey(newKey);
  };

  const handleRunAiAnalysis = async (inputs: any, imageBase64?: string) => {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskMode: activeTask,
          inputs,
          provider: currentProvider,
          apiKey: apiKey || undefined,
          imageBase64,
        }),
      });

      if (!response.ok) {
        throw new Error('AI servisi yanıt vermedi.');
      }

      const data: AiAnalysisResponse = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.warn('[AI Request Error - Falling back to Local Engine]', err);
      // Seamlessly execute offline expert evaluator
      const fallbackData = generateExpertOfflineAnalysis(activeTask, inputs, Boolean(imageBase64));
      setAnalysisResult(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="border-b border-[#23314d] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Cpu className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                [Modül 04] • Yapay Zeka Kaldırma & Hata Denetim Danışmanı
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">
                {currentProvider.toUpperCase()} & Vision Destekli
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
              {t('nav.aiConsultant.title')}
            </h1>
            <p className="text-xs text-slate-300">
              {t('nav.aiConsultant.desc')}
            </p>
          </div>
        </div>

        {/* Action Buttons: Settings Drawer */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111827] border border-[#23314d] hover:border-purple-500 text-xs font-mono font-bold text-slate-300 transition-colors"
          >
            <Settings className="h-4 w-4 text-purple-400" />
            <span>AI Ayarları {apiKey ? '(Anahtar Tanımlı)' : ''}</span>
          </button>
        </div>
      </div>

      {/* Offline Alert Warning (If no network) */}
      {!isOnline && (
        <div className="rounded-xl border border-amber-600/50 bg-amber-950/20 p-5 space-y-3">
          <div className="flex items-center gap-3 text-amber-400">
            <WifiOff className="h-6 w-6 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Çevrimdışı Saha Modu: AI İnternet Bağlantısı Bekliyor
              </h3>
              <p className="text-xs text-amber-300 mt-0.5">
                Cihazınız şu an çevrimdışı. Tüm lokal hesaplama motorları ve ekipman ansiklopedisi kesintisiz %100 çalışmaktadır.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <Link
              href="/calculator"
              className="flex items-center justify-between p-3 rounded-lg bg-[#131b2e] border border-[#23314d] hover:border-safety-500 text-xs font-bold text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-blue-400" />
                <span>Mühendislik Hesaplama Motoruna Git</span>
              </div>
              <ArrowRight className="h-4 w-4 text-safety-400" />
            </Link>
            <Link
              href="/encyclopedia"
              className="flex items-center justify-between p-3 rounded-lg bg-[#131b2e] border border-[#23314d] hover:border-safety-500 text-xs font-bold text-slate-200"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span>Ekipman Ansiklopedisine Git</span>
              </div>
              <ArrowRight className="h-4 w-4 text-safety-400" />
            </Link>
          </div>
        </div>
      )}

      {/* 4 Task Mode Selector */}
      <TaskSelectorBar
        activeTask={activeTask}
        onSelectTask={(task) => {
          setActiveTask(task);
          setAnalysisResult(null);
        }}
      />

      {/* Form Area based on Active Task */}
      <div>
        {activeTask === 'rigging_planner' && (
          <RiggingPlannerForm
            onSubmit={(inputs) => handleRunAiAnalysis(inputs)}
            isLoading={isLoading}
          />
        )}

        {activeTask === 'visual_defect_inspector' && (
          <VisualDefectInspectorForm
            onSubmit={(inputs) => handleRunAiAnalysis(inputs, inputs.imageBase64)}
            isLoading={isLoading}
          />
        )}

        {activeTask === 'method_audit' && (
          <MethodAuditForm
            key={initialScenario}
            initialDescription={initialScenario || undefined}
            onSubmit={(inputs) => handleRunAiAnalysis(inputs)}
            isLoading={isLoading}
          />
        )}

        {activeTask === 'predictive_risk' && (
          <PredictiveRiskForm
            onSubmit={(inputs) => handleRunAiAnalysis(inputs)}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-[#111827] rounded-2xl border border-purple-500/40 p-8 text-center space-y-4 animate-pulse">
          <div className="inline-flex p-3 rounded-full bg-purple-500/10 text-purple-400">
            <Sparkles className="h-8 w-8 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-white">
            AI Baş Denetçi Kaldırma Verilerini İnceliyor...
          </h3>
          <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
            ISO 4309, EN 1492, EN 818 ve 6331 İSG mevzuat hükümleri taranarak mühendislik denetim raporu hazırlanıyor.
          </p>
        </div>
      )}

      {/* AI Analysis Result Card */}
      {analysisResult && !isLoading && (
        <AiAnalysisResultCard result={analysisResult} />
      )}

      {/* Settings Drawer Modal */}
      <AiSettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsSaved={handleSettingsSaved}
      />
    </div>
  );
}
