import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/lib/services-data";
import { hireData } from "@/lib/hire-data";

const siteUrl = "https://www.hamedmohamed.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = hireData[lang as keyof typeof hireData] || hireData.en;
  return {
    metadataBase: new URL(siteUrl),
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { 
      canonical: `${siteUrl}/${lang}/hire`,
      languages: {
        "en": `${siteUrl}/en/hire`,
        "ar": `${siteUrl}/ar/hire`,
        "tr": `${siteUrl}/tr/hire`
      }
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDesc,
      url: `${siteUrl}/${lang}/hire`,
      type: "profile",
    },
  };
}

const icons = ["🌐", "🍽️", "⚡", "🔧", "📊", "🐛", "🚀", "🔒", "📱", "🏢"];

export default async function HirePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = hireData[lang as keyof typeof hireData] || hireData.en;
  const langServices = servicesData[lang as keyof typeof servicesData] || servicesData.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        name: data.hireHamed,
        url: `${siteUrl}/${lang}/hire`,
        mainEntity: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: "Hire", item: `${siteUrl}/${lang}/hire` },
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

      <main className="min-h-screen bg-background text-foreground" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Nav back link */}
        <div className="px-6 md:px-20 lg:px-28 pt-8">
          <Link
            href={`/${lang}`}
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
          >
            {data.backToPortfolio}
          </Link>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-20 lg:px-28 py-20 md:py-28 border-b border-border">
          <div className="max-w-4xl">
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-6">
              {data.availableForHire}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8 text-foreground">
              {data.hireHamed}
              <span className="accent-text">.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
              {data.introText}{" "}
              <strong className="text-foreground">{data.introBold}</strong>{" "}
              {data.introEnd}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hamed.m.abdelalim@gmail.com"
                className="px-8 py-4 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
              >
                {data.startProject}
              </a>
              <a
                href="mailto:hamed.m.abdelalim@gmail.com"
                className="px-8 py-4 border border-border text-muted-foreground font-mono uppercase tracking-widest text-sm hover:border-foreground hover:text-foreground transition-colors"
              >
                {data.contactHamed}
              </a>
              <Link
                href={`/${lang}#projects`}
                className="px-8 py-4 border border-border text-muted-foreground font-mono uppercase tracking-widest text-sm hover:border-accent hover:text-accent transition-colors"
              >
                {data.viewProjects}
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-20 lg:px-28 py-16 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {data.stats.map((s: { value: string; label: string }) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold accent-text mb-2">{s.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who is Hamed */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              <span className={`inline-block w-8 h-px bg-muted-foreground ${lang === 'ar' ? 'ml-3' : 'mr-3'} align-middle`} />
              {data.whoIs}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-foreground">
              {data.whoIsH2}
            </h2>
            <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
              <p>{data.p1}</p>
              <p>
                {data.p2_1}
                <strong className="text-foreground">{data.p2_bold1}</strong>
                {data.p2_2}
                <strong className="text-foreground">{data.p2_bold2}</strong>
                {data.p2_3}
              </p>
              <p>{data.p3}</p>
              <p>{data.p4}</p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            <span className={`inline-block w-8 h-px bg-muted-foreground ${lang === 'ar' ? 'ml-3' : 'mr-3'} align-middle`} />
            {data.whatCanBuild}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14 text-foreground">
            {data.servicesH2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {langServices.map((s, index) => (
              <Link
                key={s.slug}
                href={`/${lang}/services/${s.slug}`}
                className="group p-6 border border-border hover:border-accent transition-all duration-300 bg-surface"
              >
                <div className="text-3xl mb-4">{icons[index % icons.length]}</div>
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.intro.substring(0, 80)}...</p>
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.learnMore}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Hire Hamed */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              <span className={`inline-block w-8 h-px bg-muted-foreground ${lang === 'ar' ? 'ml-3' : 'mr-3'} align-middle`} />
              {data.whyHire}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-foreground">
              {data.whyHamedH2}
            </h2>
            <div className="space-y-8">
              {data.whyPoints.map((item: { title: string; desc: string }) => (
                <div key={item.title} className="flex gap-5">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
            <span className={`inline-block w-8 h-px bg-muted-foreground ${lang === 'ar' ? 'ml-3' : 'mr-3'} align-middle`} />
            {data.commonQuestions}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-foreground">
            {data.faqH2}
          </h2>
          <div className="max-w-3xl space-y-8">
            {data.faqs.map((f: { q: string; a: string }) => (
              <div key={f.q} className="border-b border-border pb-8">
                <h3 className="text-base font-bold text-foreground mb-3">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-6 md:px-20 lg:px-28 py-24">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
              {data.readyToStart}
              <span className="accent-text">{data.letsTalk}</span>
            </h2>
            <p className="text-base text-muted-foreground mb-10 leading-relaxed">
              {data.contactDesc}
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground w-20 inline-block text-left">
                  Email
                </span>
                <a
                  href="mailto:hamed.m.abdelalim@gmail.com"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  hamed.m.abdelalim@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground w-20 inline-block text-left">
                  Phone
                </span>
                <a
                  href="tel:+905060453906"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  +90 506 045 3906
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground w-20 inline-block text-left">
                  LinkedIn
                </span>
                <a
                  href="https://www.linkedin.com/in/h-amedmohamed/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  linkedin.com/in/h-amedmohamed
                </a>
              </div>
            </div>
            <a
              href="mailto:hamed.m.abdelalim@gmail.com"
              className="inline-block px-10 py-5 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
            >
              {data.sendMessage}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
