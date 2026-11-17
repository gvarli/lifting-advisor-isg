import { LiftingEquipmentItem } from '../types';

export const textileSlingsData: LiftingEquipmentItem[] = [
  {
    id: 'flat-webbing-sling-en1492',
    groupId: 'textile-slings',
    groupName: { tr: 'Tekstil / Polyester Sapanlar', en: 'Textile / Polyester Slings' },
    code: 'PES-WEBBING-EN1492-1',
    name: {
      tr: 'Gözlü Yassı Dokuma Polyester Bez Sapan (Flat Woven Webbing Sling)',
      en: 'Flat Woven Webbing Sling (Duplex / Eye & Eye per EN 1492-1)'
    },
    shortDescription: {
      tr: 'EN 1492-1 standardında, 7:1 emniyet katsayısına sahip, hassas ve işlenmiş yüzeyleri çizmeden kavrayan yüksek mukavemetli polyester (PES) sapan.',
      en: 'High-strength woven polyester lifting sling with 7:1 safety factor per EN 1492-1, engineered for damage-free handling of sensitive loads.'
    },
    safetyFactor: '7:1',
    standards: ['EN 1492-1', 'ASME B30.9', 'ISO 4878', 'TS EN 1492-1'],
    wllRange: '1t - 25t (Renk kodlu: Mor=1t, Yeşil=2t, Sarı=3t, Gri=4t, Kırmızı=5t, Kahve=6t, Mavi=8t, Turuncu=10t+)',
    technicalSpecs: {
      construction: '%100 Kesintisiz Filament Yüksek Mukavemetli Polyester (PES), Çift Kat (Duplex)',
      materialGrade: 'Polyester (PES) - Mavi Etiketli',
      efficiencyFactor: '%100 (Düz kaldırmada)',
      summaryPoints: {
        tr: [
          '7:1 emniyet katsayısı (Kopma yükü WLL değerinin en az 7 katıdır)',
          'Standartlaştırılmış renk kodlaması ve her 1 ton WLL için 1 adet dokuma siyah şerit çizgisi',
          'Elektrik iletkenliği sıfırdır; manyetik alanlardan etkilenmez; hafif ve son derece ergonomiktir'
        ],
        en: [
          '7:1 safety factor (Minimum Breaking Load is at least 7 times the WLL)',
          'Standardized color coding plus 1 black woven strip line for each 1 ton of nominal capacity',
          'Non-conductive, non-sparking, lightweight, and gentle on fragile polished surfaces'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: [
          'Talaşlı imalattan çıkmış hassas işlenmiş şaftlar ve silindirler',
          'Boyalı veya kaplamalı boru, tank ve kompozit gövdeler',
          'Tekne, yat ve havacılık kompozit panelleri',
          'Elektrik trafoları ve patlayıcı (ATEX) ortam kaldırmaları'
        ],
        en: [
          'Machined precision shafts, rollers, and polished cylinders',
          'Painted or coated pipes, pressure vessels, and aerospace components',
          'Marine boat hull handling and composite panels',
          'Spark-sensitive (ATEX) or electrically active environments'
        ]
      },
      unsuitableApplications: {
        tr: [
          '100°C üzerindeki sıcak metal veya döküm kaldırmaları',
          'Koruyucu kılıf veya köşe bendi olmadan keskin (r < 2-3mm) sac köşelerine bağlama',
          'Kostik soda ve güçlü alkali kimyasal banyoları (PES alkaliden erir)'
        ],
        en: [
          'Thermal environments exceeding 100°C',
          'Unprotected choking over sharp edge radiuses (r < 2-3mm)',
          'Strong alkaline/caustic chemical vats (PES dissolves in alkalis)'
        ]
      },
      environment: {
        minTempC: -40,
        maxTempC: 100,
        tempDeRating: [
          { tempRange: '-40°C ile 100°C arası', capacityMultiplier: 1.0, notes: 'Tam kapasite (%100 WLL)' },
          { tempRange: '100°C üzeri', capacityMultiplier: 0.0, notes: 'LİFLER ERİR VE BOZUNUR; KESİNLİKLE YASAKTIR' }
        ],
        chemicalResistance: {
          acids: 'resistant', // PES resistant to mineral acids
          alkalis: 'prohibited', // PES attacked by alkalis
          solvents: 'resistant',
          salineWater: 'resistant'
        },
        sharpEdgeSensitivity: 'extreme',
        uvSensitivity: 'high'
      },
      selectionTipsForSellers: {
        tr: [
          'Müşterinin kimyasal ortamını sorun: Polyester (Mavi Etiket) aside dayanıklıdır ancak alkaliye dayanıksızdır. Alkali varsa Poliamid (Yeşil Etiket) önerilmelidir.',
          'Sapan satarken yanında mutlaka poliüretan koruma kılıfı (sleeve) veya köşe koruyucu teklif edin.'
        ],
        en: [
          'Check chemical exposure: Polyester (Blue Tag) resists acids but dissolves in alkalis. For alkalis, specify Polyamide (Green Tag).',
          'Always bundle polyurethane protective wear sleeves or corner saddles with every webbing sling order.'
        ]
      },
      selectionTipsForEngineers: {
        tr: [
          'Kenar yarıçapı (radius r) sapan et kalınlığından küçükse keskin kenar (sharp edge) sayılır; koruyucu kullanılmazsa sapan makas gibi kesilir.',
          'Güneş altında sürekli açık alanda çalışan sapanlarda UV kristalizasyonunu hesaba katın.'
        ],
        en: [
          'If edge radius (r) is less than sling thickness, it is classified as sharp; requires cut-resistant protective sleeve.',
          'Account for UV fiber photodegradation in unshielded long-term outdoor yard rigging.'
        ]
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Mavi tanıtım etiketi sağlam ve WLL değeri okunabiliyor mu? (Etiketsiz bez sapan derhal imha edilir!)',
          'Sapan gövdesinde kesik, boyuna yırtık, dikiş sökülmesi veya sürtünme erimesi var mı?',
          'Kimyasal yanık, asit çürümesi veya sertleşme/kristalleşme mevcut mu?'
        ],
        en: [
          'Is the blue identification tag attached and legible? (Untagged textile slings must be destroyed instantly!)',
          'Inspect for edge cuts, transverse tears, seam fraying, or friction heat glaze.',
          'Look for chemical discoloration, fiber brittleness, or core crystallization.'
        ]
      },
      hitchingModes: [
        { mode: 'Düz Dikey (Straight Lift)', modeMultiplier: 1.0, notes: 'WLL x 1.00' },
        { mode: 'Boğma Bağlantı (Choker Hitch)', modeMultiplier: 0.8, notes: 'WLL x 0.80 (Boğma açısı doğal olmalıdır)' },
        { mode: 'Sepet Bağlantı (Basket Hitch - Paralel Kollar)', modeMultiplier: 2.0, notes: 'WLL x 2.00 (D/d ≥ 3 olmalı)' },
        { mode: 'Sepet Bağlantı (45° Tepe Açısı)', modeMultiplier: 1.4, notes: 'WLL x 1.40' },
        { mode: 'Sepet Bağlantı (60° Tepe Açısı)', modeMultiplier: 1.0, notes: 'WLL x 1.00' }
      ],
      angleRules: {
        tr: 'Boğma (choker) bağlantıda kilit açısı asla zorla çekiçlenerek daraltılmamalıdır (doğal sürtünme açısı 120° civarında kalmalıdır).',
        en: 'Never hammer down the choker hitch bite; allow the choke point to form naturally at 120°.'
      },
      prohibitedUses: {
        tr: [
          'Sapanı düğümleyerek boyunu kısaltmak veya iki sapanı birbirine düğümle bağlamak',
          'Sapanı yükün altından vinçle çekerek (sürtünmeyle yakarak) kurtarmaya çalışmak',
          'Korumasız olarak çelik sac köşesine doğrudan boğma yapmak'
        ],
        en: [
          'Tying knots to shorten sling or knotting two slings together',
          'Pulling slings out from under landed loads using the crane hoist (friction burning)',
          'Choking over raw metal or concrete corners without engineered edge sleeves'
        ]
      }
    },
    maintenance: {
      cleaning: {
        tr: 'Yalnızca soğuk/ılık su ve nötr sabun ile elle yıkanır; doğrudan ısı kaynağına konmadan asılarak oda sıcaklığında kurutulur.',
        en: 'Hand wash with cold/warm water and mild neutral detergent; air dry suspended away from direct heat.'
      },
      lubricationInterval: { tr: 'Tekstil sapanlar KESİNLİKLE yağlanmaz; yağ liflerin toz toplamasına ve kaymasına yol açar.', en: 'Textile slings must NEVER be lubricated.' },
      lubricantType: { tr: 'UYGULANMAZ (Yasak)', en: 'NOT APPLICABLE (Prohibited)' },
      movingPartsInspection: { tr: ['Göz takviye kumaşlarının ve ana dikiş ipliklerinin kontrolü'], en: ['Inspect eye reinforced fabric and main structural load stitches'] }
    },
    storage: {
      guidelines: {
        tr: [
          'Doğrudan güneş ışığı (UV) almayan, kuru, serin ve havalandırılmış sapan dolaplarında veya askılarında muhafaza edilmelidir.',
          'Zeminde, mazot, akü asidi veya solvent döküntülerinin yakınında kesinlikle bırakılmamalıdır.'
        ],
        en: [
          'Store in UV-shielded, dry, well-ventilated rigging lockers or clean hanging pegs.',
          'Never leave on shop floors exposed to diesel fuel, battery acid, or chemical spills.'
        ]
      },
      environmentalHazards: { tr: ['Güneş UV radyasyonu', 'Kaynak çapakları', 'Alkali temizleyiciler'], en: ['Direct solar UV rays', 'Welding sparks', 'Caustic degreasers'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Sac plaka kaldırırken koruma kılıfı kullanılmaması ve yükün salınımıyla sapanın kesilmesi',
          en: 'Rigging sheet metal plates without protective sleeves; load dynamic swing shears sling'
        },
        consequence: {
          tr: 'Sapanın anında tamamen kesilerek tonlarca ağırlıktaki sacın yere çakılması',
          en: 'Instant guillotine cut of sling fabric causing catastrophic dropped load'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Yük yere indirildikten sonra sapanın yük altında sıkışması ve vinçle asılarak çekilmesi',
          en: 'Dragging pinched sling out from under landed load using crane power'
        },
        consequence: {
          tr: 'Sürtünme ısısı lifleri eritir (camlaşma), dokuma genişliği yırtılır ve WLL yok olur',
          en: 'Extreme friction heat melts fibers, glazes surface, destroying structural strength'
        },
        severity: 'critical'
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Etiketin eksik olması, sökülmesi veya üzerindeki yazıların okunamaması (EN 1492 Zorunlu Kural)',
          'Sapan kenarında enine kesik, yırtık veya çentik (sapan genişliğinin %5\'ini aşan kesikler)',
          'Taşıyıcı dikişlerde sökülme, aşınma veya kopuk iplikler',
          'Sürtünme veya sıcaklık nedeniyle erime, lif camlaşması, kimyasal çürüme'
        ],
        en: [
          'Missing, detached, or illegible identification tag (EN 1492 mandatory discard)',
          'Edge cut, transverse nick, or tear exceeding 5% of webbing width',
          'Any broken, severed, or unravelled load-bearing stitching',
          'Friction melting, chemical etching, fiber glazing, or weld spatter burns'
        ]
      },
      wearLimits: { tr: 'Genel sürtünme aşınması sonucu dokuma kalınlığında %10 azalma', en: 'Abrasive thickness reduction exceeding 10%' },
      deformationLimits: { tr: 'Düğüm atılmış veya deforme olmuş sapanlar', en: 'Any knotted or permanently distorted sling' },
      preventiveMeasures: {
        tr: [
          'Tüm köşelerde poliüretan kaplı (Secutex tipi) kesilmez kılıf kullanımı',
          'Saha kullanımından sonra sapanların derhal dolaplara kaldırılması'
        ],
        en: [
          'Mandate heavy cut-resistant polyurethane sleeves (Secutex type) on all structural edges',
          'Return slings to indoor UV-proof storage racks immediately after each shift'
        ]
      }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye renk ve tonaj eşleşmesini (örn. Sarı = 3 Ton) hatırlatın, mavi etiketin polyester olduğunu belirtin.', en: 'Educate buyers on color coding (e.g. Yellow = 3t) and explain that blue label designates PES.' },
      operatorFocus: { tr: 'Etiketi olmayan veya kenarında en küçük kesik olan sapanı ASLA kullanma, makasla keserek hurdaya ayır.', en: 'NEVER use an untagged or nicked sling; cut it with shears immediately to prevent reuse.' },
      inspectorFocus: { tr: 'Dikiş ipliklerini ve etiket dikişini elle kontrol et, ultraviyole kristalleşmesi (lif sertleşmesi) varsa sapanı derhal ıskartaya ayır.', en: 'Examine structural stitches with probe; check for UV embrittlement and discard hardened slings.' }
    }
  },
  {
    id: 'round-sling-en1492-2',
    groupId: 'textile-slings',
    groupName: { tr: 'Tekstil / Polyester Sapanlar', en: 'Textile / Polyester Slings' },
    code: 'PES-ROUND-EN1492-2',
    name: {
      tr: 'Sonsuz Yuvarlak / Dairesel Bez Sapan (Round Sling per EN 1492-2)',
      en: 'Endless Round Sling (Continuous Fiber Core per EN 1492-2)'
    },
    shortDescription: {
      tr: 'Dikişsiz koruyucu kılıf içerisine sonsuz sarılmış yük taşıyıcı polyester elyaf çekirdekli, boğma bağlantılarda mükemmel kavrama sağlayan ağır yük sapanı.',
      en: 'Endless polyester fiber bundle encased in seamless tubular jacket, optimizing choker grip and distributing contact load.'
    },
    safetyFactor: '7:1',
    standards: ['EN 1492-2', 'ASME B30.9', 'TS EN 1492-2'],
    wllRange: '1t - 100t+',
    technicalSpecs: {
      construction: 'Sonsuz polyester filament çekirdek + Çift kat dokunmuş dikişsiz koruyucu polyester dış kılıf',
      materialGrade: 'Polyester (PES)',
      efficiencyFactor: '%100',
      summaryPoints: {
        tr: [
          'Tüm yükü iç kılıftaki kesintisiz lif demeti taşır; dış kılıf sadece koruma amaçlıdır',
          'Her kullanımda temas noktası döndürülerek aşınma tüm gövdeye homojen yayılır',
          'Boğma bağlantılarda boru ve silindirik yüklere tam sarılarak kaymayı önler'
        ],
        en: [
          'Load is borne 100% by continuous inner core yarn; outer sleeve acts as a protective shield',
          'Rotating bearing points on each lift distributes wear uniformly along circumference',
          'Conforms tightly around cylindrical loads and pipes in choker hitches'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Ağır boru ve silindir kaldırma', 'Trafo ve türbin gövdeleri', 'Boğma (choker) kaldırma operasyonları'],
        en: ['Heavy pipe and tube rigging', 'Turbine rotor and stator hoisting', 'Choker rigging configurations']
      },
      unsuitableApplications: {
        tr: ['100°C üzeri sıcak ortamlar', 'Koruyucusuz keskin köşeler'],
        en: ['Environments exceeding 100°C', 'Unshielded razor edges']
      },
      environment: {
        minTempC: -40,
        maxTempC: 100,
        chemicalResistance: { acids: 'resistant', alkalis: 'prohibited', solvents: 'resistant', salineWater: 'resistant' },
        sharpEdgeSensitivity: 'extreme',
        uvSensitivity: 'high'
      },
      selectionTipsForSellers: {
        tr: ['Yüksek tonajlı (10t - 50t) kaldırmalar için yassı bez sapan yerine sonsuz yuvarlak sapan önermek hem maliyeti düşürür hem de kullanım ömrünü uzatır.'],
        en: ['For high-tonnage (10t - 50t) lifts, round slings are significantly more economical and compact than flat webbing.']
      },
      selectionTipsForEngineers: {
        tr: ['Kancaya asarken kancanın genişliği sapanın doğal yayılma genişliğinden dar olmamalıdır; aşırı sıkışma iç lifleri ezer.'],
        en: ['Ensure hook bowl radius accommodates sling flattened profile without bunching or core pinching.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: ['Dış koruma kılıfında delik, yırtık veya içteki beyaz yük liflerinin görünür hale gelmesi kontrolü (İç lifler görünüyorsa KULLANILAMAZ!)'],
        en: ['Inspect outer jacket for holes or tears exposing inner white core yarn (if core exposed, DISCARD IMMEDIATELY!)']
      },
      hitchingModes: [
        { mode: 'Düz Dikey', modeMultiplier: 1.0, notes: 'WLL x 1.0' },
        { mode: 'Boğma Bağlantı', modeMultiplier: 0.8, notes: 'WLL x 0.8' },
        { mode: 'Sepet Bağlantı', modeMultiplier: 2.0, notes: 'WLL x 2.0' }
      ],
      angleRules: { tr: 'Tepe açısı 120 dereceyi geçemez.', en: 'Apex angle max 120 degrees.' },
      prohibitedUses: { tr: ['İç lifleri açığa çıkmış kılıfı bantlayarak veya dikerek kullanmak'], en: ['Taping or stitching damaged jacket to conceal core'] }
    },
    maintenance: {
      cleaning: { tr: 'Ilık suyla temizleme, serbest kurutma.', en: 'Lukewarm water wash and ambient air dry.' },
      lubricationInterval: { tr: 'Yağlama yapılmaz.', en: 'No lubrication allowed.' },
      lubricantType: { tr: 'Yasak', en: 'Prohibited' },
      movingPartsInspection: { tr: ['Kılıf dikiş kontrolü'], en: ['Outer jacket integrity check'] }
    },
    storage: {
      guidelines: { tr: ['Güneşten uzak kuru sapan dolabı.'], en: ['Dry UV-protected cabinet.'] },
      environmentalHazards: { tr: ['Güneş ve keskin talaşlar'], en: ['Sunlight and swarf'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Dış kılıf yırtıldığında içteki lif demetinin bir cisim tarafından çekilip koparılması',
          en: 'Operating with ruptured jacket allows protruding core yarn to snag and snap'
        },
        consequence: { tr: 'Taşıyıcı liflerin kademeli koparak sapanın patlaması', en: 'Progressive strand failure and complete sling rupture', severity: 'critical' }
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: ['Etiketin kayıp olması', 'Dış kılıfın delinerek iç taşıyıcı liflerin dışarı çıkması', 'Lif demetinde sertleşme/kaynak çapağı yanığı'],
        en: ['Missing identification tag', 'Any rupture in outer jacket exposing load-bearing core yarn', 'Core hardening or weld burn holes']
      },
      wearLimits: { tr: 'Kılıfın aşınarak incelmesi', en: 'Severe jacket fraying' },
      deformationLimits: { tr: 'Düğümlenme veya kılıf içinde lif kümelenmesi', en: 'Internal core bunching or knotting' },
      preventiveMeasures: { tr: ['Dışına ilave kalın manşon (sleeves) geçirilmesi'], en: ['Fit heavy external tubular sleeves for abrasion zones'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Dış kılıf renginin EN 1492 standardı tonaj rengini taşıdığını alıcıya belirtin.', en: 'Confirm outer jacket conforms to standardized EN 1492 color coding.' },
      operatorFocus: { tr: 'Beyaz iç lifleri görüyorsan o sapan ölmüştür; kesinlikle kullanma.', en: 'If white core fibers are visible anywhere, that sling is dead; discard immediately.' },
      inspectorFocus: { tr: 'Sapan boyunca elinle lifleri yokla; iç liflerde lokal sertleşme veya kopukluk boşluğu varsa ıskartaya ayır.', en: 'Palpate full length by hand; feel for internal lumpiness, core voids, or hard melted spots.' }
    }
  }
];
