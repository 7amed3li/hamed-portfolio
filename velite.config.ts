import { defineConfig, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'blog/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          description: s.string().max(160),
          slug: s.path(), // extracts slug from the file path, e.g. "blog/en/my-post"
          lang: s.enum(['en', 'ar', 'tr']).default('en'),
          translationKey: s.string().optional(),
          date: s.isodate(),
          updated: s.isodate().optional(),
          author: s.string().default('Hamed Mohamed'),
          tags: s.array(s.string()).default([]),
          series: s.string().optional(),
          seriesOrder: s.number().optional(),
          coverImage: s.string().optional(), // Using string instead of s.image() to avoid build errors when image is missing
          published: s.boolean().default(true),
          featured: s.boolean().default(false),
          canonicalUrl: s.string().url().optional(),
          summary: s.string().max(250).optional(),
          body: s.mdx()
        })
        .transform(data => ({
          ...data,
          // Extract the actual slug without the language code if needed, 
          // or we can just use the path as the unique identifier.
          permalink: `/${data.lang}/blog/${data.slug.split('/').pop()}`
        }))
    }
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['subheading-anchor'],
          }
        }
      ]
    ]
  }
})
