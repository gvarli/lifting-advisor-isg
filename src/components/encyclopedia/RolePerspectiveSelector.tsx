'use client';

import React from 'react';
import { PerspectiveRole } from '@/data/equipment/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Users, Briefcase, HardHat, ShieldCheck } from 'lucide-react';

interface RolePerspectiveSelectorProps {
  selectedRole: PerspectiveRole;
  onSelectRole: (role: PerspectiveRole) => void;
}

export const RolePerspectiveSelector: React.FC<RolePerspectiveSelectorProps> = ({
  selectedRole,
  onSelectRole,
}) => {
  const { locale } = useTranslation();

  const roles = [
    {
      id: 'all' as PerspectiveRole,
      label: locale === 'tr' ? 'Genel Mühendislik' : 'General View',
      icon: Users,
      badge: locale === 'tr' ? 'Tüm Bilgiler' : 'Full Specs',
      color: 'border-slate-600 text-slate-300',
      activeColor: 'bg-[#1e293b] border-slate-400 text-white shadow-md',
    },
    {
      id: 'seller' as PerspectiveRole,
      label: locale === 'tr' ? 'Satıcı / Tedarikçi' : 'Seller / Distributor',
      icon: Briefcase,
      badge: locale === 'tr' ? 'Teklif & Seçim' : 'Quoting & Tips',
      color: 'border-blue-900/60 text-blue-300',
      activeColor: 'bg-blue-950/80 border-blue-500 text-blue-200 shadow-md shadow-blue-500/10',
    },
    {
      id: 'operator' as PerspectiveRole,
      label: locale === 'tr' ? 'Operatör / Sapancı' : 'Operator / Rigger',
      icon: HardHat,
      badge: locale === 'tr' ? 'Saha & Güvenlik' : 'Field & Safety',
      color: 'border-amber-900/60 text-amber-300',
      activeColor: 'bg-amber-950/80 border-safety-500 text-safety-300 shadow-md shadow-amber-500/10',
    },
    {
      id: 'inspector' as PerspectiveRole,
      label: locale === 'tr' ? 'İSG & Kontrol Uzmanı' : 'OHS / Inspector',
      icon: ShieldCheck,
      badge: locale === 'tr' ? 'Iskarta & Standart' : 'Discard & Norms',
      color: 'border-emerald-900/60 text-emerald-300',
      activeColor: 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10',
    },
  ];

  return (
    <div className="bg-[#111827] rounded-xl border border-[#23314d] p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-safety-500" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            {locale === 'tr' ? 'Rol Odaklı Bilgi Filtresi' : 'Role Perspective View'}
          </h2>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          {locale === 'tr'
            ? 'Seçilen role göre teknik odak notları kartların en üstünde vurgulanır.'
            : 'Technical highlights are prioritized based on selected job role.'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = selectedRole === r.id;

          return (
            <button
              key={r.id}
              onClick={() => onSelectRole(r.id)}
              className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                isActive ? r.activeColor : 'bg-[#131b2e]/60 border-[#23314d] hover:border-slate-500 text-slate-400'
              }`}
            >
              <div
                className={`p-1.5 rounded-md ${
                  isActive ? 'bg-black/30' : 'bg-[#1c2842]'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate leading-tight">
                  {r.label}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {r.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
