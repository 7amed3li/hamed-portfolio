import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { getPostBySlug } from '@/lib/blog'
import { getCaseStudyBySlug } from '@/lib/case-studies-data'
import { MDXContent } from '@/components/blog/MdxComponents'
import { posts } from '#site/content'

const RELATED_CASE_STUDIES_BY_POST: Record<string, string[]> = {
  'multilingual-medical-tourism-website-architecture': ['healix-medical-platform', 'genc-group-corporate-platform'],
  'corporate-construction-3d-web-platform-nextjs': ['genc-group-corporate-platform', 'healix-medical-platform'],
  'multi-branch-restaurant-whatsapp-ordering-system': ['lucky-sushi-multi-branch-platform', 'cihangir-ev-yemekleri-platform'],
  'qr-restaurant-menu-without-commissions': ['kardesler-restaurant-platform', 'cihangir-ev-yemekleri-platform'],
  'migrate-wordpress-to-nextjs-without-losing-seo': ['kardesler-restaurant-platform', 'healix-medical-platform'],
  'qr-attendance-system-architecture-scale': ['qr-attendance-system', 'cihangir-ev-yemekleri-platform'],
  'how-i-stopped-nodejs-from-freezing': ['qr-attendance-system', 'nodesecure-open-source'],
  'refactoring-production-backend-lessons': ['qr-attendance-system', 'dragonsploit'],
  'from-computer-repair-to-software-engineering': ['qr-attendance-system', 'kardesler-restaurant-platform'],
};

interface PostPageProps {
  params: Promise<{
    lang: 'en' | 'ar' | 'tr'
    slug: string
  }>
}

export async function generateStaticParams() {
  return posts.filter(post => post.published).map((post) => ({
    lang: post.lang,
    slug: post.slug.split('/').pop() || post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.lang, resolvedParams.slug)

  if (!post) {
    return {}
  }

  const siteUrl = "https://www.hamedmohamed.dev";
  const url = `${siteUrl}/${post.lang}/blog/${resolvedParams.slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: post.canonicalUrl || url,
      languages: {
        'x-default': `${siteUrl}/en/blog/${resolvedParams.slug}`,
        'en': `${siteUrl}/en/blog/${resolvedParams.slug}`,
        'ar': `${siteUrl}/ar/blog/${resolvedParams.slug}`,
        'tr': `${siteUrl}/tr/blog/${resolvedParams.slug}`,
      }
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: url,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: `${siteUrl}${post.coverImage}`, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [`${siteUrl}${post.coverImage}`] : undefined,
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.lang, resolvedParams.slug)

  if (!post || !post.published) {
    notFound()
  }

  const siteUrl = "https://www.hamedmohamed.dev";
  const url = `${siteUrl}/${post.lang}/blog/${resolvedParams.slug}`;
  const homeLabel = post.lang === 'ar' ? 'الرئيسية' : post.lang === 'tr' ? 'Ana Sayfa' : 'Home';
  const blogLabel = post.lang === 'ar' ? 'المدونة' : 'Blog';

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}/#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        inLanguage: post.lang,
        headline: post.title,
        description: post.description,
        keywords: post.tags.join(', '),
        author: { '@id': `${siteUrl}/#person` },
        publisher: { '@id': `${siteUrl}/#person` },
        datePublished: post.date,
        dateModified: post.updated || post.date,
        image: post.coverImage ? [`${siteUrl}${post.coverImage}`] : [],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeLabel, item: `${siteUrl}/${post.lang}` },
          { '@type': 'ListItem', position: 2, name: blogLabel, item: `${siteUrl}/${post.lang}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 max-w-4xl min-w-0 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <div className="mb-8 sm:mb-12 text-center min-w-0">
          <div className="mb-4 flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                resolvedParams.lang === 'ar' ? 'ar-EG' : resolvedParams.lang === 'tr' ? 'tr-TR' : 'en-US',
                { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
              )}
            </time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight break-words">
            {post.title}
          </h1>
          
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {post.description}
          </p>

          <div className="mt-6 sm:mt-8 flex justify-center flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="rounded-md bg-accent/10 text-accent px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {post.coverImage && (
          <div className="mb-10 sm:mb-16 aspect-[2/1] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border relative">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 mx-auto min-w-0 w-full">
          <MDXContent code={post.body} lang={post.lang as 'en' | 'ar' | 'tr'} />
        </div>

        {/* Contextual Live Case Study Proof Cards */}
        {(() => {
          const relatedSlugs = RELATED_CASE_STUDIES_BY_POST[resolvedParams.slug] || ['healix-medical-platform', 'qr-attendance-system'];
          const relatedStudies = relatedSlugs
            .map((csSlug) => getCaseStudyBySlug(csSlug, post.lang))
            .filter((cs): cs is NonNullable<ReturnType<typeof getCaseStudyBySlug>> => Boolean(cs));
          if (relatedStudies.length === 0) return null;

          const sectionTitle =
            post.lang === 'ar'
              ? 'دراسات حالة حية مرتبطة بهذا المقال'
              : post.lang === 'tr'
              ? 'Bu Makaleyle İlgili Canlı Vaka Analizleri'
              : 'Related Live Production Case Studies';
          const readCaseStudyLabel =
            post.lang === 'ar' ? 'قراءة دراسة الحالة' : post.lang === 'tr' ? 'Vaka Analizini İncele' : 'Read Case Study';
          const liveSiteLabel =
            post.lang === 'ar' ? 'الموقع الحي' : post.lang === 'tr' ? 'Canlı Site' : 'Live Website';

          return (
            <section
              dir={post.lang === 'ar' ? 'rtl' : 'ltr'}
              className="mt-12 sm:mt-16 pt-10 border-t border-border"
            >
              <div className="mb-6">
                <span className="section-label">{sectionTitle}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {relatedStudies.map((cs) => (
                  <div
                    key={cs.slug}
                    className="p-5 sm:p-6 rounded-[6px] border border-border bg-surface hover:border-accent/60 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-accent">{cs.heroStat.value}</span>
                        {cs.liveUrl && (
                          <a
                            href={cs.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:underline"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{liveSiteLabel}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        )}
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-foreground mb-2">
                        <Link href={`/${post.lang}/case-studies/${cs.slug}`} className="hover:text-accent transition-colors">
                          {cs.title}
                        </Link>
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {cs.metaDescription}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <Link
                        href={`/${post.lang}/case-studies/${cs.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent hover:underline"
                      >
                        <span>{readCaseStudyLabel}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 rtl:-scale-x-100" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}
      </article>
    </main>
  )
}
