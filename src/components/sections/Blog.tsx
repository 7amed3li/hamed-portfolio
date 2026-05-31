"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { Post } from "#site/content";

interface BlogProps {
  initialPosts?: Post[];
  lang?: 'en' | 'ar' | 'tr';
}

export function Blog({ initialPosts = [] }: BlogProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const tr = t[lang].blog;

  return (
    <section id="blog" className="py-40 px-8 md:px-20 lg:px-28 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-28 flex justify-between items-end"
          ref={ref}
        >
          <div>
            <p className="section-label mb-8">
              <span className="section-line" />
              {tr.label}
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight text-foreground">
              {tr.heading1}<br />
              <span className="accent-text">{tr.heading2}</span>
            </h2>
          </div>
          <Link 
            href={`/${lang}/blog`}
            className="hidden md:flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-accent transition-colors"
          >
            View all posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

        {initialPosts.length === 0 ? (
          <div className="py-20 text-center border border-border border-dashed rounded-xl">
            <p className="text-muted-foreground font-mono text-sm">{tr.emptyText || "No posts found."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col border border-border rounded-xl overflow-hidden hover:border-accent transition-colors bg-surface-2"
              >
                <Link href={post.permalink!} className="flex flex-col h-full">
                  {post.coverImage ? (
                    <div className="h-48 w-full overflow-hidden border-b border-border">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full border-b border-border flex items-center justify-center bg-[#0a0a0a] group-hover:bg-border/20 transition-colors">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-muted-foreground opacity-20">
                          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 14.5L7.5 10L13.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.5 14L14.5 11L21 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
                      <span>{new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      {post.series && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border"></span>
                          <span className="text-accent">{post.series}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] font-mono text-muted-foreground bg-border/50 px-2 py-1 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-accent flex items-center gap-2 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                        {tr.readMore}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center md:hidden">
          <Link 
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-accent transition-colors"
          >
            View all posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
