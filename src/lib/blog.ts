import { posts } from '#site/content'

// Sort posts by date (newest first)
export function sortPosts(postsArray: typeof posts) {
  return postsArray.sort((a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  })
}

// Get all published posts for a specific language
export function getAllPosts(lang: string) {
  const filtered = posts.filter(post => post.published && post.lang === lang)
  return sortPosts(filtered)
}

// Get a single post by slug and language
export function getPostBySlug(lang: string, slug: string) {
  return posts.find(post => post.slug === `blog/${lang}/${slug}` || post.slugAsParams === slug && post.lang === lang)
}

// Get featured posts for the home page or sidebar
export function getFeaturedPosts(lang: string) {
  const filtered = posts.filter(post => post.published && post.lang === lang && post.featured)
  return sortPosts(filtered)
}

// Get related posts by tags (excluding the current post)
export function getRelatedPosts(lang: string, currentSlugAsParams: string, tags: string[], limit: number = 3) {
  const allLangPosts = getAllPosts(lang).filter(p => p.slugAsParams !== currentSlugAsParams)
  
  // Sort by number of matching tags
  const related = allLangPosts.map(post => {
    const matchingTags = post.tags.filter(tag => tags.includes(tag)).length
    return { post, matchingTags }
  })
  .filter(item => item.matchingTags > 0)
  .sort((a, b) => b.matchingTags - a.matchingTags)
  .map(item => item.post)
  
  return related.slice(0, limit)
}

// Get all unique tags for a specific language
export function getAllTags(lang: string) {
  const allPosts = getAllPosts(lang)
  const tags = new Set<string>()
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
}

// Get posts by a specific series
export function getSeriesPosts(lang: string, seriesName: string) {
  const filtered = posts.filter(post => post.published && post.lang === lang && post.series === seriesName)
  return filtered.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
}
