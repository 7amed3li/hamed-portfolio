import type { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";
import { caseStudiesData } from "@/lib/case-studies-data";
import { posts } from "#site/content";
import { CONTENT_LAST_MODIFIED, SITE_URL } from "@/lib/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const locales = ["en", "ar", "tr"];

  const entries: MetadataRoute.Sitemap = [];

  // Main pages per locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(CONTENT_LAST_MODIFIED.home),
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en`,
          ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])),
        },
      },
    });

    entries.push({
      url: `${baseUrl}/${locale}/hire`,
      lastModified: new Date(CONTENT_LAST_MODIFIED.hire),
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en/hire`,
          ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/hire`])),
        },
      },
    });

    entries.push({
      url: `${baseUrl}/${locale}/faq`,
      lastModified: new Date(CONTENT_LAST_MODIFIED.faq),
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en/faq`,
          ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/faq`])),
        },
      },
    });

    // Service pages for all locales
    const currentServices = servicesData[locale] || servicesData.en;
    for (const service of currentServices) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: new Date(CONTENT_LAST_MODIFIED.services),
        alternates: {
          languages: {
            "x-default": `${baseUrl}/en/services/${service.slug}`,
            en: `${baseUrl}/en/services/${service.slug}`,
            ar: `${baseUrl}/ar/services/${service.slug}`,
            tr: `${baseUrl}/tr/services/${service.slug}`,
          },
        },
      });
    }

    // Case study pages
    const currentCaseStudies = caseStudiesData[locale] || caseStudiesData.en;
    for (const cs of currentCaseStudies) {
      entries.push({
        url: `${baseUrl}/${locale}/case-studies/${cs.slug}`,
        lastModified: new Date(CONTENT_LAST_MODIFIED.caseStudies),
        ...(cs.images && cs.images.length > 0
          ? { images: cs.images.map((img) => `${baseUrl}${img.src}`) }
          : {}),
        alternates: {
          languages: {
            "x-default": `${baseUrl}/en/case-studies/${cs.slug}`,
            ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/case-studies/${cs.slug}`])),
          },
        },
      });
    }

    // App pages
    entries.push({
      url: `${baseUrl}/${locale}/apps/sila`,
      lastModified: new Date(CONTENT_LAST_MODIFIED.sila),
      images: [`${baseUrl}/apps/sila/icon.png`],
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en/apps/sila`,
          ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/apps/sila`])),
        },
      },
    });

    // Blog Post Pages & latest post date for blog index
    const localePosts = posts.filter((post) => post.published && post.lang === locale);
    const latestPostDate = localePosts.reduce((latest, p) => {
      const d = new Date(p.updated || p.date);
      return d > latest ? d : latest;
    }, new Date("2026-10-15"));

    // Blog Main Page
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: latestPostDate,
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en/blog`,
          ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/blog`])),
        },
      },
    });

    for (const post of localePosts) {
      const slug = post.slug.split("/").pop() || post.slug;
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(post.updated || post.date),
        ...(post.coverImage ? { images: [`${baseUrl}${post.coverImage}`] } : {}),
        alternates: {
          languages: {
            "x-default": `${baseUrl}/en/blog/${slug}`,
            en: `${baseUrl}/en/blog/${slug}`,
            ar: `${baseUrl}/ar/blog/${slug}`,
            tr: `${baseUrl}/tr/blog/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
