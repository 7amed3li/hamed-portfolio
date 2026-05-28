import type { Metadata } from "next";
import Link from "next/link";
import { faqData } from "@/lib/faq-data";

const siteUrl = "https://www.hamedmohamed.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = faqData[lang] || faqData.en;
  return {
    metadataBase: new URL(siteUrl),
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { 
      canonical: `${siteUrl}/${lang}/faq`,
      languages: {
        "en": `${siteUrl}/en/faq`,
        "ar": `${siteUrl}/ar/faq`,
        "tr": `${siteUrl}/tr/faq`
      }
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = faqData[lang] || faqData.en;

  const allQuestions = data.groups.flatMap((g: any) => g.questions);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q: any) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    })),
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

        {/* Header */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-b border-border">
          <p className="text-xs font-mono uppercase tracking-widest text-accent mb-6">{data.faqHead}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            {data.h1}
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            {data.desc}{" "}
            <a
              href="mailto:hamed.m.abdelalim@gmail.com"
              className="text-accent hover:underline"
            >
              {data.emailDirectly}
            </a>
          </p>
        </section>

        {/* FAQ Groups */}
        <section className="px-6 md:px-20 lg:px-28 py-20">
          <div className="max-w-4xl space-y-16">
            {data.groups.map((group: any) => (
              <div key={group.category}>
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-8 flex items-center gap-3">
                  <span className="inline-block w-8 h-px bg-accent" />
                  {group.category}
                </h2>
                <div className="space-y-6">
                  {group.questions.map((item: any) => (
                    <div
                      key={item.q}
                      className="border-b border-border pb-6"
                    >
                      <h3 className="text-base font-bold text-foreground mb-3">{item.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-20 lg:px-28 py-20 border-t border-border">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
              {data.stillQuestion}
            </h2>
            <p className="text-base text-muted-foreground mb-8">
              {data.stillDesc}
            </p>
            <a
              href="mailto:hamed.m.abdelalim@gmail.com"
              className="inline-block px-8 py-4 bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors"
            >
              {data.contactHamed}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
