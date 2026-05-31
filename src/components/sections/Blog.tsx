"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  public_reactions_count: number;
  reading_time_minutes: number;
  tag_list: string[];
}

export function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const tr = t[lang].blog;
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // You can change '7amed3li' to your actual Dev.to username
  const DEV_TO_USERNAME = "7amed3li";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=6`);
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="blog" className="py-40 px-8 md:px-20 lg:px-28 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-28"
          ref={ref}
        >
          <p className="section-label mb-8">
            <span className="section-line" />
            {tr.label}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight text-foreground">
            {tr.heading1}<br />
            <span className="accent-text">{tr.heading2}</span>
          </h2>
        </motion.div>

        {!loading && articles.length === 0 ? (
          <div className="py-20 text-center border border-border border-dashed rounded-xl">
            <p className="text-muted-foreground font-mono text-sm">{tr.emptyText}</p>
            <p className="text-xs text-muted-foreground mt-4 opacity-50">
              (Create an account on Dev.to with username "{DEV_TO_USERNAME}" and publish articles to see them here)
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col gap-4">
                    <div className="h-48 bg-border/50 rounded-lg w-full"></div>
                    <div className="h-4 bg-border/50 rounded w-1/4 mt-4"></div>
                    <div className="h-6 bg-border/50 rounded w-3/4"></div>
                    <div className="h-4 bg-border/50 rounded w-full"></div>
                    <div className="h-4 bg-border/50 rounded w-5/6"></div>
                  </div>
                ))
              : articles.map((article, i) => (
                  <motion.a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group flex flex-col border border-border rounded-xl overflow-hidden hover:border-accent transition-colors bg-surface-2"
                  >
                    {article.cover_image ? (
                      <div className="h-48 w-full overflow-hidden border-b border-border">
                        <img 
                          src={article.cover_image} 
                          alt={article.title}
                          width={600}
                          height={300} 
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
                        <span>{new Date(article.published_at).toLocaleDateString(lang === "ar" ? "ar-EG" : lang === "tr" ? "tr-TR" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span>{article.reading_time_minutes} min read</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <div className="flex gap-2">
                          {article.tag_list.slice(0, 2).map(tag => (
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
                  </motion.a>
                ))
            }
          </div>
        )}
      </div>
    </section>
  );
}
