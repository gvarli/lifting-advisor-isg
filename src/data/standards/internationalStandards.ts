export interface InternationalStandardDoc {
  code: string;
  organization: 'EN' | 'ISO' | 'ASME' | 'LOLER' | 'LEEA';
  title: { tr: string; en: string };
  scope: string;
  safetyFactorRule: string;
  inspectionIntervalRule: string;
  criticalHighlights: { tr: string[]; en: string[] };
}

export const internationalStandardsData: InternationalStandardDoc[] = [
  {
    code: 'TS EN 13414-1',
    organization: 'EN',
    title: {
      tr: 'Çelik Tel Halat Sapanlar - Genel Kaldırma Hizmetleri İçin Emniyet',
      en: 'Steel Wire Rope Slings - Safety for General Lifting Service'
    },
    scope: 'Çelik tel halat sapanların tasarımı, pres alüminyum yüksükler, elle örgü terminasyonlar ve katsayılar.',
    safetyFactorRule: '5:1 (Minimum kopma kuvveti WLL değerinin 5 katı olmalıdır)',
    inspectionIntervalRule: 'Kullanım sıklığına göre en az yılda 1 kez; ağır şantiye şartlarında 3-6 ayda bir.',
    criticalHighlights: {
      tr: [
        'Kollar arası açıklık açısı 120 dereceyi (dikey eksenle 60°) asla aşamaz.',
        'Pres kovanlarda EN 13411-3 standardına uygun soğuk akışlı alüminyum veya çelik yüksük zorunludur.',
        'Sapan boyunda kalıcı marka etiketi (WLL, CE, seri no, kol sayısı) zorunludur.'
      ],
      en: [
        'Included angle between sling legs must not exceed 120° (vertical angle max 60°).',
        'Pressed ferrules must comply with EN 13411-3 hydraulic cold-flow standards.',
        'Permanent identification tag with WLL, CE mark, and serial number is mandatory.'
      ]
    }
  },
  {
    code: 'TS EN 818-4',
    organization: 'EN',
    title: {
      tr: 'Kısa Baklalı Kaldırma Zincirleri - Sapanlar - Grade 80',
      en: 'Short Link Chain for Lifting - Chain Slings - Grade 80'
    },
    scope: 'Grade 80 alaşımlı çelik zincir sapanların birleştirilmesi, kısaltma kancaları ve WLL derecelendirmesi.',
    safetyFactorRule: '4:1 (Grade 80, Grade 100 ve Grade 120 için zorunlu tasarım katsayısı)',
    inspectionIntervalRule: 'Azami 12 ayda bir yetkili uzman muayenesi; her 3 yılda bir tahribatsız çatlak testi (NDT) veya proof load testi.',
    criticalHighlights: {
      tr: [
        'Rijit yüklerde 3 ve 4 kollu sapanların sadece 2 kolunun yük taşıdığı kabul edilir.',
        'Bakla anma çapında %10 aşınma veya bakla adımında %5 uzama doğrudan hurdaya ayırma nedenidir.',
        '400°C üzerinde Grade 80 kullanımı KESİNLİKLE YASAKTIR.'
      ],
      en: [
        'On rigid loads, multi-leg slings (3 & 4 legs) are rated as only 2 load-bearing legs.',
        'Interlink wear exceeding 10% or pitch elongation exceeding 5% demands immediate discard.',
        'Operation above 400°C is strictly prohibited for Grade 80 chain.'
      ]
    }
  },
  {
    code: 'TS EN 1492-1 / 1492-2',
    organization: 'EN',
    title: {
      tr: 'Tekstil Sapanlar - Dokuma Yassı Bez Sapanlar ve Sonsuz Yuvarlak Sapanlar',
      en: 'Textile Slings - Flat Woven Webbing & Roundslings'
    },
    scope: 'Yüksek mukavemetli sentetik liflerden (Polyester, Poliamid, Polipropilen) imal sapanlar.',
    safetyFactorRule: '7:1 (Kopma yükü WLL değerinin 7 katı olmak zorundadır)',
    inspectionIntervalRule: 'Azami 12 ayda bir akredite kontrol; her vardiya başında görsel muayene zorunludur.',
    criticalHighlights: {
      tr: [
        'Standartlaştırılmış renk kodları: Mor (1t), Yeşil (2t), Sarı (3t), Gri (4t), Kırmızı (5t), Kahve (6t), Mavi (8t), Turuncu (10t+).',
        'Mavi tanıtım etiketi olmayan veya kenarında kesik olan sapan anında imha edilir.',
        '100°C üzeri sıcaklıkta erir; keskin kenarlarda korumasız kullanımı yasaktır.'
      ],
      en: [
        'Standardized color codes from Violet (1t) to Orange (10t+).',
        'Untagged slings or any sling with edge cuts must be destroyed immediately.',
        'Melts above 100°C; prohibited over sharp corners without engineered sleeves.'
      ]
    }
  },
  {
    code: 'ISO 4309',
    organization: 'ISO',
    title: {
      tr: 'Vinçler - Tel Halatlar - Bakım, Muayene ve Hurdaya Ayırma Kriterleri',
      en: 'Cranes - Wire Ropes - Care, Maintenance, Inspection & Discard'
    },
    scope: 'Çelik tel halatların görsel, boyutsal ve manyetik (MRT) muayenesi ve hurda değerlendirme puanlama sistemi.',
    safetyFactorRule: '5:1 (Genel) / 6:1 (Personel/Kule vinci)',
    inspectionIntervalRule: 'Aylık rutin muayene; 6-12 ayda bir detaylı mühendislik denetimi.',
    criticalHighlights: {
      tr: [
        '6d ve 30d boyunda izin verilen tel kırığı sayıları (Tablo 3 / Tablo 4).',
        'Halat anma çapında %7 ve üzeri kalıcı çap kaybı doğrudan hurda nedenidir.',
        'Kuş kafesi (birdcaging), burgu bozulması veya sepetleşme anında ıskarta gerektirir.'
      ],
      en: [
        'Tabulated permissible broken wire limits over 6d and 30d lay lengths.',
        'Diameter reduction exceeding 7% of nominal diameter warrants immediate condemnation.',
        'Birdcaging, severe kinking, or core pop-out triggers instant rejection.'
      ]
    }
  },
  {
    code: 'ASME B30.9',
    organization: 'ASME',
    title: {
      tr: 'Sapanlar (Slings) - Amerikan Ulusal Standardı',
      en: 'Slings - American National Standard'
    },
    scope: 'Alaşımlı zincir, tel halat, metal hasır, sentetik dokuma ve sentetik yuvarlak sapanların imalat ve muayenesi.',
    safetyFactorRule: '5:1 (Tel halat), 4:1 (Zincir), 5:1 (Sentetik ASME kuralı - EN 7:1\'e kıyasla farklıdır)',
    inspectionIntervalRule: 'İlk kullanım öncesi, her vardiya öncesi (Frequent Inspection) ve yılda en az 1 kez (Periodic Inspection).',
    criticalHighlights: {
      tr: [
        'ASME B30.9 uyarınca yatay sapan açısı 30 derecenin (dikey 60°) altına düşemez.',
        'Sapan tanıtım etiketinde WLL değerinin doğrudan düz, boğma ve sepet değerleri yazmalıdır.',
        'Yetkili Personel (Designated/Qualified Person) tarafından yazılı muayene kaydı tutulması zorunludur.'
      ],
      en: [
        'Horizontal sling angle must not dip below 30 degrees (vertical angle > 60° prohibited).',
        'Sling identification tag must state WLL ratings for vertical, choker, and basket hitches.',
        'Periodic inspections must be documented by a designated qualified rigger.'
      ]
    }
  },
  {
    code: 'ASME B30.26',
    organization: 'ASME',
    title: {
      tr: 'Bağlama Donanımları (Rigging Hardware) - Mapalar, Gerdirmeler, Klemensler',
      en: 'Rigging Hardware - Shackles, Turnbuckles, Wire Rope Clips'
    },
    scope: 'Mapalar, mapa pimi emniyet sistemleri, U-cıvata halat klemensleri, radansalar ve halkalar.',
    safetyFactorRule: '5:1 veya 6:1 (Dövme alaşımlı çelik kilitler için)',
    inspectionIntervalRule: 'Her vardiya öncesi operatör kontrolü; yıllık dokümante periyodik kontrol.',
    criticalHighlights: {
      tr: [
        'Dövme gövde üzerinde üretici adı/logosu, anma WLL ve gövde boyutu kabartma olmalıdır.',
        'Pim gövdeye tam oturmalı; vidalı pimli kilitlerde pim çeyrek tur geri gevşetilmelidir.',
        'Gövde çene açıklığında %10 genişleme doğrudan hurdaya ayırma sebebidir.'
      ],
      en: [
        'Body must exhibit raised forged markings of trademark, rated load, and size.',
        'Pins must thread fully; screw pins backed off 1/4 turn to relieve binding.',
        'Throat opening spread exceeding 10% warrants immediate rejection.'
      ]
    }
  },
  {
    code: 'LOLER 1998',
    organization: 'LOLER',
    title: {
      tr: 'Lifting Operations and Lifting Equipment Regulations 1998 (Birleşik Krallık)',
      en: 'Lifting Operations and Lifting Equipment Regulations 1998 (UK HSE)'
    },
    scope: 'Tüm kaldırma operasyonlarının planlanması (Lifting Plan), gözetimi ve 6 / 12 aylık muayene rejimleri.',
    safetyFactorRule: 'Avrupa Makine Direktifi (2006/42/EC) ile uyumlu tasarım katsayıları',
    inspectionIntervalRule: 'Kaldırma Aksesuarları ve İnsan Kaldırma: 6 AY; Kaldırma Makineleri: 12 AY',
    criticalHighlights: {
      tr: [
        '6 AY KURALI: Tüm sapanlar, mapalar, kancalar ve personel sepetleri en geç 6 AYDA BİR yetkin kişi (Competent Person) tarafından denetlenmelidir.',
        '12 AY KURALI: Tavan vinçleri, mobil vinçler ve caraskallar en geç 12 ayda bir detaylı muayeneden geçer.',
        'Lifting Plan (Kaldırma Planı) zorunludur: Her operasyon uygun şekilde planlanmalı, yetkin kişilerce denetlenmeli ve güvenli icra edilmelidir.'
      ],
      en: [
        '6-MONTH RULE: All lifting accessories and man-riding gear must be thoroughly examined every 6 months.',
        '12-MONTH RULE: Lifting machines and cranes must be examined at least every 12 months.',
        'Mandatory Lifting Plan: Every lift must be properly planned by an Appointed Person, appropriately supervised, and carried out safely.'
      ]
    }
  },
  {
    code: 'LEEA COPSULE',
    organization: 'LEEA',
    title: {
      tr: 'Code of Practice for the Safe Use of Lifting Equipment (LEEA Uygulama Kodu)',
      en: 'Code of Practice for the Safe Use of Lifting Equipment (LEEA COPSULE)'
    },
    scope: 'Uluslararası kaldırma mühendisleri birliği tarafından derlenen dünya genelinde en saygın kabul edilen kılavuz.',
    safetyFactorRule: 'Uluslararası EN ve ISO standartlarıyla tam uyumlu',
    inspectionIntervalRule: 'Saha risk değerlendirmesine göre belirlenen dinamik muayene periyotları.',
    criticalHighlights: {
      tr: [
        'Yetkin Kişi (Competent Person) pratik ve teorik bağımsız sınavlardan geçmiş olmalıdır.',
        'Saha kaldırma renk kodu sistemi (Color Coding Scheme): Sahadaki ekipmanlar 6 ayda bir renkli boya veya plastik kelepçe ile etiketlenerek kontrol durumu anlık görünür kılınır.',
        'Kusurlu bulunan ekipman sahada tutulamaz; derhal hurda karantinasına alınır ve fiziksel olarak imha edilir.'
      ],
      en: [
        'Competent persons must possess accredited practical and theoretical certification.',
        'Rigging Color Coding Scheme: Six-monthly rotating color bands visibly identify compliant gear.',
        'Defective items must be segregated immediately to quarantine and permanently destroyed.'
      ]
    }
  }
];
