export type UserRole =
  | 'seller'
  | 'endUser'
  | 'inspector'
  | 'ohsSpecialist'
  | 'rigger';

export type Sector =
  | 'heavyIndustry'
  | 'foundry'
  | 'construction'
  | 'shipyard'
  | 'energy'
  | 'logistics';

export interface NavItem {
  id: string;
  href: string;
  translationKey: string;
  iconName: string;
  badge?: string;
  offlineReady: boolean;
}

export interface EquipmentCatalogItem {
  id: string;
  slug: string;
  category: 'chains' | 'wire_ropes' | 'polyester_slings' | 'shackles_clamps' | 'special_lifters';
  name: {
    tr: string;
    en: string;
  };
  standards: string[];
  safetyFactor: number;
  wllRange: string;
  criticalPoints: {
    tr: string[];
    en: string[];
  };
  discardCriteria: {
    tr: string[];
    en: string[];
  };
}

export interface CalculationResultRecord {
  id: string;
  timestamp: string;
  moduleName: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  safetyStatus: 'safe' | 'warning' | 'critical';
  summaryMessage: string;
}

export interface SessionData {
  createdAt: string;
  selectedRole?: UserRole;
  selectedSector?: Sector;
  calculations: CalculationResultRecord[];
  notes: string[];
}
