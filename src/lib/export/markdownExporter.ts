import { CompiledReportData } from './types';

export function generateMarkdownReport(report: CompiledReportData): string {
  const { metadata, items, generatedAt } = report;

  let md = '';

  // Title & Metadata
  md += `# KALDIRMA EKİPMANLARI & İSG MÜHENDİSLİK TEKNİK RAPORU\n\n`;
  md += `> **Rapor Tarihi:** ${new Date(generatedAt).toLocaleString('tr-TR')}\n`;
  md += `> **Proje / Tesis:** ${metadata.projectName || 'Genel Saha Operasyonu'}\n`;
  md += `> **Lokasyon:** ${metadata.facilityLocation || 'Belirtilmedi'}\n`;
  md += `> **Denetçi / Mühendis:** ${metadata.inspectorName || 'Saha Sorumlusu'}\n\n`;

  if (metadata.notes) {
    md += `### Genel Notlar:\n${metadata.notes}\n\n`;
  }

  md += `---\n\n`;
  md += `## 1. OTURUM HESAPLAMA VE DENETİM ÖZETİ\n\n`;
  md += `Bu raporda toplam **${items.length} adet** mühendislik hesabı ve denetim kaydı derlenmiştir.\n\n`;

  // Item List
  items.forEach((item, idx) => {
    const statusEmoji =
      item.safetyStatus === 'critical'
        ? '🔴 KRİTİK TEHLİKE'
        : item.safetyStatus === 'warning'
        ? '🟡 DİKKAT / UYARI'
        : '🟢 GÜVENLİ / UYGUN';

    md += `### [${idx + 1}] ${item.moduleName || item.title}\n\n`;
    md += `- **Güvenlik Durumu:** ${statusEmoji}\n`;
    md += `- **Kayıt Zamanı:** ${new Date(item.timestamp).toLocaleTimeString('tr-TR')}\n`;
    md += `- **Özet:** ${item.summary}\n\n`;

    if (item.details && Object.keys(item.details).length > 0) {
      md += `#### Parametreler ve Çıktılar:\n\n`;
      md += `| Parametre | Değer |\n`;
      md += `| :--- | :--- |\n`;

      for (const [key, val] of Object.entries(item.details)) {
        if (typeof val === 'object' && val !== null) {
          md += `| **${key}** | \`${JSON.stringify(val)}\` |\n`;
        } else {
          md += `| **${key}** | ${val} |\n`;
        }
      }
      md += `\n`;
    }

    md += `---\n\n`;
  });

  // Regulatory Standards Reference
  md += `## 2. İLGİLİ MEVZUAT VE STANDARTLAR\n\n`;
  md += `- **6331 Sayılı İş Sağlığı ve Güvenliği Kanunu** (Madde 4, Madde 10, Madde 13)\n`;
  md += `- **İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği** (EK-II Madde 3, EK-III Tablo 2)\n`;
  md += `- **TS EN 13414-1** (Çelik Tel Halat Sapanlar - SF 5:1)\n`;
  md += `- **TS EN 818-4** (Kısa Baklalı Zincir Sapanlar - SF 4:1)\n`;
  md += `- **TS EN 1492-1 / 1492-2** (Tekstil ve Yuvarlak Bez Sapanlar - SF 7:1)\n`;
  md += `- **TS EN 13889** (Dövme Çelik Kaldırma Mapaları - SF 6:1)\n`;
  md += `- **TS ISO 4309** (Vinçler - Tel Halatlar - Hurdaya Ayırma Kriterleri)\n\n`;

  // Legal Disclaimer
  md += `> [!IMPORTANT]\n`;
  md += `> **YASAL UYARI VE MÜHENDİSLİK BİLGİ NOTU:**\n`;
  md += `> Bu teknik belge, saha operasyonlarında mühendislik ve İSG karar destek danışmanlığı amacıyla oluşturulmuştur. Nihai operasyon yetkili kaldırma yöneticisi (Appointed Person / Rigging Supervisor) ve onaylı periyodik kontrol raporu (EKİPNET) eşliğinde icra edilmelidir.\n`;

  return md;
}

/**
 * Downloads generated Markdown as a .md file with UTF-8 BOM
 * UTF-8 BOM (\uFEFF) ensures Microsoft Word, Notepad and Excel open Turkish chars (ş, ğ, ü, ö, ç, İ, ı) without corruption.
 */
export function downloadMarkdownFile(report: CompiledReportData, filename?: string) {
  const content = generateMarkdownReport(report);
  const bom = '\uFEFF';
  const blob = new Blob([bom + content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const cleanName = filename || `Kaldirma_Teknik_Raporu_${new Date().toISOString().slice(0, 10)}.md`;
  const a = document.createElement('a');
  a.href = url;
  a.download = cleanName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const downloadMarkdownReport = downloadMarkdownFile;

