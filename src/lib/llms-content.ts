import { posts } from "#site/content";
import { sortPosts } from "@/lib/blog";
import { caseStudiesData } from "@/lib/case-studies-data";
import { CONTENT_LAST_MODIFIED, SITE_URL } from "@/lib/seo-config";
import { servicesData } from "@/lib/services-data";
import {
  SILA_DOWNLOAD_URL,
  SILA_SIZE,
  SILA_VERSION,
  silaAppData,
} from "@/lib/sila-app-data";

const EMAIL = "hamed.m.abdelalim@gmail.com";
const PHONE = "+905060453906";
const WHATSAPP_URL = "https://wa.me/905060453906";
const GITHUB_URL = "https://github.com/7amed3li";
const LINKEDIN_URL = "https://www.linkedin.com/in/h-amedmohamed/";

function getPublishedPosts() {
  return sortPosts(posts.filter((p) => p.published));
}

/**
 * Generates concise, spec-compliant Markdown for /llms.txt (llmstxt.org).
 * Dynamically reads services, case studies, blog posts, and Sila app data so it never drifts.
 */
export function generateLlmsTxt(): string {
  const allPosts = getPublishedPosts();
  const enServices = servicesData.en;
  const enCaseStudies = caseStudiesData.en;

  const serviceLines = enServices.map(
    (s) =>
      `- [${s.title}](${SITE_URL}/en/services/${s.slug}): ${s.metaDescription} (Also in [AR](${SITE_URL}/ar/services/${s.slug}) / [TR](${SITE_URL}/tr/services/${s.slug}))`
  );

  const caseStudyLines = enCaseStudies.map(
    (cs) =>
      `- [${cs.title}](${SITE_URL}/en/case-studies/${cs.slug}): ${cs.heroStat.value} ${cs.heroStat.label}. ${cs.metaDescription} ([AR](${SITE_URL}/ar/case-studies/${cs.slug}) / [TR](${SITE_URL}/tr/case-studies/${cs.slug}))`
  );

  const postLines = allPosts.map((p) => {
    const slug = p.slug.split("/").pop() || p.slug;
    return `- [${p.title} (${p.lang.toUpperCase()})](${SITE_URL}/${p.lang}/blog/${slug}): ${p.description}`;
  });

  return [
    "# Hamed Mohamed",
    "",
    `> Egyptian Full-Stack Engineer (Node.js, Next.js, TypeScript, PostgreSQL, Redis) and Application Security Researcher based in Turkey, available for freelance projects and full-time roles in English, Arabic, and Turkish (Contact: ${EMAIL} | WhatsApp: ${WHATSAPP_URL}).`,
    "",
    "## Core Pages (EN / AR / TR)",
    "",
    `- [Hire Hamed Mohamed (English)](${SITE_URL}/en/hire): Full-stack engineering services, production metrics, and project inquiry details`,
    `- [وظّف حامد محمد (العربية)](${SITE_URL}/ar/hire): خدمات تطوير الويب والأنظمة الخلفية والأمن السيبراني باللغة العربية`,
    `- [Hamed Mohamed ile Çalışın (Türkçe)](${SITE_URL}/tr/hire): Full-Stack yazılım geliştirme, performans ve güvenlik hizmetleri`,
    `- [Portfolio Home (EN)](${SITE_URL}/en) / [(AR)](${SITE_URL}/ar) / [(TR)](${SITE_URL}/tr): Engineering background, principles, and live systems`,
    `- [FAQ (EN)](${SITE_URL}/en/faq) / [(AR)](${SITE_URL}/ar/faq) / [(TR)](${SITE_URL}/tr/faq): 30+ answers on timelines, architecture, multilingual builds, and pricing scope`,
    `- [Resume / CV (PDF)](${SITE_URL}/Hamed_Mohamed_CV.pdf): Downloadable engineering CV`,
    `- [GitHub (@7amed3li)](${GITHUB_URL}): Open-source security PRs and production repositories`,
    `- [LinkedIn](${LINKEDIN_URL}): Professional profile and work history`,
    "",
    "## Services",
    "",
    ...serviceLines,
    "",
    "## Production Case Studies",
    "",
    ...caseStudyLines,
    "",
    "## Engineering Articles",
    "",
    ...postLines,
    "",
    "## Mobile Applications",
    "",
    `- [Sila Islamic App (EN)](${SITE_URL}/en/apps/sila): ${silaAppData.en.metaDescription} ([AR](${SITE_URL}/ar/apps/sila) / [TR](${SITE_URL}/tr/apps/sila))`,
    "",
    "## Optional",
    "",
    `- [Complete Engineering Profile (llms-full.txt)](${SITE_URL}/llms-full.txt): Extended technical dossier, architecture metrics, and verification links`,
    `- [RSS Feed](${SITE_URL}/rss.xml): All published engineering articles in EN, AR, and TR`,
    "",
  ].join("\n");
}

