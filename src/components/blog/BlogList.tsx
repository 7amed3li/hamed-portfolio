"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '#site/content';
import Image from 'next/image';

interface BlogListProps {
  posts: Post[];
  lang: 'en' | 'ar' | 'tr';
  allTags: string[];
}

export function BlogList({ posts, lang, allTags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={lang === 'ar' ? 'ابحث في المقالات...' : lang === 'tr' ? 'Makalelerde ara...' : 'Search articles...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-2 border border-border rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
              selectedTag === null ? 'bg-accent text-background' : 'bg-surface-2 border border-border text-muted-foreground hover:border-accent'
            }`}
          >
            {lang === 'ar' ? 'الكل' : lang === 'tr' ? 'Tümü' : 'All'}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
                selectedTag === tag ? 'bg-accent text-background' : 'bg-surface-2 border border-border text-muted-foreground hover:border-accent'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={post.slug}
            >
              <Link 
                href={post.permalink!}
                className="group flex flex-col h-full rounded-xl border border-border bg-surface-2 overflow-hidden hover:border-accent transition-colors"
              >
                {post.coverImage ? (
                  <div className="aspect-video w-full overflow-hidden border-b border-border relative">
                    <Image 
                      src={post.coverImage} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full border-b border-border flex items-center justify-center bg-[#0a0a0a] group-hover:bg-border/20 transition-colors">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-muted-foreground opacity-20">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 14.5L7.5 10L13.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.5 14L14.5 11L21 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <time>{new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>
                    {post.series && (
                      <>
                        <span>•</span>
                        <span className="text-accent">{post.series}</span>
                      </>
                    )}
                  </div>
                  <h2 className="mb-3 text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-6 text-sm text-muted-foreground line-clamp-3 flex-1">
                    {post.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="rounded-md bg-border/50 px-2 py-1 text-[10px] font-mono text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 text-center border border-dashed border-border rounded-xl"
          >
            <p className="text-muted-foreground">
              {lang === 'ar' ? 'لم يتم العثور على مقالات تطابق بحثك.' : lang === 'tr' ? 'Aramanızla eşleşen makale bulunamadı.' : 'No articles found matching your criteria.'}
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
              className="mt-4 text-sm text-accent underline underline-offset-4"
            >
              {lang === 'ar' ? 'مسح الفلاتر' : lang === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
