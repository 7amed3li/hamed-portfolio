/**
 * Route inventory for the site-audit regression suite.
 *
 * HISTORICAL_ROUTES is the 63-route inventory from the original diagnostic
 * audit (3 locales × 21 templates/slugs). It is kept explicit so that a route
 * silently disappearing is reported as a failure instead of being skipped.
 *
 * The SEO spec additionally re-discovers routes from /sitemap.xml at runtime
 * and asserts that both inventories agree.
 */
export const LOCALES = ["en", "tr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const SERVICE_SLUGS = [
  "website-and-landing-page-development",
  "restaurant-menu-websites",
  "full-stack-web-development",
  "nodejs-backend-development",
  "dashboard-and-admin-panel-development",
  "bug-fixing-and-debugging",
  "performance-optimization",
  "application-security-review",
  "qr-attendance-systems",
  "custom-business-systems",
] as const;

export const CASE_STUDY_SLUGS = [
  "qr-attendance-system",
  "kardesler-restaurant-platform",
  "nodesecure-open-source",
  "dragonsploit",
] as const;

export const BLOG_SLUGS = [
  "refactoring-production-backend-lessons",
  "how-i-stopped-nodejs-from-freezing",
] as const;

export function routesForLocale(lang: Locale): string[] {
  return [
    `/${lang}`,
    `/${lang}/hire`,
    `/${lang}/faq`,
    `/${lang}/blog`,
    `/${lang}/apps/sila`,
    ...BLOG_SLUGS.map((s) => `/${lang}/blog/${s}`),
    ...CASE_STUDY_SLUGS.map((s) => `/${lang}/case-studies/${s}`),
    ...SERVICE_SLUGS.map((s) => `/${lang}/services/${s}`),
  ];
}

export const HISTORICAL_ROUTES: string[] = LOCALES.flatMap(routesForLocale);

export const VIEWPORTS = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

export const SITE_ORIGIN = "https://www.hamedmohamed.dev";
