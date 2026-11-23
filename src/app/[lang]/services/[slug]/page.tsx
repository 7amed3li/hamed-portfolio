import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/lib/services-data";
import { BuyerCTA } from "@/components/ui/BuyerCTA";

const siteUrl = "https://www.hamedmohamed.dev";

export async function generateStaticParams() {
  const locales = ["en", "ar", "tr"];
  return servicesData.en.flatMap((s) =>
    locales.map((lang) => ({ lang, slug: s.slug }))
  );
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
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteUrl}/${lang}/services/${slug}`,
      languages: {
        "x-default": `${siteUrl}/en/services/${slug}`,
        "en": `${siteUrl}/en/services/${slug}`,
        "ar": `${siteUrl}/ar/services/${slug}`,
        "tr": `${siteUrl}/tr/services/${slug}`,
      },
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
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "ar" ? "الرئيسية" : lang === "tr" ? "Ana Sayfa" : "Home",
            item: `${siteUrl}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "ar" ? "وظّفني" : lang === "tr" ? "Hizmetler" : "Hire",
            item: `${siteUrl}/${lang}/hire`,
          },
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

  const safeLang = lang === "ar" || lang === "tr" ? lang : "en";
  const isRTL = safeLang === "ar";
  const ui = {
    en: {
      home: "Home",
      hire: "Hire",
      serviceLabel: "Service",
      allServices: "All Services",
      whoThisIsFor: "Who This Is For",
      whatHamedCanBuild: "What Hamed Can Build",
      businessValue: "Business Value",
      realWorldProof: "Real-World Experience",
      commonQuestions: "Common Questions",
      technologiesUsed: "Technologies Used",
      getInTouch: "Get in Touch",
      otherServices: "Other Services",
      viewAllServices: "View all services →",
      readyTitle: "Ready to get started?",
      readyDesc:
        "Describe your project in plain language — Hamed will respond within 24 hours and let you know exactly what he can build, how long it will take, and what it involves.",
      quickResponseLabel: "Response Time",
      quickResponseValue: "< 24 Hours",
      quickWorkflowLabel: "Execution",
      quickWorkflowValue: "Direct Engineer · No Middlemen",
      quickLanguagesLabel: "Communication",
      quickLanguagesValue: "EN · AR · TR",
    },
    ar: {
      home: "الرئيسية",
      hire: "وظّفني",
      serviceLabel: "الخدمة",
      allServices: "جميع الخدمات",
      whoThisIsFor: "لمن هذه الخدمة؟",
      whatHamedCanBuild: "ما الذي سأبنيه لك",
      businessValue: "القيمة التجارية",
      realWorldProof: "خبرة حقيقية ومشاريع حية",
      commonQuestions: "أسئلة شائعة",
      technologiesUsed: "التقنيات المستخدمة",
      getInTouch: "تواصل مباشر",
      otherServices: "خدمات أخرى",
      viewAllServices: "عرض جميع الخدمات ←",
      readyTitle: "جاهز لبدء مشروعك؟",
      readyDesc:
        "اشرح فكرتك أو مشكلتك ببساطة — وسيرد عليك حامد خلال 24 ساعة ليوضح لك خطة التنفيذ والمدة والتفاصيل بوضوح تام.",
      quickResponseLabel: "سرعة الرد",
      quickResponseValue: "خلال 24 ساعة",
      quickWorkflowLabel: "آلية العمل",
      quickWorkflowValue: "تواصل مباشر مع المهندس",
      quickLanguagesLabel: "لغات التواصل",
      quickLanguagesValue: "العربية · EN · TR",
    },
    tr: {
      home: "Ana Sayfa",
      hire: "Hizmetler",
      serviceLabel: "Hizmet",
      allServices: "Tüm Hizmetler",
      whoThisIsFor: "Kimler İçin Uygun?",
      whatHamedCanBuild: "Neler Geliştirebilirim?",
      businessValue: "İş Değeri",
      realWorldProof: "Gerçek Dünya Deneyimi",
      commonQuestions: "Sıkça Sorulan Sorular",
      technologiesUsed: "Kullanılan Teknolojiler",
      getInTouch: "İletişime Geçin",
      otherServices: "Diğer Hizmetler",
      viewAllServices: "Tüm hizmetleri gör →",
      readyTitle: "Başlamaya hazır mısınız?",
      readyDesc:
        "Projenizi sade bir dille anlatın — Hamed 24 saat içinde yanıt vererek tam olarak ne geliştirebileceğini, süreyi ve kapsamı netleştirsin.",
      quickResponseLabel: "Yanıt Süresi",
      quickResponseValue: "24 Saat İçinde",
      quickWorkflowLabel: "Çalışma Modeli",
      quickWorkflowValue: "Doğrudan Mühendis · Aracısız",
      quickLanguagesLabel: "İletişim Dilleri",
      quickLanguagesValue: "TR · AR · EN",
    },
  }[safeLang];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background text-foreground" dir={isRTL ? "rtl" : "ltr"}>
        {/* Breadcrumb */}
        <div className="px-6 md:px-20 lg:px-28 pt-28 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href={`/${lang}`} className="hover:text-accent transition-colors">
            {ui.home}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/hire`} className="hover:text-accent transition-colors">
            {ui.hire}
          </Link>
          <span>/</span>
          <span className="text-foreground">{service.title}</span>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <div className="max-w-4xl">
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-6">
              {ui.serviceLabel}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8 text-foreground">
              {service.h1}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-10">
              {service.intro}
            </p>
            <BuyerCTA
              lang={lang}
              page="service"
              slug={slug}
              contextTitle={service.title}
              variant="hero"
              secondaryLink={{ href: `/${lang}/hire`, label: ui.allServices }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-border">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {ui.quickResponseLabel}
                </p>
                <p className="text-sm font-mono font-bold text-foreground">{ui.quickResponseValue}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {ui.quickWorkflowLabel}
                </p>
                <p className="text-sm font-mono font-bold text-foreground">{ui.quickWorkflowValue}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {ui.quickLanguagesLabel}
                </p>
                <p className="text-sm font-mono font-bold text-foreground">{ui.quickLanguagesValue}</p>
              </div>
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
                  {ui.whoThisIsFor}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">{service.forWho}</p>
              </div>

              {/* What I build */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-6 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-accent" />
                  {ui.whatHamedCanBuild}
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
                  {ui.businessValue}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {service.businessValue}
                </p>
              </div>

              {/* Proof */}
              <div className="p-6 border-s-2 border-accent bg-accent/5">
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
                  {ui.realWorldProof}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.proof}</p>

                {slug === "restaurant-menu-websites" && (
                  <div className="mt-5 pt-4 border-t border-accent/20 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/${lang}/case-studies/kardesler-restaurant-platform`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent hover:underline font-bold"
                    >
                      {lang === 'ar' ? '← قراءة دراسة الحالة كاملة' : lang === 'tr' ? 'Vaka Analizini İncele →' : 'Read Full Case Study →'}
                    </Link>
                    <a
                      href="https://www.kardeslercihangir.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {lang === 'ar' ? 'زيارة الموقع الحي (kardeslercihangir.com) ↗' : lang === 'tr' ? 'Canlı Siteyi Ziyaret Et (kardeslercihangir.com) ↗' : 'Visit Live Site (kardeslercihangir.com) ↗'}
                    </a>
                  </div>
                )}

                {(slug === "qr-code-systems" || slug === "attendance-tracking-systems" || slug === "qr-attendance-systems") && (
                  <div className="mt-5 pt-4 border-t border-accent/20 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/${lang}/case-studies/qr-attendance-system`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent hover:underline font-bold"
                    >
                      {lang === 'ar' ? '← قراءة دراسة حالة نظام الحضور' : lang === 'tr' ? 'QR Yoklama Vaka Analizini İncele →' : 'Read QR Case Study →'}
                    </Link>
                  </div>
                )}
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-8 flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-accent" />
                  {ui.commonQuestions}
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
                  {ui.technologiesUsed}
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
                  {ui.getInTouch}
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
                    dir="ltr"
                  >
                    +90 506 045 3906
                  </a>
                </div>
                <BuyerCTA
                  lang={lang}
                  page="service"
                  slug={slug}
                  contextTitle={service.title}
                  variant="sidebar"
                />
              </div>

              {/* Other services */}
              <div className="p-6 border border-border bg-surface">
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
                  {ui.otherServices}
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
                    {ui.viewAllServices}
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
              {ui.readyTitle}
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              {ui.readyDesc}
            </p>
            <BuyerCTA
              lang={lang}
              page="service"
              slug={slug}
              contextTitle={service.title}
              variant="bottom"
            />
          </div>
        </section>
      </main>
    </>
  );
}
