import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, caseStudies, caseStudiesData } from "@/lib/case-studies-data";

const siteUrl = "https://www.hamedmohamed.dev";

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const cs = getCaseStudyBySlug(slug, lang);
  if (!cs) return {};
  return {
    metadataBase: new URL(siteUrl),
    title: cs.metaTitle,
    description: cs.metaDescription,
    alternates: { 
      canonical: `${siteUrl}/${lang}/case-studies/${slug}`,
      languages: {
        "en": `${siteUrl}/en/case-studies/${slug}`,
        "ar": `${siteUrl}/ar/case-studies/${slug}`,
        "tr": `${siteUrl}/tr/case-studies/${slug}`
      }
    },
    openGraph: {
      title: cs.metaTitle,
      description: cs.metaDescription,
      url: `${siteUrl}/${lang}/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const cs = getCaseStudyBySlug(slug, lang);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/${lang}/case-studies/${slug}/#article`,
        name: cs.title,
        description: cs.metaDescription,
        author: { "@id": `${siteUrl}/#person` },
        url: `${siteUrl}/${lang}/case-studies/${slug}`,
        datePublished: cs.year,
        image: cs.images ? cs.images.map((img) => `${siteUrl}${img.src}`) : undefined,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/${lang}/case-studies/${slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/${lang}` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: `${siteUrl}/${lang}/hire`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cs.title,
            item: `${siteUrl}/${lang}/case-studies/${slug}`,
          },
        ],
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
        {/* Breadcrumb */}
        <div className="px-6 md:px-20 lg:px-28 pt-28 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href={`/${lang}`} className="hover:text-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${lang}/hire`} className="hover:text-accent transition-colors">
            Hire
          </Link>
          <span>/</span>
          <span className="text-foreground">{cs.title}</span>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <p className="text-xs font-mono uppercase tracking-widest text-accent">
                Case Study · {cs.year}
              </p>
              {cs.statusBadge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {cs.statusBadge}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8 text-foreground">
              {cs.title}
            </h1>
            <p className="text-sm text-muted-foreground font-mono mb-10">{cs.category}</p>

            {/* Hero stat and live site action */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="inline-flex flex-col border border-accent/30 px-8 py-5 bg-accent/5">
                <span className="text-4xl md:text-5xl font-bold accent-text tracking-tight">
                  {cs.heroStat.value}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">
                  {cs.heroStat.label}
                </span>
              </div>
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold hover:bg-emerald-500 hover:text-black transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Visit Live Website ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="px-6 md:px-20 lg:px-28 py-20">
          <div className="max-w-4xl space-y-16">
            {/* Problem */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-5 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-accent" />
                The Problem
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">{cs.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-5 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-accent" />
                The Solution
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">{cs.solution}</p>
            </div>

            {/* Technologies */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-6 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-accent" />
                Technologies Used
              </h2>
              <ul className="space-y-2">
                {cs.technologies.map((tech) => (
                  <li key={tech} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-6 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-accent" />
                Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {cs.results.map((r) => (
                  <div
                    key={r.metric}
                    className="p-5 border border-border bg-surface hover:border-accent/50 transition-colors"
                  >
                    <div className="text-base font-bold accent-text mb-2">{r.metric}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Showcase */}
            {cs.images && cs.images.length > 0 && (
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-6 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-accent" />
                  Visual Showcase
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cs.images.map((img, idx) => (
                    <div
                      key={img.src}
                      className={`border border-border bg-surface overflow-hidden group hover:border-accent/50 transition-colors ${
                        idx === 0 ? "md:col-span-2" : ""
                      }`}
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      {img.caption && (
                        <div className="p-4 border-t border-border/60 bg-background/50">
                          <p className="text-xs font-mono text-muted-foreground">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Proof */}
            <div className="p-6 border-l-2 border-accent bg-accent/5">
              <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
                What This Proves
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{cs.clientProof}</p>
            </div>

            {/* CTA */}
            <div className="border-t border-border pt-12">
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">{cs.cta}</p>
              <div className="flex flex-wrap gap-4">
                {cs.liveUrl && (
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-emerald-500/60 bg-emerald-500/10 text-emerald-400 font-mono uppercase tracking-widest text-sm font-bold hover:bg-emerald-500 hover:text-black transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Visit Live Website ↗
                  </a>
                )}
                <a
                  href="mailto:hamed.m.abdelalim@gmail.com"
                  className="px-8 py-4 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
                >
                  Hire Hamed
                </a>
                <Link
                  href={`/${lang}/hire`}
                  className="px-8 py-4 border border-border text-muted-foreground font-mono uppercase tracking-widest text-sm hover:border-foreground hover:text-foreground transition-colors"
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Other case studies */}
            <div className="border-t border-border pt-12">
              <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                Other Case Studies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(caseStudiesData[lang] || caseStudiesData.en)
                  .filter((c) => c.slug !== slug)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${lang}/case-studies/${c.slug}`}
                      className="p-5 border border-border hover:border-accent transition-colors group"
                    >
                      <p className="text-xs font-mono text-accent mb-2">{c.year}</p>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{c.category}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
