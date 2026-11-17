'use client';

import React, { useState } from 'react';
import { PredictiveRiskInput } from '@/types/ai';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { LineChart, Sparkles } from 'lucide-react';

interface PredictiveRiskFormProps {
  onSubmit: (inputs: PredictiveRiskInput) => void;
  isLoading: boolean;
}

export const PredictiveRiskForm: React.FC<PredictiveRiskFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { locale } = useTranslation();

  const [equipmentType, setEquipmentType] = useState<string>('Grade 80 Alaşımlı Kaldırma Zinciri');
  const [operatingEnvironment, setOperatingEnvironment] = useState<string>('Dökümhane & Sıcak Tavlama Fırını');
  const [usageFrequency, setUsageFrequency] = useState<any>('daily_multishift');
  const [ambientTemperatureC, setAmbientTemperatureC] = useState<number>(240);
  const [chemicalExposure, setChemicalExposure] = useState<string>('Asit daldırma banyosu ve kükürtlü sıcak buhar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      equipmentType,
      operatingEnvironment,
      usageFrequency,
      ambientTemperatureC,
      chemicalExposure,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] rounded-xl border border-[#23314d] p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#23314d] pb-3">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Kestirimci Risk & Gizli Arıza Modu Öngörü Analizi
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
          Malzeme Yorulması & Korozyon
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Equipment Type */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Ekipman Tanımı & Malzeme:</label>
          <input
            type="text"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Operating Environment */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Tesis & Çalışma Sahası:</label>
          <input
            type="text"
            value={operatingEnvironment}
            onChange={(e) => setOperatingEnvironment(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Usage Frequency */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Kullanım Yoğunluğu:</label>
          <select
            value={usageFrequency}
            onChange={(e) => setUsageFrequency(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          >
            <option value="daily_multishift">Sürekli (Günde 3 Vardiya - Yüksek Döngü)</option>
            <option value="regular">Normal (Günde 1 Vardiya)</option>
            <option value="infrequent">Haftada birkaç kez / Seyrek</option>
          </select>
        </div>

        {/* Temperature */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Ortam Sıcaklığı (°C):</label>
          <input
            type="number"
            value={ambientTemperatureC}
            onChange={(e) => setAmbientTemperatureC(parseInt(e.target.value, 10) || 20)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Chemical Exposure */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Kimyasal / Buhar Teması:</label>
          <input
            type="text"
            value={chemicalExposure}
            onChange={(e) => setChemicalExposure(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 disabled:opacity-50 transition-all font-mono"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isLoading ? 'Gizli Risk Modları Hesaplanıyor...' : 'Kestirimci Risk Raporu Oluştur'}</span>
        </button>
      </div>
    </form>
  );
};
