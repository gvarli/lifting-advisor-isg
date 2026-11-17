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
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    {
      id: 'encyclopedia',
      href: '/encyclopedia',
      label: t('nav.encyclopedia.short'),
      icon: BookOpen,
    },
    {
      id: 'calculator',
      href: '/calculator',
      label: t('nav.calculator.short'),
      icon: Calculator,
    },
    {
      id: 'standards',
      href: '/standards',
      label: t('nav.standards.short'),
      icon: Scale,
    },
    {
      id: 'aiConsultant',
      href: '/ai-consultant',
      label: t('nav.aiConsultant.short'),
      icon: Cpu,
    },
    {
      id: 'exportCenter',
      href: '/export-center',
      label: t('nav.exportCenter.short'),
      icon: FileSpreadsheet,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-[#23314d] bg-[#0b0f19]/95 backdrop-blur-md pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive ? 'text-safety-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Indicator Top Notch */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-safety-500 rounded-b-full shadow-sm shadow-safety-400/50" />
              )}
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] tracking-tight leading-none mt-1 truncate max-w-[64px] text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
