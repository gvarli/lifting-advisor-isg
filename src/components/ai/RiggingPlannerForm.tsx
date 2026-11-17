'use client';

import React, { useState } from 'react';
import { RiggingPlannerInput } from '@/types/ai';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';

interface RiggingPlannerFormProps {
  onSubmit: (inputs: RiggingPlannerInput) => void;
  isLoading: boolean;
}

export const RiggingPlannerForm: React.FC<RiggingPlannerFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { locale } = useTranslation();

  const [loadWeightTon, setLoadWeightTon] = useState<number>(8);
  const [lengthM, setLengthM] = useState<number>(4);
  const [widthM, setWidthM] = useState<number>(1.5);
  const [heightM, setHeightM] = useState<number>(1.2);
  const [isCenterOfGravityOffset, setIsCenterOfGravityOffset] = useState<boolean>(false);
  const [hasSharpEdges, setHasSharpEdges] = useState<boolean>(true);
  const [surfaceTemperatureC, setSurfaceTemperatureC] = useState<number>(45);
  const [environmentType, setEnvironmentType] = useState<any>('indoor');
  const [liftHeightM, setLiftHeightM] = useState<number>(6);
  const [craneType, setCraneType] = useState<any>('overhead_crane');
  const [additionalNotes, setAdditionalNotes] = useState<string>('Sac işleme holünden montaj alanına taşıma.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      loadWeightTon,
      dimensions: { lengthM, widthM, heightM },
      isCenterOfGravityOffset,
      hasSharpEdges,
      surfaceTemperatureC,
      environmentType,
      liftHeightM,
      craneType,
      additionalNotes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] rounded-xl border border-[#23314d] p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#23314d] pb-3">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Yük ve Operasyon Parametreleri
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
          RAG Mühendislik Motoru
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Load Weight */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Toplam Ağırlık (Ton):</label>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={loadWeightTon}
            onChange={(e) => setLoadWeightTon(parseFloat(e.target.value) || 0.1)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Dimensions */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Boyutlar (U x G x Y) m:</label>
          <div className="grid grid-cols-3 gap-1">
            <input
              type="number"
              placeholder="U"
              value={lengthM}
              onChange={(e) => setLengthM(parseFloat(e.target.value) || 1)}
              className="px-2 py-2 rounded bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono text-center"
            />
            <input
              type="number"
              placeholder="G"
              value={widthM}
              onChange={(e) => setWidthM(parseFloat(e.target.value) || 1)}
              className="px-2 py-2 rounded bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono text-center"
            />
            <input
              type="number"
              placeholder="Y"
              value={heightM}
              onChange={(e) => setHeightM(parseFloat(e.target.value) || 1)}
              className="px-2 py-2 rounded bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono text-center"
            />
          </div>
        </div>

        {/* Surface Temperature */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Yüzey Sıcaklığı (°C):</label>
          <input
            type="number"
            value={surfaceTemperatureC}
            onChange={(e) => setSurfaceTemperatureC(parseInt(e.target.value, 10) || 20)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Crane Type */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Vinç Türü:</label>
          <select
            value={craneType}
            onChange={(e) => setCraneType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          >
            <option value="overhead_crane">Gezer Köprülü Tavan Vinci</option>
            <option value="mobile_crane">Mobil Teleskopik Vinç</option>
            <option value="tower_crane">Kule Vinç</option>
            <option value="manual_hoist">Manuel Caraskal / Hubzug</option>
          </select>
        </div>
      </div>

      {/* Checkboxes Row */}
      <div className="flex flex-wrap gap-4 pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
          <input
            type="checkbox"
            checked={hasSharpEdges}
            onChange={(e) => setHasSharpEdges(e.target.checked)}
            className="accent-purple-500 h-4 w-4 rounded"
          />
          <span className="font-semibold text-amber-300">Yükte Keskin Kenar / Köşe Mevcut (r &lt; 2mm)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
          <input
            type="checkbox"
            checked={isCenterOfGravityOffset}
            onChange={(e) => setIsCenterOfGravityOffset(e.target.checked)}
            className="accent-purple-500 h-4 w-4 rounded"
          />
          <span>Ağırlık Merkezi (CoG) Geometrik Merkezde Değil (Asimetrik)</span>
        </label>
      </div>

      {/* Environment Selector */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300">Çalışma Sahası & Ortam Şartları:</label>
        <select
          value={environmentType}
          onChange={(e) => setEnvironmentType(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
        >
          <option value="indoor">Kapalı Temiz Fabrika / Atölye</option>
          <option value="foundry_hot">Dökümhane & Haddehane (Yüksek Isı + Toz)</option>
          <option value="marine_shipyard">Tersane & Liman (Tuzlu Deniz Suyu / Sis)</option>
          <option value="chemical_acid">Kimya & Galvaniz Tesisi (Asit / Kostik Buharı)</option>
          <option value="outdoor_windy">Açık Saha İnşaat / Rüzgarlı Şantiye</option>
        </select>
      </div>

      {/* Notes */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300">İlave Saha Notları / Şartname:</label>
        <input
          type="text"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Örn: Hassas boyalı gövde, çizilmemesi gerekiyor..."
          className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 disabled:opacity-50 transition-all font-mono"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isLoading ? 'Mühendislik Planı Hesaplanıyor...' : 'AI Ekipman Seçimi & Rigging Planı Üret'}</span>
        </button>
      </div>
    </form>
  );
};
