import type { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";
import { caseStudiesData } from "@/lib/case-studies-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.hamedmohamed.dev";
  const locales = ["en", "ar", "tr"];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Main pages per locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en`,
          ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])),
        },
      },
    });

    entries.push({
      url: `${baseUrl}/${locale}/hire`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/hire`])),
      },
    });

    entries.push({
      url: `${baseUrl}/${locale}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/faq`])),
      },
    });

    // Service pages
    const currentServices = servicesData[locale] || servicesData.en;
    for (const service of currentServices) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/services/${service.slug}`])),
        },
      });
    }

    // Case study pages
    const currentCaseStudies = caseStudiesData[locale] || caseStudiesData.en;
    for (const cs of currentCaseStudies) {
      entries.push({
        url: `${baseUrl}/${locale}/case-studies/${cs.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/case-studies/${cs.slug}`])),
        },
      });
    }
  }

  // AI-readable files
  entries.push({
    url: `${baseUrl}/llms.txt`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${baseUrl}/llms-full.txt`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  return entries;
}
