'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  BookOpen,
  Calculator,
  Scale,
  Cpu,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();

  const moduleCards = [
    {
      id: 'encyclopedia',
      href: '/encyclopedia',
      title: t('nav.encyclopedia.title'),
      desc: t('nav.encyclopedia.desc'),
      icon: BookOpen,
      tag: 'LOKAL ANSİKLOPEDİ',
      color: 'from-amber-500/20 to-transparent',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
    },
    {
      id: 'calculator',
      href: '/calculator',
      title: t('nav.calculator.title'),
      desc: t('nav.calculator.desc'),
      icon: Calculator,
      tag: 'MÜHENDİSLİK MOTORU',
      color: 'from-blue-500/20 to-transparent',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      id: 'standards',
      href: '/standards',
      title: t('nav.standards.title'),
      desc: t('nav.standards.desc'),
      icon: Scale,
      tag: 'MEVZUAT & STANDARTLAR',
      color: 'from-emerald-500/20 to-transparent',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
    },
    {
      id: 'aiConsultant',
      href: '/ai-consultant',
      title: t('nav.aiConsultant.title'),
      desc: t('nav.aiConsultant.desc'),
      icon: Cpu,
      tag: 'YAPAY ZEKA DENETİMİ',
      color: 'from-purple-500/20 to-transparent',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
    },
    {
      id: 'exportCenter',
      href: '/export-center',
      title: t('nav.exportCenter.title'),
      desc: t('nav.exportCenter.desc'),
      icon: FileSpreadsheet,
      tag: 'SAHA RAPORU & DIŞA AKTARIM',
      color: 'from-cyan-500/20 to-transparent',
      borderColor: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Industrial Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-safety-500/30 bg-gradient-to-br from-[#16233d] via-[#101726] to-[#0b0f19] p-6 sm:p-8">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-safety-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-safety-500/10 border border-safety-500/30 text-safety-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            <span>Çevrimdışı Öncelikli Endüstriyel Mimari</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            {t('app.title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t('app.subtitle')}
          </p>

          {/* Core Industrial Pillars */}
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-[#131b2e] px-3 py-1.5 rounded-lg border border-[#23314d]">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Sıfır Auth / Veritabanı Bağımsız</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#131b2e] px-3 py-1.5 rounded-lg border border-[#23314d]">
              <ShieldCheck className="h-4 w-4 text-safety-400" />
              <span>EN / ISO / ASME Normları</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#131b2e] px-3 py-1.5 rounded-lg border border-[#23314d]">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Güneş Işığında Yüksek Kontrast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 5 Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-200 tracking-wide uppercase font-mono">
            Danışmanlık & Hesaplama Modülleri
          </h2>
          <span className="text-xs font-mono text-slate-400">
            5 Temel Çalışma Alanı
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href={card.href}
                className={`group relative rounded-xl border ${card.borderColor} bg-gradient-to-b ${card.color} bg-[#111827] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-safety-500/80 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400">
                      MODÜL [0{idx + 1}]
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 border border-[#2a3854] ${card.textColor}`}>
                      {card.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a253c] border border-[#293853] text-safety-400 group-hover:bg-safety-500 group-hover:text-black transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-safety-400 transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#1f2c44] flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-safety-400">
                  <span>Modülü Aç</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