/**
 * Generates an objective, fact-dense technical dossier for /llms-full.txt.
 * Follows GEO best practices: verifiable metrics, zero promotional superlatives, dynamically synced.
 */
export function generateLlmsFullTxt(): string {
  const allPosts = getPublishedPosts();
  const enServices = servicesData.en;
  const enCaseStudies = caseStudiesData.en;

  // Group posts by slug across languages
  const postsBySlug = new Map<string, typeof allPosts>();
  for (const post of allPosts) {
    const slug = post.slug.split("/").pop() || post.slug;
    const list = postsBySlug.get(slug) || [];
    list.push(post);
    postsBySlug.set(slug, list);
  }

  const serviceSections = enServices.map((s) =>
    [
      `### ${s.title}`,
      `- **URLs**: ${SITE_URL}/en/services/${s.slug} | ${SITE_URL}/ar/services/${s.slug} | ${SITE_URL}/tr/services/${s.slug}`,
      `- **Target Clients**: ${s.forWho}`,
      `- **Deliverables**: ${s.whatIBuild.join("; ")}`,
      `- **Stack**: ${s.technologies.join(", ")}`,
      `- **Verified Proof**: ${s.proof}`,
    ].join("\n")
  );

  const caseStudySections = enCaseStudies.map((cs) =>
    [
      `### ${cs.title} (${cs.year})`,
      `- **URLs**: ${SITE_URL}/en/case-studies/${cs.slug} | ${SITE_URL}/ar/case-studies/${cs.slug} | ${SITE_URL}/tr/case-studies/${cs.slug}`,
      cs.liveUrl ? `- **Live Production URL**: ${cs.liveUrl}` : null,
      `- **Key Metric**: ${cs.heroStat.value}, ${cs.heroStat.label}`,
      `- **Problem**: ${cs.problem}`,
      `- **Solution**: ${cs.solution}`,
      `- **Measured Results**: ${cs.results.map((r) => `${r.metric}: ${r.description}`).join(" | ")}`,
      `- **Stack**: ${cs.technologies.join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  const articleSections = [...postsBySlug.entries()].map(([slug, variants]) => {
    const enPost = variants.find((v) => v.lang === "en") || variants[0];
    const langLinks = variants
      .map((v) => `- ${v.lang.toUpperCase()}: ${SITE_URL}/${v.lang}/blog/${slug}`)
      .join("\n");
    return [
      `### ${enPost.title}`,
      `- **Published**: ${enPost.date}${enPost.updated ? ` (Updated: ${enPost.updated})` : ""}`,
      `- **Tags**: ${enPost.tags.join(", ")}`,
      `- **Summary**: ${enPost.summary || enPost.description}`,
      langLinks,
    ].join("\n");
  });

  return [
    "# Hamed Mohamed Abdelalim. Technical Dossier",
    "",
    "> Structured factual profile of Hamed Mohamed Abdelalim Kamel (حامد محمد عبدالعليم كامل), Full-Stack Software Engineer and Application Security Researcher, generated dynamically from portfolio source data.",
    "",
    "---",
    "",
    "## Identity & Availability",
    "",
    "- **Full Name**: Hamed Mohamed Abdelalim Kamel (حامد محمد عبدالعليم كامل)",
    "- **Nationality**: Egyptian",
    "- **Base Location**: Istanbul, Turkey (UTC+3)",
    "- **Relocation**: Open to relocation (Saudi Arabia / GCC preferred, open globally and remote)",
    "- **Languages**: Arabic (Native), English (Professional Working Proficiency), Turkish (Professional Proficiency)",
    "- **Education**: B.Sc. Computer Engineering, Tokat Gaziosmanpaşa University (GPA 3.5 / 4.0, High Honor Student / Onur Öğrencisi)",
    "- **Availability**: Available immediately for full-time engineering roles and freelance client engagements",
    `- **Direct Contact**: Email ${EMAIL} | Phone / WhatsApp ${PHONE} (${WHATSAPP_URL})`,
    `- **Canonical Website**: ${SITE_URL}`,
    `- **GitHub**: ${GITHUB_URL}`,
    `- **LinkedIn**: ${LINKEDIN_URL}`,
    `- **CV (PDF)**: ${SITE_URL}/Hamed_Mohamed_CV.pdf`,
    "",
    "---",
    "",
    "## Verified Production Metrics & Experience",
    "",
    "### Full-Stack Engineer & Security Researcher, AI & Digital Transformation Unit, Tokat Gaziosmanpaşa University (April 2025 – Present)",
    "- Led a 3-engineer team delivering a university QR attendance platform serving 2,000+ users across 6 faculties (~300 daily check-ins).",
    "- Engineered a hybrid verification pipeline (JWT / Remote / Temporary fallback) reducing API latency by 98% (from 94.91ms to 1.53ms) and increasing throughput by +6,100% (up to 653 req/s).",
    "- Implemented Circuit Breaker resilience (Opossum) maintaining 99.9% uptime during peak lecture check-in spikes.",
    "- Built bulk academic data ingestion pipelines importing 25,019 records (14,100 courses, 50 faculties, 259 programs) in under 1.5 seconds.",
    "- Wrote unit and integration tests reaching ~85% backend coverage and integrated SAST/DAST checks into CI/CD, resolving 15+ security issues prior to production.",
    "",
    "### Corporate & Healthcare Web Platforms. Genç Group & Healix Medical (Istanbul, 2026)",
    "- **Genç Group** (https://www.gencgroupinsaat.com.tr): Engineered the trilingual corporate holding platform (TR/EN/AR RTL) uniting Genç Group İnşaat and AutoClub Merter, featuring an interactive Three.js & Draco 3D architectural spatial workbench (/case-study) and 4-stage automotive assembly showcase.",
    "- **Healix Medical** (https://www.healixistanbul.com.tr): Designed and built a 5-language international patient coordination platform (AR native RTL, EN, FR, RU, TR) generating 142 static pages across 12 medical specialties, 3 Turkish transplant law guides, and an interactive directory of 33 contracted hospitals across 13 cities, achieving #1 Google brand ranking (case study: https://www.healixistanbul.com.tr/en/tasarim-gelistirme).",
    "",
    "### Restaurant & Multi-Branch Hospitality Platforms, Istanbul (2026)",
    "- **Cihangir Ev Yemekleri & Pide** (https://www.cihangirevyemekler.com.tr): Next.js 16 + PostgreSQL + Prisma 7 generating 970+ static pages across 10 languages (RTL), 85+ catalog dishes, 6 live currencies, and an Argon2-secured admin portal (case study: https://www.cihangirevyemekler.com.tr/tr/tasarim-gelistirme).",
    "- **Lucky Sushi & Chinese** (https://www.luckysushichinese.com.tr): 3-branch Istanbul late-night ordering platform (Alibeyköy, Zeytinburnu, Reşitpaşa/Sarıyer) in 5 languages (TR/EN/AR RTL/RU/ZH) with branch-aware WhatsApp dispatch (case study: https://www.luckysushichinese.com.tr/en/tasarim-gelistirme).",
    "- **Kardeşler Kebap & Cafe Cihangir** (https://www.kardeslercihangir.com): Migrated a 28-year-old Istanbul restaurant from legacy WordPress to Next.js 16 + Supabase with 10 languages, 6 live currencies, 25+ 301 redirects, and Schema.org Local SEO (~100 daily organic visitors).",
    "",
    "### Open Source Security Contributions, NodeSecure (`js-x-ray` & `scanner`, Q1 2026)",
    "- 7 merged pull requests including: PR #452 (`insecure-random` probe), PR #456 (`sensitivity` conservative/aggressive analysis mode), PR #462 (`shady-url` SSRF/localhost detection), PR #467 (`isSerializeEnv` Named Main Handlers + direct `process.env` detection), PR #468 (`isLiteral` email collection via `CollectableSet` + tests), and PR #496 (`mitata` AST analysis benchmarks).",
    "",
    "---",
    "",
    "## Technical Stack",
    "",
    "- **Languages**: TypeScript, JavaScript (ES2022+), SQL, Python, Java, C#, Dart",
    "- **Frontend**: React 19, Next.js 16 (App Router, SSR/SSG/ISR, Metadata API), Tailwind CSS v4, Redux, Framer Motion",
    "- **Backend & Data**: Node.js, Express.js, PostgreSQL (Prisma ORM), Redis, Supabase, MongoDB, MySQL, REST APIs, WebSockets",
    "- **Security & Reliability**: SAST/DAST, AST Static Analysis, SSRF Prevention, STRIDE Threat Modeling, Circuit Breaker (Opossum), Docker, CI/CD",
    "- **Portfolio Architecture**: Next.js 16, TypeScript, Velite MDX, Tailwind CSS v4, RTL Arabic support, Web3Forms contact submission",
    "",
    "---",
    "",
    "## Services Offered",
    "",
    ...serviceSections,
    "",
    "---",
    "",
    "## Case Studies",
    "",
    ...caseStudySections,
    "",
    "---",
    "",
    "## Engineering Articles",
    "",
    ...articleSections,
    "",
    "---",
    "",
    "## Mobile Application, Sila Islamic App",
    "",
    `- **URLs**: ${SITE_URL}/en/apps/sila | ${SITE_URL}/ar/apps/sila | ${SITE_URL}/tr/apps/sila`,
    `- **Version & Size**: v${SILA_VERSION} (${SILA_SIZE}, Android APK: ${SILA_DOWNLOAD_URL})`,
    `- **Stack**: ${silaAppData.en.techStack.join(", ")}`,
    `- **Summary**: ${silaAppData.en.heroDescription}`,
    "",
    "---",
    "",
    "## Client Engagement & Hiring Reference",
    "",
    "- **Typical Engagement Models**: Fixed-scope project delivery (landing pages, restaurant QR platforms, custom dashboards), backend refactoring & performance audits, or full-time engineering roles.",
    "- **Typical Delivery Timelines**: Simple landing pages in a few days; full business websites and custom restaurant platforms typically 1–3 weeks; multi-module backends and dashboards scoped by milestone.",
    "- **Communication & Process**: Direct technical discovery via email/WhatsApp, milestone-based builds with live staging previews, and clean code/documentation handover.",
    `- **Verification Sources**: GitHub (${GITHUB_URL}), NodeSecure OSS repositories (\`NodeSecure/js-x-ray\`, \`NodeSecure/scanner\`), live corporate deployment (https://www.gencgroupinsaat.com.tr/case-study), live restaurant deployments (https://www.cihangirevyemekler.com.tr/tr/tasarim-gelistirme, https://www.luckysushichinese.com.tr/en/tasarim-gelistirme, https://www.kardeslercihangir.com/tasarim-gelistirme), and LinkedIn (${LINKEDIN_URL}).`,
    "",
    `*Content baseline last updated: ${CONTENT_LAST_MODIFIED.home}*`,
    "",
  ].join("\n");
}
