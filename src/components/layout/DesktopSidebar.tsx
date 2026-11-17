'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  BookOpen,
  Calculator,
  Scale,
  Cpu,
  FileSpreadsheet,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navigationItems = [
    {
      id: 'encyclopedia',
      href: '/encyclopedia',
      title: t('nav.encyclopedia.title'),
      desc: t('nav.encyclopedia.desc'),
      icon: BookOpen,
      badge: 'Lokal',
    },
    {
      id: 'calculator',
      href: '/calculator',
      title: t('nav.calculator.title'),
      desc: t('nav.calculator.desc'),
      icon: Calculator,
      badge: 'Motor',
    },
    {
      id: 'standards',
      href: '/standards',
      title: t('nav.standards.title'),
      desc: t('nav.standards.desc'),
      icon: Scale,
      badge: 'Rehber',
    },
    {
      id: 'aiConsultant',
      href: '/ai-consultant',
      title: t('nav.aiConsultant.title'),
      desc: t('nav.aiConsultant.desc'),
      icon: Cpu,
      badge: 'AI Cloud',
    },
    {
      id: 'exportCenter',
      href: '/export-center',
      title: t('nav.exportCenter.title'),
      desc: t('nav.exportCenter.desc'),
      icon: FileSpreadsheet,
      badge: 'PDF / JSON',
    },
  ];

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-[#23314d] bg-[#0b0f19] p-4 select-none shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Navigation Section Label */}
      <div className="px-3 pb-3 pt-1">
        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
          Endüstriyel Modüller
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1.5">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex flex-col rounded-xl p-3 border transition-all duration-150 ${
                isActive
                  ? 'bg-[#152037] border-safety-500/60 shadow-lg shadow-safety-500/5'
                  : 'bg-[#101726]/60 border-transparent hover:border-[#2a3854] hover:bg-[#131b2e]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                      isActive
                        ? 'bg-safety-500 text-black border-safety-400 shadow-sm'
                        : 'bg-[#1a253c] border-[#293853] text-slate-300 group-hover:text-safety-400 group-hover:border-safety-500/40'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-safety-400 font-bold">
                        [0{index + 1}]
                      </span>
                      <span
                        className={`text-sm font-semibold tracking-tight ${
                          isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isActive ? 'text-safety-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
              </div>

              {/* Sub-description */}
              <p className="mt-2 text-[11px] text-slate-400 line-clamp-1 pl-12 font-medium">
                {item.desc}
              </p>
            </Link>
          );
        })}
      </nav>

      {/* Industrial Safety Info Card */}
      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-amber-600/30 bg-amber-950/20 p-3.5">
          <div className="flex items-center gap-2 text-safety-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Saha İSG Kuralı</span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed">
            Asla deforme olmuş, etiketsiz veya WLL değeri okunmayan ekipmanla kaldırma yapmayınız.
          </p>
        </div>
      </div>
    </aside>
  );
};
