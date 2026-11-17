'use client';

import React from 'react';
import { EquipmentGroupId } from '@/data/equipment/types';
import { EQUIPMENT_CATEGORIES } from '@/data/equipment';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Search, X, Layers, Filter } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: EquipmentGroupId | 'all';
  onSelectCategory: (cat: EquipmentGroupId | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResultsCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResultsCount,
}) => {
  const { locale } = useTranslation();

  return (
    <div className="space-y-3">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            locale === 'tr'
              ? 'Ekipman adı, standart kodu (EN 1492, ISO 4309, EN 818) veya terim ara...'
              : 'Search equipment name, standard code (EN 1492, ISO 4309), or term...'
          }
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#111827] border border-[#23314d] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-safety-500 transition-colors font-mono"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            title="Temizle"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills Slider / Grid */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        {/* All Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-2 rounded-lg font-bold shrink-0 border transition-all ${
            selectedCategory === 'all'
              ? 'bg-safety-500 text-black border-safety-400 shadow-sm'
              : 'bg-[#111827] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
          }`}
        >
          {locale === 'tr' ? 'Tüm Ürün Grupları' : 'All Categories'} ({totalResultsCount})
        </button>

        {/* 6 Category Tabs */}
        {EQUIPMENT_CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold shrink-0 border transition-all ${
                isSelected
                  ? 'bg-[#1a253c] text-safety-400 border-safety-500 shadow-sm'
                  : 'bg-[#111827] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
              }`}
            >
              <span className="font-mono text-[10px] text-safety-400 font-bold">
                0{idx + 1}
              </span>
              <span>{cat.title[locale]}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-slate-400 border border-slate-700">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
