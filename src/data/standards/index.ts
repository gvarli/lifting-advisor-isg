import { LegalArticle, StandardComparisonEntry, ScenarioFilter, EquipmentTaggingSpecification } from './types';
import { turkishRegulationsData } from './turkishRegulations';
import { internationalStandardsData } from './internationalStandards';
import { standardComparisonMatrixData } from './comparisonMatrix';
import { equipmentTaggingSpecsData } from './taggingGuide';
import { legalScenariosData } from './scenarios';

export * from './types';
export * from './turkishRegulations';
export * from './internationalStandards';
export * from './comparisonMatrix';
export * from './taggingGuide';
export * from './scenarios';

export function searchLegalArticles(query: string, locale: 'tr' | 'en' = 'tr'): LegalArticle[] {
  const q = query.toLowerCase().trim();
  if (!q) return turkishRegulationsData;

  return turkishRegulationsData.filter((art) => {
    const title = art.title[locale].toLowerCase();
    const summary = art.summary[locale].toLowerCase();
    const source = art.sourceLaw.toLowerCase();
    const artNum = art.articleNumber.toLowerCase();

    return title.includes(q) || summary.includes(q) || source.includes(q) || artNum.includes(q);
  });
}
