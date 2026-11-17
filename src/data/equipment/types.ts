export type EquipmentGroupId =
  | 'steel-wire-ropes'
  | 'chain-slings'
  | 'textile-slings'
  | 'rigging-accessories'
  | 'lifting-machines'
  | 'special-attachments';

export type PerspectiveRole = 'all' | 'seller' | 'operator' | 'inspector';

export interface EnvironmentCompatibility {
  minTempC: number;
  maxTempC: number;
  tempDeRating?: {
    tempRange: string;
    capacityMultiplier: number;
    notes: string;
  }[];
  chemicalResistance: {
    acids: 'resistant' | 'limited' | 'prohibited';
    alkalis: 'resistant' | 'limited' | 'prohibited';
    solvents: 'resistant' | 'limited' | 'prohibited';
    salineWater: 'resistant' | 'limited' | 'prohibited';
  };
  sharpEdgeSensitivity: 'low' | 'moderate' | 'high' | 'extreme';
  uvSensitivity: 'impervious' | 'moderate' | 'high';
}

export interface LiftingEquipmentItem {
  id: string;
  groupId: EquipmentGroupId;
  groupName: { tr: string; en: string };
  name: { tr: string; en: string };
  code: string;
  shortDescription: { tr: string; en: string };
  safetyFactor: string; // e.g., "5:1", "4:1", "7:1", "6:1"
  standards: string[]; // e.g., ["EN 12385-4", "ISO 4309", "EN 13414-1"]
  wllRange: string; // e.g., "0.5t - 150t"
  
  // Section 1: Tanım ve Teknik Özellikler
  technicalSpecs: {
    construction: string;
    materialGrade: string;
    tensileGrade?: string;
    efficiencyFactor?: string; // e.g. %80 or %90 for spliced terminations
    summaryPoints: { tr: string[]; en: string[] };
  };

  // Section 2: Doğru Seçim Kriterleri
  selectionCriteria: {
    recommendedApplications: { tr: string[]; en: string[] };
    unsuitableApplications: { tr: string[]; en: string[] };
    environment: EnvironmentCompatibility;
    selectionTipsForSellers: { tr: string[]; en: string[] };
    selectionTipsForEngineers: { tr: string[]; en: string[] };
  };

  // Section 3: Güvenli Kullanım Kuralları
  safeOperation: {
    preUseChecks: { tr: string[]; en: string[] };
    hitchingModes: {
      mode: string;
      modeMultiplier: number;
      notes: string;
    }[];
    angleRules: { tr: string; en: string };
    prohibitedUses: { tr: string[]; en: string[] };
  };

  // Section 4: Bakım ve Yağlama
  maintenance: {
    cleaning: { tr: string; en: string };
    lubricationInterval: { tr: string; en: string };
    lubricantType: { tr: string; en: string };
    movingPartsInspection: { tr: string[]; en: string[] };
  };

  // Section 5: Muhafaza ve Depolama
  storage: {
    guidelines: { tr: string[]; en: string[] };
    environmentalHazards: { tr: string[]; en: string[] };
  };

  // Section 6: Öngörülebilecek Hatalar ve Riskler
  commonFailures: {
    fieldError: { tr: string; en: string };
    consequence: { tr: string; en: string };
    severity: 'critical' | 'high' | 'medium';
  }[];

  // Section 7: Alınacak Önlemler ve Hurdaya Ayırma (Discard) Kriterleri
  discardCriteria: {
    physicalDefects: { tr: string[]; en: string[] };
    wearLimits: { tr: string; en: string };
    deformationLimits: { tr: string; en: string };
    preventiveMeasures: { tr: string[]; en: string[] };
  };

  // Role Perspective Focus Highlights
  roleInsights: {
    sellerFocus: { tr: string; en: string };
    operatorFocus: { tr: string; en: string };
    inspectorFocus: { tr: string; en: string };
  };
}
