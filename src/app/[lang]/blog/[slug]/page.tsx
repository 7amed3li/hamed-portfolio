import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { getPostBySlug } from '@/lib/blog'
import { MDXContent } from '@/components/blog/MdxComponents'
import { posts } from '#site/content'

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

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: [{
      '@type': 'Person',
      name: post.author,
      url: siteUrl
    }],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: post.coverImage ? [`${siteUrl}${post.coverImage}`] : [],
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="container mx-auto px-4 pt-32 pb-24 max-w-4xl min-w-0 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <div className="mb-12 text-center min-w-0">
          <div className="mb-4 flex justify-center items-center gap-2 text-sm font-mono text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                resolvedParams.lang === 'ar' ? 'ar-EG' : resolvedParams.lang === 'tr' ? 'tr-TR' : 'en-US',
                { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
              )}
            </time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight break-words">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {post.description}
          </p>

          <div className="mt-8 flex justify-center flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="rounded-md bg-accent/10 text-accent px-3 py-1 text-sm font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {post.coverImage && (
          <div className="mb-16 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-border relative">
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
      </article>
    </main>
  )
}
