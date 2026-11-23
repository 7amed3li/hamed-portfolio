import { test, expect } from "@playwright/test";
import { BLOG_SLUGS, HISTORICAL_ROUTES, LOCALES, SITE_ORIGIN } from "./routes";

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
  hasKeywordsMeta: boolean;
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

function flattenJsonLd(parsedList: unknown[]): Array<Record<string, unknown>> {
  const nodes: Array<Record<string, unknown>> = [];
  for (const item of parsedList) {
    if (Array.isArray(item)) {
      for (const sub of item) {
        if (sub && typeof sub === "object") nodes.push(sub as Record<string, unknown>);
      }
    } else if (item && typeof item === "object") {
      const obj = item as Record<string, unknown>;
      if (Array.isArray(obj["@graph"])) {
        for (const sub of obj["@graph"]) {
          if (sub && typeof sub === "object") nodes.push(sub as Record<string, unknown>);
        }
      } else {
        nodes.push(obj);
      }
    }
  }
  return nodes;
}

function parseHead(url: string, status: number, html: string): PageSeo {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();
  const metaTags = html.match(/<meta [^>]*>/gi) || [];
  const linkTags = html.match(/<link [^>]*>/gi) || [];
  const description = metaTags.map((t) => (attr(t, "name") === "description" ? attr(t, "content") : null)).find(Boolean) || "";
  const hasKeywordsMeta = metaTags.some((t) => attr(t, "name")?.toLowerCase() === "keywords");
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
  return { url, status, title, description, hasKeywordsMeta, canonical, robots, alternates, jsonLd, jsonLdErrors, rawJsonLd };
}

test("sitemap, metadata, canonicals, hreflang and JSON-LD", async ({ request }) => {
  const sm = await request.get("/sitemap.xml");
  expect(sm.status()).toBe(200);
  const xml = await sm.text();
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
  const pageLocs = locs.filter((l) => !l.endsWith(".txt"));

  // Sitemap hygiene: 66 HTML pages, no .txt entries, no ignored changefreq/priority, real lastmod, valid images.
  expect(locs.length).toBe(66);
  expect(locs.some((l) => l.endsWith(".txt"))).toBe(false);
  expect(xml).not.toContain("<changefreq>");
  expect(xml).not.toContain("<priority>");
  const lastmods = Array.from(xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)).map((m) => m[1]);
  const todayUtc = new Date().toISOString().slice(0, 10);
  expect(lastmods.some((d) => d.startsWith(todayUtc))).toBe(false);
  const imageLocs = Array.from(xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)).map((m) => m[1]);
  expect(imageLocs.length).toBeGreaterThanOrEqual(15);
  for (const img of imageLocs) expect(img.startsWith(SITE_ORIGIN + "/"), `non-canonical image in sitemap: ${img}`).toBe(true);

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
    if (p.hasKeywordsMeta) problems.push(`${p.url}: has deprecated <meta name="keywords">`);
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

    const path = p.url.replace(SITE_ORIGIN, "");
    const langMatch = path.match(/^\/(en|ar|tr)(?:\/|$)/);
    const pageLang = langMatch ? langMatch[1] : null;
    const nodes = flattenJsonLd(p.jsonLd);

    if (pageLang) {
      const fullstackSvc = nodes.find((n) => n["@id"] === `${SITE_ORIGIN}/#service-fullstack`);
      const channelUrl = (fullstackSvc?.availableChannel as Record<string, unknown> | undefined)?.serviceUrl;
      if (channelUrl !== `${SITE_ORIGIN}/${pageLang}#contact`) {
        problems.push(`${p.url}: #service-fullstack serviceUrl=${String(channelUrl)}`);
      }
    }

    if (/^\/(en|ar|tr)\/blog\/[^/]+$/.test(path)) {
      const bp = nodes.find((n) => n["@type"] === "BlogPosting");
      const bc = nodes.find((n) => n["@type"] === "BreadcrumbList");
      if (!bp || !bp.mainEntityOfPage || bp.inLanguage !== pageLang || !bp.keywords || !bp.publisher) {
        problems.push(`${p.url}: incomplete BlogPosting JSON-LD`);
      }
      if (!bc || !Array.isArray(bc.itemListElement) || bc.itemListElement.length !== 3) {
        problems.push(`${p.url}: missing 3-level BreadcrumbList on blog post`);
      }
    }

    if (/^\/(ar|tr)\/(services|case-studies)\/[^/]+$/.test(path)) {
      const bc = nodes.find((n) => n["@type"] === "BreadcrumbList");
      const firstItem = Array.isArray(bc?.itemListElement)
        ? (bc.itemListElement[0] as Record<string, unknown> | undefined)
        : undefined;
      if (!firstItem || firstItem.name === "Home") {
        problems.push(`${p.url}: unlocalized BreadcrumbList root name=${String(firstItem?.name)}`);
      }
    }
  }
  expect(problems, problems.join("\n")).toEqual([]);
});

test("robots.txt allows crawling with ordered rules and references the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  const uaLines = Array.from(body.matchAll(/^User-Agent:\s*(.+)$/gim)).map((m) => m[1].trim());
  expect(uaLines.length).toBeGreaterThan(2);
  expect(uaLines[0]).not.toBe("*");
  expect(uaLines[uaLines.length - 1]).toBe("*");
  expect(body).toMatch(/User-Agent:\s*\*\s+Allow:\s*\//i);
  expect(body).toMatch(/Disallow:\s*\/api\//i);
  expect(body).not.toMatch(/Disallow:\s*\/\s*$/im);
  expect(body).not.toMatch(/^Host:/im);
  expect(body).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
});

test("dynamic llms.txt and llms-full.txt follow llmstxt.org and GEO standards", async ({ request }) => {
  const res = await request.get("/llms.txt", { maxRedirects: 0 });
  expect(res.status()).toBe(200);
  expect(res.headers()["x-robots-tag"]).toMatch(/noindex/i);
  const llms = await res.text();
  expect(llms).toMatch(/^# Hamed Mohamed\b/m);
  expect(llms).not.toMatch(/^-\s+\/[a-z]{2}\//m);
  for (const lang of LOCALES) {
    expect(llms).toContain(`${SITE_ORIGIN}/${lang}/hire`);
    for (const slug of BLOG_SLUGS) {
      expect(llms).toContain(`${SITE_ORIGIN}/${lang}/blog/${slug}`);
    }
  }

  const fullRes = await request.get("/llms-full.txt", { maxRedirects: 0 });
  expect(fullRes.status()).toBe(200);
  expect(fullRes.headers()["x-robots-tag"]).toMatch(/noindex/i);
  const full = await fullRes.text();
  expect(full).not.toMatch(/best full-stack developer/i);
  expect(full).not.toMatch(/Contact form with API endpoint/i);
});

test("IndexNow key and /apps permanent redirects work without breaking static assets", async ({ request }) => {
  const key = "8f4c2e19a7b64d309e51c8a2f7b4d6e3";
  const idxRes = await request.get(`/${key}.txt`, { maxRedirects: 0 });
  expect(idxRes.status()).toBe(200);
  expect((await idxRes.text()).trim()).toBe(key);

  const expectedRedirects = [
    ["/apps", "/en/apps/sila"],
    ["/en/apps", "/en/apps/sila"],
    ["/ar/apps", "/ar/apps/sila"],
    ["/tr/apps", "/tr/apps/sila"],
  ] as const;

  for (const [from, to] of expectedRedirects) {
    const r = await request.get(from, { maxRedirects: 0 });
    expect(r.status(), from).toBe(308);
    expect(r.headers()["location"], from).toMatch(new RegExp(`${to}$`));
  }
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
