import { InspectionScheduleInput, InspectionScheduleOutput, InspectionEquipmentType } from './types';

export function calculateInspectionSchedule(input: InspectionScheduleInput): InspectionScheduleOutput {
  const { equipmentType, dutyCycle } = input;

  // Legal standard maximum interval (TR OHS Regulation EK-III & International Standards)
  let legalPeriodicIntervalMonths = 12; // 1 year baseline
  let recommendedIntervalMonths = 12;
  let staticProofTestMultiplier = 1.25;
  let dynamicTestMultiplier = 1.10;
  let standards: string[] = [];
  let checklistTr: string[] = [];
  let checklistEn: string[] = [];

  switch (equipmentType) {
    case 'textile_sling':
      standards = ['TS EN 1492-1', 'TS EN 1492-2', 'İş Ekipmanları Yönetmeliği'];
      staticProofTestMultiplier = 2.0; // Type test proof
      dynamicTestMultiplier = 1.0;
      checklistTr = [
        'Mavi tanıtım etiketi (WLL, CE, seri no) okunabilir ve sağlam mı?',
        'Sapan kenarlarında enine kesik, lif erimesi veya dikiş söküğü var mı?',
        'Asit veya alkali kimyasal sertleşmesi / renk bozulması mevcut mu?',
        'Koruyucu kılıf (sleeve) olmadan keskin kenarlarda kullanılmış mı?'
      ];
      checklistEn = [
        'Is the identification tag legible showing WLL, CE mark, and serial number?',
        'Are there any transverse edge cuts, fiber glazing, or unravelled load seams?',
        'Any evidence of chemical attack, embrittlement, or discoloration?',
        'Has it been used over sharp edges without protective wear sleeves?'
      ];
      break;

    case 'steel_wire_rope':
      standards = ['TS ISO 4309', 'TS EN 12385-4', 'TS EN 13414-1'];
      staticProofTestMultiplier = 2.0;
      checklistTr = [
        'ISO 4309 Tablo 3: 6d ve 30d boyunda kırık tel sayısı sayıldı mı?',
        'Kumpasla en geniş eksende halat anma çapı ölçümü yapıldı mı (çap kaybı < %7 mi)?',
        'Kuş kafesi (birdcaging), kinking (kırılma) veya çelik öz fırlaması var mı?',
        'Pres yüksüklerinde (kovan) çatlak veya halat kayma izi var mı?'
      ];
      checklistEn = [
        'ISO 4309 Table 3: Broken wire count evaluated over 6d and 30d lay lengths?',
        'Caliper measurement of nominal diameter (diameter loss < 7%)?',
        'Any signs of birdcaging, kinking, or internal core protrusion?',
        'Any cracks or slippage evidence in swaged aluminum/steel sleeves?'
      ];
      break;

    case 'chain_sling':
      standards = ['TS EN 818-4', 'TS EN 818-2', 'İş Ekipmanları Yönetmeliği'];
      staticProofTestMultiplier = 2.0;
      checklistTr = [
        'Baklaların birbirine temas ettiği noktalarda çap aşınması (%10 altında mı)?',
        'Bakla anma adımında (pitch) kalıcı uzama kontrolü (%5 altında mı)?',
        'Kancalarda emniyet mandalı yaylı ve sağlam mı? Kanca ağzında açılma var mı?',
        'Baklalarda kaynak izi, çatlak, bükülme veya derin çentik var mı?'
      ];
      checklistEn = [
        'Interlink wear measurement (must be less than 10% nominal wire diameter)?',
        'Permanent pitch elongation check (must be less than 5% per link)?',
        'Hook safety latch functioning smoothly and throat opening spread < 10%?',
        'Any unauthorized weld spatter, cracks, bent links, or gouges?'
      ];
      break;

    case 'overhead_crane':
      standards = ['TS EN 15011', 'TS ISO 4301', 'İş Ekipmanları Yönetmeliği EK-III'];
      staticProofTestMultiplier = 1.25;
      dynamicTestMultiplier = 1.10;
      checklistTr = [
        'Üst ve alt kanca nihai sınır kesici sviçlerinin (limit switch) fonksiyon testi',
        'Elektronik aşırı yük sınırlayıcısının (overload limiter) kalibrasyon doğrulaması',
        'Kaldırma ve yürütme elektro-manyetik fren balatalarının tutma testi',
        'Köprü ray bağlantıları, tekerlek flanş aşınmaları ve acil durdurma (E-Stop) butonu'
      ];
      checklistEn = [
        'Functional verification of upper and lower hoisting limit switches',
        'Electronic overload sensor calibration test with certified test weights',
        'Holding capacity and lining wear check of hoist and travel brakes',
        'Runway rail alignment, wheel flange wear, and Emergency Stop pushbuttons'
      ];
      break;

    case 'manual_hoist':
      standards = ['TS EN 13157', 'ASME B30.16', 'İş Ekipmanları Yönetmeliği'];
      staticProofTestMultiplier = 1.25;
      dynamicTestMultiplier = 1.10;
      checklistTr = [
        'Weston tipi mekanik otomatik yük freninin yük altında kaydırma testi',
        'Yük zinciri kalibre bakla kontrolü ve aşırı yük emniyet debriyajı testi',
        'Alt ve üst dövme kanca güvenlik mandalları ve kanca boğaz açıklığı',
        'Gövde cıvata ve muhafaza saçlarının mekanik bütünlük kontrolü'
      ];
      checklistEn = [
        'Weston mechanical load brake slippage test under rated load',
        'Calibrated load chain wear check and overload friction clutch test',
        'Upper and lower hook safety latches and throat dimension check',
        'Structural casing, guide rollers, and tie rod tightness audit'
      ];
      break;

    case 'shackle':
      standards = ['TS EN 13889', 'US Fed. Spec. RR-C-271', 'ASME B30.26'];
      staticProofTestMultiplier = 2.0;
      checklistTr = [
        'Dövme gövde üzerindeki WLL, üretici ve seri parti no kabartmaları net mi?',
        'Pim yiv dişlerinde sıyırma veya eksenel eğilme var mı?',
        'Gövde çene açıklığında %10 genişleme var mı?',
        'Pim yerine standart inşaat cıvatası takılmış mı (YASAK)?'
      ];
      checklistEn = [
        'Legible drop-forged markings of WLL, manufacturer, and batch code?',
        'Check pin thread integrity and verify pin is not bent',
        'Inspect throat opening spread (must not exceed 10% catalog spec)',
        'Verify original alloy pin is fitted; no commercial bolt substitution'
      ];
      break;

    case 'plate_clamp':
      standards = ['TS EN 13155', 'ASME B30.20', 'İş Ekipmanları Yönetmeliği'];
      staticProofTestMultiplier = 2.0;
      checklistTr = [
        'Dişli kam ve sabit pabuç dişlerinde körleşme, kırık diş kontrolü',
        'Yaylı emniyet mandalının güçlü kilitleme yapıp yapmadığı',
        'Gövde çene açıklığında kalıcı deformasyon veya çatlak (NDT/DPI)',
        'Mafsallı mapa pimi aşınma boşluğu kontrolü'
      ];
      checklistEn = [
        'Cam and pad gripping teeth sharpness and chipping audit',
        'Positive locking force verification of safety spring latch mechanism',
        'Body jaw opening deformation check and dye penetrant inspection of welds',
        'Articulated lifting shackle pivot pin wear play'
      ];
      break;
  }

  // Adjust recommended interval based on duty cycle
  if (dutyCycle === 'heavy') {
    recommendedIntervalMonths = Math.min(6, legalPeriodicIntervalMonths);
  } else if (dutyCycle === 'severe_corrosive') {
    recommendedIntervalMonths = Math.min(3, legalPeriodicIntervalMonths);
  }

  return {
    legalPeriodicIntervalMonths,
    recommendedIntervalMonths,
    dailyPreUseCheckRequired: true,
    staticProofTestMultiplier,
    dynamicTestMultiplier,
    relevantStandards: standards,
    keyInspectionChecklist: { tr: checklistTr, en: checklistEn },
  };
}
