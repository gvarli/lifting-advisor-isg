export type AiTaskMode =
  | 'rigging_planner'
  | 'visual_defect_inspector'
  | 'method_audit'
  | 'predictive_risk';

export type AiProvider = 'gemini' | 'openai' | 'claude';

export type EquipmentVerdict =
  | 'SUITABLE' // KULLANIMA UYGUN
  | 'CONDITIONAL' // ŞARTLI - YAKIN TAKİP
  | 'SCRAP_IMMEDIATE'; // DERHAL HURDAYA AYIR - KULLANIM DIŞI

export type RiskSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AiConsultantSettings {
  provider: AiProvider;
  apiKey: string;
  modelName?: string;
}

export interface RiggingPlannerInput {
  loadWeightTon: number;
  dimensions: { lengthM: number; widthM: number; heightM: number };
  isCenterOfGravityOffset: boolean;
  hasSharpEdges: boolean;
  surfaceTemperatureC: number;
  environmentType: 'indoor' | 'foundry_hot' | 'marine_shipyard' | 'chemical_acid' | 'outdoor_windy';
  liftHeightM: number;
  craneType: 'overhead_crane' | 'mobile_crane' | 'tower_crane' | 'manual_hoist';
  additionalNotes?: string;
}

export interface VisualDefectInspectorInput {
  equipmentType: 'wire_rope' | 'chain' | 'textile_sling' | 'shackle' | 'hook' | 'drum';
  imageBase64?: string;
  imageMimeType?: string;
  observedDefectNotes?: string;
}

export interface MethodAuditInput {
  riggingDescription: string;
  imageBase64?: string;
  imageMimeType?: string;
  loadWeightTon?: number;
  slingLegCount?: number;
  estimatedAngleDeg?: number;
}

export interface PredictiveRiskInput {
  equipmentType: string;
  operatingEnvironment: string;
  usageFrequency: 'daily_multishift' | 'regular' | 'infrequent';
  ambientTemperatureC: number;
  chemicalExposure: string;
}

export interface AiAnalysisResponse {
  taskMode: AiTaskMode;
  summaryTitle: string;
  verdict?: EquipmentVerdict;
  overallRisk: RiskSeverity;
  primaryObservations: string[];
  detectedDefectsOrErrors?: {
    issue: string;
    standardClause: string;
    severity: RiskSeverity;
    consequence: string;
  }[];
  recommendedActionPlan: string[];
  revisedRiggingPlan?: {
    recommendedSlings: string;
    hitchingMethod: string;
    requiredHardware: string;
    criticalPrecautions: string[];
  };
  predictiveInsights?: {
    hiddenFailureMode: string;
    incubationTimeEstimate: string;
    preventiveMonitoringStep: string;
  }[];
  citedStandards: string[];
  legalReference: string;
}
