'use client';

import React, { useState, useEffect } from 'react';
import { AiProvider } from '@/types/ai';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Settings, X, Key, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface AiSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsSaved: (provider: AiProvider, apiKey: string) => void;
}

export const AiSettingsDrawer: React.FC<AiSettingsDrawerProps> = ({
  isOpen,
  onClose,
  onSettingsSaved,
}) => {
  const { locale } = useTranslation();
  const [provider, setProvider] = useState<AiProvider>('gemini');
  const [apiKey, setApiKey] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Read from session storage (zero persistent db)
    if (typeof window !== 'undefined') {
      const storedProvider = (sessionStorage.getItem('ai_provider') as AiProvider) || 'gemini';
      const storedKey = sessionStorage.getItem('ai_api_key') || '';
      setProvider(storedProvider);
      setApiKey(storedKey);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ai_provider', provider);
      sessionStorage.setItem('ai_api_key', apiKey.trim());
    }
    onSettingsSaved(provider, apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('ai_api_key');
    }
    setApiKey('');
    onSettingsSaved(provider, '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0b0f19] border border-[#23314d] rounded-2xl w-full max-w-md p-5 sm:p-6 space-y-5 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-[#23314d] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Motoru & API Ayarları</h3>
              <span className="text-[10px] font-mono text-slate-400">Oturum İçi Güvenli Bellek (SessionStorage)</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="p-3 rounded-lg bg-[#111827] border border-[#23314d] text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            API anahtarınız asla veritabanına veya sunucu diskine kaydedilmez. Sadece bu sekme oturumunda (session) geçici olarak tutulur. Anahtar girmeden de dahili mühendislik motoruyla analiz alabilirsiniz.
          </span>
        </div>

        {/* Provider Switcher */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Yapay Zeka Servis Sağlayıcısı:</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'gemini', label: 'Gemini API' },
              { id: 'openai', label: 'OpenAI GPT' },
              { id: 'claude', label: 'Claude 3.5' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProvider(p.id as AiProvider)}
                className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                  provider === p.id
                    ? 'bg-purple-950 border-purple-500 text-purple-200'
                    : 'bg-[#131b2e] border-[#23314d] text-slate-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{provider.toUpperCase()} API Anahtarı:</span>
            {apiKey && (
              <button onClick={handleClear} className="text-[10px] text-red-400 hover:underline">
                Temizle
              </button>
            )}
          </label>
          <div className="relative">
            <Key className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API anahtarınızı yapıştırın (örn. AIzaSy... / sk-...)"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1a253c] text-slate-300 text-xs font-semibold hover:text-white"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
          >
            {savedSuccess ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            <span>{savedSuccess ? 'Kaydedildi' : 'Ayarları Uygula'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
