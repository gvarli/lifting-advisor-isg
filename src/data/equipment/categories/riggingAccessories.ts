import { LiftingEquipmentItem } from '../types';

export const riggingAccessoriesData: LiftingEquipmentItem[] = [
  {
    id: 'shackles-bow-dee',
    groupId: 'rigging-accessories',
    groupName: { tr: 'Kaldırma ve Bağlama Aksesuarları', en: 'Rigging Hardware & Accessories' },
    code: 'SHACKLE-EN13889-RRC271',
    name: {
      tr: 'Omega (Bow) ve D Tipi Kaldırma Mapaları / Kilitleri',
      en: 'Bow & Dee Lifting Shackles (Screw Pin & Safety Bolt per EN 13889)'
    },
    shortDescription: {
      tr: 'EN 13889 ve US Fed Spec RR-C-271 standartlarında, dövme alaşımlı çelik gövde ve ısıl işlemli pime sahip, 6:1 veya 5:1 emniyet katsayılı emniyet bağlantı kilitleri.',
      en: 'Drop-forged alloy steel shackles with heat-treated pin manufactured to EN 13889 / RR-C-271 with 6:1 design safety factor.'
    },
    safetyFactor: '6:1 (Grade 6) / 5:1',
    standards: ['EN 13889', 'ASME B30.26', 'US Fed. Spec. RR-C-271', 'ISO 2415'],
    wllRange: '0.5t - 1500t',
    technicalSpecs: {
      construction: 'Sıcak Dövme Yüksek Mukavemetli Alaşımlı Çelik (Grade 6), Sıcak Daldırma Galvanizli Gövde',
      materialGrade: 'Grade 6 / Grade 8 Alaşımlı Çelik Pim',
      efficiencyFactor: '%100',
      summaryPoints: {
        tr: [
          'Omega (Bow) mapalar çok kollu sapan bağlantıları ve açılı yüklemeler için idealdir',
          'D tipi mapalar yalnızca tek kollu düz eksenel çekmelerde kullanılır',
          'Somunlu ve kopilyalı (Safety Bolt & Cotter Pin) tip kalıcı montajlarda veya pimin dönme riski olan yerlerde zorunludur'
        ],
        en: [
          'Bow shackles accommodate multi-leg sling angles and side loadings',
          'Dee shackles strictly intended for single-line inline straight axial pulls',
          'Bolt type with nut and cotter pin mandatory for permanent rigging or rotational loads'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Vinç kancası ile sapan bağlantısı', 'Travers ve mapa plakası bağlantıları', 'Denizcilik ve açık deniz (offshore) kalıcı bağlantılar'],
        en: ['Hook-to-sling connections', 'Spreader beam and padeye rigging', 'Marine and offshore permanent installations']
      },
      unsuitableApplications: {
        tr: ['Pimin dönerek gevşeyebileceği durumlarda vidalı pimli (screw pin) mapa kullanımı', 'Pim üzerine doğrudan yanlamasına eğme momenti uygulamak'],
        en: ['Screw pin shackles in situations where rope movement can unscrew pin', 'Exerting severe perpendicular side load on shackle pin']
      },
      environment: {
        minTempC: -40,
        maxTempC: 200,
        tempDeRating: [
          { tempRange: '-40°C ile 200°C arası', capacityMultiplier: 1.0, notes: '%100 WLL' },
          { tempRange: '200°C ile 300°C arası', capacityMultiplier: 0.90, notes: '%10 kapasite düşümü' },
          { tempRange: '300°C ile 400°C arası', capacityMultiplier: 0.75, notes: '%25 kapasite düşümü' },
          { tempRange: '400°C üzeri', capacityMultiplier: 0.0, notes: 'YASAKTIR' }
        ],
        chemicalResistance: { acids: 'limited', alkalis: 'resistant', solvents: 'resistant', salineWater: 'resistant' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Müşteri çok kollu sapan bağlayacaksa D tipi yerine kesinlikle Omega (Bow) mapa teklif edin; D harfi mapa açılı çekmede deforme olur.'],
        en: ['Always supply Bow shackles for multi-leg sling bridles; Dee shackles will deform under multi-angle loading.']
      },
      selectionTipsForEngineers: {
        tr: [
          'Açılı çekmelerde mapa gövdesinin WLL değerini düşürün: 0° düz çekme %100, 45° açılı çekme %70, 90° yan çekme %50 WLL.',
          'Pim eksenine doğrudan yan yük bindirilmesi kesinlikle yasaktır.'
        ],
        en: [
          'Apply shackle side-loading de-rating: 0° in-line = 100%, 45° angle = 70%, 90° side pull = 50% of WLL.',
          'Never side-load the pin directly.'
        ]
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Gövde üzerinde üretici logosu, WLL değeri, Grade (örn. 6) ve izlenebilirlik kodu dövme kabartma olarak var mı?',
          'Pim gövdeye tam oturuyor ve dişler sorunsuz sıkılıyor mu?',
          'Gövde veya pimde eğilme, burulma veya çatlak var mı?'
        ],
        en: [
          'Verify drop-forged markings: manufacturer logo, WLL, Grade 6, and batch code.',
          'Ensure pin threads smoothly and seats flush against shackle eye.',
          'Check body and pin for bends, twists, or surface fissures.'
        ]
      },
      hitchingModes: [
        { mode: 'Düz Eksenel Çekme (0°)', modeMultiplier: 1.0, notes: '%100 Nominal WLL' },
        { mode: '45° Açılı Çekme (Yalnızca Omega Mapa)', modeMultiplier: 0.70, notes: '%30 kapasite düşümü uygulanır' },
        { mode: '90° Dik Yan Çekme (Yalnızca Omega Mapa)', modeMultiplier: 0.50, notes: '%50 kapasite düşümü uygulanır' }
      ],
      angleRules: {
        tr: 'Vidalı pim elle sonuna kadar sıkıldıktan sonra çeyrek tur (1/4 tur) geri çevrilmelidir (yük altında sıkışmayı önlemek için). Kalıcı yüklerde somunlu ve kopilyalı tip kullanılmalıdır.',
        en: 'Screw pins must be hand-tightened fully then backed off 1/4 turn to prevent seizure. Use safety bolt & cotter pin for long-term rigging.'
      },
      prohibitedUses: {
        tr: [
          'Kopilyalı pimin yerine inşaat demiri veya sıradan cıvata takmak',
          'Sapan kolunun pimi döndürecek şekilde boğma yapılması',
          'Gövde ağzını açmak veya daraltmak için ısıtmak veya çekiçlemek'
        ],
        en: [
          'Replacing original pin with standard commercial bolts or rebar',
          'Rigging running slings that can roll over and unscrew the pin',
          'Heating, bending, or welding the shackle bow or pin'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Dişlerdeki çamur tel fırça ile temizlenir.', en: 'Clean pin threads with wire brush.' },
      lubricationInterval: { tr: 'Pim dişleri montaj öncesi ince yağlanır.', en: 'Light oil on threads prior to assembly.' },
      lubricantType: { tr: 'Genel gres veya pas sökücü yağ.', en: 'General machinery grease or anti-seize.' },
      movingPartsInspection: { tr: ['Pim diş hatvesi ve kopilya deliği kontrolü'], en: ['Check thread pitch integrity and cotter pin hole'] }
    },
    storage: {
      guidelines: { tr: ['Pimleri gövdesine takılı halde kuru raflarda saklama.'], en: ['Store with pins engaged into bodies on dry shelving.'] },
      environmentalHazards: { tr: ['Aşındırıcı asitler'], en: ['Corrosive acids'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Vidalı pimli mapanın boğma sapanın sürtünmesiyle gevşeyip yerinden çıkması',
          en: 'Running sling running across screw pin backing it out during hoisting'
        },
        consequence: { tr: 'Pimin fırlaması ve yükün anında serbest kalarak düşmesi', en: 'Pin pullout and immediate catastrophic drop', severity: 'critical' }
      },
      {
        fieldError: {
          tr: 'Orijinal alaşımlı pimi kaybolan mapaya normal 8.8 civata takılması',
          en: 'Replacing lost forged shackle pin with a standard grade 8.8 bolt'
        },
        consequence: { tr: 'Standart cıvatanın kesme kuvvetine dayanamayıp kırılması', en: 'Shear failure of undersized commercial bolt under rigging stress', severity: 'critical' }
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Gövdede veya pimde en ufak çatlak veya çentik',
          'Pimin yiv dişlerinde ezilme, sıyırma veya pimin ekseninde gözle görülür eğilme',
          'Gövde çene açıklığında (W mesafesi) orijinal ölçüye göre %10 ve üzeri genişleme'
        ],
        en: [
          'Any crack, nick, or gouge on body or pin',
          'Stripped or deformed threads, or visibly bent pin',
          'Throat opening spread exceeding 10% of original manufacturing dimension'
        ]
      },
      wearLimits: { tr: 'Gövde veya pim çapında %10 aşınma', en: '10% reduction in nominal diameter' },
      deformationLimits: { tr: 'Gövde ekseninde %5 burulma', en: 'Any permanent body twist exceeding 5 degrees' },
      preventiveMeasures: { tr: ['Somunlu-kopilyalı tip haricinde hareketli sapan bağlanmaması'], en: ['Mandate bolt-type shackles wherever sling can contact pin'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye pimin renginin gövdeden farklı olmasının kalite kontrol göstergesi olduğunu aktarın.', en: 'Highlight that contrasting pin color is a manufacturer QC traceability signature.' },
      operatorFocus: { tr: 'Vidalı pimi sık, 1/4 tur geri al; pimi asla sıradan cıvatayla değiştirme!', en: 'Hand-tighten pin then back off 1/4 turn; never replace pin with ordinary bolt!' },
      inspectorFocus: { tr: 'Çene açıklığını (throat opening) kumpasla ölç, pim eğikliğini düz yüzeyde yuvarlayarak test et.', en: 'Measure throat opening against catalog spec; roll pin on flat surface to verify straightness.' }
    }
  },
  {
    id: 'wire-rope-clips-en13411-5',
    groupId: 'rigging-accessories',
    groupName: { tr: 'Kaldırma ve Bağlama Aksesuarları', en: 'Rigging Hardware & Accessories' },
    code: 'CLIPS-EN13411-5',
    name: {
      tr: 'Çelik Halat Klemensleri (Wire Rope Clips per EN 13411-5)',
      en: 'Drop-Forged Wire Rope Clips (U-Bolt Type per EN 13411-5)'
    },
    shortDescription: {
      tr: 'Halat göz sonlandırmalarında kullanılan, U-cıvata ve dövme köprüden oluşan, doğru takıldığında %80-85 terminasyon verimi sağlayan mekanik bağlantı elemanı.',
      en: 'Drop-forged U-bolt cable clamps providing 80-85% termination efficiency when installed to standard geometry.'
    },
    safetyFactor: '5:1 (Kullanım kurallarına tam uyulduğunda)',
    standards: ['EN 13411-5', 'US Fed. Spec. FF-C-450', 'DIN 1142'],
    wllRange: '3mm - 50mm Halat Çapları İçin',
    technicalSpecs: {
      construction: 'Dövme Karbon Çelik Gövde (Köprü/Saddle) + Yüksek Çekme Mukavemetli U-Cıvata + 2 Somun',
      materialGrade: 'Dövme Çelik (Döküm klemensler kaldırmada YASAKTIR)',
      efficiencyFactor: '%80 (Kuralına uygun takıldığında)',
      summaryPoints: {
        tr: [
          'ALTIN KURAL: "Ölü ata semer vurulmaz!" (Köprü her zaman canlı/yük taşıyan kola, U-cıvata ölü kola basmalıdır)',
          'Tork anahtarı ile üretici tork tablosuna uygun sıkılmalı ve yükleme sonrası tork kontrolü tekrarlanmalıdır',
          'Döküm klemensler yalnızca çit/statik bağlamada kullanılır, vinç ve kaldırmada KESİNLİKLE KULLANILAMAZ'
        ],
        en: [
          'GOLDEN RULE: "Never saddle a dead horse!" (Bridge rests on live load line; U-bolt presses on dead end)',
          'Must be tightened with calibrated torque wrench to specification, and retorqued after initial proof load',
          'Malleable cast iron clips are prohibited for lifting; only drop-forged clips permitted'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Saha vinci geçici bom askı sonlandırmaları', 'Statik yük gergileri ve şantiye emniyet hatları', 'Mekanik pres imalatı olmayan acil saha çözümleri'],
        en: ['Temporary pendant terminations', 'Guy line structural stays and horizontal lifelines', 'Emergency field rigging where hydraulic swaging is unavailable']
      },
      unsuitableApplications: {
        tr: ['Genel vinç ana kaldırma sapanlarında presli veya örgülü sapan varken kalıcı klemens kullanımı (önerilmez)', 'Döküm gövdeli klemenslerle yük kaldırma'],
        en: ['Primary hoist sling eye fabrication when swaged terminations are viable', 'Using malleable cast iron clips for overhead lifting']
      },
      environment: {
        minTempC: -40,
        maxTempC: 150,
        chemicalResistance: { acids: 'limited', alkalis: 'resistant', solvents: 'resistant', salineWater: 'limited' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Müşteriye döküm değil dövme (EN 13411-5 / US Fed Spec) klemens sattığınızı belirtin; kaldırmada döküm klemens ölümcül hatadır.'],
        en: ['Strictly supply drop-forged clips for lifting; cast malleable clips can fracture under impact load.']
      },
      selectionTipsForEngineers: {
        tr: [
          'Klemens sayısı ve aralığı halat çapına (d) göre hesaplanmalıdır: Aralık = 6 x d olmalıdır.',
          'İlk kaldırmadan sonra klemens somunları gevşeyebilir; ilk yük altında yeniden torklanmalıdır.'
        ],
        en: [
          'Spacing between clips must be precisely 6 times rope diameter (6d).',
          'Rope compresses under first tension; nuts must be retightened immediately after test lift.'
        ]
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Tüm klemens köprüleri canlı halat koluna mı bakıyor? (Asla ters veya çapraz takılmamalıdır!)',
          'Halat çapına uygun sayıda klemens kullanılmış mı? (Örn: 16mm halat için en az 4 adet)',
          'Göz içinde radansa mevcut mu?'
        ],
        en: [
          'Are all saddles pressing on the live load-bearing strand? (Never alternate orientations!)',
          'Is the clip count sufficient for diameter? (e.g. min 4 clips for 16mm rope)',
          'Is an engineered heavy thimble fitted in the eye loop?'
        ]
      },
      hitchingModes: [
        { mode: 'Standart Göz Terminasyonu', modeMultiplier: 0.80, notes: '%80 Verim (WLL x 0.80 hesaplanmalıdır)' }
      ],
      angleRules: {
        tr: 'İlk klemens radansaya mümkün olduğunca yakın takılmalı, son klemens halat ucundan 1 klemens genişliği kadar mesafede olmalıdır.',
        en: 'First clip nearest thimble; last clip at least one clip width from dead end tail.'
      },
      prohibitedUses: {
        tr: [
          'Klemensleri zıt yönlü (bir ters bir düz) bağlamak',
          'Döküm (malleable) klemensle insan veya yük kaldırmak',
          'Tork anahtarı olmadan sıradan anahtarla göz kararı sıkmak'
        ],
        en: [
          'Alternating clips (staggering saddles and U-bolts)',
          'Using malleable cast iron clips for overhead hoisting',
          'Tightening nuts without calibrated torque wrench'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Dişlerdeki pislik temizlenir.', en: 'Clean dirt from threads.' },
      lubricationInterval: { tr: 'Montaj öncesi dişler yağlanır.', en: 'Lubricate threads before torqueing.' },
      lubricantType: { tr: 'Makine yağı.', en: 'Machine oil.' },
      movingPartsInspection: { tr: ['Somun tork kontrolü'], en: ['Torque audit with calibrated wrench'] }
    },
    storage: {
      guidelines: { tr: ['Kuru kutularda saklama.'], en: ['Store in dry containers.'] },
      environmentalHazards: { tr: ['Korozyon'], en: ['Corrosion'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'U-cıvatanın canlı yük taşıyan kola bastırılması (Ters montaj)',
          en: 'Installing U-bolt on the live line instead of the dead end'
        },
        consequence: {
          tr: 'U-cıvatanın canlı halat tellerini ezerek kesmesi ve halatın %50 yükte kopması',
          en: 'U-bolt crimps and shears live load-bearing strands, cutting capacity by half'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Halat yüke bindikten sonra somunların yeniden torklanmaması',
          en: 'Failing to retighten nuts after rope compresses under initial load'
        },
        consequence: { tr: 'Halatın klemenslerin arasından sıyrılarak yükün düşmesi', en: 'Rope pulls through loosened clips releasing load', severity: 'critical' }
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'U-cıvatada veya dövme köprüde çatlak, yarık',
          'Diş sıyırması veya aşırı paslanma',
          'Köprü üzerinde U-şeklinde ezilme'
        ],
        en: [
          'Cracks or flaws in U-bolt or forged saddle',
          'Stripped threads or excessive pitting',
          'Gouges or severe deformation in rope groove'
        ]
      },
      wearLimits: { tr: 'Diş çapında aşınma', en: 'Thread wear' },
      deformationLimits: { tr: 'U-cıvata kollarında yamulma', en: 'Bent U-bolt legs' },
      preventiveMeasures: { tr: ['Tork anahtarı çizelgesinin sahaya asılması'], en: ['Display standard torque chart at rigging stations'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye klemens satarken halat çapına göre klemens sayısı ve tork (Nm) tablosunu broşür olarak verin.', en: 'Provide the recommended torque table and required clip count with every sale.' },
      operatorFocus: { tr: '"Ölü ata semer vurulmaz!" Köprü her zaman canlı kola basacak, ilk kaldırmadan sonra somunları tekrar sık!', en: '"Never saddle a dead horse!" Saddle on live line; retorque after initial lift!' },
      inspectorFocus: { tr: 'Klemens yönlerini, aralıklarını (6d) ve somun torklarını torkmetreyle tek tek kontrol et.', en: 'Check saddle orientation, 6d spacing, and verify nut torque with calibrated torque wrench.' }
    }
  }
];
