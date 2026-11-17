'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { offlineStore } from '@/lib/offline/offlineStore';
import {
  Calculator,
  Compass,
  Scale,
  CircleDot,
  Wind,
  Wrench,
  Calendar,
  ShieldCheck,
  BookmarkCheck,
  Sparkles,
} from 'lucide-react';
import { SlingTensionCalculator } from '@/components/calculator/SlingTensionCalculator';
import { AsymmetricCoGCalculator } from '@/components/calculator/AsymmetricCoGCalculator';
import { DdRatioCalculator } from '@/components/calculator/DdRatioCalculator';
import { DynamicWindCalculator } from '@/components/calculator/DynamicWindCalculator';
import { ClipsAndFleetCalculator } from '@/components/calculator/ClipsAndFleetCalculator';
import { InspectionScheduleCalculator } from '@/components/calculator/InspectionScheduleCalculator';
import { SafetyFactorConverter } from '@/components/calculator/SafetyFactorConverter';

export default function CalculatorPage() {
  const { locale, t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [incomingEquipment, setIncomingEquipment] = useState<string | null>(null);

  // Check how many calculations are stored in the offline session & handle query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const eq = params.get('equipment');
      const cat = params.get('category');
      if (eq) {
        setIncomingEquipment(eq);
        if (cat === 'steel-wire-ropes') {
          setActiveTab(3); // D/d Bending or Sling
        } else if (cat === 'lifting-machines') {
          setActiveTab(6); // Inspection Schedule
        } else {
          setActiveTab(1); // Sling Tension
        }
      }
    }

    const updateCount = async () => {
      const records = (await offlineStore.getItem<any[]>('session_calculations')) || [];
      setSavedCount(records.length);
    };
    updateCount();
    const interval = setInterval(updateCount, 2000);
    return () => clearInterval(interval);
  }, []);

  const calculatorTabs = [
    {
      id: 1,
      name: locale === 'tr' ? 'Sapan Açı & Gerilim' : 'Sling Angle & Tension',
      short: '[01] Sapan Açısı',
      desc: 'WLL, Açı Çarpanı (K_L), Kol Kuvvetleri',
      icon: Compass,
    },
    {
      id: 2,
      name: locale === 'tr' ? 'Asimetrik CoG' : 'Asymmetric CoG',
      short: '[02] Ağırlık Merkezi',
      desc: 'Moment Dengesi, Dengesiz Yük Dağılımı',
      icon: Scale,
    },
    {
      id: 3,
      name: locale === 'tr' ? 'D/d Bükülme Oranı' : 'D/d Bending Ratio',
      short: '[03] D/d Oranı',
      desc: 'Verimlilik Kaybı, Keskin Kenar',
      icon: CircleDot,
    },
    {
      id: 4,
      name: locale === 'tr' ? 'DAF & Rüzgar Yükü' : 'DAF & Wind Load',
      short: '[04] DAF & Rüzgar',
      desc: 'Şok Yükü, Aerodinamik Basınç, 20 m/s Durdurma',
      icon: Wind,
    },
    {
      id: 5,
      name: locale === 'tr' ? 'Klemens & Fleet Açısı' : 'Clips & Fleet Angle',
      short: '[05] Klemens & Tambur',
      desc: 'EN 13411-5, Tork, Tambur Sapma Açısı',
      icon: Wrench,
    },
    {
      id: 6,
      name: locale === 'tr' ? 'Periyodik Kontrol & Test' : 'Inspection & Tests',
      short: '[06] Muayene & Test',
      desc: 'Yönetmelik EK-III, Statik/Dinamik Test Yükü',
      icon: Calendar,
    },
    {
      id: 7,
      name: locale === 'tr' ? 'MBL / WLL / SF Dönüştürücü' : 'MBL / WLL / SF',
      short: '[07] SF Dönüştürücü',
      desc: '7:1, 5:1, 4:1 Standart Minimum Kontrolü',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#23314d] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Calculator className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                [Modül 02] • %100 Client-Side Mühendislik Motoru
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">
                Sıfır Sunucu Gecikmesi
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
              {t('nav.calculator.title')}
            </h1>
            <p className="text-xs text-slate-300">
              {t('nav.calculator.desc')}
            </p>
          </div>
        </div>

        {/* Session Calculations Counter Pill */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {incomingEquipment && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <span className="text-[10px] uppercase font-bold text-cyan-400">
                {locale === 'tr' ? 'Seçilen Ekipman:' : 'Selected:'}
              </span>
              <strong className="text-white truncate max-w-[200px]">{incomingEquipment}</strong>
            </div>
          )}

          <Link
            href="/export-center"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111827] hover:bg-[#152033] border border-[#23314d] hover:border-amber-400/50 text-xs font-mono text-slate-300 transition-colors group cursor-pointer"
            title={locale === 'tr' ? 'Rapor & Çıktı Merkezine Git' : 'Go to Export Center'}
          >
            <BookmarkCheck className="h-4 w-4 text-safety-400 group-hover:scale-110 transition-transform" />
            <span>
              {locale === 'tr' ? 'Oturum Sepeti:' : 'Session Basket:'}{' '}
              <strong className="text-safety-400">{savedCount}</strong>
            </span>
            <span className="text-[10px] text-amber-400 ml-1">→</span>
          </Link>
        </div>
      </div>

      {/* 7 Calculator Sub-Tabs Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {calculatorTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col p-2.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-safety-500 text-black border-safety-400 shadow-md shadow-safety-500/10 font-bold'
                  : 'bg-[#111827] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-black' : 'text-safety-400'}`}>
                  0{tab.id}
                </span>
                <Icon className={`h-4 w-4 ${isActive ? 'text-black' : 'text-slate-400'}`} />
              </div>
              <span className="text-xs font-bold leading-tight line-clamp-1">{tab.name}</span>
              <span className={`text-[9px] font-mono line-clamp-1 mt-0.5 ${isActive ? 'text-black/80 font-medium' : 'text-slate-500'}`}>
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Calculator Body Rendering */}
      <div className="pt-2">
        {activeTab === 1 && <SlingTensionCalculator />}
        {activeTab === 2 && <AsymmetricCoGCalculator />}
        {activeTab === 3 && <DdRatioCalculator />}
        {activeTab === 4 && <DynamicWindCalculator />}
        {activeTab === 5 && <ClipsAndFleetCalculator />}
        {activeTab === 6 && <InspectionScheduleCalculator />}
        {activeTab === 7 && <SafetyFactorConverter />}
      </div>
    </div>
  );
}
