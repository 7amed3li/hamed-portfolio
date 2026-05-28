import { caseStudies as caseStudiesEn } from './case-studies-data-en';
import { caseStudies as caseStudiesAr } from './case-studies-data-ar';
import { caseStudies as caseStudiesTr } from './case-studies-data-tr';

export type CaseStudy = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  year: string;
  tags: string[];
  heroStat: { value: string; label: string };
  problem: string;
  solution: string;
  technologies: string[];
  results: { metric: string; description: string }[];
  clientProof: string;
  cta: string;
};

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
