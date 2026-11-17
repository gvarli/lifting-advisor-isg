export type SlingLegCount = 1 | 2 | 3 | 4;
export type HitchType = 'straight' | 'choker' | 'basket';

export interface SlingTensionInput {
  totalLoadKg: number;
  legCount: SlingLegCount;
  hitchType: HitchType;
  inputMode: 'angle' | 'dimensions';
  verticalAngleDeg: number; // Beta: Angle with vertical (0° - 60°)
  slingLengthM?: number; // L
  distanceBetweenPointsM?: number; // S (Span)
}

export interface SlingTensionOutput {
  loadFactor: number; // KL = 1 / cos(beta)
  totalWeightTon: number;
  totalWeightKn: number;
  effectiveLegs: number; // 3 or 4 leg rigid load rule (2 or 3 effective)
  tensionPerLegKn: number;
  tensionPerLegTon: number;
  recommendedWllPerLegTon: number;
  calculatedAngleDeg: number;
  includedAngleDeg: number; // 2 * beta
  isDangerousAngle: boolean; // Beta > 60°
  isCriticalWarning: boolean; // Beta > 45°
  statusMessage: { tr: string; en: string };
  warningNotice?: { tr: string; en: string };
}

export interface AsymmetricCoGInput {
  totalLoadTon: number;
  totalDistanceD: number; // D = d1 + d2 (m)
  d1: number; // distance from pick 1 to CoG (m)
  slingLengthL1: number; // leg 1 length (m)
  slingLengthL2: number; // leg 2 length (m)
}

export interface AsymmetricCoGOutput {
  d2: number; // D - d1
  loadShare1Ton: number; // F1 = W * (d2 / D)
  loadShare2Ton: number; // F2 = W * (d1 / D)
  percentageLeg1: number;
  percentageLeg2: number;
  heaviestLegTon: number;
  recommendedSlingWllTon: number;
  isTilted: boolean;
  tiltAngleDeg: number;
  equilibriumWarning: { tr: string; en: string };
}

export type EquipmentDdType = 'wire_rope' | 'chain' | 'polyester_sling';

export interface DdRatioInput {
  equipmentType: EquipmentDdType;
  dMm: number; // Rope diameter or sling thickness (mm)
  dCapMm: number; // Pin or hook diameter (mm)
  nominalWllTon: number;
}

export interface DdRatioOutput {
  ratioDd: number;
  efficiencyPercentage: number;
  capacityLossPercentage: number;
  effectiveWllTon: number;
  isSharpEdge: boolean; // D/d < 1 or < 2 depending on equipment
  severity: 'safe' | 'warning' | 'critical';
  recommendation: { tr: string; en: string };
}

export type HoistOperationType = 'precision' | 'normal' | 'harsh' | 'offshore';

export interface DynamicWindInput {
  staticLoadTon: number;
  operationType: HoistOperationType;
  windSpeedMs: number; // m/s
  windAreaM2: number; // Area exposed to wind
  dragCoefficientCd: number; // Shape factor (e.g. 1.2 flat, 0.7 cylinder)
}

export interface DynamicWindOutput {
  daf: number; // Dynamic Amplification Factor
  totalDynamicLoadTon: number;
  dynamicAdditionalForceKn: number;
  windPressurePa: number; // q = 0.5 * rho * v^2
  windForceKn: number; // Fw = q * A * Cd
  windForceTon: number;
  windSpeedKmh: number;
  beaufortScale: number;
  beaufortDescription: { tr: string; en: string };
  windAlertLevel: 'green' | 'amber' | 'red';
  windActionAdvice: { tr: string; en: string };
}

export interface ClipsFleetInput {
  ropeDiameterMm: number;
  drumType: 'grooved' | 'plain';
  drumWidthMm: number;
  distanceToSheaveMm: number;
}

export interface ClipsFleetOutput {
  // Module A: Clips
  minClipCount: number;
  clipSpacingMm: number; // 6 * d
  tighteningTorqueNm: number;
  turnbackLengthMm: number;
  // Module B: Fleet Angle
  fleetAngleDeg: number;
  maxPermissibleAngleDeg: number;
  isFleetAngleCompliant: boolean;
  fleetAngleAdvice: { tr: string; en: string };
}

export type InspectionEquipmentType =
  | 'textile_sling'
  | 'steel_wire_rope'
  | 'chain_sling'
  | 'shackle'
  | 'manual_hoist'
  | 'overhead_crane'
  | 'plate_clamp';

export type DutyCycle = 'normal' | 'heavy' | 'severe_corrosive';

export interface InspectionScheduleInput {
  equipmentType: InspectionEquipmentType;
  dutyCycle: DutyCycle;
  commissioningDate?: string;
}

export interface InspectionScheduleOutput {
  legalPeriodicIntervalMonths: number;
  recommendedIntervalMonths: number;
  dailyPreUseCheckRequired: boolean;
  staticProofTestMultiplier: number; // e.g. 1.25 or 1.5
  dynamicTestMultiplier: number; // e.g. 1.1
  relevantStandards: string[];
  keyInspectionChecklist: { tr: string[]; en: string[] };
}

export interface SafetyFactorInput {
  mode: 'calc_wll' | 'calc_mbl' | 'calc_sf';
  equipmentType: InspectionEquipmentType;
  wllTon?: number;
  mblTon?: number;
  sf?: number;
}

export interface SafetyFactorOutput {
  calculatedWllTon: number;
  calculatedMblTon: number;
  calculatedSf: number;
  standardRequiredMinSf: number;
  isCompliant: boolean;
  complianceMessage: { tr: string; en: string };
}
