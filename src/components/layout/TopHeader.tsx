'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation, Locale } from '@/lib/i18n/i18n-context';
import { Wifi, WifiOff, ShieldCheck, Languages, HardHat } from 'lucide-react';

interface TopHeaderProps {
  isOnline: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ isOnline }) => {
  const { locale, setLocale, t } = useTranslation();

  const toggleLanguage = () => {
    const nextLocale: Locale = locale === 'tr' ? 'en' : 'tr';
    setLocale(nextLocale);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#23314d] bg-[#0b0f19]/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-safety-500/10 border border-safety-500/40 text-safety-500 group-hover:bg-safety-500 group-hover:text-black transition-all">
            <HardHat className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-slate-100 uppercase">
              {t('app.shortTitle')}
            </span>
            <span className="text-[10px] font-mono text-safety-400 font-semibold tracking-tight">
              {t('app.version')}
            </span>
          </div>
        </Link>

        {/* Status Indicators & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Network Status Badge */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border transition-colors ${
              isOnline
                ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-400'
                : 'bg-amber-950/60 border-amber-600/40 text-amber-300'
            }`}
            title={isOnline ? t('app.onlineBadge') : t('app.offlineNotice')}
          >
            {isOnline ? (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <Wifi className="h-3.5 w-3.5" />
                <span>ONLINE</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <WifiOff className="h-3.5 w-3.5" />
                <span>OFFLINE (100% LOKAL)</span>
              </>
            )}
          </div>

          {/* OHS Compliance Tag */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-[#131b2e] px-2.5 py-1 rounded border border-[#23314d]">
            <ShieldCheck className="h-3.5 w-3.5 text-safety-500" />
            <span>EN / ISO / ASME Uyumlu</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#23314d] text-xs font-mono font-bold text-slate-200 hover:border-safety-500 hover:text-safety-400 transition-colors"
            title="Dili Değiştir / Switch Language"
          >
            <Languages className="h-4 w-4 text-safety-500" />
            <span>{locale.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
