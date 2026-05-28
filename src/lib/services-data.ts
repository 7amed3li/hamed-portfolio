import { servicesData as servicesEn } from '@/lib/services-data-en';
import { servicesData as servicesAr } from '@/lib/services-data-ar';
import { servicesData as servicesTr } from '@/lib/services-data-tr';

import type { ServicePage } from './types';

export const servicesData: Record<string, ServicePage[]> = {
  en: servicesEn,
  ar: servicesAr,
  tr: servicesTr,
};

export function getServiceBySlug(slug: string, lang: string = 'en'): ServicePage | undefined {
  const langData = servicesData[lang] || servicesData.en;
  return langData.find((s) => s.slug === slug);
}
