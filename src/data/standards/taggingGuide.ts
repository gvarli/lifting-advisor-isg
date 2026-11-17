import { EquipmentTaggingSpecification } from './types';

export const equipmentTaggingSpecsData: EquipmentTaggingSpecification[] = [
  {
    id: 'tag-textile-en1492',
    equipmentCategory: 'textile_sling',
    title: {
      tr: 'Tekstil / Polyester Bez Sapan Etiketleme Şeması (EN 1492-1 / EN 1492-2)',
      en: 'Textile Webbing & Round Sling Tagging Specification (EN 1492)'
    },
    standardReference: 'TS EN 1492-1 (Madde 7) & Makine Emniyeti Yönetmeliği',
    shapeOrColorSpec: {
      tr: 'Polyester için MAVİ etiket (Poliamid için YEŞİL, Polipropilen için KAHVERENGİ). Etiketin bir kısmı dışta dikişli, diğer kısmı dikiş içine gömülü (korumalı) çift parça olmalıdır.',
      en: 'BLUE tag for Polyester (GREEN for Polyamide, BROWN for Polypropylene). Must feature external visible tab and protected internal under-seam tab.'
    },
    mandatoryFields: [
      {
        fieldName: 'WLL (Çalışma Yük Sınırı)',
        exampleValue: 'WLL: 3.0 TON (Düz: 3.0t, Boğma: 2.4t, Sepet: 6.0t)',
        explanation: {
          tr: 'Farklı bağlama şekillerine göre (düz, boğma, sepet) anma kapasitesi açıkça yazılmalıdır.',
          en: 'Capacity ratings for straight, choker, and basket hitches must be explicitly stated.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'CE İşareti',
        exampleValue: 'CE',
        explanation: {
          tr: 'Makine Emniyeti Yönetmeliği (2006/42/AT) uygunluğunu teyit eden resmi logo.',
          en: 'Official CE conformity emblem confirming Machinery Directive compliance.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Malzeme Cinsi',
        exampleValue: 'PES (%100 Polyester)',
        explanation: {
          tr: 'Lif malzemesinin kimyasal türü belirtilmelidir (asit veya alkaliye karşı direnç için kritiktir).',
          en: 'Chemical composition of polymer fibers for chemical resistance verification.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Standart Numarası',
        exampleValue: 'EN 1492-1:2000+A1:2008',
        explanation: {
          tr: 'İmalatın yapıldığı uyumlaştırılmış Avrupa/Türk standart kodu.',
          en: 'Harmonized European standard manufacturing code.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Üretici Kimliği & İzlenebilirlik Kodu',
        exampleValue: 'Üretici: XYZ Halat San. / Seri No: 2026-TR-8842',
        explanation: {
          tr: 'İmalatçı ticari unvanı ve test sertifikasına bağlanan benzersiz seri/parti numarası.',
          en: 'Manufacturer name and unique serial/batch number linked to proof test cert.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Emniyet Katsayısı (Safety Factor)',
        exampleValue: 'SF 7:1',
        explanation: {
          tr: 'Tekstil sapanlarda minimum kopma emniyet katsayısı 7:1 yazılmalıdır.',
          en: 'Mandatory 7:1 design factor marking for textile slings.'
        },
        isMandatoryByLaw: true,
      },
    ],
    forbiddenPractices: {
      tr: [
        'Mavi etiketi kopmuş, dikişi sökülmüş veya yazıları silinmiş sapanla KESİNLİKLE KALDIRMA YAPILAMAZ (Doğrudan Hurda).',
        'Etiket üzerine tükenmez kalemle veya sprey boyayla sonradan tonaj yazılması yasaktır.',
        'Beyaz yük taşıyıcı iç lifleri açığa çıkmış yuvarlak sapanların kılıfı dikilerek kullanılamaz.'
      ],
      en: [
        'Lifting with untagged or illegible textile slings is strictly prohibited by law (instant scrap).',
        'Handwriting capacities with markers or spray paint is illegal.',
        'Never stitch or tape torn round sling jackets concealing exposed core yarn.'
      ]
    }
  },
  {
    id: 'tag-chain-en818',
    equipmentCategory: 'chain_sling',
    title: {
      tr: 'Zincir Sapan Kimlik Plakası / Künyesi Şeması (EN 818-4)',
      en: 'Chain Sling Identification Tag Specification (EN 818-4)'
    },
    standardReference: 'TS EN 818-4 (Madde 7) & TS EN 818-2',
    shapeOrColorSpec: {
      tr: 'Grade 80 için SEKİZGEN (8 kenarlı) metal plaka; Grade 100 için ONGEN (10 kenarlı) metal plaka. Paslanmaz çelik tel ile ana bağlantı halkasına (master link) sabitlenir.',
      en: 'OCTAGONAL metal tag for Grade 80; DECAGONAL (10-sided) metal tag for Grade 100. Attached with heavy stainless wire to master link.'
    },
    mandatoryFields: [
      {
        fieldName: 'WLL ve Açı Derecelendirmesi',
        exampleValue: '0°-45°: 6.7 Ton / 45°-60°: 4.75 Ton',
        explanation: {
          tr: 'Kollara binen açıya göre (0-45 derece ve 45-60 derece) izin verilen WLL tonajları ayrı ayrı damgalanmalıdır.',
          en: 'Dual capacity stamp for 0°-45° and 45°-60° operating angles.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Zincir Çapı ve Kol Sayısı',
        exampleValue: 'Ø 10 mm - 2 Kollu (2-Leg)',
        explanation: {
          tr: 'Bakla anma anma tel çapı (mm) ve sapan bacak adedi.',
          en: 'Nominal chain link wire diameter and number of sling legs.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Kalite Sınıfı (Grade)',
        exampleValue: 'G80 (veya G100)',
        explanation: {
          tr: 'Alaşımlı çeliğin mukavemet sınıfı (G80=800 N/mm², G100=1000 N/mm²).',
          en: 'Alloy steel tensile grade marking.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Üretici Markası & CE',
        exampleValue: 'CE / XYZ Chain / Parti: B-9941',
        explanation: {
          tr: 'CE işareti ve üretici tescilli logosu.',
          en: 'CE mark and registered manufacturer logo.'
        },
        isMandatoryByLaw: true,
      },
    ],
    forbiddenPractices: {
      tr: [
        'Sekizgen/Ongen künyesi düşmüş veya kopmuş zincir sapanla yük kaldırılamaz.',
        'Grade 100 zincire Grade 80 bağlantı kilidi veya kancası takılamaz (Tüm parçalar aynı sınıfta olmalıdır).',
        'Baklaların üzerine elektrik arkı veya kaynakla işaretleme yapılamaz.'
      ],
      en: [
        'Operating chain slings without valid octagonal/decagonal metal tag is illegal.',
        'Never intermix Grade 80 and Grade 100 components in a single assembly.',
        'Arc strikes or stamping on load-bearing chain links is strictly prohibited.'
      ]
    }
  },
  {
    id: 'tag-wire-rope-en13414',
    equipmentCategory: 'wire_rope_sling',
    title: {
      tr: 'Çelik Halat Sapan Marka Plakası Şeması (EN 13414-1)',
      en: 'Steel Wire Rope Sling Marking Specification (EN 13414-1)'
    },
    standardReference: 'TS EN 13414-1 (Madde 7)',
    shapeOrColorSpec: {
      tr: 'Pres kovanının üzerine doğrudan zımba baskı (tek kollu) veya sapan gözüne takılan dairesel/üçgen metal marka plakası.',
      en: 'Die-stamped directly on aluminum ferrule or stamped on metallic ring tag secured in eye.'
    },
    mandatoryFields: [
      {
        fieldName: 'WLL Tonajı',
        exampleValue: 'WLL: 5.2 TON',
        explanation: {
          tr: 'Düz kaldırmadaki nominal anma tonajı.',
          en: 'Rated working load limit for straight in-line pull.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Halat Çapı ve Yapısı',
        exampleValue: 'Ø 22 mm - 6x36 WS IWRC 1960',
        explanation: {
          tr: 'Halatın anma çapı, demet sayısı ve tel mukavemet sınıfı.',
          en: 'Nominal diameter, construction class, and tensile grade.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'CE & Seri No',
        exampleValue: 'CE / S/N: 2026-WRS-102',
        explanation: {
          tr: 'AT uygunluğu ve test sertifikası izlenebilirlik numarası.',
          en: 'CE marking and test certificate serial number.'
        },
        isMandatoryByLaw: true,
      },
    ],
    forbiddenPractices: {
      tr: [
        'Pres kovanının derin zımbalamayla çatlatılması veya ezilmesi yasaktır.',
        'Etiketsiz çelik halat sapan kullanılamaz.'
      ],
      en: [
        'Excessive stamping force cracking or compromising ferrule integrity is prohibited.',
        'Untagged wire rope slings are barred from service.'
      ]
    }
  },
  {
    id: 'tag-shackle-en13889',
    equipmentCategory: 'shackle',
    title: {
      tr: 'Dövme Çelik Mapa Gövde ve Pim İşaretlemesi (EN 13889)',
      en: 'Forged Shackle Body & Pin Marking Specification (EN 13889)'
    },
    standardReference: 'TS EN 13889 & US Fed. Spec. RR-C-271',
    shapeOrColorSpec: {
      tr: 'Gövde üzerine sıcak dövme esnasında kabartma (raised letters) olarak işlenir; pim üzerinde ise dövme veya lazer baskı izlenebilirlik kodu bulunur.',
      en: 'Drop-forged in raised letters directly on shackle bow; pin stamped with batch tracking code.'
    },
    mandatoryFields: [
      {
        fieldName: 'WLL Değeri',
        exampleValue: 'W.L.L. 8.5 T',
        explanation: {
          tr: 'Mapanın anma çalışma yükü ton cinsinden kabartma olarak gövde yayında yazmalıdır.',
          en: 'Forged relief capacity in tons along the outer shackle bow.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Gövde Boyutu',
        exampleValue: '1" (25 mm)',
        explanation: {
          tr: 'Gövde anma ölçüsü inç veya mm olarak belirtilir.',
          en: 'Nominal body diameter in inches or millimeters.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Grade (Çelik Kalitesi)',
        exampleValue: 'GRADE 6 (veya 6)',
        explanation: {
          tr: 'EN 13889 standardına uygun Grade 6 alaşımlı dövme çelik sembolü.',
          en: 'Grade 6 high-tensile alloy steel designation.'
        },
        isMandatoryByLaw: true,
      },
      {
        fieldName: 'Üretici Kodu & Parti No',
        exampleValue: 'XYZ / BATCH 44A',
        explanation: {
          tr: 'Üretici logosu ve malzeme izlenebilirlik parti kodu.',
          en: 'Manufacturer mark and metallurgical traceability heat code.'
        },
        isMandatoryByLaw: true,
      },
    ],
    forbiddenPractices: {
      tr: [
        'Üzerinde WLL veya üretici logosu bulunmayan döküm/fason mapaların kaldırmada kullanımı KESİNLİKLE YASAKTIR.',
        'Pimin gövdeden farklı bir cıvatayla değiştirilmesi yasaktır.'
      ],
      en: [
        'Unmarked cast shackles lacking forged WLL relief are strictly prohibited in hoisting.',
        'Replacing alloy pin with ordinary hardware-store bolts is illegal.'
      ]
    }
  }
];
