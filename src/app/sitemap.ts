import type { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";
import { caseStudiesData } from "@/lib/case-studies-data";
import { posts } from "#site/content";

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

    // Service pages — only English is indexable (ar/tr have English content → noindex)
    if (locale === "en") {
      for (const service of servicesData.en) {
        entries.push({
          url: `${baseUrl}/en/services/${service.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.85,
          alternates: {
            languages: {
              "x-default": `${baseUrl}/en/services/${service.slug}`,
              "en": `${baseUrl}/en/services/${service.slug}`,
              "ar": `${baseUrl}/ar/services/${service.slug}`,
              "tr": `${baseUrl}/tr/services/${service.slug}`,
            },
          },
        });
      }
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

    // Blog Main Page
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/blog`])),
      },
    });

    // Blog Post Pages
    const localePosts = posts.filter(post => post.published && post.lang === locale);
    for (const post of localePosts) {
      const slug = post.slug.split('/').pop() || post.slug;
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(post.updated || post.date),
        changeFrequency: "monthly",
        priority: 0.8,
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
