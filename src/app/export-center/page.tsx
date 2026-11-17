'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/i18n-context';
import {
  ProjectMetadata,
  ExportSessionItem,
  CompiledReportData,
} from '@/lib/export/types';
import {
  getSessionItems,
  removeSessionItem,
  clearSessionItems,
  loadDemoSessionData,
} from '@/lib/export/sessionStore';
import { printReport, downloadHtmlReport } from '@/lib/export/pdfExporter';
import { downloadMarkdownReport } from '@/lib/export/markdownExporter';
import { copyWhatsAppReportToClipboard } from '@/lib/export/whatsappFormatter';
import { ProjectMetadataHeader } from '@/components/export/ProjectMetadataHeader';
import { ExportBasketViewer } from '@/components/export/ExportBasketViewer';
import { PrintableReportPreview } from '@/components/export/PrintableReportPreview';
import { QrShareModal } from '@/components/export/QrShareModal';
import {
  FileSpreadsheet,
  Printer,
  FileDown,
  MessageSquare,
  QrCode,
  Check,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function ExportCenterPage() {
  const { t, locale } = useTranslation();

  const [metadata, setMetadata] = useState<ProjectMetadata>({
    projectName: '',
    facilityLocation: '',
    inspectorName: '',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
  });

  const [items, setItems] = useState<ExportSessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappCopied, setWhatsappCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Load session items on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const sessionData = await getSessionItems();
      setItems(sessionData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleRemoveItem = async (id: string) => {
    await removeSessionItem(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearAll = async () => {
    if (
      window.confirm(
        locale === 'tr'
          ? 'Oturumdaki tüm hesaplama ve denetim kayıtları temizlensin mi?'
          : 'Clear all session calculations and audits?'
      )
    ) {
      await clearSessionItems();
      setItems([]);
    }
  };

  const handleLoadDemo = async () => {
    const demoItems = await loadDemoSessionData();
    setItems(demoItems);
    setMetadata({
      projectName: 'Tersane Ağır Kaldırma & Portal Vinç Operasyonu',
      facilityLocation: 'İzmir Aliağa Gemi İnşa & Söküm Bölgesi',
      inspectorName: 'Engin Vural (Baş Denetçi / Appointed Person)',
      date: new Date().toISOString().slice(0, 10),
      notes:
        'Kaldırma sahasında azami rüzgar hızı 9.5 m/s ölçüldü. Sapan açısı 35 derecede sabitlendi. Zemin çelik saç plakalarla takviye edildi.',
    });
  };

  const compiledReport: CompiledReportData = {
    metadata,
    items,
    generatedAt: new Date().toISOString(),
  };

  const handlePrint = () => {
    printReport(compiledReport);
  };

  const handleDownloadHtml = () => {
    downloadHtmlReport(compiledReport);
  };

  const handleDownloadMarkdown = () => {
    downloadMarkdownReport(compiledReport);
  };

  const handleCopyWhatsApp = async () => {
    const success = await copyWhatsAppReportToClipboard(compiledReport);
    if (success) {
      setWhatsappCopied(true);
      setTimeout(() => setWhatsappCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="border-b border-[#23314d] pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                [Modül 05] • Rapor & Çıktı Merkezi
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {t('nav.exportCenter.title')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <span>{locale === 'tr' ? 'Hesap Makinesine Git' : 'Go to Calculator'}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          {locale === 'tr'
            ? 'Oturum boyunca yapılan hesaplamalar, AI denetimleri ve ekipman seçimleri sıfır veritabanı ile bellekte toplanır. Tek tıkla PDF, Word uyumlu Markdown, WhatsApp formatı veya internetsiz QR kod olarak dışa aktarabilirsiniz.'
            : 'All calculations, AI audits, and equipment specs made during this session are gathered in-memory with zero database. Export instantly as PDF, Word-compatible Markdown, WhatsApp format, or offline QR Code.'}
        </p>
      </div>

      {/* 4 Quick Export Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* [1] PDF / Printable Technical Datasheet */}
        <button
          onClick={handlePrint}
          className="group relative flex flex-col items-start p-4 rounded-xl border border-[#23314d] bg-[#111827] hover:border-amber-400/60 hover:bg-[#141e33] transition-all text-left shadow-lg"
        >
          <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30 mb-3 group-hover:scale-105 transition-transform">
            <Printer className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
            {locale === 'tr' ? '1. Teknik Föy (PDF/Yazdır)' : '1. Technical Sheet (PDF)'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
            {locale === 'tr'
              ? 'Türkçe karakter uyumlu, yüksek çözünürlüklü A4 teknik bilgi föyü ve yazdırma.'
              : 'Print-ready A4 datasheet with UTF-8 Turkish fonts & legal disclaimer.'}
          </p>
          <span className="mt-3 text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
            <span>{locale === 'tr' ? 'PDF OLUŞTUR' : 'GENERATE PDF'}</span> →
          </span>
        </button>

        {/* [2] Markdown / Word Compatible */}
        <button
          onClick={handleDownloadMarkdown}
          className="group relative flex flex-col items-start p-4 rounded-xl border border-[#23314d] bg-[#111827] hover:border-blue-400/60 hover:bg-[#141e33] transition-all text-left shadow-lg"
        >
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-3 group-hover:scale-105 transition-transform">
            <FileDown className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
            {locale === 'tr' ? '2. Markdown (.md) / Word' : '2. Markdown (.md) / Word'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
            {locale === 'tr'
              ? 'UTF-8 BOM gömülü, Microsoft Word ve rapor dokümanlarında doğrudan açılabilir.'
              : 'Word-compatible UTF-8 BOM Markdown for documentation & specs.'}
          </p>
          <span className="mt-3 text-[10px] font-mono text-blue-400 font-bold flex items-center gap-1">
            <span>{locale === 'tr' ? '.MD İNDİR' : 'DOWNLOAD .MD'}</span> →
          </span>
        </button>

        {/* [3] WhatsApp / Email Clipboard */}
        <button
          onClick={handleCopyWhatsApp}
          className="group relative flex flex-col items-start p-4 rounded-xl border border-[#23314d] bg-[#111827] hover:border-emerald-400/60 hover:bg-[#141e33] transition-all text-left shadow-lg"
        >
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3 group-hover:scale-105 transition-transform">
            {whatsappCopied ? (
              <Check className="h-5 w-5 text-emerald-400" />
            ) : (
              <MessageSquare className="h-5 w-5" />
            )}
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
            {locale === 'tr' ? '3. WhatsApp / E-Posta' : '3. WhatsApp / Email'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
            {locale === 'tr'
              ? 'Saha ekibine anında mesaj olarak gönderilebilecek emoji ve başlıklı temiz metin.'
              : 'Clean formatted text with emojis, ready to paste into chat or email.'}
          </p>
          <span className="mt-3 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
            <span>
              {whatsappCopied
                ? locale === 'tr'
                  ? 'KOPYALANDI!'
                  : 'COPIED!'
                : locale === 'tr'
                ? 'PANOYA KOPYALA'
                : 'COPY TO CLIPBOARD'}
            </span>
          </span>
        </button>

        {/* [4] Offline QR Code Sharing */}
        <button
          onClick={() => setQrModalOpen(true)}
          className="group relative flex flex-col items-start p-4 rounded-xl border border-[#23314d] bg-[#111827] hover:border-purple-400/60 hover:bg-[#141e33] transition-all text-left shadow-lg"
        >
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 mb-3 group-hover:scale-105 transition-transform">
            <QrCode className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
            {locale === 'tr' ? '4. İnternetsiz QR Paylaşım' : '4. Offline QR Sharing'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
            {locale === 'tr'
              ? 'Sahada ekranda QR kod göstererek diğer telefon/tabletlerle anında paylaşın.'
              : 'Display on-screen offline QR code to share with other field smartphones.'}
          </p>
          <span className="mt-3 text-[10px] font-mono text-purple-400 font-bold flex items-center gap-1">
            <span>{locale === 'tr' ? 'QR KOD GÖSTER' : 'SHOW QR CODE'}</span> →
          </span>
        </button>
      </div>

      {/* Project Metadata Header Inputs */}
      <ProjectMetadataHeader metadata={metadata} onChange={setMetadata} />

      {/* Export Basket Viewer (Session items) */}
      <ExportBasketViewer
        items={items}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        onLoadDemo={handleLoadDemo}
      />

      {/* Printable Report Preview */}
      <PrintableReportPreview
        report={compiledReport}
        onPrint={handlePrint}
        onDownloadHtml={handleDownloadHtml}
      />

      {/* QR Code Modal */}
      <QrShareModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        report={compiledReport}
      />
    </div>
  );
}
