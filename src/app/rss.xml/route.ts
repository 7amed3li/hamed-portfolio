import { posts } from '#site/content';
import { sortPosts } from '@/lib/blog';

export async function GET(request: Request) {
  // Get language from the URL if possible, default to en
  // But standard RSS is usually per language. Let's do a unified one or language specific.
  // Since it's /rss.xml, let's output English by default, or all.
  
  const siteUrl = 'https://hamedmohamed.dev';
  const allPosts = sortPosts(posts.filter(p => p.published));

  const itemsXml = allPosts.map(post => {
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}${post.permalink}</link>
        <description><![CDATA[${post.description}]]></description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <guid isPermaLink="true">${siteUrl}${post.permalink}</guid>
        ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
      </item>
    `;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Hamed Mohamed | Engineering Blog</title>
        <link>${siteUrl}</link>
        <description>Technical case studies, backend engineering, and security notes.</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
        ${itemsXml}
      </channel>
    </rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
