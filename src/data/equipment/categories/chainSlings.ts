import { LiftingEquipmentItem } from '../types';

export const chainSlingsData: LiftingEquipmentItem[] = [
  {
    id: 'chain-sling-grade-80',
    groupId: 'chain-slings',
    groupName: { tr: 'Zincir Sapanlar ve Bileşenleri', en: 'Chain Slings & Components' },
    code: 'CHAIN-G80-EN818',
    name: {
      tr: 'Grade 80 (G80) Alaşımlı Çelik Kaldırma Zinciri ve Sapanları',
      en: 'Grade 80 (G80) Alloy Steel Lifting Chains & Slings'
    },
    shortDescription: {
      tr: 'EN 818-2/4 standardında, 800 N/mm² çekme dayanımına sahip, ağır sanayi ve şantiyelerde en yaygın kullanılan sağlam zincir sapan sistemi.',
      en: 'Industry standard 800 N/mm² alloy steel chain sling manufactured to EN 818-2/4 for rugged industrial lifting.'
    },
    safetyFactor: '4:1',
    standards: ['EN 818-2', 'EN 818-4', 'ASME B30.9', 'OSHA 1910.184'],
    wllRange: '1.12t - 67t (6mm - 32mm çap, 1, 2, 3 ve 4 Kollu)',
    technicalSpecs: {
      construction: 'Kısa Baklalı (Pitch p = 3d) Elektrik Direnç Kaynaklı Alaşımlı Çelik Zincir',
      materialGrade: 'Grade 80 (800 N/mm² anma gerilimi)',
      tensileGrade: 'Kopmada minimum %20 uzama kapasitesi',
      efficiencyFactor: '%100 (Uygun kilit ve halkalarla)',
      summaryPoints: {
        tr: [
          '4:1 emniyet katsayısı ile yüksek dinamik darbe ve aşınma direnci',
          'Kısaltma kancaları (shortening hooks) ile kol boyu sahada milimetrik ayarlanabilir',
          'Sıcaklık dayanımı 400°C seviyesine kadar kapasite düşümü ile mümkündür'
        ],
        en: [
          '4:1 safety factor with high dynamic shock absorption and abrasion resilience',
          'Leg lengths easily modulated in the field with integrated shortening clutch/hooks',
          'Operational up to 400°C with verified temperature de-rating tables'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Dökümhane sıcak parçaları', 'İnşaat kaba yapı kalıp ve donatı taşımaları', 'Tersane blok montajı', 'Pürüzlü ve keskin kenarlı döküm/çelik yükler'],
        en: ['Hot foundry castings', 'Construction rebar and precast rigging', 'Shipyard hull block erection', 'Abrasive, rough-edged steel fabrications']
      },
      unsuitableApplications: {
        tr: ['Asitli kaplama/galvaniz daldırma banyoları (hidrojen kırılganlığı riski nedeniyle kesinlikle yasaktır)', 'Hassas boyalı/parlatılmış yüzeyler'],
        en: ['Acidic pickling and galvanizing vats (severe hydrogen embrittlement hazard)', 'Polished, delicate, or finished surfaces']
      },
      environment: {
        minTempC: -40,
        maxTempC: 400,
        tempDeRating: [
          { tempRange: '-40°C ile 200°C arası', capacityMultiplier: 1.0, notes: 'Tam kapasite (%100 WLL)' },
          { tempRange: '200°C ile 300°C arası', capacityMultiplier: 0.90, notes: '%10 kapasite düşümü uygulanır (%90 WLL)' },
          { tempRange: '300°C ile 400°C arası', capacityMultiplier: 0.75, notes: '%25 kapasite düşümü uygulanır (%75 WLL)' },
          { tempRange: '400°C üzeri', capacityMultiplier: 0.0, notes: 'Grade 80 kullanımı KESİNLİKLE YASAKTIR' }
        ],
        chemicalResistance: {
          acids: 'prohibited',
          alkalis: 'limited',
          solvents: 'resistant',
          salineWater: 'limited'
        },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Müşteri sıcak döküm sahasında çalışacaksa sıcaklık tablosunu teklifle birlikte verin ve 400°C üstü için uyarı yapın.'],
        en: ['For foundry clients, supply the official de-rating chart and flag the strict 400°C ceiling.']
      },
      selectionTipsForEngineers: {
        tr: ['Asit ortamlarında korozyon hidrojen kırılganlığı (hydrogen embrittlement) yaratarak zincirin yük altında cam gibi kırılmasına yol açar. Asitli ortamda paslanmaz veya özel kaplamalı sapan tercih edin.'],
        en: ['Acidic vapor induces hydrogen embrittlement causing sudden brittle fracture under load without elongation. Specify stainless or composite materials for acid vats.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Zincir baklalarında çatlak, aşırı aşınma, çentik ve kalıcı uzama var mı?',
          'Kancalarda emniyet mandalı sağlam ve yaylı mı? Kanca ağzında açılma var mı?',
          'Kimlik etiketi (sekizgen G80 plakası) kol üzerinde mevcut ve WLL okunabiliyor mu?'
        ],
        en: [
          'Inspect links for cracks, gouges, excessive inter-link wear, and elongation.',
          'Verify hook safety latches are operational and hook throat opening is not sprung.',
          'Confirm octagonal Grade 80 identification tag is intact with legible WLL.'
        ]
      },
      hitchingModes: [
        { mode: '1 Kollu Düz', modeMultiplier: 1.0, notes: 'WLL x 1.0' },
        { mode: '2 Kollu (0° - 45° Dikey Açı)', modeMultiplier: 1.4, notes: 'WLL x 1.4 (Tepe Açısı ≤ 90°)' },
        { mode: '2 Kollu (45° - 60° Dikey Açı)', modeMultiplier: 1.0, notes: 'WLL x 1.0 (Tepe Açısı 90° - 120°)' },
        { mode: '3 ve 4 Kollu (0° - 45° Dikey Açı)', modeMultiplier: 2.1, notes: 'WLL x 2.1' },
        { mode: '3 ve 4 Kollu (45° - 60° Dikey Açı)', modeMultiplier: 1.5, notes: 'WLL x 1.5' },
        { mode: 'Boğma Bağlantı (Choker)', modeMultiplier: 0.8, notes: 'WLL x 0.80 (%20 kapasite düşümü)' }
      ],
      angleRules: {
        tr: 'Kollar arası tepe açısı 120° üzerinde kesinlikle kullanılmamalıdır. Asimetrik yüklerde sadece 2 kol taşıyıcı kabul edilmelidir.',
        en: 'Never rig with included angle exceeding 120°. In asymmetric lifts, derate capacity to 2 bearing legs.'
      },
      prohibitedUses: {
        tr: [
          'Baklaları cıvata, pim veya telle birbirine tutturarak boy kısaltmak (yalnızca onaylı kısaltma kancası kullanılmalıdır)',
          'Zincir baklasına şantiye ortamında kaynak yapmak veya kaynak arkına maruz bırakmak',
          'Baklaları kanca ucuna asmak (yük kanca tabanına oturmalıdır)'
        ],
        en: [
          'Shortening chain using bolts, pins, or wire (use only engineered shortening clutches)',
          'Welding on chain links or exposing to welding ground currents',
          'Tip loading hooks; load must seat fully into hook bowl'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Fırça ve sıcak suyla yıkanır, kurutulup hafif yağlanır.', en: 'Wash with hot water/detergent, dry, and apply light oil film.' },
      lubricationInterval: { tr: 'Ağır saha şartlarında haftalık veya aylık bakla temas noktaları yağlaması.', en: 'Weekly or monthly lubrication of interlink bearing points.' },
      lubricantType: { tr: 'Aşırı basınca dayanıklı (EP) mineral yağ.', en: 'Extreme pressure (EP) mineral oil.' },
      movingPartsInspection: { tr: ['Kilit pimleri ve kanca emniyet mandal yayları kontrolü'], en: ['Inspect clevis pins and hook safety latch springs'] }
    },
    storage: {
      guidelines: {
        tr: ['Kullanılmadığında duvara monte A-tipi sapan askılarında asılı tutulmalıdır; yerde nem içinde bırakılmamalıdır.'],
        en: ['Hang on wall-mounted rigging racks off concrete floor to prevent moisture buildup.']
      },
      environmentalHazards: { tr: ['Asit havuzları, aşırı nem ve açık hava paslanması'], en: ['Acid tanks, unshielded outdoor rain weathering'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Boy kısaltma kancası yerine baklanın içine cıvata sokularak kısaltma yapılması',
          en: 'Inserting a high-tensile bolt through chain links to shorten sling leg'
        },
        consequence: {
          tr: 'Cıvatanın baklayı bükerek çatlatması ve ilk gerilimde zincirin kopması',
          en: 'Eccentric point bending causing immediate brittle link fracture under load'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Zincirin keskin çelik köşelerde korumasız bükülerek yük kaldırılması',
          en: 'Bending chain links directly over unyielding 90° sharp steel edges'
        },
        consequence: {
          tr: 'Bakla kollarında kalıcı eğilme, yorulma çatlağı ve WLL değerinin %50 düşmesi',
          en: 'Permanent link bending, micro-cracks, and 50% capacity loss'
        },
        severity: 'high'
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Tek bir baklada dahi gözle veya NDT ile tespit edilen çatlak veya yarık',
          'Bakla ekseninde eğilme veya bükülme',
          'Kancada emniyet mandalının kırık/eksik olması veya kanca ucunun gövde ekseninden %10 sapması',
          'Kimlik etiketinin kaybolması veya okunamaz hale gelmesi'
        ],
        en: [
          'Any crack, fissure, or flaw detected visually or via NDT on any link',
          'Any bent, twisted, or distorted chain link',
          'Missing/damaged hook safety latch or hook throat spread > 10%',
          'Missing or illegible identification tag'
        ]
      },
      wearLimits: {
        tr: 'İki baklanın birbiriyle temas ettiği noktalarda bakla anma çapında (d) %10 veya daha fazla aşınma',
        en: 'Interlink wear exceeding 10% of nominal link wire diameter (d)'
      },
      deformationLimits: {
        tr: 'Zincir baklasının anma adımında (pitch p) %5 veya sapan kolunun toplam boyunda %3 kalıcı uzama',
        en: 'Permanent pitch elongation of 5% on an individual link or 3% total leg elongation'
      },
      preventiveMeasures: {
        tr: ['Keskin köşelerde sert ahşap veya poliüretan zincir kılavuzları kullanılması', 'Kumpas ile yıllık periyodik bakla çapı ölçümü'],
        en: ['Use hardwood or polymer edge saddles on sharp loads', 'Mandate calibrated caliper measurement of wear zones annually']
      }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye WLL tablosunu 60° açıya göre değil, sahadaki en yaygın açı olan 45° ve 60° değerlerini ayrı ayrı gösterin.', en: 'Quote separate WLL values for 45° and 60° sling angles to ensure safety.' },
      operatorFocus: { tr: 'Kaldırmadan önce kilit pimlerinin yerine oturduğunu ve zincirde düğüm/dönüklük olmadığını kontrol et.', en: 'Verify all clevis retaining pins are locked and chain legs are free of twists before hoisting.' },
      inspectorFocus: { tr: 'Her 10 baklada bir mikrometreyle çap (d1, d2) ve adım (p) ölç; %10 çap aşınması veya %5 uzamada ıskartaya ayır.', en: 'Measure link pitch and caliper diameters (d1/d2) every 10 links; condemn at 10% wear or 5% pitch stretch.' }
    }
  },
  {
    id: 'chain-sling-grade-100',
    groupId: 'chain-slings',
    groupName: { tr: 'Zincir Sapanlar ve Bileşenleri', en: 'Chain Slings & Components' },
    code: 'CHAIN-G100-PAS1061',
    name: {
      tr: 'Grade 100 (G100) Yüksek Mukavemetli Zincir Sapanlar',
      en: 'Grade 100 (G100) High-Tensile Chain Slings'
    },
    shortDescription: {
      tr: 'Grade 80 zincirlere kıyasla aynı çapta %25 daha yüksek taşıma kapasitesi (WLL) sunan, hafifletilmiş alaşımlı premium kaldırma zinciri.',
      en: 'Offers 25% higher WLL compared to Grade 80 at identical diameter, reducing overall rigging weight.'
    },
    safetyFactor: '4:1',
    standards: ['PAS 1061', 'EN 818-4 (Ek Koşullar)', 'ASTM A973'],
    wllRange: '1.4t - 85t',
    technicalSpecs: {
      construction: '1000 N/mm² İnce Taneli Isıl İşlemli Alaşımlı Çelik (CrNiMo)',
      materialGrade: 'Grade 100 / Grade 10',
      efficiencyFactor: '%100',
      summaryPoints: {
        tr: [
          'Aynı yük için %30 daha hafif sapan donatımı, operatör ergonomisini artırır',
          'Yüzeyi genellikle mavi, turkuaz veya mor elektrostatik koruma boyalıdır',
          'Maksimum çalışma sıcaklığı sınırı 380°C ile Grade 80\'den biraz daha düşüktür'
        ],
        en: [
          '30% weight reduction for equivalent capacity drastically improves rigger ergonomics',
          'Finished with distinctive blue, turquoise, or purple powder coat',
          'Maximum working temperature capped at 380°C, slightly below Grade 80'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Rüzgar türbini montajı', 'Ağır trafo ve jeneratör kaldırma', 'Ağır çelik konstrüksiyon şantiyeleri'],
        en: ['Wind turbine erection', 'Heavy transformer and turbine rigging', 'Modular industrial construction']
      },
      unsuitableApplications: {
        tr: ['380°C üzeri sıcak dökümhane ocak ağzı', 'Asitli banyolar'],
        en: ['Furnace mouths exceeding 380°C', 'Acid baths']
      },
      environment: {
        minTempC: -40,
        maxTempC: 380,
        tempDeRating: [
          { tempRange: '-40°C ile 200°C', capacityMultiplier: 1.0, notes: '%100 WLL' },
          { tempRange: '200°C ile 300°C', capacityMultiplier: 0.90, notes: '%90 WLL' },
          { tempRange: '300°C ile 380°C', capacityMultiplier: 0.60, notes: '%60 WLL (%40 kapasite düşümü)' },
          { tempRange: '380°C üzeri', capacityMultiplier: 0.0, notes: 'KESİNLİKLE YASAKTIR' }
        ],
        chemicalResistance: { acids: 'prohibited', alkalis: 'limited', solvents: 'resistant', salineWater: 'limited' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Ağır sapan taşımaktan şikayet eden müşterilere G80 yerine daha ince çaplı G100 önererek ergonomi sağlayın.'],
        en: ['Recommend down-gauged G100 to clients demanding lightweight rigging without sacrificing capacity.']
      },
      selectionTipsForEngineers: {
        tr: ['G100 sapanlarda kullanılan tüm bileşenlerin (kanca, kilit, halka) Grade 100 uyumlu olduğunu teyit edin; asla G80 kilit takmayın.'],
        en: ['Verify that ALL components (hooks, couplings, master links) are certified Grade 100; never mix with G80 fittings.']
      }
    },
    safeOperation: {
      preUseChecks: { tr: ['Etiketin 10 kenarlı Grade 100 etiketi olduğunu teyit edin.'], en: ['Verify decagonal (10-sided) Grade 100 tag.'] },
      hitchingModes: [{ mode: '1 Kollu Düz', modeMultiplier: 1.0, notes: 'WLL x 1.0' }],
      angleRules: { tr: 'Dikey eksenle açı 60 dereceyi geçemez.', en: 'Angle to vertical must not exceed 60 degrees.' },
      prohibitedUses: { tr: ['Farklı kalitede (G80 ile G100) bakla veya kilidi karıştırmak'], en: ['Intermixing Grade 80 and Grade 100 fittings'] }
    },
    maintenance: {
      cleaning: { tr: 'Kuru fırçalama ve nötr temizleyiciler.', en: 'Dry brush and neutral cleaning solvents.' },
      lubricationInterval: { tr: 'Aylık periyodik yağlama.', en: 'Monthly periodic lubrication.' },
      lubricantType: { tr: 'Sentetik yağ.', en: 'Synthetic chain oil.' },
      movingPartsInspection: { tr: ['Kısaltma kancası tırnak boşluğu kontrolü'], en: ['Check shortening clutch locking pin play'] }
    },
    storage: {
      guidelines: { tr: ['Havalandırılan kuru depolarda asılı saklama.'], en: ['Store suspended in dry environment.'] },
      environmentalHazards: { tr: ['Asitli ortamlar'], en: ['Acid atmospheres'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Grade 100 zincire Grade 80 bağlantı kilidi takılması',
          en: 'Coupling Grade 100 chain using an undersized Grade 80 connector'
        },
        consequence: {
          tr: 'Kilidin aşırı yükten deforme olup açılması',
          en: 'Connector structural shear failure under G100 peak loads'
        },
        severity: 'critical'
      }
    ],
    discardCriteria: {
      physicalDefects: { tr: ['Çatlak, yarık veya kanca ağzında %10 açılma'], en: ['Cracks, gouges, or hook throat spread > 10%'] },
      wearLimits: { tr: 'Bakla çapında %10 aşınma', en: '10% nominal wire diameter wear' },
      deformationLimits: { tr: 'Baklada %5 kalıcı adım uzaması', en: '5% link pitch elongation' },
      preventiveMeasures: { tr: ['Renk kodlu etiketleme ve komponent takibi'], en: ['Color-coded component tracking'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'G100 zincirlerin 10 kenarlı plakasını ve turkuaz/mavi renk farkını müşteriye anlatın.', en: 'Highlight the decagonal tag and turquoise finish distinguishing G100.' },
      operatorFocus: { tr: 'Sapanın üzerinde G80 ve G100 karışımı parça olmadığını kontrol et.', en: 'Ensure no G80 fittings are mixed into a G100 sling assembly.' },
      inspectorFocus: { tr: 'Tüm bileşenlerin G100 damgalarını (10 veya 100 ibaresi) tek tek kontrol et.', en: 'Inspect each individual component for Grade 10/100 manufacturer markings.' }
    }
  }
];
