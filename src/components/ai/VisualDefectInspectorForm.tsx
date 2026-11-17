'use client';

import React, { useState, useRef } from 'react';
import { VisualDefectInspectorInput } from '@/types/ai';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Camera, Upload, X, Sparkles, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface VisualDefectInspectorFormProps {
  onSubmit: (inputs: VisualDefectInspectorInput) => void;
  isLoading: boolean;
}

export const VisualDefectInspectorForm: React.FC<VisualDefectInspectorFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { locale } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [equipmentType, setEquipmentType] = useState<any>('wire_rope');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [observedDefectNotes, setObservedDefectNotes] = useState<string>(
    'Halat tambur girişinde dış tellerde açılma ve ezilme görünüyor.'
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImageBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      equipmentType,
      imageBase64: imageBase64 || undefined,
      observedDefectNotes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] rounded-xl border border-[#23314d] p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#23314d] pb-3">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Görsel Hasar Tespiti & Hurda Karar Destek (Vision AI)
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
          ISO 4309 & EN 1492 Normu
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Equipment Category Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">İncelenen Ekipman Türü:</label>
          <select
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          >
            <option value="wire_rope">Çelik Tel Halat (Vinç Halatı / Sapan)</option>
            <option value="chain">Kaldırma Zinciri & Baklaları (Grade 80/100)</option>
            <option value="textile_sling">Tekstil / Polyester Bez Sapan</option>
            <option value="hook">Dövme Kaldırma Kancası (Emniyet Mandallı)</option>
            <option value="shackle">Dövme Mapa / Bağlantı Kilidi</option>
            <option value="drum">Vinç Tamburu / Yiv Makarası</option>
          </select>
        </div>

        {/* Observed Defect Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Sahada Gözlenen Kusur / Belirti:</label>
          <input
            type="text"
            value={observedDefectNotes}
            onChange={(e) => setObservedDefectNotes(e.target.value)}
            placeholder="Örn: 6d boyunda 10 tel kırığı, ezilme izi..."
            className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#23314d] text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Drag & Drop or Camera Capture Box */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Ekipman Fotoğrafı Yükle / Kamera:</label>

        {imageBase64 ? (
          <div className="relative rounded-xl border border-purple-500/50 bg-[#0b0f19] p-3 flex flex-col items-center justify-center">
            <img
              src={imageBase64}
              alt="Uploaded Equipment Defect"
              className="max-h-56 rounded-lg object-contain shadow-lg"
            />
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-500 shadow-md transition-colors"
              title="Fotoğrafı Kaldır"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-mono text-emerald-400 mt-2 font-bold">
              Fotoğraf başarıyla yüklendi • AI analizine hazır
            </span>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl border-2 border-dashed border-[#23314d] hover:border-purple-500/80 bg-[#131b2e]/40 p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-[#131b2e]"
          >
            <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 mb-2">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-white">
              Saha fotoğrafını sürükleyin veya cihazdan seçin
            </p>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">
              Mobil cihazlarda doğrudan kamera açılır (JPG, PNG, WEBP)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 disabled:opacity-50 transition-all font-mono"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isLoading ? 'Görsel Kusurlar Taranıyor...' : 'AI Görsel Kusur Denetimini Başlat'}</span>
        </button>
      </div>
    </form>
  );
};
