'use client';

import React from 'react';
import { LiftingEquipmentItem, PerspectiveRole } from '@/data/equipment/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  ShieldAlert,
  Thermometer,
  FileCheck,
  Scale,
  ArrowRight,
  Check,
  Plus,
  AlertTriangle,
} from 'lucide-react';

interface EquipmentCardProps {
  item: LiftingEquipmentItem;
  role: PerspectiveRole;
  onOpenDetails: (item: LiftingEquipmentItem) => void;
  isCompared: boolean;
  onToggleCompare: (item: LiftingEquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  item,
  role,
  onOpenDetails,
  isCompared,
  onToggleCompare,
}) => {
  const { locale } = useTranslation();

  // Determine role insight highlight text
  let roleTitle = '';
  let roleText = '';
  let roleBadgeClass = '';

  if (role === 'seller') {
    roleTitle = locale === 'tr' ? 'Satıcı / Teklif Notu' : 'Seller Note';
    roleText = item.roleInsights.sellerFocus[locale];
    roleBadgeClass = 'border-blue-500/40 bg-blue-950/40 text-blue-300';
  } else if (role === 'operator') {
    roleTitle = locale === 'tr' ? 'Sapancı Emniyet Kuralı' : 'Rigger Safety Rule';
    roleText = item.roleInsights.operatorFocus[locale];
    roleBadgeClass = 'border-amber-500/40 bg-amber-950/40 text-safety-400';
  } else if (role === 'inspector') {
    roleTitle = locale === 'tr' ? 'Iskarta / Denetim Kriteri' : 'Inspection / Discard Note';
    roleText = item.roleInsights.inspectorFocus[locale];
    roleBadgeClass = 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300';
  }

  const criticalFailure = item.commonFailures[0];

  return (
    <div className="rounded-xl border border-[#23314d] bg-[#111827] hover:border-slate-500 transition-all flex flex-col justify-between overflow-hidden group shadow-lg">
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Top Badges & Compare Toggle */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1a253c] text-safety-400 border border-[#293853]">
              {item.code}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-slate-700">
              SF {item.safetyFactor}
            </span>
          </div>

          {/* Compare Button */}
          <button
            onClick={() => onToggleCompare(item)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono font-semibold border transition-colors ${
              isCompared
                ? 'bg-safety-500 text-black border-safety-400'
                : 'bg-[#152037] text-slate-300 border-[#2a3854] hover:border-safety-500'
            }`}
            title="Karşılaştırmaya Ekle / Add to Compare"
          >
            {isCompared ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            <span>{isCompared ? (locale === 'tr' ? 'Eklendi' : 'Added') : (locale === 'tr' ? 'Karşılaştır' : 'Compare')}</span>
          </button>
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-safety-400 transition-colors leading-snug">
            {item.name[locale]}
          </h3>
          <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {item.shortDescription[locale]}
          </p>
        </div>

        {/* Engineering Metrics Row */}
        <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
          <div className="bg-[#131b2e] p-2 rounded-lg border border-[#23314d]">
            <span className="text-slate-400 block text-[10px] uppercase">WLL Kapasitesi</span>
            <span className="text-white font-bold">{item.wllRange}</span>
          </div>
          <div className="bg-[#131b2e] p-2 rounded-lg border border-[#23314d]">
            <span className="text-slate-400 block text-[10px] uppercase">Sıcaklık Limiti</span>
            <div className="flex items-center gap-1 text-safety-400 font-bold">
              <Thermometer className="h-3.5 w-3.5" />
              <span>{item.selectionCriteria.environment.minTempC}°C / {item.selectionCriteria.environment.maxTempC}°C</span>
            </div>
          </div>
        </div>

        {/* Dynamic Role Highlight (If role selected) */}
        {role !== 'all' && roleText && (
          <div className={`p-2.5 rounded-lg border text-xs leading-relaxed ${roleBadgeClass}`}>
            <span className="font-bold block text-[10px] uppercase tracking-wider mb-0.5">
              {roleTitle}
            </span>
            <p className="font-medium">{roleText}</p>
          </div>
        )}

        {/* Standards Tags */}
        <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono text-slate-400">
          <FileCheck className="h-3 w-3 text-slate-400" />
          {item.standards.slice(0, 3).map((std) => (
            <span key={std} className="bg-black/30 px-1.5 py-0.5 rounded border border-[#1f2c44]">
              {std}
            </span>
          ))}
          {item.standards.length > 3 && (
            <span className="text-slate-400">+{item.standards.length - 3}</span>
          )}
        </div>

        {/* Top Critical Risk Teaser */}
        {criticalFailure && (
          <div className="p-2 rounded bg-red-950/30 border border-red-900/40 text-[11px] text-red-200 flex items-start gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              <strong>{locale === 'tr' ? 'Kritik Risk:' : 'Hazard:'}</strong> {criticalFailure.fieldError[locale]}
            </span>
          </div>
        )}
      </div>

      {/* Footer Card Action Button */}
      <div className="p-3 bg-[#0d1322] border-t border-[#1f2c44]">
        <button
          onClick={() => onOpenDetails(item)}
          className="w-full py-2 px-3 rounded-lg bg-[#1a253c] hover:bg-safety-500 hover:text-black text-slate-200 border border-[#2a3854] hover:border-safety-400 text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:border-safety-500/60"
        >
          <span>{locale === 'tr' ? '7 Aşamalı Yaşam Döngüsü Detayları' : 'View 7 Lifecycle Stages'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
