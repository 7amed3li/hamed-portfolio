import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Clock,
  Download,
  Mic,
  Play,
  Sparkles,
} from "lucide-react";
import {
  getSilaAppData,
  SILA_VERSION,
  SILA_SIZE,
  SILA_LANGUAGES,
  SILA_DOWNLOAD_URL,
  SILA_DEMO_VIDEO_URL,
  SILA_PROMO_VIDEO_URL,
} from "@/lib/sila-app-data";
import {
  tactileButtonClasses,
  TactileIconBadge,
} from "@/components/ui/TactilePrimitives";

const SILA_FEATURE_ICONS = {
  prayer: Clock,
  quran: BookOpen,
  hifz: BrainCircuit,
  tasmi: Mic,
  azkar: Sparkles,
  tracker: BarChart3,
} as const;

const siteUrl = "https://www.hamedmohamed.dev";

// ────────────────────────────────────────
// Static Params: generate for all 3 langs
// ────────────────────────────────────────
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "tr" }];
}

// ────────────────────────────────────────
// Metadata: SEO title, description, OG, etc.
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
    alternates: {
      canonical: `${siteUrl}/${lang}/apps/sila`,
      languages: {
        "x-default": `${siteUrl}/en/apps/sila`,
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
      // 1. SoftwareApplication: THE key schema for app visibility in Google
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
      // 2. BreadcrumbList: helps Google understand site hierarchy
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
            name: data.heroTitle,
            item: `${siteUrl}/${lang}/apps/sila`,
          },
        ],
      },
      // 3. VideoObject: for demo video (helps appear in Google Video results)
      {
        "@type": "VideoObject",
        "@id": `${siteUrl}/${lang}/apps/sila/#demo-video`,
        name: data.demoVideoTitle,
        description: data.metaDescription,
        thumbnailUrl: `${siteUrl}/apps/sila/icon.png`,
        uploadDate: "2026-06-27T00:00:00Z",
        contentUrl: SILA_DEMO_VIDEO_URL,
        embedUrl: SILA_DEMO_VIDEO_URL,
        inLanguage: lang,
      },
      // 4. VideoObject: for promo video
      {
        "@type": "VideoObject",
        "@id": `${siteUrl}/${lang}/apps/sila/#promo-video`,
        name: data.promoVideoTitle,
        description: data.metaDescription,
        thumbnailUrl: `${siteUrl}/apps/sila/icon.png`,
        uploadDate: "2026-06-27T00:00:00Z",
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

      <main className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
        {/* ───── Breadcrumb ───── */}
        <div className="px-5 sm:px-6 md:px-20 lg:px-28 pt-24 sm:pt-28 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-muted-foreground">
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
        <section className="px-5 sm:px-6 md:px-20 lg:px-28 py-12 sm:py-16 md:py-20 border-b border-border">
          <div className="max-w-5xl flex flex-col md:flex-row items-start gap-8 md:gap-16">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-border/50 bg-white flex items-center justify-center p-2.5 sm:p-3 shadow-2xl shadow-accent/10">
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
            <div className="flex-1 w-full">
              <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
                {data.freeLabel} · Android
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 text-foreground">
                {data.heroTitle}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground mb-4">
                {data.heroSubtitle}
              </p>

              <p className="text-sm text-[#a8a8a2] leading-relaxed max-w-2xl mb-8">
                {data.heroDescription}
              </p>

              {/* CTA Buttons */}
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-4 mb-8 sm:mb-10">
                <a
                  id="sila-download-hero"
                  href={SILA_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={tactileButtonClasses(
                    "primary",
                    "flex sm:inline-flex items-center justify-center text-center gap-2 sm:gap-3 px-3 py-3.5 sm:px-8 sm:py-4 tracking-wide sm:tracking-widest text-[11px] sm:text-sm leading-tight min-h-[46px]"
                  )}
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>{data.downloadLabel}</span>
                </a>
                <a
                  id="sila-watch-demo-hero"
                  href="#videos"
                  className={tactileButtonClasses(
                    "outline",
                    "flex sm:inline-flex items-center justify-center text-center gap-2 sm:gap-3 px-3 py-3.5 sm:px-8 sm:py-4 tracking-wide sm:tracking-widest text-[11px] sm:text-sm leading-tight min-h-[46px]"
                  )}
                >
                  <Play className="w-4 h-4 shrink-0" />
                  <span>{data.watchDemoLabel}</span>
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
        <section className="px-5 sm:px-6 md:px-20 lg:px-28 py-12 sm:py-16 md:py-20 border-b border-border">
          <div className="max-w-5xl">
            <h2 className="section-label mb-4">
              {data.featuresLabel}
            </h2>
            <p className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
              {data.featuresHeading}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.features.map((feature, i) => {
                const Icon =
                  SILA_FEATURE_ICONS[
                    feature.icon as keyof typeof SILA_FEATURE_ICONS
                  ] || Sparkles;
                return (
                  <div
                    key={i}
                    className="group p-6 border border-border bg-surface hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_rgba(201,253,116,0.15)] rounded-[6px]"
                  >
                    <div className="mb-4">
                      <TactileIconBadge>
                        <Icon className="w-5 h-5" />
                      </TactileIconBadge>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── VIDEOS SECTION ───── */}
        <section
          id="videos"
          className="px-5 sm:px-6 md:px-20 lg:px-28 py-12 sm:py-16 md:py-20 border-b border-border"
        >
          <div className="max-w-5xl">
            <h2 className="section-label mb-4">
              {data.videosLabel}
            </h2>
            <p className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
              {data.videosHeading}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
              {/* Promo Video: 16:9 horizontal */}
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

              {/* Demo Video: 9:16 vertical (YouTube Short) */}
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
        <section className="px-5 sm:px-6 md:px-20 lg:px-28 py-12 sm:py-16 md:py-20 border-b border-border">
          <div className="max-w-5xl">
            <h2 className="section-label mb-4">
              {data.techLabel}
            </h2>
            <p className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-10">
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
        <section className="px-5 sm:px-6 md:px-20 lg:px-28 py-14 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 sm:mb-6 text-foreground">
              {data.ctaTitle}
            </h2>
            <p className="text-base text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-xl">
              {data.ctaDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                id="sila-download-cta"
                href={SILA_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={tactileButtonClasses(
                  "primary",
                  "w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 tracking-widest text-xs sm:text-sm"
                )}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>{data.ctaButton}</span>
              </a>
              <span className="text-xs font-mono text-[#a8a8a2] self-start sm:self-center">
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
