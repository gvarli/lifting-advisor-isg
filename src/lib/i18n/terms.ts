export interface EngineeringTerm {
  code: string;
  name: {
    tr: string;
    en: string;
  };
  symbol?: string;
  unit?: string;
  definition: {
    tr: string;
    en: string;
  };
  formula?: string;
  standardRef?: string;
}

export const ENGINEERING_TERMS: Record<string, EngineeringTerm> = {
  WLL: {
    code: 'WLL',
    name: {
      tr: 'Çalışma Yük Sınırı',
      en: 'Working Load Limit'
    },
    symbol: 'WLL',
    unit: 't / kg / kN',
    definition: {
      tr: 'Bir kaldırma ekipmanının genel kaldırma işlemlerinde üreticisi tarafından onaylanan azami yük kapasitesidir.',
      en: 'The maximum mass or force which a piece of lifting equipment is authorized to support in general lifting service.'
    },
    standardRef: 'EN 1492 / EN 818 / ASME B30.9'
  },
  SWL: {
    code: 'SWL',
    name: {
      tr: 'Emniyetli Çalışma Yükü',
      en: 'Safe Working Load'
    },
    symbol: 'SWL',
    unit: 't / kg',
    definition: {
      tr: 'Belirli bir çalışma konfigürasyonu ve saha şartlarına göre belirlenen, çalışma koşulları kısıtlanmış güvenli yük değeridir.',
      en: 'A designated maximum working load of an item under specific working conditions and rigging geometry.'
    },
    standardRef: 'LOLER 1998 / ISO 4309'
  },
  MBL: {
    code: 'MBL',
    name: {
      tr: 'Minimum Kopma Yükü',
      en: 'Minimum Breaking Load'
    },
    symbol: 'MBL / MBF',
    unit: 'kN / t',
    definition: {
      tr: 'Tip testinde veya teknik şartnamede ekipmanın kopmadan önce karşılaması garanti edilen en düşük kırılma kuvvetidir.',
      en: 'The specified minimum load that the component must reach or exceed in a destructive tensile test before breaking.'
    },
    standardRef: 'EN 12385 / ISO 2408'
  },
  SF: {
    code: 'SF',
    name: {
      tr: 'Emniyet Katsayısı',
      en: 'Safety Factor (Design Factor)'
    },
    symbol: 'SF',
    unit: 'oran (örn. 5:1, 4:1, 7:1)',
    definition: {
      tr: 'Minimum kopma yükünün (MBL) çalışma yük sınırına (WLL) olan teorik oranıdır.',
      en: 'The theoretical ratio of Minimum Breaking Load (MBL) to Working Load Limit (WLL).'
    },
    formula: 'SF = MBL / WLL',
    standardRef: 'EN 1492 (7:1), EN 818-4 (4:1), EN 13414 (5:1)'
  },
  DD_RATIO: {
    code: 'DD_RATIO',
    name: {
      tr: 'D/d Bükülme Oranı',
      en: 'D/d Bending Ratio'
    },
    symbol: 'D/d',
    unit: 'oran',
    definition: {
      tr: 'Halatın veya sapanın büküldüğü tambur/pim çapının (D), halatın anma çapına (d) oranıdır. Düşük oran kalıcı deformasyon ve kapasite kaybı yaratır.',
      en: 'The ratio of the diameter around which the sling or wire rope is bent (D) to the nominal diameter of the rope (d).'
    },
    standardRef: 'ISO 4309 / ASME B30.9'
  },
  COG: {
    code: 'COG',
    name: {
      tr: 'Ağırlık Merkezi',
      en: 'Center of Gravity (CoG)'
    },
    symbol: 'CoG',
    unit: 'x, y, z koordinat',
    definition: {
      tr: 'Kaldırılan yükün kütle dağılımının dengelendiği üç boyutlu sanal merkez noktasıdır.',
      en: 'The hypothetical point where the entire weight of the load is assumed to be concentrated and balanced.'
    }
  },
  DAF: {
    code: 'DAF',
    name: {
      tr: 'Dinamik Büyütme Faktörü',
      en: 'Dynamic Amplification Factor (DAF)'
    },
    symbol: 'DAF / ψ',
    unit: 'çarpan (örn. 1.1 - 1.5)',
    definition: {
      tr: 'Ani kalkış, frenleme veya rüzgar gibi dinamik darbelerin statik yük üzerine eklediği ilave yük faktörüdür.',
      en: 'A factor multiplying static forces to account for acceleration, deceleration, and inertia shock loads during hoisting.'
    },
    standardRef: 'EN 13001-2 / DNV-ST-N001'
  },
  BIRD_CAGING: {
    code: 'BIRD_CAGING',
    name: {
      tr: 'Kuş Kafesi Deformasyonu',
      en: 'Birdcaging'
    },
    symbol: 'BC',
    definition: {
      tr: 'Çelik halatın aniden boşalması veya ters burulması sonucu dış demetlerin açılarak kafes şeklini almasıdır. Ekipmanın derhal ıskartaya ayrılmasını gerektirir.',
      en: 'A severe structural failure in wire ropes where outer strands buckle outward from shock unloading or severe twisting. Demands immediate rejection.'
    },
    standardRef: 'ISO 4309 (Madde 5.6)'
  },
  WIRE_ROPE_CLIP: {
    code: 'WIRE_ROPE_CLIP',
    name: {
      tr: 'Halat Klemensi',
      en: 'Wire Rope Clip / Clamp'
    },
    symbol: 'Klemens',
    definition: {
      tr: 'Halat uç bağlantılarında kullanılan U-cıvatalı veya dövme bağlantı elemanıdır. Yük taşıyan gövde her zaman canlı (yük çeken) kola takılmalıdır.',
      en: 'A mechanical fitting with U-bolt and saddle used to form an eye termination. Saddle must always rest on live load-bearing side.'
    },
    standardRef: 'EN 13411-5 / US Federal Spec FF-C-450'
  },
  THIMBLE: {
    code: 'THIMBLE',
    name: {
      tr: 'Radansa',
      en: 'Thimble'
    },
    symbol: 'Radansa',
    definition: {
      tr: 'Halat veya sapan gözünün iç kısmını aşınmaya, ezilmeye ve aşırı bükülmeye karşı koruyan metal yivli takviye halkasıdır.',
      en: 'A grooved metallic insert placed inside a sling eye to preserve rope curvature and prevent crushing and abrasive wear.'
    },
    standardRef: 'EN 13411-1 / DIN 6899'
  },
  SHACKLE: {
    code: 'SHACKLE',
    name: {
      tr: 'Kaldırma Mapası (Kilit)',
      en: 'Lifting Shackle (Bow / Dee)'
    },
    symbol: 'Mapa',
    definition: {
      tr: 'Kaldırma kancası ile sapan bağlantısını sağlayan U veya omega gövdeli, pimli dövme çelik emniyet kilididir.',
      en: 'A U-shaped or omega-shaped forged steel connector secured with a clevis pin or bolt for lifting rigging.'
    },
    standardRef: 'EN 13889 / US Fed Spec RR-C-271'
  },
  EYEBOLT: {
    code: 'EYEBOLT',
    name: {
      tr: 'Aybolt (Gözlü Cıvata)',
      en: 'Eyebolt'
    },
    symbol: 'Aybolt',
    definition: {
      tr: 'Yüklerin üzerine diş açılarak sabitlenen döküm veya dövme halkalı bağlantı elemanıdır. Açı altında WLL değeri ciddi oranda düşer.',
      en: 'A threaded fastener terminating in a forged loop. Capacity degrades significantly when loaded at an angle.'
    },
    standardRef: 'DIN 580 / EN ISO 3266'
  }
};
