import { servicesData as servicesEn } from './services-data-en';
import { servicesData as servicesAr } from './services-data-ar';
import { servicesData as servicesTr } from './services-data-tr';

export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  forWho: string;
  whatIBuild: string[];
  technologies: string[];
  businessValue: string;
  proof: string;
  faq: { q: string; a: string }[];
};

export const servicesData: Record<string, ServicePage[]> = {
  en: servicesEn,
  ar: servicesAr,
  tr: servicesTr,
};

export function getServiceBySlug(slug: string, lang: string = 'en'): ServicePage | undefined {
  const langData = servicesData[lang] || servicesData.en;
  return langData.find((s) => s.slug === slug);
}
