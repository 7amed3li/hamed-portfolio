import { getAllPosts, getAllTags } from '@/lib/blog'
import { BlogList } from '@/components/blog/BlogList'

const siteUrl = "https://www.hamedmohamed.dev";

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' | 'tr' }> }) {
  const { lang } = await params;
  return {
    metadataBase: new URL(siteUrl),
    title: lang === 'ar' 
      ? 'المدونة التقنية | حامد محمد' 
      : lang === 'tr' 
      ? 'Teknik Blog | Hamed Mohamed' 
      : 'Engineering Blog | Hamed Mohamed',
    description: lang === 'ar'
      ? 'دراسات حالة تقنية وملاحظات هندسية متعمقة بقلم حامد محمد.'
      : lang === 'tr'
      ? 'Hamed Mohamed tarafından teknik vaka analizleri ve mühendislik notları.'
      : 'Technical case studies and engineering notes by Hamed Mohamed.',
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
      languages: {
        "x-default": `${siteUrl}/en/blog`,
        "en": `${siteUrl}/en/blog`,
        "ar": `${siteUrl}/ar/blog`,
        "tr": `${siteUrl}/tr/blog`,
      },
    },
    openGraph: {
      title: lang === 'ar' 
        ? 'المدونة التقنية | حامد محمد' 
        : lang === 'tr' 
        ? 'Teknik Blog | Hamed Mohamed' 
        : 'Engineering Blog | Hamed Mohamed',
      description: lang === 'ar'
        ? 'دراسات حالة تقنية وملاحظات هندسية متعمقة بقلم حامد محمد.'
        : lang === 'tr'
        ? 'Hamed Mohamed tarafından teknik vaka analizleri ve mühendislik notları.'
        : 'Technical case studies and engineering notes by Hamed Mohamed.',
      url: `${siteUrl}/${lang}/blog`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'ar' 
        ? 'المدونة التقنية | حامد محمد' 
        : lang === 'tr' 
        ? 'Teknik Blog | Hamed Mohamed' 
        : 'Engineering Blog | Hamed Mohamed',
      description: lang === 'ar'
        ? 'دراسات حالة تقنية وملاحظات هندسية متعمقة بقلم حامد محمد.'
        : lang === 'tr'
        ? 'Hamed Mohamed tarafından teknik vaka analizleri ve mühendislik notları.'
        : 'Technical case studies and engineering notes by Hamed Mohamed.',
    },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ lang: 'en' | 'ar' | 'tr' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang
  const posts = getAllPosts(lang)
  const tags = getAllTags(lang)

  const content = {
    en: {
      h1Part1: "Engineering ",
      h1Part2: "Notes",
      desc: "Case studies, performance optimizations, and technical deep dives.",
    },
    ar: {
      h1Part1: "كتابات ",
      h1Part2: "هندسية",
      desc: "دراسات حالة، تحسينات الأداء، ومقالات تقنية وتجارب عملية متعمقة.",
    },
    tr: {
      h1Part1: "Mühendislik ",
      h1Part2: "Notları",
      desc: "Örnek olay incelemeleri, performans optimizasyonları ve teknik derinlemesine analizler.",
    },
  }[lang];
  
  return (
    <main className="container mx-auto px-4 pt-32 pb-24 max-w-5xl min-w-0">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          {content.h1Part1}<span className="text-accent">{content.h1Part2}</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          {content.desc}
        </p>
      </div>

      <BlogList posts={posts} lang={lang} allTags={tags} />
    </main>
  )
}
