'use client';

import React from 'react';
import { CompiledReportData } from '@/lib/export/types';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { FileText, Printer, Download, Share2, Copy } from 'lucide-react';

interface Props {
  report: CompiledReportData;
  onPrint: () => void;
  onDownloadHtml: () => void;
}

export function PrintableReportPreview({
  report,
  onPrint,
  onDownloadHtml,
}: Props) {
  const { locale } = useTranslation();
  const { metadata, items, generatedAt } = report;

  const formattedDate = new Date(generatedAt).toLocaleString(
    locale === 'tr' ? 'tr-TR' : 'en-US',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <div className="rounded-xl border border-[#23314d] bg-[#111827] p-5 shadow-lg space-y-4">
      {/* Header and Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23314d] pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-amber-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {locale === 'tr' ? 'Teknik Bilgi Föyü & Rapor Önizlemesi' : 'Technical Datasheet Preview'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-md"
          >
            <Printer className="h-3.5 w-3.5" />
            {locale === 'tr' ? 'Yazdır / PDF Olarak Kaydet' : 'Print / Save as PDF'}
          </button>

          <button
            onClick={onDownloadHtml}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700"
          >
            <Download className="h-3.5 w-3.5" />
            {locale === 'tr' ? '.HTML İndir' : 'Download .HTML'}
          </button>
        </div>
      </div>

      {/* Styled Document Sheet Preview */}
      <div className="rounded-xl border border-slate-700 bg-white text-slate-900 p-6 shadow-inner max-h-[600px] overflow-y-auto space-y-6">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-3 flex flex-wrap justify-between items-end gap-3">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest block">
              MÜHENDİSLİK & İSG TEKNİK BİLGİ FÖYÜ
            </span>
            <h1 className="text-lg font-black uppercase text-slate-900 tracking-tight">
              Kaldırma Ekipmanları Analiz & Güvenlik Raporu
            </h1>
          </div>
          <div className="text-right text-[11px] text-slate-600 font-mono">
            <div>Rapor No: <strong>LIFT-{Date.now().toString().slice(-6)}</strong></div>
            <div>Tarih: {formattedDate}</div>
            <div className="text-[10px] text-slate-500">TS EN 818 • EN 13414 • ISO 4309</div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded p-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              {locale === 'tr' ? 'Proje / Operasyon' : 'Project'}
            </span>
            <span className="font-semibold text-slate-800">
              {metadata.projectName || 'Genel Kaldırma Operasyonu'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              {locale === 'tr' ? 'Lokasyon / Tesis' : 'Facility'}
            </span>
            <span className="font-semibold text-slate-800">
              {metadata.facilityLocation || 'Saha / Atölye'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              {locale === 'tr' ? 'Sorumlu Mühendis / İSG' : 'Inspector'}
            </span>
            <span className="font-semibold text-slate-800">
              {metadata.inspectorName || 'Sorumlu Uzman'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              {locale === 'tr' ? 'Analiz Sayısı' : 'Record Count'}
            </span>
            <span className="font-semibold text-slate-800 font-mono">
              {items.length} {locale === 'tr' ? 'Adet' : 'Items'}
            </span>
          </div>

          {metadata.notes && (
            <div className="col-span-2 sm:col-span-4 border-t border-slate-200 pt-2 mt-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                {locale === 'tr' ? 'Saha Ön Koşulları / Notlar' : 'Notes'}
              </span>
              <span className="text-slate-700 text-xs">{metadata.notes}</span>
            </div>
          )}
        </div>

        {/* Items Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-slate-700 border-b border-slate-200 pb-1">
            {locale === 'tr'
              ? 'Yapılan Hesaplamalar ve Denetim Kayıtları'
              : 'Calculations and Audit Records'}
          </h3>

          {items.length === 0 ? (
            <p className="text-slate-500 italic text-xs py-4 text-center">
              {locale === 'tr'
                ? 'Görüntülenecek hesaplama kaydı bulunmuyor.'
                : 'No calculation records found.'}
            </p>
          ) : (
            items.map((item, idx) => {
              const statusClass =
                item.safetyStatus === 'critical'
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : item.safetyStatus === 'warning'
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-700';

              const statusText =
                item.safetyStatus === 'critical'
                  ? '🔴 KRİTİK RED'
                  : item.safetyStatus === 'warning'
                  ? '🟡 DİKKAT / ŞARTLI'
                  : '🟢 GÜVENLİ / UYGUN';

              return (
                <div
                  key={item.id}
                  className="border border-slate-300 rounded overflow-hidden"
                >
                  <div className="bg-slate-100 p-2.5 border-b border-slate-300 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                        #{idx + 1} • {item.moduleName}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {item.title}
                      </h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusClass}`}
                    >
                      {statusText}
                    </span>
                  </div>

                  <div className="p-3 text-xs space-y-2">
                    <p className="text-slate-700 bg-slate-50 p-2 rounded border-l-2 border-slate-400">
                      <strong>Değerlendirme:</strong> {item.summary}
                    </p>

                    {item.details && Object.keys(item.details).length > 0 && (
                      <table className="w-full text-[11px] border-collapse mt-2">
                        <tbody>
                          {Object.entries(item.details).map(([k, v]) => (
                            <tr key={k} className="border-b border-slate-200">
                              <td className="py-1 font-semibold text-slate-600 w-2/5">
                                {k}
                              </td>
                              <td className="py-1 font-mono text-slate-900">
                                {typeof v === 'object' && v !== null
                                  ? JSON.stringify(v)
                                  : String(v)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-3 rounded text-[11px] text-amber-900 leading-relaxed">
          <strong>ÖNEMLİ MÜHENDİSLİK VE İSG YASAL BİLGİ NOTU:</strong><br />
          Bu belge, saha kaldırma operasyonlarında karar destek, açı gerilim analizi, hasar değerlendirme ve İSG farkındalığı amacıyla üretilmiş teknik bir danışmanlık özetidir. 6331 sayılı İSG Kanunu ve İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği uyarınca; operasyon öncesinde yükleme planı, zemin dayanımı, hava muhalefeti (rüzgar vb.) ve ekipman periyodik kontrol belgeleri Yetkili Kaldırma Sorumlusu (Appointed Person) ve A/B/C Sınıfı İSG Uzmanı tarafından yerinde fiziki olarak doğrulanmalıdır.
        </div>
      </div>
    </div>
  );
}
