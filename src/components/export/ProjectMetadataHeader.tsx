'use client';

import React from 'react';
import { ProjectMetadata } from '@/lib/export/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Briefcase, MapPin, User, Calendar, FileText } from 'lucide-react';

interface Props {
  metadata: ProjectMetadata;
  onChange: (updated: ProjectMetadata) => void;
}

export function ProjectMetadataHeader({ metadata, onChange }: Props) {
  const { locale } = useTranslation();

  const handleChange = (field: keyof ProjectMetadata, value: string) => {
    onChange({
      ...metadata,
      [field]: value,
    });
  };

  return (
    <div className="rounded-xl border border-[#23314d] bg-[#111827] p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-4 border-b border-[#23314d] pb-3">
        <Briefcase className="h-4 w-4 text-amber-400" />
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          {locale === 'tr' ? 'Rapor & Saha Üst Bilgileri (Opsiyonel)' : 'Report & Site Header (Optional)'}
        </h2>
        <span className="text-[10px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded ml-auto">
          {locale === 'tr' ? 'Tek Tıkla Hazır' : 'One-Click Ready'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            {locale === 'tr' ? 'Proje / Operasyon Adı' : 'Project / Lifting Op'}
          </label>
          <input
            type="text"
            value={metadata.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            placeholder={locale === 'tr' ? 'Örn: Türbin Montajı #04' : 'e.g. Turbine Erection #04'}
            className="w-full bg-[#0a0f1d] border border-[#23314d] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>

        {/* Facility Location */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {locale === 'tr' ? 'Lokasyon / Tesis / Saha' : 'Facility / Worksite'}
          </label>
          <input
            type="text"
            value={metadata.facilityLocation}
            onChange={(e) => handleChange('facilityLocation', e.target.value)}
            placeholder={locale === 'tr' ? 'Örn: Aliağa Tersanesi Kuru Havuz' : 'e.g. Shipyard Drydock 2'}
            className="w-full bg-[#0a0f1d] border border-[#23314d] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>

        {/* Inspector Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <User className="h-3.5 w-3.5 text-slate-400" />
            {locale === 'tr' ? 'Sorumlu Mühendis / İSG Uzmanı' : 'Lead Engineer / OHS'}
          </label>
          <input
            type="text"
            value={metadata.inspectorName}
            onChange={(e) => handleChange('inspectorName', e.target.value)}
            placeholder={locale === 'tr' ? 'Örn: Ahmet Yılmaz (A Sınıfı İSG)' : 'e.g. John Doe (Appointed Person)'}
            className="w-full bg-[#0a0f1d] border border-[#23314d] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {locale === 'tr' ? 'Operasyon Tarihi' : 'Date'}
          </label>
          <input
            type="date"
            value={metadata.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full bg-[#0a0f1d] border border-[#23314d] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>
      </div>

      {/* Operational Notes */}
      <div className="mt-3">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          {locale === 'tr' ? 'Saha Ön Koşulları / Özel Notlar (Opsiyonel)' : 'Prerequisites & Notes (Optional)'}
        </label>
        <textarea
          rows={2}
          value={metadata.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder={
            locale === 'tr'
              ? 'Örn: Rüzgar hızı 12 m/s altında olmalı, zemin basma plakaları kontrol edildi, sapan koruyucu kılıf takıldı.'
              : 'e.g. Wind speed limit < 12 m/s, outrigger pads verified, edge protection fitted.'
          }
          className="w-full bg-[#0a0f1d] border border-[#23314d] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium resize-none"
        />
      </div>
    </div>
  );
}
