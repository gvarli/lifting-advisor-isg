import { CompiledReportData } from './types';

/**
 * Generates high-fidelity, printable HTML technical documentation for engineering and OHS audits.
 * Supports 100% UTF-8 Turkish character rendering (ç, ğ, ı, ö, ş, ü, İ, Ğ, Ş, Ö, Ç, Ü).
 */
export function generatePrintableHtml(report: CompiledReportData): string {
  const { metadata, items, generatedAt } = report;
  const formattedDate = new Date(generatedAt).toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const reportId = `LIFT-REP-${Date.now().toString().slice(-6)}`;

  const itemsHtml = items
    .map((item, index) => {
      const statusColor =
        item.safetyStatus === 'critical'
          ? '#dc2626'
          : item.safetyStatus === 'warning'
          ? '#d97706'
          : '#16a34a';

      const statusBg =
        item.safetyStatus === 'critical'
          ? '#fef2f2'
          : item.safetyStatus === 'warning'
          ? '#fffbeb'
          : '#f0fdf4';

      const statusBorder =
        item.safetyStatus === 'critical'
          ? '#f87171'
          : item.safetyStatus === 'warning'
          ? '#fde68a'
          : '#bbf7d0';

      const statusText =
        item.safetyStatus === 'critical'
          ? '🔴 KRİTİK TEHLİKE / RED'
          : item.safetyStatus === 'warning'
          ? '🟡 DİKKAT / ŞARTLI UYGUN'
          : '🟢 GÜVENLİ / STANDARDA UYGUN';

      let detailsRows = '';
      if (item.details && Object.keys(item.details).length > 0) {
        detailsRows = Object.entries(item.details)
          .map(([k, v]) => {
            const formattedVal =
              typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v);
            return `
              <tr>
                <td style="padding: 6px 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 40%; font-size: 12px;">${k}</td>
                <td style="padding: 6px 10px; border-bottom: 1px solid #e5e7eb; color: #111827; font-family: 'Courier New', monospace; font-size: 12px;">${formattedVal}</td>
              </tr>
            `;
          })
          .join('');
      }

      return `
        <div style="margin-bottom: 24px; border: 1px solid #d1d5db; border-radius: 6px; overflow: hidden; page-break-inside: avoid;">
          <div style="background-color: #f3f4f6; padding: 10px 14px; border-bottom: 1px solid #d1d5db; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 11px; font-weight: bold; color: #4b5563; text-transform: uppercase;">[KAYIT #${index + 1}] • ${item.moduleName || 'MÜHENDİSLİK HESABI'}</span>
              <h3 style="margin: 2px 0 0 0; font-size: 15px; font-weight: bold; color: #111827;">${item.title || item.moduleName}</h3>
            </div>
            <span style="display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; background-color: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder};">
              ${statusText}
            </span>
          </div>
          
          <div style="padding: 12px 14px;">
            <div style="background-color: #f8fafc; border-left: 3px solid #3b82f6; padding: 8px 12px; margin-bottom: 12px; font-size: 12px; color: #1e293b; line-height: 1.5;">
              <strong>Özet Değerlendirme:</strong> ${item.summary}
            </div>

            ${
              detailsRows
                ? `
                <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 8px;">
                  <tbody>
                    ${detailsRows}
                  </tbody>
                </table>
              `
                : ''
            }
          </div>
        </div>
      `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kaldırma Ekipmanları Teknik Bilgi Föyü - ${reportId}</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 20mm 15mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111827;
      background-color: #ffffff;
      margin: 0;
      padding: 20px;
      font-size: 13px;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      border-bottom: 2px solid #111827;
      padding-bottom: 12px;
    }
    .meta-box {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 12px 16px;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .meta-item {
      font-size: 12px;
    }
    .meta-label {
      color: #6b7280;
      font-size: 10px;
      text-transform: uppercase;
      font-weight: bold;
      display: block;
    }
    .meta-value {
      font-weight: 600;
      color: #111827;
      margin-top: 2px;
    }
    .disclaimer-box {
      margin-top: 30px;
      padding: 12px 16px;
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid #f59e0b;
      border-radius: 4px;
      font-size: 11px;
      color: #92400e;
      line-height: 1.5;
      page-break-inside: avoid;
    }
    .footer-note {
      margin-top: 20px;
      text-align: center;
      font-size: 10px;
      color: #9ca3af;
      border-top: 1px solid #e5e7eb;
      padding-top: 8px;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- Print Button Bar (Hidden in Print) -->
  <div class="no-print" style="margin-bottom: 20px; padding: 12px; background-color: #1e293b; color: #ffffff; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <strong>Teknik Bilgi Föyü Hazırlandı</strong> (Yazdırma ve PDF kaydetme için Ctrl+P / Cmd+P tuşlayabilir veya butona tıklayabilirsiniz)
    </div>
    <button onclick="window.print()" style="background-color: #eab308; color: #000; font-weight: bold; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 12px;">
      🖨️ PDF Olarak Yazdır / Kaydet
    </button>
  </div>

  <!-- Document Header -->
  <table class="header-table">
    <tr>
      <td style="vertical-align: middle;">
        <span style="font-size: 10px; font-weight: 800; color: #ca8a04; letter-spacing: 1.5px; text-transform: uppercase;">MÜHENDİSLİK & İSG TEKNİK RAPORU</span>
        <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 900; color: #0f172a; text-transform: uppercase;">Kaldırma Ekipmanları Analiz & Föy Özeti</h1>
      </td>
      <td style="text-align: right; vertical-align: middle;">
        <div style="font-size: 11px; color: #4b5563;">Rapor No: <strong>${reportId}</strong></div>
        <div style="font-size: 11px; color: #4b5563;">Tarih: <strong>${formattedDate}</strong></div>
        <div style="font-size: 10px; color: #9ca3af;">ISO 4309 • EN 818 • EN 13414 • EN 1492</div>
      </td>
    </tr>
  </table>

  <!-- Project & Site Metadata -->
  <div class="meta-box">
    <div class="meta-item">
      <span class="meta-label">Proje / İş Emri Adı</span>
      <div class="meta-value">${metadata.projectName || 'Genel Saha Kaldırma Operasyonu'}</div>
    </div>
    <div class="meta-item">
      <span class="meta-label">Lokasyon / Tesis / Saha</span>
      <div class="meta-value">${metadata.facilityLocation || 'Saha / Atölye'}</div>
    </div>
    <div class="meta-item">
      <span class="meta-label">Denetçi / Yetkili Mühendis</span>
      <div class="meta-value">${metadata.inspectorName || 'Sorumlu Mühendis / İSG Uzmanı'}</div>
    </div>
    <div class="meta-item">
      <span class="meta-label">Oturum Kayıt Sayısı</span>
      <div class="meta-value">${items.length} Adet Analiz / Hesaplama</div>
    </div>
    ${
      metadata.notes
        ? `
      <div class="meta-item" style="grid-column: span 2;">
        <span class="meta-label">Operasyon Notları / Ön Koşullar</span>
        <div class="meta-value" style="font-weight: normal; font-size: 11px; color: #374151;">${metadata.notes}</div>
      </div>
    `
        : ''
    }
  </div>

  <!-- Items Body -->
  <div>
    <h2 style="font-size: 14px; text-transform: uppercase; color: #374151; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
      Yapılan Mühendislik Hesapları ve Güvenlik Denetimleri
    </h2>

    ${
      items.length === 0
        ? '<p style="color: #6b7280; font-style: italic;">Oturumda henüz kaydedilmiş bir hesaplama bulunmamaktadır.</p>'
        : itemsHtml
    }
  </div>

  <!-- Mandatory Legal Disclaimer -->
  <div class="disclaimer-box">
    <strong>ÖNEMLİ MÜHENDİSLİK VE İSG YASAL BİLGİ NOTU:</strong><br>
    Bu belge, saha kaldırma operasyonlarında karar destek, açı gerilim analizi, hasar değerlendirme ve İSG farkındalığı amacıyla üretilmiş teknik bir danışmanlık özetidir. 6331 sayılı İSG Kanunu ve İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği uyarınca; operasyon öncesinde yükleme planı, zemin dayanımı, hava muhalefeti (rüzgar vb.) ve ekipman periyodik kontrol belgeleri Yetkili Kaldırma Sorumlusu (Appointed Person) ve A/B/C Sınıfı İSG Uzmanı tarafından yerinde fiziki olarak doğrulanmalıdır.
  </div>

  <!-- Footer -->
  <div class="footer-note">
    Kaldırma Ekipmanları İleri Seviye Mühendislik & İSG Danışman Uygulaması • Tamamen İstemci Taraflı Çevrimdışı Üretilmiştir
  </div>

</body>
</html>`;
}

/**
 * Triggers native browser print dialog for immediate PDF generation with full vector and Turkish fonts.
 */
export function printReport(report: CompiledReportData): void {
  const htmlContent = generatePrintableHtml(report);
  const printWindow = window.open('', '_blank', 'width=900,height=750');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    // Allow styles and resources to render before trigger
    setTimeout(() => {
      printWindow.focus();
    }, 300);
  } else {
    // Fallback: If popup is blocked, download as HTML file
    downloadHtmlReport(report);
  }
}

/**
 * Downloads a standalone, self-contained HTML technical report file with UTF-8 BOM.
 */
export function downloadHtmlReport(report: CompiledReportData): void {
  const htmlContent = generatePrintableHtml(report);
  const blob = new Blob(['\uFEFF' + htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `Lifting_Report_${(report.metadata.projectName || 'Genel')
    .replace(/[^a-zA-Z0-9_-]/g, '_')}_${new Date().toISOString().slice(0, 10)}.html`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
