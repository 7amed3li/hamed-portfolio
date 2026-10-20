import { test, expect } from "@playwright/test";
import { HISTORICAL_ROUTES, LOCALES, SITE_ORIGIN } from "./routes";

/**
 * Technical SEO checks driven by the live /sitemap.xml of the local build.
 *
 * - sitemap ↔ route inventory agreement
 * - 200 status, title, description, self-referencing canonical
 * - no accidental noindex on sitemap URLs
 * - reciprocal hreflang (en/tr/ar + x-default)
 * - JSON-LD parses and uses the canonical www origin
 */

type PageSeo = {
  url: string;
  status: number;
  title: string;
  description: string;
  canonical: string | null;
  robots: string | null;
  alternates: Record<string, string>;
  jsonLd: unknown[];
  jsonLdErrors: string[];
  rawJsonLd: string[];
};

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
}

function parseHead(url: string, status: number, html: string): PageSeo {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();
  const metaTags = html.match(/<meta [^>]*>/gi) || [];
  const linkTags = html.match(/<link [^>]*>/gi) || [];
  const description = metaTags.map((t) => (attr(t, "name") === "description" ? attr(t, "content") : null)).find(Boolean) || "";
  const robots = metaTags.map((t) => (attr(t, "name") === "robots" ? attr(t, "content") : null)).find(Boolean) || null;
  const canonical = linkTags.map((t) => (attr(t, "rel") === "canonical" ? attr(t, "href") : null)).find(Boolean) || null;
  const alternates: Record<string, string> = {};
  for (const t of linkTags) {
    if (attr(t, "rel") === "alternate" && attr(t, "hreflang")) {
      alternates[attr(t, "hreflang")!] = attr(t, "href")!;
    }
  }
  const rawJsonLd = Array.from(html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)).map((m) => m[1]);
  const jsonLd: unknown[] = [];
  const jsonLdErrors: string[] = [];
  for (const raw of rawJsonLd) {
    try {
      jsonLd.push(JSON.parse(raw));
    } catch (e) {
      jsonLdErrors.push(String(e));
    }
  }
  return { url, status, title, description, canonical, robots, alternates, jsonLd, jsonLdErrors, rawJsonLd };
}

test("sitemap, metadata, canonicals, hreflang and JSON-LD", async ({ request }) => {
  const sm = await request.get("/sitemap.xml");
  expect(sm.status()).toBe(200);
  const xml = await sm.text();
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
  const pageLocs = locs.filter((l) => !l.endsWith(".txt"));

  // All sitemap URLs use the canonical www origin.
  for (const l of locs) expect(l.startsWith(SITE_ORIGIN + "/"), `non-canonical origin in sitemap: ${l}`).toBe(true);
  // No duplicates.
  expect(new Set(locs).size).toBe(locs.length);

  // Sitemap ↔ inventory agreement (no silent skips either way).
  const sitemapPaths = new Set(pageLocs.map((l) => l.replace(SITE_ORIGIN, "")));
  const missingFromSitemap = HISTORICAL_ROUTES.filter((r) => !sitemapPaths.has(r));
  const extraInSitemap = [...sitemapPaths].filter((p) => !HISTORICAL_ROUTES.includes(p));
  expect(missingFromSitemap, "routes missing from sitemap").toEqual([]);
  expect(extraInSitemap, "sitemap routes not in inventory").toEqual([]);

  const pages = new Map<string, PageSeo>();
  for (const loc of pageLocs) {
    const path = loc.replace(SITE_ORIGIN, "");
    const res = await request.get(path, { maxRedirects: 0 });
    pages.set(loc, parseHead(loc, res.status(), await res.text()));
  }

  const problems: string[] = [];
  for (const p of pages.values()) {
    if (p.status !== 200) problems.push(`${p.url}: status ${p.status}`);
    if (!p.title) problems.push(`${p.url}: missing <title>`);
    if (!p.description) problems.push(`${p.url}: missing meta description`);
    if (p.description.length > 170) problems.push(`${p.url}: description ${p.description.length} chars`);
    if (p.canonical !== p.url) problems.push(`${p.url}: canonical is ${p.canonical}`);
    if (p.robots && /noindex/i.test(p.robots)) problems.push(`${p.url}: robots=${p.robots}`);
    for (const lang of [...LOCALES, "x-default"]) {
      if (!p.alternates[lang]) problems.push(`${p.url}: missing hreflang=${lang}`);
    }
    const self = Object.entries(p.alternates).find(([k]) => k !== "x-default" && p.alternates[k] === p.url);
    if (!self) problems.push(`${p.url}: hreflang set does not include itself`);
    for (const [lang, href] of Object.entries(p.alternates)) {
      if (!href.startsWith(SITE_ORIGIN + "/")) problems.push(`${p.url}: hreflang ${lang} non-canonical origin ${href}`);
      if (lang === "x-default") continue;
      const target = pages.get(href);
      if (!target) {
        problems.push(`${p.url}: hreflang ${lang} → ${href} not in sitemap`);
        continue;
      }
      if (!Object.values(target.alternates).includes(p.url)) {
        problems.push(`${p.url}: hreflang ${lang} → ${href} is not reciprocal`);
      }
    }
    if (p.jsonLd.length === 0) problems.push(`${p.url}: no JSON-LD`);
    for (const e of p.jsonLdErrors) problems.push(`${p.url}: JSON-LD parse error ${e}`);
    for (const raw of p.rawJsonLd) {
      if (/https?:\/\/hamedmohamed\.dev/.test(raw)) problems.push(`${p.url}: JSON-LD uses non-www origin`);
    }
  }
  expect(problems, problems.join("\n")).toEqual([]);
});

test("robots.txt allows crawling and references the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toMatch(/User-Agent: \*\s+Allow: \//i);
  expect(body).not.toMatch(/Disallow: \/\s*$/im);
  expect(body).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
});

test("public assets and feeds are served without locale redirects", async ({ request }) => {
  for (const path of [
    "/Hamed_Mohamed_FullStack_NodeJS_CV.pdf",
    "/llms.txt",
    "/llms-full.txt",
    "/rss.xml",
    "/case-studies/kardesler/hero.png",
    "/apps/sila/icon.png",
  ]) {
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status(), path).toBe(200);
  }
});

test("unknown routes return 404", async ({ request }) => {
  for (const path of ["/en/does-not-exist", "/en/blog/does-not-exist", "/tr/case-studies/nope"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(404);
  }
});

test("RSS feed uses canonical origin", async ({ request }) => {
  const res = await request.get("/rss.xml");
  const xml = await res.text();
  expect(xml).not.toMatch(/https?:\/\/hamedmohamed\.dev/);
});
