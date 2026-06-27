import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getSilaAppData,
  SILA_VERSION,
  SILA_SIZE,
  SILA_LANGUAGES,
  SILA_DOWNLOAD_URL,
  SILA_DEMO_VIDEO_URL,
  SILA_PROMO_VIDEO_URL,
} from "@/lib/sila-app-data";

const siteUrl = "https://www.hamedmohamed.dev";

// ────────────────────────────────────────
// Static Params — generate for all 3 langs
// ────────────────────────────────────────
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "tr" }];
}

// ────────────────────────────────────────
// Metadata — SEO title, description, OG, etc.
// ────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = getSilaAppData(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: [
      // Arabic keywords
      "تطبيق صلة",
      "صلة",
      "تطبيق اسلامي",
      "مواقيت الصلاة",
      "تطبيق قرآن",
      "تسميع القرآن",
      "حفظ القرآن",
      "أذكار",
      "تطبيق اذكار",
      "ورد يومي",
      "تتبع العبادات",
      "أذان تلقائي",
      "تطبيق صلاة",
      // English keywords
      "Sila app",
      "Sila Islamic app",
      "prayer times app",
      "Quran app",
      "Quran memorization app",
      "Islamic app",
      "Azkar app",
      "Hifz app",
      "AI Quran recitation",
      "Muslim app",
      "free Islamic app",
      // Turkish keywords
      "Sıla uygulaması",
      "namaz vakitleri",
      "Kuran uygulaması",
      "İslami uygulama",
      "ezan uygulaması",
      "hıfz uygulaması",
      // Developer
      "Hamed Mohamed",
      "حامد محمد",
    ],
    alternates: {
      canonical: `${siteUrl}/${lang}/apps/sila`,
      languages: {
        en: `${siteUrl}/en/apps/sila`,
        ar: `${siteUrl}/ar/apps/sila`,
        tr: `${siteUrl}/tr/apps/sila`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_EG" : lang === "tr" ? "tr_TR" : "en_US",
      url: `${siteUrl}/${lang}/apps/sila`,
      title: data.metaTitle,
      description: data.metaDescription,
      siteName: "Hamed Mohamed | حامد محمد",
      images: [
        {
          url: "/apps/sila/icon.png",
          width: 512,
          height: 512,
          alt: data.heroTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: ["/apps/sila/icon.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ────────────────────────────────────────
// Page Component
// ────────────────────────────────────────
export default async function SilaAppPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = getSilaAppData(lang);
  const isRTL = lang === "ar";

  // ── JSON-LD Structured Data ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. SoftwareApplication — THE key schema for app visibility in Google
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/${lang}/apps/sila/#app`,
        name: data.heroTitle,
        alternateName: ["Sila", "Sıla", "صلة", "تطبيق صلة", "Sila App"],
        description: data.metaDescription,
        applicationCategory: "LifestyleApplication",
        applicationSubCategory: "ReligiousApplication",
        operatingSystem: "Android",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        softwareVersion: SILA_VERSION,
        fileSize: SILA_SIZE,
        inLanguage: ["ar", "tr", "en", "fr"],
        author: { "@id": `${siteUrl}/#person` },
        creator: { "@id": `${siteUrl}/#person` },
        downloadUrl: SILA_DOWNLOAD_URL,
        installUrl: SILA_DOWNLOAD_URL,
        screenshot: `/apps/sila/icon.png`,
        image: `${siteUrl}/apps/sila/icon.png`,
        featureList: data.features.map((f) => f.title),
        releaseNotes: `Version ${SILA_VERSION}`,
        permissions: "android.permission.INTERNET, android.permission.ACCESS_FINE_LOCATION, android.permission.RECORD_AUDIO",
      },
      // 2. BreadcrumbList — helps Google understand site hierarchy
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/${lang}/apps/sila/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: data.breadcrumbHome,
            item: `${siteUrl}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data.breadcrumbApps,
            item: `${siteUrl}/${lang}/apps`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.heroTitle,
            item: `${siteUrl}/${lang}/apps/sila`,
          },
        ],
      },
      // 3. VideoObject — for demo video (helps appear in Google Video results)
      {
        "@type": "VideoObject",
        "@id": `${siteUrl}/${lang}/apps/sila/#demo-video`,
        name: data.demoVideoTitle,
        description: data.metaDescription,
        thumbnailUrl: `${siteUrl}/apps/sila/icon.png`,
        uploadDate: "2025-06-01T00:00:00Z",
        contentUrl: SILA_DEMO_VIDEO_URL,
        embedUrl: SILA_DEMO_VIDEO_URL,
        inLanguage: lang,
      },
      // 4. VideoObject — for promo video
      {
        "@type": "VideoObject",
        "@id": `${siteUrl}/${lang}/apps/sila/#promo-video`,
        name: data.promoVideoTitle,
        description: data.metaDescription,
        thumbnailUrl: `${siteUrl}/apps/sila/icon.png`,
        uploadDate: "2025-06-01T00:00:00Z",
        contentUrl: SILA_PROMO_VIDEO_URL,
        embedUrl: SILA_PROMO_VIDEO_URL,
        inLanguage: lang,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background text-foreground">
        {/* ───── Breadcrumb ───── */}
        <div className="px-6 md:px-20 lg:px-28 pt-8 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link
            href={`/${lang}`}
            className="hover:text-accent transition-colors"
          >
            {data.breadcrumbHome}
          </Link>
          <span>/</span>
          <span>{data.breadcrumbApps}</span>
          <span>/</span>
          <span className="text-foreground">{data.heroTitle}</span>
        </div>

        {/* ───── HERO SECTION ───── */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-5xl flex flex-col md:flex-row items-start gap-10 md:gap-16">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] overflow-hidden border border-border/50 bg-white flex items-center justify-center p-3 shadow-2xl shadow-accent/10">
                <Image
                  src="/apps/sila/icon.png"
                  alt={`${data.heroTitle} App Icon`}
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex-1">
              <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
                {data.freeLabel} · Android
              </p>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 text-foreground"
                style={
                  isRTL
                    ? { fontFamily: "var(--font-cairo), sans-serif" }
                    : undefined
                }
              >
                {data.heroTitle}
              </h1>

              <p
                className="text-xl md:text-2xl font-light text-muted-foreground mb-4"
                style={
                  isRTL
                    ? { fontFamily: "var(--font-cairo), sans-serif" }
                    : undefined
                }
              >
                {data.heroSubtitle}
              </p>

              <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-2xl mb-8">
                {data.heroDescription}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  id="sila-download-hero"
                  href={SILA_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {data.downloadLabel}
                </a>
                <a
                  id="sila-watch-demo-hero"
                  href="#videos"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-border text-muted-foreground font-mono uppercase tracking-widest text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  {data.watchDemoLabel}
                </a>
              </div>

              {/* App Info Pills */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 text-xs font-mono border border-border text-muted-foreground">
                  {data.versionLabel}: {SILA_VERSION}
                </span>
                <span className="px-4 py-2 text-xs font-mono border border-border text-muted-foreground">
                  {data.sizeLabel}: {SILA_SIZE}
                </span>
                <span className="px-4 py-2 text-xs font-mono border border-accent/30 text-accent bg-accent/5">
                  {data.freeLabel}
                </span>
                {SILA_LANGUAGES.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-2 text-xs font-mono border border-border text-muted-foreground"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── FEATURES GRID ───── */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-5xl">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-accent" />
              {data.featuresLabel}
            </h2>
            <p
              className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12"
              style={
                isRTL
                  ? { fontFamily: "var(--font-cairo), sans-serif" }
                  : undefined
              }
            >
              {data.featuresHeading}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.features.map((feature, i) => (
                <div
                  key={i}
                  className="group p-6 border border-border bg-surface hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_rgba(201,253,116,0.15)]"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── VIDEOS SECTION ───── */}
        <section
          id="videos"
          className="px-6 md:px-20 lg:px-28 py-20 border-b border-border"
        >
          <div className="max-w-5xl">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-accent" />
              {data.videosLabel}
            </h2>
            <p
              className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12"
              style={
                isRTL
                  ? { fontFamily: "var(--font-cairo), sans-serif" }
                  : undefined
              }
            >
              {data.videosHeading}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
              {/* Promo Video — 16:9 horizontal */}
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  {data.promoVideoTitle}
                </p>
                <div className="relative w-full aspect-video border border-border bg-surface overflow-hidden hover:border-accent/50 transition-colors">
                  <iframe
                    src={SILA_PROMO_VIDEO_URL}
                    title={data.promoVideoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Demo Video — 9:16 vertical (YouTube Short) */}
              <div className="flex flex-col items-center lg:items-start">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  {data.demoVideoTitle}
                </p>
                <div className="relative w-[280px] md:w-[300px] aspect-[9/16] border border-border bg-surface overflow-hidden rounded-2xl hover:border-accent/50 transition-colors shadow-lg shadow-black/20">
                  <iframe
                    src={SILA_DEMO_VIDEO_URL}
                    title={data.demoVideoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── TECH STACK ───── */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-5xl">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-accent" />
              {data.techLabel}
            </h2>
            <p
              className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-10"
              style={
                isRTL
                  ? { fontFamily: "var(--font-cairo), sans-serif" }
                  : undefined
              }
            >
              {data.techHeading}
            </p>

            <div className="flex flex-wrap gap-3">
              {data.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-xs font-mono border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ───── BOTTOM CTA ───── */}
        <section className="px-6 md:px-20 lg:px-28 py-24">
          <div className="max-w-3xl">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground"
              style={
                isRTL
                  ? { fontFamily: "var(--font-cairo), sans-serif" }
                  : undefined
              }
            >
              {data.ctaTitle}
            </h2>
            <p className="text-base text-muted-foreground mb-10 leading-relaxed max-w-xl">
              {data.ctaDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                id="sila-download-cta"
                href={SILA_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {data.ctaButton}
              </a>
              <span className="text-xs font-mono text-muted-foreground/50 self-center">
                {data.androidOnly}
              </span>
            </div>

            {/* Back to portfolio link */}
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                href={`/${lang}`}
                className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-accent transition-colors uppercase tracking-widest"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isRTL ? "rotate-180" : ""}
                >
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                </svg>
                {lang === "ar"
                  ? "العودة إلى الموقع الشخصي"
                  : lang === "tr"
                    ? "Portföye Dön"
                    : "Back to Portfolio"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
