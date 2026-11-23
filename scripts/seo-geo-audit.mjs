#!/usr/bin/env node
/**
 * Quantitative Technical SEO & GEO Audit Script
 * Measures sitemap, robots.txt, llms.txt, llms-full.txt, metadata hygiene,
 * JSON-LD structured data completeness, IndexNow readiness, and /apps redirects.
 *
 * Usage:
 *   node scripts/seo-geo-audit.mjs https://www.hamedmohamed.dev
 *   node scripts/seo-geo-audit.mjs http://127.0.0.1:3099
 */

const baseUrl = (process.argv[2] || "https://www.hamedmohamed.dev").replace(/\/+$/, "");
const SITE_ORIGIN = "https://www.hamedmohamed.dev";
const INDEXNOW_KEY = "8f4c2e19a7b64d309e51c8a2f7b4d6e3";
const UA = {
  "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
};

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getAttr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? decodeEntities(m[1]) : null;
}

function flattenJsonLd(parsedList) {
  const nodes = [];
  for (const item of parsedList) {
    if (Array.isArray(item)) nodes.push(...item);
    else if (item && Array.isArray(item["@graph"])) nodes.push(...item["@graph"]);
    else if (item && typeof item === "object") nodes.push(item);
  }
  return nodes;
}

async function run() {
  const todayUtc = new Date().toISOString().slice(0, 10);

  // 1. Sitemap
  const smRes = await fetch(`${baseUrl}/sitemap.xml`, { headers: UA });
  const smText = await smRes.text();
  const locs = [...smText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urlBlocks = [...smText.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const txtEntriesCount = locs.filter((l) => l.endsWith(".txt")).length;
  const changefreqCount = (smText.match(/<changefreq>/g) || []).length;
  const priorityCount = (smText.match(/<priority>/g) || []).length;
  const imageEntriesCount = (smText.match(/<image:image>/g) || []).length;
  const staticLastmodMatchingTodayCount = urlBlocks.filter((block) => {
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1] || "";
    const lastmod = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || "";
    return !/\/blog(\/|$)/.test(loc) && lastmod.startsWith(todayUtc);
  }).length;

  // 2. Robots.txt
  const robRes = await fetch(`${baseUrl}/robots.txt`, { headers: UA });
  const robText = await robRes.text();
  const uaMatches = [...robText.matchAll(/^User-Agent:\s*(.+)$/gim)].map((m) => m[1].trim());
  const firstUaIsSpecific = uaMatches.length > 0 && uaMatches[0] !== "*";
  const lastUaIsWildcard = uaMatches.length > 0 && uaMatches[uaMatches.length - 1] === "*";
  const specificBeforeWildcard = firstUaIsSpecific && lastUaIsWildcard;
  const apiDisallowed = /Disallow:\s*\/api\//i.test(robText);
  const deprecatedHostDirective = /^Host:/im.test(robText);
  const targetAiSearchBots = [
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Claude-SearchBot",
    "Claude-User",
    "Googlebot",
    "Bingbot",
    "Applebot",
    "DuckAssistBot",
  ];
  const aiSearchBotsListed = targetAiSearchBots.filter((b) =>
    new RegExp(`^User-Agent:\\s*${b}\\b`, "im").test(robText)
  ).length;

  // 3. llms.txt & llms-full.txt
  const llmsRes = await fetch(`${baseUrl}/llms.txt`, { headers: UA });
  const llmsText = await llmsRes.text();
  const llmsFullRes = await fetch(`${baseUrl}/llms-full.txt`, { headers: UA });
  const llmsFullText = await llmsFullRes.text();

  const llmsXRobots = llmsRes.headers.get("x-robots-tag") || "";
  const llmsFullXRobots = llmsFullRes.headers.get("x-robots-tag") || "";
  const llmsRelativePathLines = (llmsText.match(/^-\s+\/[a-z]{2}\//gm) || []).length;

  const expectedBlogSlugs = [
    ...new Set(
      locs
        .map((l) => l.match(/\/(?:en|ar|tr)\/blog\/([^/]+)$/)?.[1])
        .filter(Boolean)
    ),
  ];
  const totalBlogVariants = expectedBlogSlugs.length * 3;
  let llmsBlogUrlsCovered = 0;
  for (const lang of ["en", "ar", "tr"]) {
    for (const slug of expectedBlogSlugs) {
      if (llmsText.includes(`${SITE_ORIGIN}/${lang}/blog/${slug}`)) {
        llmsBlogUrlsCovered++;
      }
    }
  }
  const llmsLocalizedCoreLangs = ["en", "ar", "tr"].filter((lang) =>
    llmsText.includes(`${SITE_ORIGIN}/${lang}/hire`)
  ).length;
  const llmsFullHypePhrases = (llmsFullText.match(/best full-stack developer/gi) || []).length;
  const llmsFullInaccurateApiClaim = /Contact form with API endpoint/i.test(llmsFullText);
  const llmsApproxTokens = Math.round(llmsText.length / 4);
  const llmsFullApproxTokens = Math.round(llmsFullText.length / 4);

  // 4 & 5. Crawl all page URLs from sitemap for Metadata + JSON-LD audit
  const pagePaths = locs
    .filter((l) => !l.endsWith(".txt"))
    .map((l) => l.replace(SITE_ORIGIN, ""));

  let pagesWithKeywordsMeta = 0;
  let totalKeywordsStuffed = 0;
  let validJsonLdPages = 0;
  let nonWwwLeaks = 0;
  let blogPostsWithCompleteSchema = 0;
  let arTrLocalizedBreadcrumbs = 0;
  let arTrBreadcrumbTotal = 0;
  let arTrLocalizedServiceUrl = 0;

  await Promise.all(
    pagePaths.map(async (p) => {
      const r = await fetch(`${baseUrl}${p}`, { redirect: "manual", headers: UA });
      const html = await r.text();

      const metaTags = html.match(/<meta [^>]*>/gi) || [];
      for (const tag of metaTags) {
        if (getAttr(tag, "name")?.toLowerCase() === "keywords") {
          const content = getAttr(tag, "content") || "";
          if (content.trim()) {
            pagesWithKeywordsMeta++;
            totalKeywordsStuffed += content.split(",").filter((x) => x.trim()).length;
          }
        }
      }

      const rawJsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
        (m) => m[1]
      );
      const parsed = [];
      let allParsedOk = rawJsonLd.length > 0;
      for (const raw of rawJsonLd) {
        if (/https?:\/\/hamedmohamed\.dev/i.test(raw)) nonWwwLeaks++;
        try {
          parsed.push(JSON.parse(raw));
        } catch {
          allParsedOk = false;
        }
      }
      if (allParsedOk) validJsonLdPages++;

      const nodes = flattenJsonLd(parsed);
      const langMatch = p.match(/^\/(en|ar|tr)(?:\/|$)/);
      const lang = langMatch ? langMatch[1] : null;

      // Blog post complete schema check (9 pages)
      if (/^\/(en|ar|tr)\/blog\/[^/]+$/.test(p)) {
        const bp = nodes.find((n) => n["@type"] === "BlogPosting");
        const bc = nodes.find((n) => n["@type"] === "BreadcrumbList");
        const hasCompleteBp = Boolean(
          bp &&
            bp.mainEntityOfPage &&
            bp.inLanguage === lang &&
            bp.keywords &&
            bp.publisher
        );
        const hasValidBc = Boolean(bc && Array.isArray(bc.itemListElement) && bc.itemListElement.length === 3);
        if (hasCompleteBp && hasValidBc) blogPostsWithCompleteSchema++;
      }

      // AR/TR service & case-study localized BreadcrumbList check
      if (/^\/(ar|tr)\/(services|case-studies)\/[^/]+$/.test(p)) {
        arTrBreadcrumbTotal++;
        const bc = nodes.find((n) => n["@type"] === "BreadcrumbList");
        const firstName = bc?.itemListElement?.[0]?.name;
        if (firstName && firstName !== "Home") arTrLocalizedBreadcrumbs++;
      }

      // AR/TR serviceUrl localization in layout JSON-LD (44 pages)
      if (lang === "ar" || lang === "tr") {
        const svc = nodes.find((n) => n["@id"] === `${SITE_ORIGIN}/#service-fullstack`);
        const svcUrl = svc?.availableChannel?.serviceUrl;
        if (svcUrl === `${SITE_ORIGIN}/${lang}#contact`) arTrLocalizedServiceUrl++;
      }
    })
  );

  // 6. IndexNow & /apps redirects
  const idxRes = await fetch(`${baseUrl}/${INDEXNOW_KEY}.txt`, { redirect: "manual", headers: UA });
  const idxBody = (await idxRes.text()).trim();
  const indexNowReady = idxRes.status === 200 && idxBody === INDEXNOW_KEY;

  let appsRedirectsOk = 0;
  for (const p of ["/apps", "/en/apps", "/ar/apps", "/tr/apps"]) {
    const r = await fetch(`${baseUrl}${p}`, { redirect: "manual", headers: UA });
    if (r.status === 308) appsRedirectsOk++;
  }

  const report = {
    target: baseUrl,
    measuredAtUtc: new Date().toISOString(),
    sitemap: {
      status: smRes.status,
      urlCount: locs.length,
      txtEntriesCount,
      ignoredTagsCount: changefreqCount + priorityCount,
      imageEntriesCount,
      staticLastmodMatchingTodayCount,
      xmlBytes: Buffer.byteLength(smText, "utf8"),
    },
    robots: {
      status: robRes.status,
      specificBeforeWildcard,
      userAgentBlockCount: uaMatches.length,
      apiDisallowed,
      deprecatedHostDirective,
      aiSearchBotsListed: `${aiSearchBotsListed}/${targetAiSearchBots.length}`,
    },
    llms: {
      llmsStatus: llmsRes.status,
      llmsFullStatus: llmsFullRes.status,
      llmsXRobotsNoindex: /noindex/i.test(llmsXRobots),
      llmsFullXRobotsNoindex: /noindex/i.test(llmsFullXRobots),
      llmsRelativePathLines,
      llmsBlogUrlsCovered: `${llmsBlogUrlsCovered}/${totalBlogVariants}`,
      llmsLocalizedCoreLangs: `${llmsLocalizedCoreLangs}/3`,
      llmsFullHypePhrases,
      llmsFullInaccurateApiClaim,
      llmsApproxTokens,
      llmsFullApproxTokens,
    },
    metadata: {
      totalHtmlPages: pagePaths.length,
      pagesWithKeywordsMeta,
      totalKeywordsStuffed,
    },
    structuredData: {
      validJsonLdPages: `${validJsonLdPages}/${pagePaths.length}`,
      nonWwwLeaks,
      blogPostsWithCompleteSchema: `${blogPostsWithCompleteSchema}/${totalBlogVariants}`,
      arTrLocalizedBreadcrumbs: `${arTrLocalizedBreadcrumbs}/${arTrBreadcrumbTotal}`,
      arTrLocalizedServiceUrl: `${arTrLocalizedServiceUrl}/${(pagePaths.length * 2) / 3}`,
    },
    instantIndexingAndRedirects: {
      indexNowKeyStatus: idxRes.status,
      indexNowReady,
      appsRedirectsOk: `${appsRedirectsOk}/4`,
    },
  };

  console.log(JSON.stringify(report, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
