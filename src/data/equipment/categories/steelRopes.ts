import { LiftingEquipmentItem } from '../types';

export const steelRopesData: LiftingEquipmentItem[] = [
  {
    id: 'wire-rope-6x36-ws',
    groupId: 'steel-wire-ropes',
    groupName: { tr: 'Çelik Tel Halatlar ve Sapanlar', en: 'Steel Wire Ropes & Slings' },
    code: 'WR-6X36-IWRC',
    name: {
      tr: '6x36 Warrington-Seale Çelik Tel Halat (Çelik Özlü / IWRC)',
      en: '6x36 Warrington-Seale Steel Wire Rope (IWRC)'
    },
    shortDescription: {
      tr: 'Yüksek yorulma direnci ve bükülme esnekliği sunan, ağır sanayi ve vinçlerde standart kabul edilen çok amaçlı kaldırma halatı.',
      en: 'General lifting rope providing exceptional fatigue resistance and bending flexibility, standard for overhead cranes.'
    },
    safetyFactor: '5:1 (Genel Kaldırma) / 6:1 (Personel/Kule Vinç)',
    standards: ['EN 12385-4', 'ISO 4309', 'DIN 3064', 'TS EN 12385-4'],
    wllRange: '1.2t - 120t (Çapa ve donanıma göre)',
    technicalSpecs: {
      construction: '6x36 WS + IWRC (Çelik Öz), Çapraz Sağ (sZ) veya Düz Sarım',
      materialGrade: 'Galvanizli veya Siyah Yüksek Karbonlu Çelik Tel',
      tensileGrade: '1770 N/mm² veya 1960 N/mm²',
      efficiencyFactor: '%90 - %100 (Uç sonlandırma tipine göre)',
      summaryPoints: {
        tr: [
          'Dış tellerin çap dengesi sayesinde yüksek aşınma ve ezilme dayanımı',
          'Çelik öz (IWRC) sayesinde tambur üzerinde üst üste sarımlarda yüksek basma mukavemeti',
          'Tavsiye edilen minimum tambur/makara oranı D/d ≥ 18 - 25'
        ],
        en: [
          'Balanced outer wire diameters offer superior wear and crushing endurance',
          'Steel core (IWRC) prevents ovalization during multilayer spooling on drums',
          'Recommended minimum sheave/drum ratio D/d ≥ 18 - 25'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Tavan vinci ana kaldırma halatı', 'Mobil vinç donanımları', 'Pres ve dökümhane vinçleri', 'Ağır pres çelik halat sapanları'],
        en: ['Overhead crane main hoist', 'Mobile crane rigging', 'Foundry/forge cranes', 'Heavy swaged wire rope slings']
      },
      unsuitableApplications: {
        tr: ['Kılavuzsuz serbest dönen tek hatlı yük kaldırmalar (dönmez halat seçilmelidir)', '150°C üzeri ortamda lif özlü halat kullanımı'],
        en: ['Unchecked single-part free hanging loads (use rotation-resistant rope)', 'Fiber core ropes in environments exceeding 150°C']
      },
      environment: {
        minTempC: -40,
        maxTempC: 150,
        tempDeRating: [
          { tempRange: '-40°C ile 150°C arası', capacityMultiplier: 1.0, notes: 'Tam kapasite (WLL x 1.00)' },
          { tempRange: '150°C ile 200°C arası', capacityMultiplier: 0.90, notes: '%10 kapasite düşümü uygulanmalıdır' },
          { tempRange: '200°C ile 300°C arası', capacityMultiplier: 0.75, notes: '%25 kapasite düşümü uygulanmalıdır' },
          { tempRange: '300°C üzeri', capacityMultiplier: 0.0, notes: 'Kullanımı KESİNLİKLE YASAKTIR' }
        ],
        chemicalResistance: {
          acids: 'limited',
          alkalis: 'limited',
          solvents: 'resistant',
          salineWater: 'limited'
        },
        sharpEdgeSensitivity: 'high',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: [
          'Müşteriye tambur tipini ve D/d oranını mutlaka sorun; aşırı küçük tamburda 6x36 erken yorulur.',
          'Nemli/deniz kıyısı için B Sınıfı galvanizli tel, kuru kapalı dökümhane için gresli siyah tel önerin.'
        ],
        en: [
          'Always verify drum diameter and D/d ratio; small sheaves accelerate 6x36 fatigue.',
          'Recommend Class B galvanized wire for marine environments; heavy grease black wire for dry mills.'
        ]
      },
      selectionTipsForEngineers: {
        tr: [
          'Tambur üzerinde çok katlı sarım varsa kesinlikle kendir/lif özlü (FC) değil, çelik özlü (IWRC) seçin.',
          'Açı faktörü ve D/d bükülme kayıplarını hesaplayarak nominal WLL değerini boyutlandırın.'
        ],
        en: [
          'For multi-layer drum spooling, strictly specify IWRC to prevent under-layer crushing.',
          'Factor in bending de-rating (D/d curve) when calculating actual working load limits.'
        ]
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Halat çapını kumpas ile doğru eksende (en geniş iki zıt demet üzerinden) ölçün; anma çapından %5 fazla incelme olmamalıdır.',
          'Kuş kafesi (birdcaging), kinking (kırılma/düğümlenme) ve sepetleşme kontrolü yapın.',
          'Halat boyunca kırık tel sayısını ve ezilme/düzleşme izlerini kontrol edin.'
        ],
        en: [
          'Measure rope diameter with calipers across crown of outer strands; max allowable reduction is 5%.',
          'Inspect thoroughly for birdcaging, kinking, basket distortion, and core protrusion.',
          'Count visible broken wires within lay lengths and check for flat/crushed sections.'
        ]
      },
      hitchingModes: [
        { mode: 'Düz Kaldırma (Straight Lift)', modeMultiplier: 1.0, notes: 'Nominal WLL geçerlidir' },
        { mode: 'Boğma Bağlantı (Choker Hitch)', modeMultiplier: 0.8, notes: 'Bükülme açısına göre %20 kapasite düşümü' },
        { mode: 'Sepet Bağlantı (Basket Hitch - Paralel)', modeMultiplier: 2.0, notes: 'D/d ≥ 25 ve kollar dik olduğunda WLL x 2.0' },
        { mode: 'Sepet Bağlantı (60° Tepe Açısı)', modeMultiplier: 1.73, notes: 'Sin(60°) geometrik gerilim faktörü' },
        { mode: 'Sepet Bağlantı (90° Tepe Açısı)', modeMultiplier: 1.41, notes: 'Sin(45°) geometrik gerilim faktörü' }
      ],
      angleRules: {
        tr: 'Çelik halat sapan kollarında dikey eksenle açı asla 60 dereceyi (iki kol arası tepe açısı 120°) aşmamalıdır.',
        en: 'The sling angle to the horizontal must never be less than 30 degrees (apex angle max 120°).'
      },
      prohibitedUses: {
        tr: [
          'Halata düğüm atmak veya cıvatalarla ezerek geçici boy kısaltması yapmak',
          'Koruyucu köşe bendi olmadan 90 derece keskin metal sac köşelerine sarmak',
          'Halat üzerinden forklift veya ağır tekerlekli vasıta geçirilmesi',
          'Halatı kaynak şasesi olarak kullanmak veya elektrik arkına maruz bırakmak'
        ],
        en: [
          'Tying knots or using bolts/clamps to shorten rope length',
          'Choking over sharp corners without engineered edge protectors',
          'Driving forklifts or vehicles over wire ropes on the floor',
          'Using the rope as an electrical grounding cable or exposing to welding arc'
        ]
      }
    },
    maintenance: {
      cleaning: {
        tr: 'Halat üzerindeki kurumuş çamur, metal talaşı ve toz metal tel fırça ve basınçlı hava ile temizlenmeli; solvent ile yıkanmamalıdır.',
        en: 'Clean dried mud, grit, and metallic swarf using wire brushes and compressed air; avoid harsh solvents.'
      },
      lubricationInterval: {
        tr: 'Ağır çalışma koşullarında ayda 1 kez, normal tavan vinçlerinde 3 ayda 1 kez basınçlı yağlama yapılmalıdır.',
        en: 'Once monthly under severe duty; quarterly for standard overhead cranes via pressure lubricator.'
      },
      lubricantType: {
        tr: 'Halat içine nüfuz eden solventsiz penetrasyon gresi veya ISO VG 100-150 sentetik halat yağı.',
        en: 'Penetrating solvent-free wire rope grease or ISO VG 100-150 synthetic wire rope dressing.'
      },
      movingPartsInspection: {
        tr: [
          'Döner tambur ve makara kanallarında aşınma oluğu derinliği kontrolü',
          'Halat pabuç ve soket bağlantı pimlerinin çatlak kontrolü (Manyetik Parçacık / MPI)'
        ],
        en: [
          'Check drum grooves and sheave throats for corrugation and undersized wear profiles',
          'Inspect wedge sockets, thimbles, and pins for fatigue cracks using MPI'
        ]
      }
    },
    storage: {
      guidelines: {
        tr: [
          'Halat makaraları kesinlikle ıslak zemine veya toprağa doğrudan konulmamalı, ahşap palet üzerinde saklanmalıdır.',
          'Havadar, kuru, tavanı kapalı ve asit buharlarından uzak hangarlarda muhafaza edilmelidir.',
          'Halat sapanlar kullanılmadığında saha askılıklarına asılmalı, zeminde sürüklenmemelidir.'
        ],
        en: [
          'Reels must never rest directly on damp ground; store elevated on wooden pallets.',
          'Keep in well-ventilated, roofed, dry warehouses away from acidic battery fumes.',
          'Hang wire rope slings on designated A-frame racks off the floor when idle.'
        ]
      },
      environmentalHazards: {
        tr: ['Kükürtlü ve asidik gaz ortamları', 'Doğrudan yağmur suyu birikintisi', 'Kaynak çapakları'],
        en: ['Sulfuric and acidic atmospheric vapors', 'Standing rain puddles', 'Welding spatter zones']
      }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Yükün keskin sac köşesine doğrudan temas ettirilmesi sonucu tellerin kesilmesi ve lokal ezilme',
          en: 'Rigging directly over sharp unchamfered sheet metal corners cutting outer wires'
        },
        consequence: {
          tr: 'Halatın anma yükünün %30-50 altında aniden kopması ve yükün düşmesi',
          en: 'Catastrophic sling failure well below nominal WLL causing dropped objects'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Halatın ani şok yüklemeye (serbest düşüşten sonra frenleme) maruz kalması',
          en: 'Shock loading caused by sudden braking or snatching dynamic loads'
        },
        consequence: {
          tr: 'Kuş kafesi (birdcaging) deformasyonu ve çelik özün dışarı fırlaması',
          en: 'Birdcaging distortion, core pop-out, and permanent loss of structural integrity'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Makara kanal genişliğinin halat çapından küçük olması (sıkışma)',
          en: 'Undersized sheave grooves pinching the rope flanks'
        },
        consequence: {
          tr: 'Aşırı sürtünme ısısı, tellerde erken yorulma ve iç tel kırılmaları',
          en: 'Accelerated friction fatigue, internal wire breakage undetectable visually'
        },
        severity: 'high'
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'ISO 4309 uyarınca: 6x36 halatta 6d boyunda 9 adet, 30d boyunda 18 adet rastgele dağılmış dış tel kırığı',
          'Tek bir demet vadisinde (valley break) yan yana 2 veya daha fazla tel kırığı',
          'Kuş kafesi, sepetleşme veya halat ekseninde belirgin bükülme (kink)',
          'Elektrik arkı veya kaynak temasından kaynaklanan bölgesel tavlanma/renk değişimi'
        ],
        en: [
          'Per ISO 4309: 9 randomly distributed broken wires over 6d length, or 18 over 30d length',
          '2 or more broken wires clustered in a single strand valley (valley break)',
          'Birdcaging, severe core protrusion, or permanent dog-leg kinking',
          'Heat tint or metallurgical annealing from welding arc contact'
        ]
      },
      wearLimits: {
        tr: 'Dış tellerdeki aşınma veya korozyon nedeniyle halat anma çapında %7 ve üzeri kalıcı daralma',
        en: 'Permanent reduction in nominal rope diameter of 7% or more due to outer wire wear or corrosion'
      },
      deformationLimits: {
        tr: 'Halatın ovalleşmesi, yassılaşması (anma çap farkı > %10) veya kumpasla ölçülen bozulmalar',
        en: 'Rope ovalization or flattening exceeding 10% deviation across perpendicular axes'
      },
      preventiveMeasures: {
        tr: [
          'Keskin köşelerde poliüretan veya döküm çelik mafsallı köşebent kullanılması',
          'Kaldırma planında vinç operatörünün ani kalkış ve ani frenlemeleri yazılımla sınırlandırması'
        ],
        en: [
          'Mandate heavy-duty polyurethane or articulated steel edge protectors on sharp radii',
          'Incorporate ramp acceleration/deceleration on crane VFD drives to eliminate shock loads'
        ]
      }
    },
    roleInsights: {
      sellerFocus: {
        tr: 'Müşteriye halat teklifi verirken mutlaka: Halat yapısı (6x36 WS IWRC), tel mukavemeti (1960 N/mm²), kaplama (Galvanizli/Siyah) ve sarım yönü (sZ/zS) teyit edilmelidir.',
        en: 'When quoting, verify: construction (6x36 WS IWRC), tensile strength (1960 N/mm²), surface finish (Galv/Ungalv), and lay direction (sZ/zS).'
      },
      operatorFocus: {
        tr: 'Her vardiya öncesi eldivenle halat göz kontrolü yap; asla kuş kafesi yapmış veya ezilmiş halatla kaldırma yapma, amire bildir.',
        en: 'Perform pre-shift visual and rag run check; immediately quarantine any kinked or birdcaged rope.'
      },
      inspectorFocus: {
        tr: 'ISO 4309 Tablo 3 değerlendirmesi yap: 6d ve 30d aralığında kırık tel say, vadi kırıklarını büyüteçle incele, çap kaybını mikrometreyle kaydet.',
        en: 'Execute ISO 4309 Table 3 audit: count broken wires per 6d/30d lay lengths, check valleys with magnifying glass, log diameter shrinkage.'
      }
    }
  },
  {
    id: 'wire-rope-35x7-rotation-resistant',
    groupId: 'steel-wire-ropes',
    groupName: { tr: 'Çelik Tel Halatlar ve Sapanlar', en: 'Steel Wire Ropes & Slings' },
    code: 'WR-35X7-ROT-RES',
    name: {
      tr: '35x7 / 18x7 Dönmez Çelik Halat (Rotation Resistant)',
      en: '35x7 / 18x7 Rotation-Resistant Steel Wire Rope'
    },
    shortDescription: {
      tr: 'İç ve dış demet katmanları zıt yönlerde sarılmış, kılavuzsuz yüksek irtifa kaldırmalarında yükün kendi etrafında dönmesini engelleyen özel halat.',
      en: 'Multi-strand rope with counter-wound inner and outer layers preventing load spin during unguided single-fall high lifts.'
    },
    safetyFactor: '5:1 (Mobil Vinç) / 6:1 (Kule Vinç)',
    standards: ['EN 12385-4', 'ISO 4309', 'API Spec 9A'],
    wllRange: '2t - 80t',
    technicalSpecs: {
      construction: '35x7 Kompakt Çok Katlı (Multi-strand non-rotating), IWRC',
      materialGrade: 'Yüksek Karbonlu Çelik Tel',
      tensileGrade: '1960 N/mm² / 2160 N/mm²',
      efficiencyFactor: '%90 - %95',
      summaryPoints: {
        tr: [
          'Dış demetler ile iç çekirdek katmanlarının tork momentleri birbirini nötrler',
          'Tek halatlı serbest askı kaldırmalarında yükün fırdöndü olmadan stabil kalmasını sağlar',
          'Ezilmeye karşı hassastır; tamburda hatasız kanal sarımı gerektirir'
        ],
        en: [
          'Counter-directional inner/outer strand torque eliminates rotation under load',
          'Maintains load stability in single-part hoisting without requiring swivels',
          'Sensitive to cross-over crushing; requires precision lebus grooved drums'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Kule vinç ana kaldırma halatı', 'Mobil teleskopik vinç tek hat donanımı', 'Açık deniz (offshore) rüzgar türbini montaj vinçleri'],
        en: ['Tower crane main hoist', 'Telescopic mobile crane single-line lifts', 'Offshore wind installation cranes']
      },
      unsuitableApplications: {
        tr: ['Fırdöndü (swivel) ile birlikte kullanımı tehlikelidir; dönmez halatlarda fırdöndü dış demetlerin açılmasına yol açabilir.'],
        en: ['Using active bearing swivels can destabilize outer layer lay geometry, causing structural unraveling.']
      },
      environment: {
        minTempC: -40,
        maxTempC: 120,
        chemicalResistance: {
          acids: 'limited',
          alkalis: 'limited',
          solvents: 'resistant',
          salineWater: 'limited'
        },
        sharpEdgeSensitivity: 'extreme',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Müşteri tek halatla yüksek binalara yük çıkaracaksa standart 6x36 yerine mutlaka dönmez (35x7) teklif edin.'],
        en: ['For unguided vertical single-fall lifts on high-rise jobs, strictly specify 35x7 rotation-resistant.']
      },
      selectionTipsForEngineers: {
        tr: ['D/d tambur oranını en az 25-30 seçin; dönmez halatlar küçük makaralarda iç tel kırılmalarına daha açıktır.'],
        en: ['Maintain generous D/d ≥ 25-30 ratios to prevent accelerated non-visible core strand degradation.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: ['Dış katman ile iç katman arasında fenerleşme (core protrusion) ve burgu bozulması kontrolü.'],
        en: ['Inspect for outer strand loosening, lantern distortion, or core protrusion.']
      },
      hitchingModes: [
        { mode: 'Düz Dikey Kaldırma', modeMultiplier: 1.0, notes: 'Tek hat vinç donanımı' }
      ],
      angleRules: {
        tr: 'Filo açısı (Fleet angle) tambur ve makara arasında 1.5 dereceyi kesinlikle geçmemelidir.',
        en: 'Fleet angle between sheave and drum must not exceed 1.5 degrees to avoid cross-spooling.'
      },
      prohibitedUses: {
        tr: ['Rulmanlı serbest fırdöndüye bağlamak', 'Tambur üzerinde çapraz bindirme yapmak'],
        en: ['Attaching to free-spinning bearing swivels', 'Allowing rope crossovers on flat drums']
      }
    },
    maintenance: {
      cleaning: { tr: 'Basınçlı kuru hava ile temizlenir.', en: 'Dry pressurized air cleaning.' },
      lubricationInterval: { tr: 'İki ayda bir yüksek nüfuz edici sentetik halat yağı tatbiki.', en: 'Bi-monthly penetrating synthetic oil.' },
      lubricantType: { tr: 'Düşük viskoziteli iç katmana işleyen sıvı gres.', en: 'Low-viscosity deep-penetrating liquid grease.' },
      movingPartsInspection: { tr: ['Makara kanallarının V şeklinde daralmadığının kontrolü'], en: ['Ensure sheave throat has not worn into a wedge pinching groove'] }
    },
    storage: {
      guidelines: {
        tr: ['Orijinal ahşap makarada, nemsiz depoda, gerdirilmeden sarılı olarak saklanmalıdır.'],
        en: ['Store on original reels in dehumidified storehouses under zero operational tension.']
      },
      environmentalHazards: { tr: ['Aşırı nem ve tuzlu sis'], en: ['High humidity and marine fog'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Fırdöndü kullanılarak dış demetlerin gevşetilmesi ve iç katmanın tüm yükü tek başına taşıması',
          en: 'Using an active swivel causing outer strands to unlay and overstressing core'
        },
        consequence: {
          tr: 'İç çekirdeğin ani kopması ve görünür dış belirti olmadan yükün düşmesi',
          en: 'Internal core failure causing catastrophic load drop without clear outer visual warning'
        },
        severity: 'critical'
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'ISO 4309 uyarınca dönmez halatlarda kırık tel toleransı normal halatların yarısıdır (6d boyunda 2 tel kırığı ıskarta sebebidir)',
          'Herhangi bir dış demetin kabarması veya iç çekirdeğin dışarı fırlaması'
        ],
        en: [
          'Per ISO 4309, discard threshold is strict: 2 outer wire breaks over 6d warrants immediate rejection',
          'Any outer strand loosening or inner core protrusion'
        ]
      },
      wearLimits: { tr: 'Anma çapında %3 üzeri daralma', en: 'Diameter loss exceeding 3%' },
      deformationLimits: { tr: 'Bölgesel dalgalanma veya iç kafes çökmesi', en: 'Waveform distortion or internal core collapse' },
      preventiveMeasures: { tr: ['Manyetik Halat Muayene (MRT) cihazı ile düzenli iç kontrol yapılması'], en: ['Perform routine Magnetic Rope Testing (MRT) for hidden internal defects'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Kule vinç müşterisine fırdöndü kullanılmaması gerektiğini özellikle sözleşmede belirtin.', en: 'Explicitly advise tower crane operators against using swivel couplings.' },
      operatorFocus: { tr: 'Kaldırma esnasında yükün fırdöndü olmadan kendi kendine dönmediğini doğrula.', en: 'Verify that load stays rotationally stable without external guide lines.' },
      inspectorFocus: { tr: 'Gözle görülemeyen iç kırıklar için MRT cihazı kullan veya makara temas noktalarını detaylı tara.', en: 'Deploy electromagnetic MRT inspection to detect internal broken core wires.' }
    }
  },
  {
    id: 'wire-rope-sling-pressed',
    groupId: 'steel-wire-ropes',
    groupName: { tr: 'Çelik Tel Halatlar ve Sapanlar', en: 'Steel Wire Ropes & Slings' },
    code: 'WRS-PRES-EN13414',
    name: {
      tr: 'Alüminyum / Çelik Yüksüklü Pres Baskılı Çelik Halat Sapanlar',
      en: 'Ferrule-Secured Swaged Steel Wire Rope Slings'
    },
    shortDescription: {
      tr: 'EN 13414-1 standardına uygun, hidrolik presle basılmış alüminyum (Talurit) veya dövme çelik yüksüklü, radansalı/gözlü ağır yük sapanları.',
      en: 'Heavy duty lifting slings terminated with hydraulic-pressed aluminum (Talurit) or forged steel ferrules per EN 13414-1.'
    },
    safetyFactor: '5:1',
    standards: ['EN 13414-1', 'EN 13411-3', 'ASME B30.9', 'DIN 3088'],
    wllRange: '0.8t - 250t (1, 2, 3 ve 4 Kollu)',
    technicalSpecs: {
      construction: '6x36 WS veya 6x19 Çelik Özlü Halat + Tip A Alüminyum veya Çelik Yüksük',
      materialGrade: 'Grade 1960 N/mm² Galvanizli Çelik Tel',
      efficiencyFactor: '%90 (EN 13411-3 uyarınca terminasyon verimi)',
      summaryPoints: {
        tr: [
          'Hidrolik pres altında soğuk akış ile halat liflerine kenetlenen yüksük bağlantısı',
          'Göz içine radansa (thimble) takılarak gözün ezilmesi ve aşınması önlenir',
          'Üzerinde WLL, CE işareti, imalatçı kodu ve seri numarası bulunan metal marka zorunludur'
        ],
        en: [
          'Cold-flow hydraulic swaging encapsulates wire rope strands inside sleeve',
          'Equipped with heavy thimble to protect eye from friction and crushing',
          'Requires permanent metallic identification tag with WLL, CE mark, and serial number'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Ağır makine taşımaları', 'Şantiye prekast beton ve çelik konstrüksiyon montajı', 'Liman konteyner ve kargo tahliyesi'],
        en: ['Heavy machinery rigging', 'Precast concrete and structural steel erection', 'Port cargo stevedoring']
      },
      unsuitableApplications: {
        tr: ['100°C üzerindeki sıcak ortamlarda standart alüminyum yüksüklü sapan kullanılamaz (çelik yüksük seçilmelidir)', 'Aşındırıcı asit banyoları'],
        en: ['Standard aluminum ferrules prohibited above 100°C (specify steel swaged sleeves)', 'Acidic pickling baths']
      },
      environment: {
        minTempC: -40,
        maxTempC: 100, // Aluminum ferrule limit
        tempDeRating: [
          { tempRange: '-40°C ile 100°C arası (Alüminyum)', capacityMultiplier: 1.0, notes: 'Tam anma kapasitesi' },
          { tempRange: '100°C üzeri (Alüminyum Yüksük)', capacityMultiplier: 0.0, notes: 'ALÜMİNYUM YÜKSÜK İÇİN KESİNLİKLE YASAKTIR' },
          { tempRange: '100°C - 150°C (Çelik Yüksük)', capacityMultiplier: 1.0, notes: 'Çelik yüksükle tam kapasite' },
          { tempRange: '150°C - 200°C (Çelik Yüksük)', capacityMultiplier: 0.90, notes: '%10 kapasite düşümü' }
        ],
        chemicalResistance: {
          acids: 'prohibited',
          alkalis: 'limited',
          solvents: 'resistant',
          salineWater: 'limited'
        },
        sharpEdgeSensitivity: 'high',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Sıcak haddehane veya dökümhane müşterisine alüminyum presli sapan kesinlikle vermeyin; çelik kovanlı pres veya zincir sapan önerin.'],
        en: ['Never supply aluminum swaged slings to foundries or steel mills; supply steel sleeves or chain slings.']
      },
      selectionTipsForEngineers: {
        tr: ['Çok kollu sapanlarda yükün kollara eşit dağılmadığı (asimetrik) durumlar için 2 kolu yük taşıyor gibi kabul edin.'],
        en: ['For multi-leg slings under asymmetric rigging, base WLL on only 2 load-bearing legs.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Metal etiket üzerindeki WLL değeri ve periyodik kontrol tarihi okunabiliyor mu?',
          'Pres kovanında çatlak, ezilme, halattan ayrılma veya kayma izi var mı?',
          'Kovan dibindeki halatta tel kırığı var mı (en kritik gerilim noktasıdır)?'
        ],
        en: [
          'Is the identification tag legible showing WLL and valid periodic inspection stamp?',
          'Check ferrule for cracks, deformation, gouges, or slippage marks.',
          'Inspect dead and live rope entry at the ferrule collar for fatigue wire breaks.'
        ]
      },
      hitchingModes: [
        { mode: 'Düz (1 Kol)', modeMultiplier: 1.0, notes: 'WLL x 1.0' },
        { mode: '2 Kollu (0° - 45° Dikey Açı)', modeMultiplier: 1.4, notes: 'WLL x 1.4 (Tepe Açısı ≤ 90°)' },
        { mode: '2 Kollu (45° - 60° Dikey Açı)', modeMultiplier: 1.0, notes: 'WLL x 1.0 (Tepe Açısı 90° - 120°)' },
        { mode: '3 ve 4 Kollu (0° - 45° Dikey Açı)', modeMultiplier: 2.1, notes: 'WLL x 2.1' },
        { mode: 'Boğma Bağlantı (Choker)', modeMultiplier: 0.8, notes: 'WLL x 0.80' }
      ],
      angleRules: {
        tr: 'Kollar arası tepe açısı (açıklık) 120 dereceyi (dikey eksenle 60°) asla geçemez. 120° üzerinde kollar aşırı gerilerek kopar.',
        en: 'Included angle between opposite legs must not exceed 120°. Beyond 120° leg tensions spike exponentially.'
      },
      prohibitedUses: {
        tr: [
          'Pres kovanının doğrudan kaldırma kancasına veya köşe kenarına bindirilmesi',
          'Sapan kolunu kısaltmak için düğüm atmak veya cıvatalamak',
          'Etiketsiz veya kimliksiz sapanla kaldırma yapmak'
        ],
        en: [
          'Loading the aluminum sleeve directly against the crane hook horn or edge',
          'Knotted sling legs to adjust length',
          'Lifting with missing or illegible sling ID tags'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Çamur ve kir basınçlı su/fırça ile temizlenir, kurulanır.', en: 'Clean dirt with brush and water; dry thoroughly.' },
      lubricationInterval: { tr: 'Ayda bir kez sapan halatı ince yağ ile yağlanmalıdır.', en: 'Lubricate monthly with light wire rope oil.' },
      lubricantType: { tr: 'Solventsiz yapışkan mineral halat yağı.', en: 'Solvent-free adhesive mineral lubricant.' },
      movingPartsInspection: { tr: ['Radansanın göz yuvasından çıkmadığının kontrolü'], en: ['Verify thimble has not dislodged from sling eye'] }
    },
    storage: {
      guidelines: {
        tr: ['Sahanın kuru, havalandırılan sapan askılarında asılı tutulmalıdır; yerde çamur ve kimyasal içinde bırakılmamalıdır.'],
        en: ['Hang on dedicated A-frame rigging trees in dry, sheltered areas off ground level.']
      },
      environmentalHazards: { tr: ['Asit banyoları ve galvaniz dumanı'], en: ['Acid wash vats and galvanizing fumes'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Pres kovanının yük köşesinde ezilmesi sonucu kovanın çatlayıp halatı salması',
          en: 'Crushing the aluminum sleeve against sharp structural loads causing sleeve rupture'
        },
        consequence: {
          tr: 'Sapan gözünün aniden çözülmesi ve yükün düşmesi',
          en: 'Instant termination release and catastrophic dropped load'
        },
        severity: 'critical'
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Pres kovanında en ufak çatlak, yarılma veya derin çizik',
          'Halatın kovan içinden 1 mm dahi kaydığına dair iz',
          'Kovan dibinde bitişik 3 adet veya sapan boyunda 6 tel kırığı',
          'Metal kimlik etiketinin kaybolması veya üzerindeki WLL değerinin silinmesi'
        ],
        en: [
          'Any crack, split, or deep gouge in the pressed ferrule',
          'Any evidence of rope slippage inside the ferrule (> 1mm)',
          '3 broken wires adjacent to the ferrule collar or 6 along the leg',
          'Missing, detached, or illegible metal identification tag'
        ]
      },
      wearLimits: { tr: 'Halat anma çapında %10 aşınma', en: '10% nominal diameter wear' },
      deformationLimits: { tr: 'Kalıcı ezilme, bükülme (kink) veya radansada %15 deformasyon', en: 'Severe kinking or thimble throat deformation > 15%' },
      preventiveMeasures: { tr: ['Sapan kovanlarının yükle temas etmeyecek serbest boyda bırakılması'], en: ['Ensure ferrules remain in clear line of sight, never contacting loads directly'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye sapan uzunluğunu verirken efektif çalışma boyunu (göz içi - göz içi veya mapa pimi mesafesi) netleştirin.', en: 'Clarify effective working length (bearing to bearing) with customer before swaging.' },
      operatorFocus: { tr: 'Sapanı bağlarken alüminyum kovanın köşe veya kancaya ezilmediğinden emin ol.', en: 'Ensure the aluminum ferrule hangs straight and never bends over load corners.' },
      inspectorFocus: { tr: 'Kovan ağzını 10x büyüteçle kontrol et; kovan içi tel çekilmesi ve etiket seri no uyumunu tutanağa yaz.', en: 'Check sleeve exit with 10x loupe for strand necking; cross-check tag serial number.' }
    }
  }
];
