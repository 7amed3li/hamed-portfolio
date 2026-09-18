import { getAllPosts, getAllTags } from '@/lib/blog'
import { BlogList } from '@/components/blog/BlogList'

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' | 'tr' }> }) {
  await params;
  return {
    title: `Engineering Blog | Hamed Mohamed`,
    description: `Technical case studies and engineering notes by Hamed Mohamed.`,
  }
}

export default async function BlogPage({ params }: { params: Promise<{ lang: 'en' | 'ar' | 'tr' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang
  const posts = getAllPosts(lang)
  const tags = getAllTags(lang)
  
  return (
    <div className="container mx-auto px-4 pt-32 pb-24 max-w-5xl">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Engineering <span className="text-accent">Notes</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Case studies, performance optimizations, and technical deep dives.
        </p>
      </div>

      <BlogList posts={posts} lang={lang} allTags={tags} />
    </div>
  )
}
