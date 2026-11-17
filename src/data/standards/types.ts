export type LegalJurisdiction = 'TR_LEGISLATION' | 'EN_ISO' | 'ASME_USA' | 'LOLER_LEEA';

export interface LegalArticle {
  id: string;
  sourceLaw: string; // e.g., "6331 Sayılı İSG Kanunu" or "İş Ekipmanları Yönetmeliği EK-III"
  articleNumber: string; // e.g., "Madde 13" or "EK-III Tablo 2"
  title: {
    tr: string;
    en: string;
  };
  summary: {
    tr: string;
    en: string;
  };
  fullText: {
    tr: string;
    en: string;
  };
  scope: 'lifting_machinery' | 'lifting_accessories' | 'general_safety' | 'personnel_lifting' | 'inspection_reporting';
  keyEnforcementPoints: {
    tr: string[];
    en: string[];
  };
  penaltiesOrLegalImplications: {
    tr: string;
    en: string;
  };
}

export interface StandardComparisonEntry {
  topicId: string;
  topicTitle: {
    tr: string;
    en: string;
  };
  topicDescription: {
    tr: string;
    en: string;
  };
  comparison: {
    turkishRegulation: {
      ruleText: { tr: string; en: string };
      sourceRef: string;
      enforcementLevel: 'mandatory' | 'recommended';
    };
    enIso: {
      ruleText: { tr: string; en: string };
      sourceRef: string;
      enforcementLevel: 'mandatory' | 'recommended';
    };
    asmeB30: {
      ruleText: { tr: string; en: string };
      sourceRef: string;
      enforcementLevel: 'mandatory' | 'recommended';
    };
    lolerLeea: {
      ruleText: { tr: string; en: string };
      sourceRef: string;
      enforcementLevel: 'mandatory' | 'recommended';
    };
  };
  fieldTakeaway: {
    tr: string;
    en: string;
  };
}

export interface ScenarioFilter {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  queryKeywords: string[];
  relevantArticleIds: string[];
  recommendedChecklist: {
    tr: string[];
    en: string[];
  };
}

export interface EquipmentTaggingSpecification {
  id: string;
  equipmentCategory: 'textile_sling' | 'chain_sling' | 'wire_rope_sling' | 'shackle';
  title: {
    tr: string;
    en: string;
  };
  standardReference: string;
  shapeOrColorSpec: {
    tr: string;
    en: string;
  };
  mandatoryFields: {
    fieldName: string;
    exampleValue: string;
    explanation: { tr: string; en: string };
    isMandatoryByLaw: boolean;
  }[];
  forbiddenPractices: {
    tr: string[];
    en: string[];
  };
}
