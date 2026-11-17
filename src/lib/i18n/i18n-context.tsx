'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import trDict from './dictionaries/tr.json';
import enDict from './dictionaries/en.json';
import { ENGINEERING_TERMS, EngineeringTerm } from './terms';

export type Locale = 'tr' | 'en';

type Dictionary = typeof trDict;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (keyPath: string) => string;
  getTerm: (code: string) => EngineeringTerm | undefined;
}

const dictionaries: Record<Locale, Dictionary> = {
  tr: trDict,
  en: enDict,
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('tr');

  useEffect(() => {
    const saved = localStorage.getItem('app_locale') as Locale | null;
    if (saved && (saved === 'tr' || saved === 'en')) {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('en')) {
        setLocaleState('en');
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('app_locale', newLocale);
    } catch {
      // ignore
    }
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current: any = dictionaries[locale];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to Turkish if key is missing in English
        let fallback: any = dictionaries.tr;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return keyPath;
          }
        }
        return typeof fallback === 'string' ? fallback : keyPath;
      }
    }

    return typeof current === 'string' ? current : keyPath;
  };

  const getTerm = (code: string): EngineeringTerm | undefined => {
    return ENGINEERING_TERMS[code.toUpperCase()];
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, getTerm }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
