'use client';

import React, { useState } from 'react';
import { CompiledReportData } from '@/lib/export/types';
import { generateCompactQrPayload, generateQrSvg } from '@/lib/export/qrGenerator';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { QrCode, X, Copy, Check, Smartphone, Info } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  report: CompiledReportData;
}

export function QrShareModal({ isOpen, onClose, report }: Props) {
  const { locale } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const qrPayload = generateCompactQrPayload(report);
  const qrSvgXml = generateQrSvg(qrPayload, 220);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(qrPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy QR payload:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-[#23314d] bg-[#111827] p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#23314d] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {locale === 'tr' ? 'Çevrimdışı QR Kod ile Paylaşım' : 'Offline QR Code Sharing'}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {locale === 'tr' ? 'İnternetsiz Kamera / Barkod Taraması' : 'Offline Camera / Barcode Scanning'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center py-4 bg-[#0a0f1d] rounded-xl border border-[#23314d]">
          <div
            className="p-4 bg-white rounded-xl shadow-inner border border-slate-300"
            dangerouslySetInnerHTML={{ __html: qrSvgXml }}
          />
          <div className="flex items-center gap-1.5 mt-3 text-xs text-cyan-400 font-medium">
            <Smartphone className="h-3.5 w-3.5" />
            <span>
              {locale === 'tr'
                ? 'Sahadaki telefon veya tablet kamerasıyla doğrudan okutun'
                : 'Scan directly with any smartphone camera on site'}
            </span>
          </div>
        </div>

        {/* Encoded Content Preview */}
        <div className="bg-[#0a0f1d] p-3 rounded-lg border border-[#23314d] text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>{locale === 'tr' ? 'QR İçerik Özeti (Metin)' : 'QR Payload Text'}</span>
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-sans"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">{locale === 'tr' ? 'Kopyalandı' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>{locale === 'tr' ? 'Kopyala' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-slate-300 whitespace-pre-wrap text-[11px] font-mono leading-relaxed bg-[#111827] p-2 rounded border border-[#1e293b]">
            {qrPayload}
          </pre>
        </div>

        {/* Field Tip Note */}
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            {locale === 'tr'
              ? 'QR kod tamamen cihazınızda matematiksel olarak üretilmiştir. Sahada hiçbir internet veya sunucu bağlantısı gerektirmez.'
              : 'The QR code is generated mathematically in your browser. Zero internet or external APIs required in the field.'}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
        >
          {locale === 'tr' ? 'Kapat' : 'Close'}
        </button>
      </div>
    </div>
  );
}
