import { StandardComparisonEntry } from './types';

export const standardComparisonMatrixData: StandardComparisonEntry[] = [
  {
    topicId: 'sling-angle-limits',
    topicTitle: {
      tr: 'Sapan Açı Limitleri ve Geometrik Yasaklar',
      en: 'Sling Angle Limits & Rigging Geometry Restrictions'
    },
    topicDescription: {
      tr: 'Çok kollu sapanlarda bacaklar arası açının azami sınırı ve izin verilen gerilim limitleri.',
      en: 'Maximum permissible sling leg angle and geometric tension limits on multi-leg bridles.'
    },
    comparison: {
      turkishRegulation: {
        ruleText: {
          tr: 'İş Ekipmanları Yönetmeliği EK-II: Sapan kollarında yükün dengeli dağıtılması zorunludur. Aşırı açı oluşturulamaz; kollar arası açının üretici limitlerini ve 120 dereceyi aşması durumunda kaldırma durdurulmalıdır.',
          en: 'Work Equipment Directive Annex-II: Load must be distributed evenly. Included angles exceeding manufacturer limits or 120° are prohibited.'
        },
        sourceRef: 'İş Ekipmanları Yön. EK-II Md. 3.2',
        enforcementLevel: 'mandatory'
      },
      enIso: {
        ruleText: {
          tr: 'TS EN 13414 ve TS EN 818: Düşeyle yapılan açı (β) 60° (kollar arası tepe açısı 120°) üzerinde sapan kullanımı KESİNLİKLE YASAKTIR. 120° üzerinde kollar aşırı gerilimle kopar. Tavsiye edilen azami açı 90° (düşey 45°).',
          en: 'EN 13414 & EN 818: Included angle exceeding 120° (vertical angle > 60°) is strictly prohibited. Ideal working range is ≤ 90°.'
        },
        sourceRef: 'EN 13414-1 / EN 818-4',
        enforcementLevel: 'mandatory'
      },
      asmeB30: {
        ruleText: {
          tr: 'ASME B30.9: Yatay eksenle yapılan açı (Horizontal sling angle) 30 derecenin altına düşemez (düşey 60°). 30° altında kaldırma yetkili mühendis onayı ve özel kaldırma planı olmadan yapılamaz.',
          en: 'ASME B30.9: Horizontal sling angle shall not be less than 30° without specialized engineered lift plan.'
        },
        sourceRef: 'ASME B30.9 Section 9-1.10',
        enforcementLevel: 'mandatory'
      },
      lolerLeea: {
        ruleText: {
          tr: 'LEEA COPSULE: 120° üzerindeki tepe açısı "Ölümcül Geometri" olarak sınıflandırılır. Açıyı düşürmek için sapan boyu uzatılmalı veya kaldırma traversi (spreader beam) kullanılmalıdır.',
          en: 'LEEA COPSULE: Included angle > 120° is classified as hazardous. Lengthen sling legs or deploy a spreader beam.'
        },
        sourceRef: 'LEEA COPSULE Clause 4.3',
        enforcementLevel: 'mandatory'
      }
    },
    fieldTakeaway: {
      tr: 'Tüm dünya standartları ve Türk mevzuatında ortak kural: İki sapan kolu arasındaki tepe açısı 120 dereceyi (düşey eksenle 60°) ASLA GEÇEMEZ!',
      en: 'Universal global consensus: Included apex angle between opposing sling legs MUST NEVER EXCEED 120° (vertical angle max 60°).'
    }
  },
  {
    topicId: 'periodic-inspection-intervals',
    topicTitle: {
      tr: 'Periyodik Kontrol ve Muayene Süreleri',
      en: 'Periodic Examination Frequencies & Regimes'
    },
    topicDescription: {
      tr: 'Kaldırma makineleri ve kaldırma aksesuarları için yasal muayene periyotları ayrımı.',
      en: 'Statutory examination frequencies distinguishing lifting machinery from lifting accessories.'
    },
    comparison: {
      turkishRegulation: {
        ruleText: {
          tr: 'Standartlarda aksi belirtilmedikçe AZAMİ 1 YIL (12 Ay). Ancak standartlar daha kısa süre öngörüyorsa standarttaki süre esastır. Kontrolü EKİPNET kayıtlı uzman mühendis yapar.',
          en: 'Maximum 1 YEAR (12 Months) unless specified otherwise by standards. Conducted exclusively by registered EKİPNET surveyors.'
        },
        sourceRef: 'İş Ekipmanları Yön. EK-III Tablo 2',
        enforcementLevel: 'mandatory'
      },
      enIso: {
        ruleText: {
          tr: 'EN standartları genel ekipman için azami 12 ay öngörür; ancak ağır çalışma koşullarında (dökümhane, kimyasal ortam) 3 ila 6 aylık ara muayeneleri zorunlu tutar.',
          en: 'EN standards prescribe 12 months maximum, mandating 3 to 6-month intermediate audits under severe operating environments.'
        },
        sourceRef: 'EN 1492 / EN 818 / ISO 4309',
        enforcementLevel: 'mandatory'
      },
      asmeB30: {
        ruleText: {
          tr: 'Üç kademeli denetim: 1) İlk Kullanım (Initial), 2) Sık Denetim / Her Vardiya (Frequent - günlük operatör kontrolü), 3) Periyodik Denetim (Periodic - yıllık dokümante kontrol).',
          en: 'Three-tiered inspection: 1) Initial, 2) Frequent (daily pre-shift by operator), 3) Periodic (annual documented by qualified rigger).'
        },
        sourceRef: 'ASME B30.9 / B30.2',
        enforcementLevel: 'mandatory'
      },
      lolerLeea: {
        ruleText: {
          tr: 'ALTIN AYRIM: Kaldırma Aksesuarları (sapan, mapa, travers) ve İnsan Kaldırma Sepetleri için en geç 6 AYDA BİR; Vinçler ve Kaldırma Makineleri için en geç 12 AYDA BİR detaylı muayene (Thorough Examination).',
          en: 'GOLDEN DISTINCTION: Lifting accessories and man-riding plant every 6 MONTHS; lifting machinery and cranes every 12 MONTHS.'
        },
        sourceRef: 'LOLER 1998 Regulation 9(3)',
        enforcementLevel: 'mandatory'
      }
    },
    fieldTakeaway: {
      tr: 'Türkiye mevzuatında tavan 1 yıldır; ancak LOLER ve LEEA iyi uygulaması gereği sapanlar ve mapalar sahada mutlaka 6 AYDA BİR denetlenmelidir.',
      en: 'Turkish law sets a 12-month ceiling; best practice (LOLER/LEEA) mandates 6-month inspection for all rigging accessories.'
    }
  },
  {
    topicId: 'proof-load-testing',
    topicTitle: {
      tr: 'Statik ve Dinamik Aşırı Yük Testi (Proof Load) Katsayıları',
      en: 'Proof Load Test Multipliers (Static & Dynamic)'
    },
    topicDescription: {
      tr: 'Periyodik kontrolde ve devreye almada uygulanacak test yükü katsayıları.',
      en: 'Overload test factors applied during periodic recertification and commissioning.'
    },
    comparison: {
      turkishRegulation: {
        ruleText: {
          tr: 'Yönetmelik EK-III gereği aksine bir standart hükmü yoksa: Statik Yük Testi = 1.25 x WLL (zeminden 10-15 cm askıda); Dinamik Yük Testi = 1.10 x WLL (hareket limitlerinde).',
          en: 'Annex-III: Static Test = 1.25 x WLL (sustained 10-15cm above ground); Dynamic Test = 1.10 x WLL through all motions.'
        },
        sourceRef: 'İş Ekipmanları Yön. EK-III Md. 2.2',
        enforcementLevel: 'mandatory'
      },
      enIso: {
        ruleText: {
          tr: 'Vinçlerde EN 15011: Statik 1.25x, Dinamik 1.10x. Sapan ve aksesuarlarda EN 13889/818: İmalat Tip Testi (Proof Load) 2.0 x WLL. Kullanım sırasındaki periyodik kontrollerde NDT önerilir; gereksiz aşırı yük testi yorulma yaratır.',
          en: 'Cranes (EN 15011): 1.25x static, 1.10x dynamic. Slings/accessories: Manufacturing proof load = 2.0x WLL. Routine periodic overload avoided; NDT preferred.'
        },
        sourceRef: 'EN 15011 / EN 13889',
        enforcementLevel: 'mandatory'
      },
      asmeB30: {
        ruleText: {
          tr: 'ASME B30.2: Yeni vinçlerde statik yük testi %125 WLL ile yapılır. Ancak periyodik yıllık kontrollerde operasyonel aşırı yük testi zorunlu değildir; tam nominal WLL (%100) fonksiyon testi yeterlidir.',
          en: 'ASME B30.2: 125% proof test required after major repair or installation. Annual periodic inspection does not mandate 125% overload; 100% operational test suffices.'
        },
        sourceRef: 'ASME B30.2 Section 2-2.2',
        enforcementLevel: 'mandatory'
      },
      lolerLeea: {
        ruleText: {
          tr: 'LEEA ve LOLER: Aşırı yük testinin (Overload test) her yıl yapılması çeliği erken yorar. Sadece ilk montajda veya ana yapısal onarımda 1.25x yük testi yapılmalı; yıllık kontrollerde NDT ve detaylı görsel muayene uygulanmalıdır.',
          en: 'LEEA/LOLER: Routine annual overload testing induces premature metal fatigue. 1.25x proof test reserved for commissioning/repairs; annual audits emphasize NDT.'
        },
        sourceRef: 'LEEA Proof Load Guidance',
        enforcementLevel: 'recommended'
      }
    },
    fieldTakeaway: {
      tr: 'Türk müfettişleri ve EKİPNET raporlarında 1.25x statik ve 1.10x dinamik test aranır. Ancak aksesuar kontrollerinde kalibre NDT muayenesi ekipman ömrünü korur.',
      en: 'Turkish statutory audits mandate 1.25x static & 1.10x dynamic test weights. For accessories, NDT preserves structural life.'
    }
  },
  {
    topicId: 'broken-wires-discard',
    topicTitle: {
      tr: 'Çelik Halat Tel Kırığı Hurdaya Ayırma (Discard) Kriterleri',
      en: 'Wire Rope Broken Wire Discard Limits'
    },
    topicDescription: {
      tr: 'Bir halatın hizmet dışı bırakılması için 6d ve 30d mesafede izin verilen kırık tel sayısı.',
      en: 'Allowable broken wire thresholds over 6d and 30d lay lengths prompting rope retirement.'
    },
    comparison: {
      turkishRegulation: {
        ruleText: {
          tr: 'İş Ekipmanları Yönetmeliği: Halatlarda kopma, ezilme, korozyon veya belirgin tel kırığı tespit edildiğinde derhal kullanım dışı bırakılır; detaylı değerlendirmede TS ISO 4309 standardı esas alınır.',
          en: 'Equipment Directive: Ropes displaying breaks, crushing, or corrosion must be quarantined; ISO 4309 serves as official benchmark.'
        },
        sourceRef: 'İş Ekipmanları Yön. EK-III & TS ISO 4309',
        enforcementLevel: 'mandatory'
      },
      enIso: {
        ruleText: {
          tr: 'ISO 4309 Tablo 3: 6 kollu standart halatta (örn: 6x36 WS) 6d boyunda 9 adet, 30d boyunda 18 adet rastgele dağılmış tel kırığı hurda sebebidir. Vadi kırıklarında (valley break) yan yana 2 kırık doğrudan hurdadır.',
          en: 'ISO 4309 Table 3: For 6-strand ropes, 9 breaks over 6d or 18 breaks over 30d mandates discard. 2 breaks in a single strand valley dictates immediate retirement.'
        },
        sourceRef: 'ISO 4309 Clause 5.3',
        enforcementLevel: 'mandatory'
      },
      asmeB30: {
        ruleText: {
          tr: 'ASME B30.30: Hareketli halatlarda bir adım (lay) boyunda 6 rastgele dağılmış kırık tel veya tek bir demette 3 kırık tel hurdaya ayırma kriteridir.',
          en: 'ASME B30.30: 6 randomly distributed broken wires in one rope lay, or 3 broken wires in one strand in one lay dictates retirement.'
        },
        sourceRef: 'ASME B30.30 Section 30-1.8',
        enforcementLevel: 'mandatory'
      },
      lolerLeea: {
        ruleText: {
          tr: 'LEEA / ISO 4309: Çap kaybı %7 veya daha fazla ise tel kırığı sayısına bakılmaksızın halat ıskartaya ayrılır. Kırık teller sivri kalmamalı, dipten kerpetenle koparılarak muayene edilmelidir.',
          en: 'LEEA: Diameter reduction ≥ 7% triggers immediate discard regardless of wire breaks. Broken wires must be counted and safely removed with pliers.'
        },
        sourceRef: 'LEEA Wire Rope Code',
        enforcementLevel: 'mandatory'
      }
    },
    fieldTakeaway: {
      tr: 'Halat anma çapında %7 incelme veya 6d boyunda 9 tel kırığı (vadi kırığında ise 2 tel) görüldüğü anda halat derhal değiştirilmelidir.',
      en: '7% diameter shrinkage or 9 broken wires over 6d (or 2 valley breaks) mandates immediate rope retirement across all norms.'
    }
  },
  {
    topicId: 'personnel-lifting-rules',
    topicTitle: {
      tr: 'Personel Kaldırma Sepetleri (Man-Riding) Kuralları',
      en: 'Personnel Lifting (Man Baskets & Suspended Platforms)'
    },
    topicDescription: {
      tr: 'Vinçle insan taşınmasında yasal izin koşulları, emniyet katsayıları ve vinç donanımı.',
      en: 'Statutory authorizations, safety factors, and crane hardware for hoisting personnel.'
    },
    comparison: {
      turkishRegulation: {
        ruleText: {
          tr: 'İş Ekipmanları Yönetmeliği EK-II Md. 3.1.2: Kural olarak insan kaldırmak için üretilmemiş vinçlerle personel kaldırılamaz. Ancak OLAĞANÜSTÜ ve ZORUNLU hallerde, özel tasarlanmış sepetle, yazılı yönerge ve gözetim altında yapılabilir.',
          en: 'Directive Annex-II: Personnel hoisting with non-passenger cranes is generally barred, permitted strictly under exceptional circumstances with engineered baskets and written protocol.'
        },
        sourceRef: 'İş Ekipmanları Yön. EK-II Md. 3.1.2',
        enforcementLevel: 'mandatory'
      },
      enIso: {
        ruleText: {
          tr: 'EN 14502-1 ve EN 13000: Sepet tasarımında emniyet katsayısı en az 5:1 (metal yapı) ve 10:1 (sapan donanımı) olmalıdır. Vinçte otomatik fren, acil indirme valfi ve aşırı hız sınırlayıcı zorunludur.',
          en: 'EN 14502-1: Basket structural SF ≥ 5:1; sling rigging SF ≥ 10:1. Crane must feature automatic failsafe brakes and secondary emergency lowering.'
        },
        sourceRef: 'TS EN 14502-1',
        enforcementLevel: 'mandatory'
      },
      asmeB30: {
        ruleText: {
          tr: 'ASME B30.23: "Personnel Lifting Systems". Vinç toplam kapasitesinin %50\'sini aşamaz (WLL yarıya düşürülür). Her personel kaldırma öncesi tam ağırlıkla deneme kaldırması (Trial Lift) zorunludur.',
          en: 'ASME B30.23: Crane capacity de-rated by 50% for personnel lifts. A full trial lift with test ballast is mandatory prior to worker boarding.'
        },
        sourceRef: 'ASME B30.23 / OSHA 1926.1431',
        enforcementLevel: 'mandatory'
      },
      lolerLeea: {
        ruleText: {
          tr: 'LOLER Regulation 5: Personel taşıma sepetleri ve sapan donanımları EN GEÇ 6 AYDA BİR yetkin kişi tarafından muayene edilmeli; sepetteki her personel bağımsız bir yaşam hattına emniyet kemeriyle bağlı olmalıdır.',
          en: 'LOLER Reg 5: Man-riding gear must be examined every 6 MONTHS. All personnel must remain tethered to independent fall-arrest anchor points.'
        },
        sourceRef: 'LOLER 1998 Regulation 5',
        enforcementLevel: 'mandatory'
      }
    },
    fieldTakeaway: {
      tr: 'Vinçle insan kaldırma rutin bir iş değildir! Sadece istisnai durumlarda, vincin kapasitesi %50\'ye düşürülerek, EN 14502-1 sepeti ve 6 aylık LOLER denetimiyle yapılabilir.',
      en: 'Personnel hoisting is an exceptional last resort: de-rate crane capacity to 50%, utilize EN 14502-1 certified baskets, and enforce 6-month inspection.'
    }
  }
];
