import { LiftingEquipmentItem } from '../types';

export const liftingMachinesData: LiftingEquipmentItem[] = [
  {
    id: 'manual-chain-hoist-hubzug',
    groupId: 'lifting-machines',
    groupName: { tr: 'Manuel ve Motorlu Kaldırma Makineleri', en: 'Manual & Powered Lifting Machinery' },
    code: 'HOIST-MANUAL-EN13157',
    name: {
      tr: 'Manuel Kollu Çektirme (Hubzug) & Zincirli Caraskal',
      en: 'Manual Lever Hoist (Hubzug / Ratchet Lever) & Chain Block (EN 13157)'
    },
    shortDescription: {
      tr: 'EN 13157 standardında, mekanik Weston tipi otomatik yük frenine sahip, montaj, germe ve dikey/açılı hassas kaldırma yapan kompakt makineler.',
      en: 'Compact manual rigging hoists equipped with automatic Weston-type mechanical load brakes per EN 13157.'
    },
    safetyFactor: '4:1',
    standards: ['EN 13157', 'ASME B30.16', 'ASME B30.21', 'TS EN 13157'],
    wllRange: '0.25t - 20t',
    technicalSpecs: {
      construction: 'Dökme/Pres Çelik Gövde + Grade 80/100 Kalibre Yük Zinciri + Çift Tırnaklı Weston Fren',
      materialGrade: 'Grade 80 / Grade 100 Kalibre Alaşımlı Zincir',
      efficiencyFactor: '%100',
      summaryPoints: {
        tr: [
          'Hubzug hem dikey kaldırma hem de yatay çekme ve pozisyonlamada kullanılabilir',
          'Otomatik Weston yük freni kol bırakıldığı anda yükü anında havada kilitler',
          'Aşırı yük sınırlayıcı (Overload limiter / kaydırma debriyajı) opsiyonu emniyeti katlar'
        ],
        en: [
          'Lever hoists function both in vertical lifting and horizontal pulling/tensioning',
          'Weston automatic brake locks the load instantly the moment hand effort ceases',
          'Optional friction slip clutch prevents structural overload beyond rated WLL'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Boru hattı hizalama ve flanş montajı', 'Ağır makinelerin dar alanlarda milimetrik konumlandırılması', 'Gemi ambarı ve şantiye yük sabitleme'],
        en: ['Pipe alignment and flange bolt fit-up', 'Millwright precision positioning in tight clearances', 'Cargo lashing and structural stay tensioning']
      },
      unsuitableApplications: {
        tr: ['İnsan veya personel kaldırma (EN 13157 manuel caraskallarla personel kaldırmak YASAKTIR)', 'Yük zincirinin doğrudan yükün etrafına dolanarak boğulması'],
        en: ['Hoisting personnel (strictly forbidden on manual hoists)', 'Wrapping load chain around load as a sling (back-hooking)']
      },
      environment: {
        minTempC: -20,
        maxTempC: 80,
        tempDeRating: [
          { tempRange: '-20°C ile 80°C arası', capacityMultiplier: 1.0, notes: 'Tam kapasite (%100 WLL)' },
          { tempRange: '80°C üzeri', capacityMultiplier: 0.0, notes: 'Fren balatası sinterleşir; YASAKTIR' }
        ],
        chemicalResistance: { acids: 'limited', alkalis: 'limited', solvents: 'resistant', salineWater: 'limited' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Ağır şantiye müşterilerine aşırı yük emniyet kavramalı (overload clutch) modelleri önerin; bu sistem kol uzatma borusu takılsa dahi gövdeyi korur.'],
        en: ['Proactively offer friction overload limiter options to prevent damage from unauthorized cheater pipes.']
      },
      selectionTipsForEngineers: {
        tr: ['Kol boyu fabrikasyon olarak insan kas gücüne göre optimize edilmiştir. Kola asla ilave boru takılarak moment artırılmamalıdır.'],
        en: ['Handle length is factory calibrated for human exertion; cheater pipes on levers are strictly prohibited.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Yük freni test edildi mi? (Yükü hafifçe kaldırıp kolu bırakınca kaydırma yapıyor mu?)',
          'Yük zincirinde bakla dönüklüğü (capsized chain) veya zincirde yağsızlık var mı?',
          'Alt ve üst kancada emniyet mandalı çalışıyor mu?'
        ],
        en: [
          'Verify load brake holds under light test tension without slipping.',
          'Check for twisted or capsized multi-fall chain loops and inspect chain lubrication.',
          'Verify upper and lower hook safety latches spring shut reliably.'
        ]
      },
      hitchingModes: [
        { mode: 'Doğrudan Kancadan Asma', modeMultiplier: 1.0, notes: 'Gövde kancası sağlam mapaya takılmalıdır' }
      ],
      angleRules: {
        tr: 'Caraskal gövdesi ile yük zinciri aynı doğrultuda olmalıdır; gövde kenara çarparak sıkışmamalıdır.',
        en: 'The hoist body must align freely with the pull direction without contacting obstructions.'
      },
      prohibitedUses: {
        tr: [
          'Kola boru (cheater pipe) takarak zorlamak',
          'Yük zincirini sapan gibi yükün altına sarıp kancayı zincire takmak (back hooking)',
          'Boşta hızlı sarım (free-wheeling) modundayken makineyi yüke bindirmek'
        ],
        en: [
          'Using extension cheater pipes on ratchet levers',
          'Choking load chain around load and hooking back onto chain',
          'Applying load while selector is in free-wheel mode'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Fren balatasına kesinlikle solvent veya yağ DEĞDİRİLMEZ; kuru bezle silinir.', en: 'Friction brake discs must be kept clean and 100% oil-free.' },
      lubricationInterval: { tr: 'Yük zinciri ve dişli kutusu aylık greslenir; fren diski kesinlikle yağsız bırakılır.', en: 'Lubricate chain and gear train monthly; brake discs MUST remain dry.' },
      lubricantType: { tr: 'Yüksek basınca dayanıklı grafitli gres (zincir için).', en: 'Graphite-based extreme pressure grease for chain.' },
      movingPartsInspection: { tr: ['Fren mandalı (pawl) yay ve diş aşınma kontrolü'], en: ['Inspect ratchet pawl engagement and spring tension'] }
    },
    storage: {
      guidelines: { tr: ['Kuru, kapalı depoda, zinciri toplanmış olarak askıda saklanmalıdır.'], en: ['Store suspended in clean dry room with chain retracted.'] },
      environmentalHazards: { tr: ['Fren balatasını şişiren nem ve yağ buharı'], en: ['Moisture and oil vapors which ruin brake friction'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Operatörün kaldıramadığı yük için hubzug koluna 1 metrelik boru takıp asılması',
          en: 'Operator sliding a 1-meter scaffold tube onto ratchet handle to force lift'
        },
        consequence: {
          tr: 'Dişli mekanizmasının veya fren tırnağının sıyrılarak yükün kontrolsüz çakılması',
          en: 'Internal gear shear or pawl fracture leading to runaway dropped load'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Fren balatasına zincirden yağ sıçraması veya bilinçsizce frenin yağlanması',
          en: 'Grease contaminating the dry friction brake disc'
        },
        consequence: { tr: 'Frenin yükü tutamayıp geriye doğru kaçırması', en: 'Total brake slippage and uncontrolled descent under load', severity: 'critical' }
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Fren diskinde aşınma, yağlanma veya camlaşma',
          'Fren tırnağında (pawl) kırık veya aşınmış dişler',
          'Kancalarda %10 ağız açılması veya gövdede çatlak'
        ],
        en: [
          'Worn, oil-contaminated, or glazed friction brake discs',
          'Chipped, broken, or worn ratchet pawl teeth',
          'Hook throat spread exceeding 10% or hook body fractures'
        ]
      },
      wearLimits: { tr: 'Yük zincirinde %10 aşınma veya fren diskinde 1.5mm aşınma', en: '10% chain link wear or 1.5mm brake lining thickness loss' },
      deformationLimits: { tr: 'Gövde saçlarında kalıcı yamulma veya zincir tamburunda deformasyon', en: 'Twisted frame plates or grooved chain sheave wear' },
      preventiveMeasures: { tr: ['Fren tutma testi ve yıllık akredite statik yük testi (%125 WLL)'], en: ['Annual accredited dynamic and static proof test (125% WLL)'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Hubzug ile caraskal farkını açıklayın: Hubzug kola sahiptir ve her açıda çeker; caraskal dikey kaldırma zincirlidir.', en: 'Clarify lever hoist vs chain block: lever hoists pull in all orientations; chain blocks are primarily vertical.' },
      operatorFocus: { tr: 'Kola ASLA boru takma! Yük freni tutmuyorsa o aletle 1 gram dahi kaldırma yapma.', en: 'NEVER put a cheater pipe on the lever! If brake slips even slightly, take it out of service.' },
      inspectorFocus: { tr: 'Fren balatasında yağ kontaminasyonu var mı bak, mandal yayını kontrol et, %125 aşırı yük testi uygula.', en: 'Check brake discs for oil ingress, verify ratchet pawl engagement, conduct 125% static proof test.' }
    }
  },
  {
    id: 'overhead-crane-eot',
    groupId: 'lifting-machines',
    groupName: { tr: 'Manuel ve Motorlu Kaldırma Makineleri', en: 'Manual & Powered Lifting Machinery' },
    code: 'CRANE-EOT-EN15011',
    name: {
      tr: 'Gezer Köprülü Tavan Vinçleri (EOT Overhead Cranes)',
      en: 'Electric Overhead Traveling (EOT) Cranes per EN 15011'
    },
    shortDescription: {
      tr: 'Fabrika ve hangarlarda ray üzerinde köprü, araba ve kanca hareketleriyle 3 boyutta tonlarca yükü hassas taşıyan ana üretim vinçleri.',
      en: 'Heavy-duty industrial bridge cranes traveling along elevated runways providing 3-axis load movement.'
    },
    safetyFactor: 'FEM / ISO Sınıfına Uygun (1Am - 5m)',
    standards: ['EN 15011', 'ISO 4301', 'FEM 1.001', 'ASME B30.2'],
    wllRange: '1t - 500t',
    technicalSpecs: {
      construction: 'Kutu Kiriş / Kafes Kiriş Köprü + Çift/Tek Kiriş Yürüyüş Arabası + Tamburlu Halatlı Kaldırma Grubu',
      materialGrade: 'S355 Çelik Konstrüksiyon',
      efficiencyFactor: '%100',
      summaryPoints: {
        tr: [
          'Aşırı yük sviçi (Overload limit switch) ve nihai kesici sviçler (Limit switches) zorunludur',
          'Kanca bloğunda halat atma pimi ve 360° dönebilen rulmanlı güvenlik mandallı kanca',
          'Frekans invertörlü (VFD) sürüş ile şoksuz yumuşak kalkış ve duruş'
        ],
        en: [
          'Mandatory electronic overload limiter and ultimate upper/lower hook limit switches',
          'Hook block equipped with rope retainers and 360° swiveling latch-equipped forged hook',
          'VFD frequency inverters provide smooth stepless acceleration and load anti-sway'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Haddehane ve dökümhane ana holleri', 'Makine montaj ve kalıphane atölyeleri', 'Depo yükleme boşaltma'],
        en: ['Steel mill and foundry bays', 'Machine tool shops and die handling', 'Heavy fabrication yards']
      },
      unsuitableApplications: {
        tr: ['Ray hatve ve açıklık sapmaları tolerans dışı olan çarpık raylı binalar'],
        en: ['Runways with out-of-tolerance rail span skew or elevation deviations']
      },
      environment: {
        minTempC: -20,
        maxTempC: 60,
        chemicalResistance: { acids: 'limited', alkalis: 'limited', solvents: 'resistant', salineWater: 'limited' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Müşterinin vardiya yoğunluğuna göre FEM sınıfını (örn. 2m veya 3m) doğru seçin; düşük sınıf seçilirse dişli kutusu erken biter.'],
        en: ['Match FEM duty class (e.g. 2m or 3m) to operating cycles; undersized class causes premature gearbox failure.']
      },
      selectionTipsForEngineers: {
        tr: ['Kanca alt ve üst limit sviçlerinin yedekli (çift emniyetli) olmasını şartnameye ekleyin.'],
        en: ['Specify redundant upper limit switches (geared rotary + gravity limit) for critical process bays.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Acil stop butonu ve siren/ışıklı ikaz çalışıyor mu?',
          'Kanca yukarı ve aşağı limit kesici sviçleri boşta test edildi mi?',
          'Tambur üzerinde halat sarımları düzgün mü (çapraz sarım veya tambur kanalından çıkma var mı)?'
        ],
        en: [
          'Verify emergency stop button, horn, and flashing beacon operation.',
          'Test upper and lower hoist limit switches under zero load before starting shift.',
          'Inspect wire rope spooling on drum for crossovers or jumped grooves.'
        ]
      },
      hitchingModes: [{ mode: 'Kanca Bloğu', modeMultiplier: 1.0, notes: 'Merkezi dikey kaldırma' }],
      angleRules: {
        tr: 'Tavan vinciyle ASLA yan çekme (açılı çekme) yapılmamalıdır. Yük kanca merkezinin tam altında olmalıdır.',
        en: 'Side pulling is strictly PROHIBITED on overhead cranes; load must be centered plumb under hoist.'
      },
      prohibitedUses: {
        tr: [
          'Yükü yerde sürüklemek için köprü veya arabayı yürütmek (yan çekme)',
          'Askıda yük varken vinci terk etmek',
          'İnsanların üzerinden yük geçirmek (sesli ikazla tahliye şarttır)'
        ],
        en: [
          'Using bridge or trolley motion to drag loads horizontally across shop floor',
          'Leaving suspended loads unattended',
          'Carrying loads over personnel working below'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Raylar ve tekerlek basma yüzeyleri temizlenir.', en: 'Clean runway rails and wheel treads.' },
      lubricationInterval: { tr: 'Tambur dişlileri ve halat aylık, yürüyüş redüktörleri 6 aylık.', en: 'Monthly open gear and rope lubrication; 6-month gearbox oil service.' },
      lubricantType: { tr: 'Ağır hizmet dişli yağı ve şasi gresi.', en: 'Heavy industrial gear oil and lithium chassis grease.' },
      movingPartsInspection: { tr: ['Fren balata kalınlığı, tambur kanal aşınması, ray bağlantıları'], en: ['Brake shoe thickness, drum groove profile, rail clips'] }
    },
    storage: {
      guidelines: { tr: ['Park pozisyonuna çekilip ana şalter kapatılmalıdır.'], en: ['Park in designated zone and lock out main isolator.'] },
      environmentalHazards: { tr: ['Nem ve aşındırıcı toz'], en: ['Corrosive humidity and dust'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Yerdeki kalıbı veya sacı açılı çekerek (yan çekme) vinç arabasını zorlamak',
          en: 'Side pulling heavy dies or plates skewing the rope out of drum grooves'
        },
        consequence: {
          tr: 'Halatın tambur yivinden fırlayıp tambur miline sarılarak kesilmesi ve köprü raydan çıkması',
          en: 'Rope jumps sheave/drum shearing strands; severe side forces derail bridge wheels'
        },
        severity: 'critical'
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Kanca bloğu makarasında çatlak veya halat kanalında aşınma',
          'Kaldırma fren balatasının metal metale sürtmesi veya ayar sınırını aşması',
          'Köprü kirişinde sehim (deflection) sınırlarının aşılması (L/700 üzeri kalıcı çökme)'
        ],
        en: [
          'Cracked sheave flanges or corrugation in wire rope grooves',
          'Brake lining worn to rivet/metal contact or beyond adjustment limit',
          'Permanent bridge girder deflection exceeding standard structural limits (L/700)'
        ]
      },
      wearLimits: { tr: 'Tekerlek flanş kalınlığında %50 aşınma', en: '50% wheel flange thickness wear' },
      deformationLimits: { tr: 'Kiriş gövdesinde burulma veya rayda açıklık bozulması', en: 'Girder camber loss or track gauge spread' },
      preventiveMeasures: { tr: ['Optik lazer ile ray paralellik ve kot ölçümü'], en: ['Laser runway alignment and elevation survey'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye köprünün açıklığını (Span L), kaldırma yüksekliğini (H) ve FEM sınıfını eksiksiz sorun.', en: 'Request exact span (L), lift height (H), and FEM duty group before preparing proposal.' },
      operatorFocus: { tr: 'Vardiya başında üst sviçi ve acil stopu test et; asla açılı yan çekme yapma!', en: 'Test upper limit switch and E-stop at start of shift; never pull loads sideways!' },
      inspectorFocus: { tr: 'Ray aşınmalarını, fren torkunu, halat kılavuzunu (rope guide) ve aşırı yük rölesini kalibrasyon ağırlığıyla test et.', en: 'Audit rail alignment, brake torque, rope guide wear, and calibrate overload sensor with certified test weights.' }
    }
  }
];
