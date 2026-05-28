import { caseStudies as caseStudiesEn } from '@/lib/case-studies-data-en';
import { caseStudies as caseStudiesAr } from '@/lib/case-studies-data-ar';
import { caseStudies as caseStudiesTr } from '@/lib/case-studies-data-tr';

import type { CaseStudy } from './types';

export const caseStudiesData: Record<string, CaseStudy[]> = {
  en: caseStudiesEn,
  ar: caseStudiesAr,
  tr: caseStudiesTr,
};

// Fallback array for sitemap/static params (since slugs are the same across all languages)
export const caseStudies = caseStudiesEn;

export function getCaseStudyBySlug(slug: string, lang: string = 'en'): CaseStudy | undefined {
  const langData = caseStudiesData[lang] || caseStudiesData.en;
  return langData.find((c) => c.slug === slug);
}
