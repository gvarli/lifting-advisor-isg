'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { WifiOff, X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline }) => {
  const { locale, t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);

  if (isOnline || dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Offline durum bildirimi"
      className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black px-4 py-2.5 border-b border-amber-600 shadow-lg animate-in slide-in-from-top duration-300 select-none z-50 sticky top-0"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-black/10">
            <WifiOff className="h-4 w-4 shrink-0 text-black" />
          </div>
          <span>
            <strong>
              {locale === 'tr'
                ? 'Çevrimdışı Saha Modu Aktif:'
                : 'Offline Field Mode Active:'}
            </strong>{' '}
            {locale === 'tr'
              ? 'Tüm mühendislik hesaplamaları, formül motorları ve ekipman bilgi bankası %100 yerel olarak kullanılabilir.'
              : 'All engineering calculation engines, formulas, and equipment encyclopedia are 100% available locally.'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] font-bold bg-black/15 text-black px-2.5 py-1 rounded-full border border-black/10">
            <ShieldCheck className="h-3.5 w-3.5 text-black" />
            {locale === 'tr' ? '%100 Yerel Önbellek' : '100% Local Cache'}
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-black/15 rounded-md transition-colors"
            title={t('common.close')}
            aria-label={t('common.close')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
