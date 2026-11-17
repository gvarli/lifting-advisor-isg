import { LiftingEquipmentItem } from '../types';

export const specialAttachmentsData: LiftingEquipmentItem[] = [
  {
    id: 'plate-lifting-clamp-vertical',
    groupId: 'special-attachments',
    groupName: { tr: 'Özel Kaldırma Ataşmanları', en: 'Special Below-the-Hook Lifting Attachments' },
    code: 'CLAMP-PLATE-EN13155',
    name: {
      tr: 'Dikey ve Yatay Sac Kapma Aparatları (Plate Lifting Clamps per EN 13155)',
      en: 'Vertical & Horizontal Plate Lifting Clamps per EN 13155'
    },
    shortDescription: {
      tr: 'EN 13155 standardında, yay kilit mekanizmalı, eksantrik dişli çenesiyle sacı sıkıştıran ve tekil/çift sac kaldırma ve 180° çevirme yapan aparatlar.',
      en: 'Safety spring-loaded eccentric cam plate clamps designed to grip, hoist, and turn steel plates per EN 13155.'
    },
    safetyFactor: '3:1 (Mekanik Sürtünmeli Kavrama Normu per EN 13155) / 2:1 Dinamik',
    standards: ['EN 13155', 'ASME B30.20', 'TS EN 13155'],
    wllRange: '0.75t - 30t (Çene aralığı örn: 0-30mm, 30-60mm)',
    technicalSpecs: {
      construction: 'Dövme/Kaynaklı Alaşımlı Çelik Gövde + Isıl İşlemli Karbür/Alaşımlı Dişli Kam (Cam) ve Karşı Pabuç',
      materialGrade: 'Sertleştirilmiş Takım Çeliği Dişler (Hardened Serrated Cam)',
      efficiencyFactor: '%100 (Uygun sertlik ve minimum yükte)',
      summaryPoints: {
        tr: [
          'KRİTİK KURAL: Sac sertliği en fazla 37 HRC (345 HB) olmalıdır; daha sert sacları dişler ısıramaz ve kayar!',
          'MİNİMUM YÜK KURALI: Sac ağırlığı anma WLL değerinin en az %10\'u olmalıdır; çok hafif sacda yay çeneyi kilitleyemez',
          'Aynı anda ASLA birden fazla sac kaldırılmaz; diş yalnızca en dıştaki sacı tutar, aradaki saclar düşer'
        ],
        en: [
          'CRITICAL RULE: Plate surface hardness must not exceed 37 HRC (345 HB); harder plates prevent teeth penetration causing slip!',
          'MINIMUM LOAD RULE: Lifted plate weight must be at least 10% of rated WLL; sub-10% loads cannot generate cam self-locking bite',
          'NEVER lift multiple sheets simultaneously; cam grips only outer sheet, inner plates drop'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Gemi inşa çelik sac panelleri', 'Sac işleme tezgahlarına dikey sac yükleme', 'Yatay sacı kaldırıp dik konuma getirme (180° çevirme)'],
        en: ['Shipyard hull plate fabrication', 'Vertical loading onto laser/plasma cutting beds', 'Turning plates from horizontal to vertical (180° turning)']
      },
      unsuitableApplications: {
        tr: [
          'Üzeri yağlı, gresli veya buzlu kaygan saclar',
          'Hardox veya 37 HRC üzeri aşırı sertleştirilmiş zırh çelikleri',
          'Paslanmaz çelik saclar (paslanmaz için pürüzsüz poliüretan veya sentetik pabuçlu kapma seçilmelidir)'
        ],
        en: [
          'Oily, greased, painted, or icy lubricated plates',
          'Hardox or armor plates exceeding 37 HRC',
          'Stainless steel plates (demands non-marking stainless steel jaw or composite clamps)'
        ]
      },
      environment: {
        minTempC: -20,
        maxTempC: 100,
        tempDeRating: [
          { tempRange: '-20°C ile 100°C arası', capacityMultiplier: 1.0, notes: '%100 WLL' },
          { tempRange: '100°C üzeri', capacityMultiplier: 0.0, notes: 'Yay gerilimi zayıflar; YASAKTIR' }
        ],
        chemicalResistance: { acids: 'limited', alkalis: 'resistant', solvents: 'resistant', salineWater: 'limited' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Müşteriye sacın maksimum kalınlığını ve malzeme sertliğini mutlaka sorun. Çene aralığı (0-30 mm mi, 30-60 mm mi?) doğru eşleşmelidir.'],
        en: ['Verify maximum plate thickness and surface hardness. Ensure jaw grip range (e.g. 0-30mm vs 30-60mm) strictly encompasses the plate.']
      },
      selectionTipsForEngineers: {
        tr: ['Yatay sac kaldırmada çiftli veya dörtlü travers donanımı kullanın; sapan açısı yatay eksenle 60°\'den az olmamalıdır.'],
        en: ['For horizontal transport, rig in pairs or via spreader beam; sling angle must not dip below 60° to horizontal.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Kam dişlerinde kırık, aşınmış veya körleşmiş diş var mı? (Tırnakla yoklayın)',
          'Emniyet mandal yayı çeneyi güçlü bir şekilde kilitliyor mu?',
          'Sac yüzeyi temiz, kaba pastan ve yağdan arındırılmış mı?'
        ],
        en: [
          'Inspect cam teeth and stationary jaw teeth for chipping, rounding, or clogging.',
          'Verify that internal safety lock spring snaps closed with vigorous positive pressure.',
          'Confirm steel plate contact area is clean of grease, heavy mill scale, and frost.'
        ]
      },
      hitchingModes: [
        { mode: 'Dikey Düz Kaldırma (Tek Kapma)', modeMultiplier: 1.0, notes: 'Ağırlık merkezinin tam üstünde olmalı' },
        { mode: 'Yatay Çiftli Kapma (60° Sapan Açısı)', modeMultiplier: 1.0, notes: 'Çift kapma ile dengeli kaldırma' }
      ],
      angleRules: {
        tr: 'Standart kapmalarda yan yükleme (açılı çekme) yasaktır; açılı kaldırma yapılacaksa döner halkalı (articulated shackle) model seçilmelidir.',
        en: 'Side loading on standard fixed-ring clamps is prohibited; specify articulated eye models for multi-axis pulls.'
      },
      prohibitedUses: {
        tr: [
          'Birden fazla sac plakasını üst üste koyup tek kapmayla kaldırmak (ÖLÜMCÜL KAZA SEBEBİ)',
          'Emniyet kilidi açık konumdayken vinci hareket ettirmek',
          '37 HRC üzeri sertleştirilmiş çelik sacı dişli kapmayla tutmak'
        ],
        en: [
          'Hoisting bundled stacks of multiple plates with a single clamp (FATAL HAZARD)',
          'Operating hoist with safety lock lever in open/unlatched position',
          'Attempting to bite plates with hardness > 37 HRC with standard serrated cams'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Dişler arasına dolan pas ve çapak tel fırçayla temizlenir.', en: 'Clean debris packed inside serrated teeth using wire brush.' },
      lubricationInterval: { tr: 'Mafsallar ve kilit mekanizması haftalık ince yağlanır; DİŞLERE KESİNLİKLE YAĞ DEĞMEZ!', en: 'Lubricate linkage and pivots weekly; NEVER apply oil or grease to gripping teeth!' },
      lubricantType: { tr: 'Mafsallar için kuru PTFE veya hafif makine yağı.', en: 'Dry PTFE spray or light machine oil on pivots.' },
      movingPartsInspection: { tr: ['Yay tansiyonu ve kam pimi boşluğu'], en: ['Inspect spring force and cam pivot pin play'] }
    },
    storage: {
      guidelines: { tr: ['Çenesi kapalı ve kuru takım dolabında muhafaza edilmelidir.'], en: ['Store with jaws engaged in clean, dry tool room.'] },
      environmentalHazards: { tr: ['Dişleri paslandıran nem'], en: ['Moisture rusting teeth'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Paket halindeki 3 adet ince sacın tek bir dikey sac kapmayla kaldırılması',
          en: 'Attempting to lift a stack of 3 thin steel sheets with a single vertical clamp'
        },
        consequence: {
          tr: 'Ortadaki ve alttaki sacların yerçekimiyle aradan kayıp aşağı çakılması',
          en: 'Inner plates immediately slide out of the friction bite and plunge to the floor'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Yağlı sac plakasının veya Hardox sacın standart kapmayla kaldırılması',
          en: 'Attempting to hoist oily plates or extreme-hardness Hardox wear plates'
        },
        consequence: { tr: 'Dişlerin sacı ısıramayıp sacın sıyrılması', en: 'Serrated teeth slip across hardened surface dropping the load', severity: 'critical' }
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Kam veya sabit pabuç üzerindeki dişlerin %10 veya daha fazlasının kırılmış veya körleşmiş olması',
          'Emniyet yayının kırık veya işlevini kaybetmiş olması',
          'Gövde çene açıklığında kalıcı deformasyon veya çatlak'
        ],
        en: [
          'More than 10% of cam or pad teeth chipped, sheared, or rounded',
          'Broken, fatigued, or missing safety latch spring',
          'Any widening or permanent plastic yield of clamp body opening or cracks'
        ]
      },
      wearLimits: { tr: 'Pim ve delik aşınması sonucu boşluğun 1 mm\'yi aşması', en: 'Pivot pin or hole play exceeding 1.0mm' },
      deformationLimits: { tr: 'Gövdede herhangi bir sehim veya kalıcı bükülme', en: 'Any permanent body deflection' },
      preventiveMeasures: { tr: ['Görsel diş muayenesi ve 6 aylık periyodik yük testi'], en: ['Bi-annual certified proof load inspection and NDT of body welds'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye sacın sertliğini (HB/HRC) ve 180° çevirme yapıp yapmayacağını sorun; çevirme için mafsallı mapa şarttır.', en: 'Confirm plate hardness and ask if 180° flipping is required; flipping demands an articulated lifting eye.' },
      operatorFocus: { tr: 'Asla üst üste 2 sac alma! Dişlerin sacı ısırdığından ve kilidin kapalı olduğundan emin ol.', en: 'Never lift stacked plates! Ensure teeth bite and the safety lock lever is fully locked.' },
      inspectorFocus: { tr: 'Dişlerin sivrilik profilini büyüteçle kontrol et, yay tansiyonunu ve gövde kaynaklarını çatlak testine (DPI) tabi tut.', en: 'Inspect tooth crest sharpness, test spring latch force, and perform DPI dye-penetrant on welded seams.' }
    }
  },
  {
    id: 'permanent-magnetic-lifter',
    groupId: 'special-attachments',
    groupName: { tr: 'Özel Kaldırma Ataşmanları', en: 'Special Below-the-Hook Lifting Attachments' },
    code: 'MAGNET-LIFTER-EN13155',
    name: {
      tr: 'Kalıcı Manyetik Kaldırıcılar (Neodimyum Manyetik Tutucular)',
      en: 'Permanent Neodymium Magnetic Lifters per EN 13155'
    },
    shortDescription: {
      tr: 'EN 13155 standardında, elektrik gerektirmeyen süper güçlü NdFeB neodimyum mıknatıslı, mekanik kollu emniyet kilitli plaka ve yuvarlak çelik kaldırıcılar.',
      en: 'Super-strength permanent rare-earth Neodymium (NdFeB) magnetic lifters requiring zero electricity, compliant with EN 13155.'
    },
    safetyFactor: '3:1 (EN 13155 uyarınca koparma kuvveti anma yükünün en az 3 katı olmalıdır)',
    standards: ['EN 13155', 'ASME B30.20', 'TS EN 13155'],
    wllRange: '100 kg - 6000 kg',
    technicalSpecs: {
      construction: 'NdFeB Kalıcı Manyetik Çekirdek + Çelik Gövde + Manuel Emniyet Mandallı Çevirme Kolu + V-Kanal Taban',
      materialGrade: 'Neodimyum-Demir-Bor (NdFeB) N42/N45',
      efficiencyFactor: 'Hava boşluğuna ve kalınlığa göre değişken',
      summaryPoints: {
        tr: [
          '3:1 emniyet katsayısı: Test koparma kuvveti (Tear-off force) WLL değerinin 3 katıdır',
          'Elektrik kesintisinden etkilenmez; kablosuz ve bataryasız %100 güvenlidir',
          'Tabandaki V-yiv profili sayesinde hem düz sacları hem de silindirik milleri/boruları kaldırır'
        ],
        en: [
          '3:1 safety factor: Tear-off test force must be at least triple the rated WLL',
          'Immune to electrical power failures; requires no cords or batteries',
          'V-grooved bottom pole shoe lifts both flat plates and cylindrical steel shafts'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['CNC tezgahlarına blok çelik ve kalıp yükleme', 'Düz kalın sacların tekil taşınması', 'Yuvarlak mil ve boru transferi'],
        en: ['Loading steel blocks and injection molds onto CNC machining centers', 'Single flat plate transfer', 'Solid steel round bar hoisting']
      },
      unsuitableApplications: {
        tr: [
          '80°C üzerindeki sıcak çelikler (Neodimyum 80°C üzerinde manyetik gücünü anında kaybeder!)',
          'İnce saclar (Manyetik akı doyumuna ulaşamaz, taşıma gücü %80\'e varan oranda düşer)',
          'Pürüzlü, derin paslı veya boya/çamur katmanlı hava boşluğu (air gap) yaratan yüzeyler'
        ],
        en: [
          'Hot steel exceeding 80°C (Standard Neodymium loses remanence rapidly above 80°C!)',
          'Very thin sheet metal (flux saturation cannot occur; capacity plummets up to 80%)',
          'Rough, scale-covered, painted surfaces creating excessive non-magnetic air gaps'
        ]
      },
      environment: {
        minTempC: -20,
        maxTempC: 80,
        tempDeRating: [
          { tempRange: '-20°C ile 80°C arası', capacityMultiplier: 1.0, notes: '%100 WLL' },
          { tempRange: '80°C üzeri', capacityMultiplier: 0.0, notes: 'MANYETİZMA YOK OLUR; KESİNLİKLE YASAKTIR' }
        ],
        chemicalResistance: { acids: 'limited', alkalis: 'resistant', solvents: 'resistant', salineWater: 'limited' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: [
          'Müşteriye sac kalınlık düşüm eğrisini (Thickness vs Capacity) mutlaka verin; 5 mm sacta 1000 kg\'lık mıknatıs sadece 200 kg kaldırabilir!',
          'Silindirik malzeme kaldırılacaksa WLL değerinin düz kapasitenin %50\'si olduğunu belirtin.'
        ],
        en: [
          'Provide the thickness reduction graph: a 1000kg lifter on a 5mm plate can only safely hold ~200kg!',
          'For cylindrical rounds, clarify that capacity derates to 50% of flat rating.'
        ]
      },
      selectionTipsForEngineers: {
        tr: [
          'Hava boşluğu (Air Gap) faktörü: Boya, pas veya 0.5 mm boşluk manyetik tutma kuvvetini %50 düşürebilir.',
          'Karbon oranı düşük yumuşak çeliklerde tam kapasite alınırken, yüksek alaşımlı çeliklerde %20-%30 düşüm yapılmalıdır.'
        ],
        en: [
          'Air gap factor: 0.5mm gap from rust, paint, or scale can slash magnetic holding force by 50%.',
          'Low-carbon steel (St37/S235) yields 100% capacity; high-alloy or cast irons reduce holding power by 20-30%.'
        ]
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Manyetik taban temiz, pürüzsüz ve çatlaksız mı? (Metal talaşı yapışmış olmamalıdır)',
          'Manuel emniyet mandalı ON (Açık) konumuna getirildiğinde tık sesiyle kilitleniyor mu?',
          'Kaldırılacak sacın kalınlığı minimum akı kalınlığını sağlıyor mu?'
        ],
        en: [
          'Is magnetic bottom pole face clean, flat, and free of adherent swarf and burrs?',
          'Does the manual safety latch lock firmly with positive detent in the ON position?',
          'Does plate thickness meet minimum magnetic saturation thickness?'
        ]
      },
      hitchingModes: [
        { mode: 'Düz Plaka (Merkezi Kaldırma)', modeMultiplier: 1.0, notes: 'Yükün tam ağırlık merkezine konmalıdır' },
        { mode: 'Yuvarlak Mil / Boru Kaldırma', modeMultiplier: 0.50, notes: 'V-yiv tabanıyla %50 Nominal WLL' }
      ],
      angleRules: {
        tr: 'Yalnızca dikey kaldırmalarda kullanılır; açılı veya yatay çekmelerde manyetik kayma kuvveti dikey çekmenin 1/3\'üdür.',
        en: 'Strictly designed for perpendicular vertical hoisting; shear sliding resistance is only 1/3 of vertical pull.'
      },
      prohibitedUses: {
        tr: [
          '80°C üzerindeki sıcak parçalarda kullanmak',
          'Mıknatısı yükün ağırlık merkezinden uzağa koyup eğik kaldırmak',
          'Altında insan varken manyetik kaldırıcı ile yük taşımak'
        ],
        en: [
          'Using on loads exceeding 80°C',
          'Placing lifter off-center causing severe eccentric peel forces',
          'Transporting loads suspended by magnets over personnel'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Manyetik taban her kullanımdan önce talaşlardan fırçayla arındırılır.', en: 'Wipe swarf and metal particles off bottom face before each use.' },
      lubricationInterval: { tr: 'Mekanik kol pimi ve kilit mandalı 3 ayda bir ince yağlanır.', en: 'Lubricate lever pivot and detent spring quarterly.' },
      lubricantType: { tr: 'Hafif makine yağı.', en: 'Light machine oil.' },
      movingPartsInspection: { tr: ['Yaylı emniyet mandalı mekanik kilit testi'], en: ['Inspect mechanical safety latch spring retention'] }
    },
    storage: {
      guidelines: { tr: ['Kolu OFF konumunda, tabanına koruyucu ahşap veya plastik pabuç takılarak kuru ortamda saklanmalıdır.'], en: ['Store in OFF position with protective wooden/plastic keeper plate over pole shoes.'] },
      environmentalHazards: { tr: ['Aşırı sıcaklık ve elektronik cihazlara yakınlık'], en: ['Extreme ambient heat and proximity to sensitive electronics'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'İnce sac plakanın (örn: 3 mm) 2 tonluk mıknatısla kaldırılması ve sacın havada esneyerek mıknatıstan soyulması',
          en: 'Hoisting a thin plate (e.g. 3mm) with a 2-ton lifter; plate flexes and peels off magnet'
        },
        consequence: {
          tr: 'Soyulma (peel) kuvvetiyle manyetik hattın anında kopması ve sacın düşmesi',
          en: 'Peeling action destroys magnetic circuit instantly, dropping plate'
        },
        severity: 'critical'
      },
      {
        fieldError: {
          tr: 'Kaynak sonrası 120°C sıcaklıktaki çelik bloğun neodimyum mıknatısla kaldırılması',
          en: 'Hoisting a welded steel block at 120°C using standard Neodymium lifter'
        },
        consequence: {
          tr: 'Isı etkisiyle mıknatısın Curie noktasına yaklaşarak manyetik gücünü aniden sıfırlaması',
          en: 'Thermal demagnetization causes catastrophic immediate loss of magnetic flux'
        },
        severity: 'critical'
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Manyetik tabanda manyetik devreyi bozan derin yarık veya ezilme',
          'Mekanik kilitleme mandalının aşınarak gevşemesi veya kırılması',
          'Kaldırma halkasında (hoist ring) çatlak veya eğilme'
        ],
        en: [
          'Deep gouges, pitting, or cracks on magnetic pole shoes',
          'Damaged, loose, or failing mechanical lever safety lock',
          'Cracks, bends, or throat wear on main lifting bail'
        ]
      },
      wearLimits: { tr: 'Yıllık akredite koparma kuvveti (Tear-off) testinde 3:1 emniyet katsayısının altına düşmesi', en: 'Failing annual certified tear-off proof test (falling below 3:1 break force threshold)' },
      deformationLimits: { tr: 'Kol mekanizmasında serbest boşluk', en: 'Excessive play in cam lever shaft' },
      preventiveMeasures: { tr: ['Yıllık dinamometreli koparma test cihazıyla (Pull-tester) kalibrasyon'], en: ['Annual pull-tester proof test with calibrated load cell'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Müşteriye sac kalınlığı / hava boşluğu düşüm tablosunu gösterin; mıknatısın sadece etiket değerine göre seçilemeyeceğini vurgulayın.', en: 'Educate buyer with the thickness/air-gap derating curves; emphasize that WLL changes with material thickness.' },
      operatorFocus: { tr: 'Mıknatısı tam ağırlık merkezine koy, kolu çevirip kilit mandalının oturduğunu duy, yükü 10 cm kaldırıp 5 saniye bekle!', en: 'Center on CoG, lock handle with audible click, lift load 10 cm and pause 5 seconds to test hold!' },
      inspectorFocus: { tr: 'Kalibre edilmiş çekme test cihazı ile 3x WLL koparma kuvvetini doğrula, kilit mandalını ve taban düzlemselliğini kontrol et.', en: 'Verify 3x WLL breakaway force using calibrated pull test rig; check pole face flatness and detent lock.' }
    }
  },
  {
    id: 'lifting-spreader-beams-en13155',
    groupId: 'special-attachments',
    groupName: { tr: 'Özel Kaldırma Ataşmanları', en: 'Special Below-the-Hook Lifting Attachments' },
    code: 'BEAM-SPREADER-EN13155',
    name: {
      tr: 'Kaldırma Traversleri & Denge Kolları (Lifting & Spreader Beams per EN 13155)',
      en: 'Lifting & Spreader Beams per EN 13155'
    },
    shortDescription: {
      tr: 'EN 13155 standardında tasarlanmış, uzun ve esnek yüklerin eğilmesini önleyen, sapan kollarını dikey tutarak yük üzerindeki ezici baskı kuvvetlerini nötrleyen traversler.',
      en: 'Structural spreader and lifting beams engineered to prevent load buckling and eliminate compressive sling angle forces per EN 13155.'
    },
    safetyFactor: '3:1 (Statik çelik yapı katsayılarına göre EN 13155)',
    standards: ['EN 13155', 'ASME B30.20', 'TS EN 13155'],
    wllRange: '1t - 500t',
    technicalSpecs: {
      construction: 'Kaynaklı Kutu Kiriş, I-Profil veya Dikişsiz Boru Gövde + Dövme Mapa Kulakları (Padeyes)',
      materialGrade: 'S355J2 / S355NL Yapısal Çelik',
      efficiencyFactor: '%100',
      summaryPoints: {
        tr: [
          'Spreader Beam (Yayma Kirişi): Üstte açılı 2 kollu sapan bulunur, kiriş sadece saf basma (compression) kuvveti taşır',
          'Lifting Beam (Kaldırma Kirişi): Üstte tek merkez kanca bağlantısı bulunur, kiriş eğilme momenti (bending moment) taşır',
          'Üzerinde kaynaklı mapa kulaklarının (padeye) 3 eksenli tahribatsız muayenesi (NDT/MPI) zorunludur'
        ],
        en: [
          'Spreader Beam: Top 2-leg sling creates pure axial compression along the beam axis',
          'Lifting Beam: Single top hook attachment creates bending moment along the structural profile',
          'Welded padeyes demand comprehensive NDT (MPI/UT) weld defect inspection'
        ]
      }
    },
    selectionCriteria: {
      recommendedApplications: {
        tr: ['Uzun çelik boru, profil ve profil demetleri', 'Rüzgar türbini kule ve kanatları', 'Ağır pres kalıpları ve jeneratörler'],
        en: ['Long steel pipes, structural sections, and bundle rigging', 'Wind turbine blades and tower segments', 'Heavy machinery and generator stators']
      },
      unsuitableApplications: {
        tr: ['Mapa deliklerine mapa pimi yerine uygun olmayan zincir veya kanca takılması', 'Kapasite üzerinde dengesiz tek taraflı yüklemeler'],
        en: ['Inserting raw chains or oversized hooks directly into padeye holes without shackles', 'Severe uncompensated asymmetric single-end loading']
      },
      environment: {
        minTempC: -40,
        maxTempC: 100,
        chemicalResistance: { acids: 'limited', alkalis: 'resistant', solvents: 'resistant', salineWater: 'limited' },
        sharpEdgeSensitivity: 'low',
        uvSensitivity: 'impervious'
      },
      selectionTipsForSellers: {
        tr: ['Müşteriye travers tipi sorulurken tavan yüksekliğini (headroom) sorun. Düşük tavan için tek noktalı Lifting Beam, yüksek tavan için hafif Spreader Beam önerilir.'],
        en: ['Check available overhead headroom: low headroom favors Lifting Beams; ample headroom favors lighter Spreader Beams.']
      },
      selectionTipsForEngineers: {
        tr: ['Spreader traverslerde üst sapan açısını asla 60° altına düşürmeyin; açı daraldıkça travers gövdesindeki basma kuvveti katlanarak artar.'],
        en: ['Maintain top sling angle at 60° or greater on spreaders to restrict compressive column buckling loads.']
      }
    },
    safeOperation: {
      preUseChecks: {
        tr: [
          'Travers gövdesi ve mapa kulak kaynaklarında çatlak kontrolü (görsel/manyetik)',
          'Travers gövdesinde eğilme veya burulma var mı?',
          'Kimlik plakası (WLL, dara ağırlığı, seri no ve test tarihi) okunabiliyor mu?'
        ],
        en: [
          'Inspect welded padeye joints for fatigue cracks visually or with magnetic particle testing.',
          'Verify main structural profile is straight without lateral torsional bowing.',
          'Ensure data plate displays WLL, tare weight, serial number, and test stamp.'
        ]
      },
      hitchingModes: [
        { mode: 'Dikey Çok Noktalı Askı', modeMultiplier: 1.0, notes: 'Alt sapanlar dikey 90° asılmalıdır' }
      ],
      angleRules: {
        tr: 'Alt kollar yüke tam dikey (90°) inmelidir; böylece yük üzerine içeriye doğru ezici yatay bileşen kuvveti uygulanmaz.',
        en: 'Bottom rigging legs should drop plumb (90°) to prevent transverse crushing forces on the load.'
      },
      prohibitedUses: {
        tr: [
          'Travers üzerinde imalatçı onayı olmadan delik delmek veya kaynak yapmak',
          'Traversin darası hesaba katılmadan vinç kapasitesinin sınırında kaldırma yapmak'
        ],
        en: [
          'Drilling holes or welding unauthorized lugs onto certified beam profiles',
          'Forgetting to add tare weight of the beam to total hoisted load calculation'
        ]
      }
    },
    maintenance: {
      cleaning: { tr: 'Kiriş yüzeyi boyalı tutulur, pas kazınır.', en: 'Maintain paint coating; remove rust.' },
      lubricationInterval: { tr: 'Ayarlanabilir modellerde kızak ve pimler yağlanır.', en: 'Lubricate slide telescoping pins on adjustable spreaders.' },
      lubricantType: { tr: 'Genel gres.', en: 'Chassis grease.' },
      movingPartsInspection: { tr: ['Ayarlanabilir kızak kilit pimleri'], en: ['Inspect locking pins on telescoping models'] }
    },
    storage: {
      guidelines: { tr: ['Yerden yüksek takozlar üzerinde, sehim yapmayacak şekilde yatay saklanmalıdır.'], en: ['Store supported horizontally off the floor on timber dunnage.'] },
      environmentalHazards: { tr: ['Korozyon ve doğrudan araç çarpması'], en: ['Corrosion and vehicle collisions'] }
    },
    commonFailures: [
      {
        fieldError: {
          tr: 'Traversin kendi ağırlığının (dara) vinç kaldırma kapasitesine dahil edilmemesi',
          en: 'Neglecting the tare weight of heavy lifting beam in crane total load calculation'
        },
        consequence: { tr: 'Vincin aşırı yüke girerek devrilmesi veya halat kopması', en: 'Crane overload tripping limiters or causing boom failure', severity: 'critical' }
      }
    ],
    discardCriteria: {
      physicalDefects: {
        tr: [
          'Gövde kaynaklarında veya mapa kulaklarında en ufak çatlak (NDT ile tespit edilen)',
          'Mapa deliklerinde aşınma veya ovalleşme (%10 üzerinde)',
          'Kiriş gövdesinde L/500 oranını aşan kalıcı eğilme'
        ],
        en: [
          'Any crack detected in structural welds or padeye attachment points',
          'Padeye pin hole elongation or ovalization exceeding 10%',
          'Permanent beam out-of-straightness camber exceeding L/500'
        ]
      },
      wearLimits: { tr: 'Mapa kulağı et kalınlığında %10 aşınma', en: '10% reduction in padeye plate thickness' },
      deformationLimits: { tr: 'Kirişte kalıcı burulma veya göçme', en: 'Any web crippling, flange buckling, or torsional twist' },
      preventiveMeasures: { tr: ['Yıllık mapa deliği NDT testi ve statik proof test (%125 WLL)'], en: ['Annual MPI on padeyes and 125% static proof load verification'] }
    },
    roleInsights: {
      sellerFocus: { tr: 'Travers satarken mutlaka traversin kendi boş ağırlığını (darasını) müşteriye bildirin.', en: 'Always state beam tare weight clearly so riggers can deduct it from crane gross capacity.' },
      operatorFocus: { tr: 'Traversi kaldırırken vincin kancasının travers ağırlık merkezine tam denk geldiğini kontrol et.', en: 'Ensure crane hook is plumb over beam center of gravity to prevent sudden tilt upon lift-off.' },
      inspectorFocus: { tr: 'Mapa kulak kök kaynaklarını Manyetik Parçacık (MPI) testiyle incele, mapa deliği ovalliğini kumpasla ölç.', en: 'Perform MPI on padeye root welds; measure pin-hole elongation with precision calipers.' }
    }
  }
];
