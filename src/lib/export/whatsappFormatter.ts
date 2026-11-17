import { CompiledReportData } from './types';

export function formatWhatsAppSummary(report: CompiledReportData): string {
  const { metadata, items, generatedAt } = report;

  let text = `🏗️ *KALDIRMA EKİPMANLARI & İSG TEKNİK RAPORU*\n`;
  text += `📅 *Tarih:* ${new Date(generatedAt).toLocaleDateString('tr-TR')} ${new Date(generatedAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}\n`;
  if (metadata.projectName) text += `📌 *Proje:* ${metadata.projectName}\n`;
  if (metadata.facilityLocation) text += `📍 *Lokasyon:* ${metadata.facilityLocation}\n`;
  if (metadata.inspectorName) text += `👷 *Sorumlu:* ${metadata.inspectorName}\n`;
  text += `──────────────────\n\n`;

  if (items.length === 0) {
    text += `Kayıtlı aktif hesaplama bulunmuyor.\n`;
  } else {
    items.forEach((item, idx) => {
      const statusIcon =
        item.safetyStatus === 'critical'
          ? '🔴 [KRİTİK HATA / ISKARTA]'
          : item.safetyStatus === 'warning'
          ? '🟡 [UYARI / DİKKAT]'
          : '🟢 [GÜVENLİ / UYGUN]';

      text += `*${idx + 1}. ${item.moduleName || item.title}*\n`;
      text += `Durum: ${statusIcon}\n`;
      text += `Özet: ${item.summary}\n`;

      // Extract 2-3 most important values if available
      if (item.details) {
        if (item.details.tensionPerLegTon !== undefined) {
          text += `👉 Kola Binen Gerilim: *${item.details.tensionPerLegTon} Ton*\n`;
        }
        if (item.details.recommendedWllPerLegTon !== undefined) {
          text += `👉 Tavsiye Kol WLL: *≥ ${item.details.recommendedWllPerLegTon} Ton*\n`;
        }
        if (item.details.ratioDd !== undefined) {
          text += `👉 D/d Oranı: *${item.details.ratioDd}* (Verim: %${item.details.efficiencyPercentage})\n`;
        }
        if (item.details.windForceKn !== undefined) {
          text += `👉 Rüzgar İtme Kuvveti: *${item.details.windForceKn} kN*\n`;
        }
        if (item.details.verdict !== undefined) {
          text += `👉 AI Nihai Kararı: *${item.details.verdict}*\n`;
        }
      }

      text += `\n`;
    });
  }

  text += `──────────────────\n`;
  text += `⚖️ *Mevzuat:* 6331 İSG Kanunu & EN/ISO Normlarına Uygundur.\n`;
  text += `ℹ️ _Bu özet Kaldırma Danışmanı uygulamasıyla sahada anlık üretilmiştir._`;

  return text;
}

export async function copyWhatsAppTextToClipboard(report: CompiledReportData): Promise<boolean> {
  const text = formatWhatsAppSummary(report);
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export const copyWhatsAppReportToClipboard = copyWhatsAppTextToClipboard;

