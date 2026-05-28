import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/lib/services-data";

const siteUrl = "https://www.hamedmohamed.dev";

export async function generateStaticParams() {
  return servicesData.en.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const service = getServiceBySlug(slug, lang);
  if (!service) return {};
  return {
    metadataBase: new URL(siteUrl),
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { 
      canonical: `${siteUrl}/${lang}/services/${slug}`,
      languages: {
        "en": `${siteUrl}/en/services/${slug}`,
        "ar": `${siteUrl}/ar/services/${slug}`,
        "tr": `${siteUrl}/tr/services/${slug}`
      }
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteUrl}/${lang}/services/${slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const service = getServiceBySlug(slug, lang);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}/${lang}/services/${slug}/#service`,
        name: service.title,
        description: service.intro,
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: service.title,
        areaServed: "Worldwide",
        url: `${siteUrl}/${lang}/services/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/${lang}/services/${slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: "Hire", item: `${siteUrl}/${lang}/hire` },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${siteUrl}/${lang}/services/${slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/${lang}/services/${slug}/#faq`,
        mainEntity: service.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
        <div className="px-6 md:px-20 lg:px-28 pt-8 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href={`/${lang}`} className="hover:text-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${lang}/hire`} className="hover:text-accent transition-colors">
            Hire
          </Link>
          <span>/</span>
          <span className="text-foreground">{service.title}</span>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-4xl">
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-6">
              Service
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8 text-foreground">
              {service.h1}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-10">
              {service.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hamed.m.abdelalim@gmail.com"
                className="px-8 py-4 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
              >
                Start a Project
              </a>
              <Link
                href={`/${lang}/hire`}
                className="px-8 py-4 border border-border text-muted-foreground font-mono uppercase tracking-widest text-sm hover:border-foreground hover:text-foreground transition-colors"
              >
                All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="px-6 md:px-20 lg:px-28 py-20">
          <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left — main info */}
            <div className="lg:col-span-2 space-y-16">
              {/* For who */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-5 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-accent" />
                  Who This Is For
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">{service.forWho}</p>
              </div>

              {/* What I build */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-6 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-accent" />
                  What Hamed Can Build
                </h2>
                <ul className="space-y-3">
                  {service.whatIBuild.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business Value */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-5 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-accent" />
                  Business Value
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {service.businessValue}
                </p>
              </div>

              {/* Proof */}
              <div className="p-6 border-l-2 border-accent bg-accent/5">
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
                  Real-World Experience
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.proof}</p>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-8 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-accent" />
                  Common Questions
                </h2>
                <div className="space-y-6">
                  {service.faq.map((f) => (
                    <div key={f.q} className="border-b border-border pb-6">
                      <h3 className="text-base font-bold text-foreground mb-3">{f.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="p-6 border border-border bg-surface">
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="p-6 border border-border bg-surface">
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
                  Get in Touch
                </h2>
                <div className="space-y-3 mb-6">
                  <a
                    href="mailto:hamed.m.abdelalim@gmail.com"
                    className="block text-sm text-foreground hover:text-accent transition-colors"
                  >
                    hamed.m.abdelalim@gmail.com
                  </a>
                  <a
                    href="tel:+905060453906"
                    className="block text-sm text-foreground hover:text-accent transition-colors"
                  >
                    +90 506 045 3906
                  </a>
                </div>
                <a
                  href="mailto:hamed.m.abdelalim@gmail.com"
                  className="block w-full text-center py-3 bg-accent text-black font-mono uppercase tracking-widest text-xs font-bold hover:bg-foreground transition-colors"
                >
                  Contact Hamed
                </a>
              </div>

              {/* Other services */}
              <div className="p-6 border border-border bg-surface">
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
                  Other Services
                </h2>
                <div className="space-y-2">
                  {(servicesData[lang] || servicesData.en)
                    .filter((s) => s.slug !== slug)
                    .slice(0, 5)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${lang}/services/${s.slug}`}
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors py-1"
                      >
                        → {s.title}
                      </Link>
                    ))}
                  <Link
                    href={`/${lang}/hire`}
                    className="block text-sm text-accent hover:underline py-1 mt-2"
                  >
                    View all services →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-t border-border">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground">
              Ready to get started?
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Describe your project in plain language — Hamed will respond and let you know exactly
              what he can build, how long it will take, and what it involves.
            </p>
            <a
              href="mailto:hamed.m.abdelalim@gmail.com"
              className="inline-block px-10 py-5 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
            >
              Start a Conversation
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
