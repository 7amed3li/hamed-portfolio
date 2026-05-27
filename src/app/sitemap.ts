import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.hamedmohamed.dev";
  const locales = ["en", "ar", "tr"];
  const now = new Date();

  // Generate entries for each locale
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en`,
          ...Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}`])
          )
        },
      },
    });
  }

  return entries;
}
