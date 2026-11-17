import { SafetyFactorInput, SafetyFactorOutput, InspectionEquipmentType } from './types';

export function getRequiredSafetyFactor(equipmentType: InspectionEquipmentType): number {
  switch (equipmentType) {
    case 'textile_sling':
      return 7.0; // EN 1492
    case 'steel_wire_rope':
      return 5.0; // EN 13414-1
    case 'chain_sling':
      return 4.0; // EN 818-4
    case 'shackle':
      return 6.0; // EN 13889 (Grade 6)
    case 'plate_clamp':
      return 3.0; // EN 13155
    case 'manual_hoist':
      return 4.0; // EN 13157
    case 'overhead_crane':
      return 5.0; // Structural/mechanical hoist factor
    default:
      return 5.0;
  }
}

export function calculateSafetyFactor(input: SafetyFactorInput): SafetyFactorOutput {
  const { mode, equipmentType, wllTon = 0, mblTon = 0, sf = 1 } = input;
  const standardRequiredMinSf = getRequiredSafetyFactor(equipmentType);

  let calculatedWllTon = wllTon;
  let calculatedMblTon = mblTon;
  let calculatedSf = sf;

  if (mode === 'calc_wll') {
    // WLL = MBL / SF
    const validSf = sf > 0 ? sf : standardRequiredMinSf;
    calculatedSf = validSf;
    calculatedWllTon = mblTon / validSf;
  } else if (mode === 'calc_mbl') {
    // MBL = WLL * SF
    const validSf = sf > 0 ? sf : standardRequiredMinSf;
    calculatedSf = validSf;
    calculatedMblTon = wllTon * validSf;
  } else if (mode === 'calc_sf') {
    // SF = MBL / WLL
    if (wllTon > 0) {
      calculatedSf = mblTon / wllTon;
    } else {
      calculatedSf = standardRequiredMinSf;
    }
  }

  const isCompliant = calculatedSf >= standardRequiredMinSf - 0.05;

  let msgTr = `Hesaplanan emniyet katsayısı (${calculatedSf.toFixed(1)}:1), ilgili standart gereksinimini (${standardRequiredMinSf}:1) tam olarak karşılamaktadır.`;
  let msgEn = `Calculated safety factor (${calculatedSf.toFixed(1)}:1) meets or exceeds standard requirement (${standardRequiredMinSf}:1).`;

  if (!isCompliant) {
    msgTr = `STANDART ALTI EMNİYET KATSAYISI: Hesaplanan emniyet katsayısı (${calculatedSf.toFixed(1)}:1), standardın zorunlu kıldığı asgari (${standardRequiredMinSf}:1) değerin altındadır! Yük altında kopma riski doğurur, WLL düşürülmelidir.`;
    msgEn = `NON-COMPLIANT SAFETY FACTOR: Calculated factor (${calculatedSf.toFixed(1)}:1) is below mandatory standard minimum (${standardRequiredMinSf}:1)! Extreme failure hazard; reduce WLL immediately.`;
  }

  return {
    calculatedWllTon: parseFloat(calculatedWllTon.toFixed(3)),
    calculatedMblTon: parseFloat(calculatedMblTon.toFixed(3)),
    calculatedSf: parseFloat(calculatedSf.toFixed(2)),
    standardRequiredMinSf,
    isCompliant,
    complianceMessage: { tr: msgTr, en: msgEn },
  };
}
