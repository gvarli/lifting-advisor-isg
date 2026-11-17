import { offlineStore } from '../offline/offlineStore';
import { ExportSessionItem } from './types';

const SESSION_CALCULATIONS_KEY = 'session_calculations';

export async function getSessionItems(): Promise<ExportSessionItem[]> {
  try {
    const rawItems = await offlineStore.getItem<any[]>(SESSION_CALCULATIONS_KEY);
    if (!Array.isArray(rawItems)) return [];

    return rawItems.map((raw, idx) => {
      // Normalize raw item to ExportSessionItem
      const details =
        raw.details ||
        {
          ...(raw.inputs ? { ...raw.inputs } : {}),
          ...(raw.outputs ? { ...raw.outputs } : {}),
        };

      return {
        id: raw.id || `item_${Date.now()}_${idx}`,
        timestamp: raw.timestamp || new Date().toISOString(),
        type: raw.type || (raw.moduleName?.includes('AI') ? 'ai_audit' : 'calculation'),
        title: raw.title || raw.moduleName || `Kayıt #${idx + 1}`,
        moduleName: raw.moduleName || 'Mühendislik Analizi',
        safetyStatus: raw.safetyStatus || 'safe',
        details: typeof details === 'object' && details !== null ? details : {},
        summary: raw.summary || raw.summaryMessage || 'Analiz tamamlandı.',
      };
    });
  } catch (error) {
    console.error('Failed to get session items:', error);
    return [];
  }
}

export async function addSessionItem(
  item: Omit<ExportSessionItem, 'id' | 'timestamp'>
): Promise<ExportSessionItem> {
  const currentItems = await getSessionItems();
  const newItem: ExportSessionItem = {
    ...item,
    id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toISOString(),
  };

  const updated = [newItem, ...currentItems];
  await offlineStore.setItem(SESSION_CALCULATIONS_KEY, updated);
  return newItem;
}

export async function removeSessionItem(id: string): Promise<void> {
  const currentItems = await getSessionItems();
  const updated = currentItems.filter((i) => i.id !== id);
  await offlineStore.setItem(SESSION_CALCULATIONS_KEY, updated);
}

export async function clearSessionItems(): Promise<void> {
  await offlineStore.setItem(SESSION_CALCULATIONS_KEY, []);
}

export async function loadDemoSessionData(): Promise<ExportSessionItem[]> {
  const demoItems: ExportSessionItem[] = [
    {
      id: `demo_1`,
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      type: 'calculation',
      moduleName: 'Çok Kollu Sapan Gerilim & Açı Analizi',
      title: 'Türbin Gövdesi 4 Kollu Zincir Sapan Kaldırması',
      safetyStatus: 'safe',
      summary: 'Toplam 18.5 ton yük için β=35° sapan açısında kol başına 6.64 ton gerilim hesaplandı. Grade 80 13mm zincir sapan uygun görüldü.',
      details: {
        'Yük Ağırlığı': '18.50 Ton',
        'Kol Sayısı': '4 Kol (Rijit kuralı: 3 kol taşır)',
        'Düşey Açı (β)': '35.0°',
        'Yük Çarpanı (KL)': '1.221',
        'Kol Başına Gerilim': '65.1 kN (6.64 Ton)',
        'Önerilen Sapan': 'Grade 80 - 13 mm (WLL: 6.70 Ton)',
        'Standart': 'TS EN 818-4 / EN 13414-1',
      },
    },
    {
      id: `demo_2`,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      type: 'calculation',
      moduleName: 'Asimetrik Ağırlık Merkezi (CoG) & Boy Eşitleme',
      title: 'Eksantrik Pres Kalıbı Asimetrik Askılama',
      safetyStatus: 'warning',
      summary: 'Ağırlık merkezi sola 0.8m kayık. Sol kola %73 (14.6 ton), sağ kola %27 (5.4 ton) yük binmektedir. Kollar eşitlenmelidir.',
      details: {
        'Toplam Ağırlık': '20.00 Ton',
        'Askı Mesafesi (D)': '3.00 m',
        'Sol Mesafe (d1)': '0.80 m',
        'Sağ Mesafe (d2)': '2.20 m',
        'Sol Kol Yükü (F1)': '14.67 Ton (%73.3)',
        'Sağ Kol Yükü (F2)': '5.33 Ton (%26.7)',
        'Durum / Tavsiye': 'Kısaltma kancası veya hidrolik dengeleme traversi kullanılmalı.',
      },
    },
    {
      id: `demo_3`,
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      type: 'ai_audit',
      moduleName: 'AI Görsel Kusur Denetimi & Hurda Kararı',
      title: 'Tersane Portal Vinci Ana Çelik Halat Muayenesi',
      safetyStatus: 'critical',
      summary: 'ISO 4309 standart kriterleri aşıldı: 6d boyunda 7 adet vadi kırığı ve lokal ezilme tespit edildi. DERHAL HURDAYA AYIRMA kararı verildi.',
      details: {
        'Ekipman Tipi': '6x36 WS-IWRC 28mm Çelik Tel Halat',
        'Kusur Tipi': 'Vadi Tel Kırıkları + Kuş Kafesi (Birdcaging)',
        'Kırık Sayısı': '6d boyunda 7 adet iç vadi kırığı',
        'İlgili Standart': 'ISO 4309:2017 Madde 5.3 & Tablo C.1',
        'Nihai Karar': 'DERHAL HURDAYA AYIR (Kullanım Yasak)',
        'İSG Önlemi': 'Halat derhal gerilimden çıkarılarak etiketlenmeli ve imha tutanağı tutulmalıdır.',
      },
    },
  ];

  await offlineStore.setItem(SESSION_CALCULATIONS_KEY, demoItems);
  return demoItems;
}
