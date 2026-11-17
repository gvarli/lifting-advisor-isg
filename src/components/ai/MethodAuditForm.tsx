'use client';

import React, { useState } from 'react';
import { MethodAuditInput } from '@/types/ai';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { AlertOctagon, Sparkles, Scale } from 'lucide-react';

interface MethodAuditFormProps {
  onSubmit: (inputs: MethodAuditInput) => void;
  isLoading: boolean;
  initialDescription?: string;
  initialWeight?: number;
  initialAngle?: number;
}

export const MethodAuditForm: React.FC<MethodAuditFormProps> = ({
  onSubmit,
  isLoading,
  initialDescription,
  initialWeight,
  initialAngle,
}) => {
  const { locale } = useTranslation();

  const [riggingDescription, setRiggingDescription] = useState<string>(
    initialDescription ||
      '10 tonluk çelik sac plakayı 4 kollu zincir sapanla, kollar arası tepe açısı 130 derece olacak şekilde, köşelere koruma sacı koymadan doğrudan boğma bağlantı ile kaldırıyoruz.'
  );
  const [loadWeightTon, setLoadWeightTon] = useState<number>(initialWeight || 10);
  const [slingLegCount, setSlingLegCount] = useState<number>(4);
  const [estimatedAngleDeg, setEstimatedAngleDeg] = useState<number>(initialAngle || 65);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      riggingDescription,
      loadWeightTon,
      slingLegCount,
      estimatedAngleDeg,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] rounded-xl border border-[#23314d] p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#23314d] pb-3">
        <div className="flex items-center gap-2">
          <AlertOctagon className="h-5 w-5 text-red-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Sapanlama (Rigging) Yöntemi Denetimi & Hata Tespiti
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800">
          Baş Denetçi / İSG Bilirkişi Modu
        </span>
      </div>

      {/* Method Description Textarea */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex justify-between">
          <span>Uygulanan veya Planlanan Kaldırma Yöntemini Tarif Edin:</span>
          <span className="text-[10px] font-mono text-slate-400">Detaylı açıklama yapınız</span>
        </label>
        <textarea
          rows={3}
          value={riggingDescription}
          onChange={(e) => setRiggingDescription(e.target.value)}
          placeholder="Örn: 2 adet bez sapanı birbirine düğümleyerek 15 tonluk silindiri boğma yapıyoruz..."
          className="w-full px-3 py-2.5 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-red-500 leading-relaxed"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Load Weight */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Yük Tonajı (Ton):</label>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={loadWeightTon}
            onChange={(e) => setLoadWeightTon(parseFloat(e.target.value) || 1)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Leg count */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Sapan Kol Sayısı:</label>
          <select
            value={slingLegCount}
            onChange={(e) => setSlingLegCount(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          >
            <option value="1">1 Kol (Dikey)</option>
            <option value="2">2 Kol</option>
            <option value="3">3 Kol</option>
            <option value="4">4 Kol</option>
          </select>
        </div>

        {/* Estimated Angle */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Tahmini Düşey Açı (β):</label>
          <input
            type="number"
            min="0"
            max="85"
            value={estimatedAngleDeg}
            onChange={(e) => setEstimatedAngleDeg(parseInt(e.target.value, 10) || 0)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 disabled:opacity-50 transition-all font-mono"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isLoading ? 'Yöntem ve Hatalar Denetleniyor...' : 'AI Sapanlama Denetimini Çalıştır'}</span>
        </button>
      </div>
    </form>
  );
};
