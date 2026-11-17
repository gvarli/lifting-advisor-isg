'use client';

import React, { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { ALL_EQUIPMENT_DATA, searchEquipment } from '@/data/equipment';
import {
  LiftingEquipmentItem,
  EquipmentGroupId,
  PerspectiveRole,
} from '@/data/equipment/types';
import { RolePerspectiveSelector } from '@/components/encyclopedia/RolePerspectiveSelector';
import { CategoryFilterBar } from '@/components/encyclopedia/CategoryFilterBar';
import { EquipmentCard } from '@/components/encyclopedia/EquipmentCard';
import { EquipmentDetailModal } from '@/components/encyclopedia/EquipmentDetailModal';
import { EquipmentComparisonModal } from '@/components/encyclopedia/EquipmentComparisonModal';
import {
  BookOpen,
  Scale,
  Sparkles,
  Layers,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export default function EncyclopediaPage() {
  const { locale, t } = useTranslation();

  // State Management
  const [selectedRole, setSelectedRole] = useState<PerspectiveRole>('all');
  const [selectedCategory, setSelectedCategory] = useState<EquipmentGroupId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailItem, setDetailItem] = useState<LiftingEquipmentItem | null>(null);
  const [comparedItems, setComparedItems] = useState<LiftingEquipmentItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Filtered Equipment List
  const filteredEquipment = useMemo(() => {
    return searchEquipment(searchQuery, selectedCategory, selectedRole, locale);
  }, [searchQuery, selectedCategory, selectedRole, locale]);

  // Toggle item in comparison list (max 3 items)
  const handleToggleCompare = (item: LiftingEquipmentItem) => {
    setComparedItems((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      if (exists) {
        return prev.filter((x) => x.id !== item.id);
      }
      if (prev.length >= 3) {
        alert(
          locale === 'tr'
            ? 'En fazla 3 adet ekipmanı aynı anda karşılaştırabilirsiniz.'
            : 'You can compare a maximum of 3 equipment items simultaneously.'
        );
        return prev;
      }
      return [...prev, item];
    });
  };

  const handleRemoveCompareItem = (id: string) => {
    setComparedItems((prev) => prev.filter((x) => x.id !== id));
  };

  const handleClearCompareAll = () => {
    setComparedItems([]);
    setIsCompareModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-[#23314d] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-safety-500/10 border border-safety-500/30 text-safety-400">
            <BookOpen className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-safety-400 uppercase tracking-widest bg-safety-500/10 px-2 py-0.5 rounded border border-safety-500/20">
                [Modül 01] • 100% Offline Ansiklopedi
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">
                41 PDF Destekli
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
              {t('nav.encyclopedia.title')}
            </h1>
            <p className="text-xs text-slate-300">
              {t('nav.encyclopedia.desc')}
            </p>
          </div>
        </div>

        {/* Floating Compare Action Trigger */}
        {comparedItems.length > 0 && (
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-safety-500 text-black font-black text-xs hover:bg-safety-400 transition-all shadow-lg shadow-safety-500/10"
          >
            <Scale className="h-4 w-4" />
            <span>
              {locale === 'tr' ? 'Seçilenleri Karşılaştır' : 'Compare Selected'} ({comparedItems.length}/3)
            </span>
          </button>
        )}
      </div>

      {/* Role Perspective Selector Filter */}
      <RolePerspectiveSelector
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
      />

      {/* Category and Search Filter Bar */}
      <CategoryFilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalResultsCount={filteredEquipment.length}
      />

      {/* Main Grid Results */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredEquipment.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              role={selectedRole}
              onOpenDetails={setDetailItem}
              isCompared={comparedItems.some((x) => x.id === item.id)}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="rounded-2xl border border-[#23314d] bg-[#111827] p-12 text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-slate-800 text-slate-400">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-white">
            {locale === 'tr' ? 'Eşleşen Ekipman Bulunamadı' : 'No Matching Equipment Found'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {locale === 'tr'
              ? `"${searchQuery}" araması veya seçili kategori için kayıt bulunamadı. Lütfen arama terimini değiştirin veya filtreleri sıfırlayın.`
              : `No records found for "${searchQuery}". Please broaden your search keywords or clear filters.`}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-lg bg-[#1a253c] hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            {locale === 'tr' ? 'Filtreleri Temizle' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* 7 Section Lifecycle Deep-Dive Modal */}
      <EquipmentDetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
      />

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <EquipmentComparisonModal
          items={comparedItems}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveItem={handleRemoveCompareItem}
          onClearAll={handleClearCompareAll}
        />
      )}
    </div>
  );
}
