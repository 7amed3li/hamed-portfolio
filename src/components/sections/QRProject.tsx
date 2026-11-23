"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

type ProjectData = {
  num?: string;
  slug?: string;
  category: string;
  title: string;
  tags: readonly string[];
  year: string;
  summary: string;
  lesson?: string;
  metrics: readonly string[];
  links?: readonly { label: string; url: string }[];
  link?: string | null;
};

function ProjectCard({ p, index, onInView }: { p: ProjectData, index: number, onInView: (i: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const { lang } = useLang();
  const tr = t[lang].projects;

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div ref={ref} className="project-card flex flex-col justify-center py-10 lg:min-h-[52vh] lg:py-14 border-b border-border/50 last:border-b-0 lg:border-b-0">
      {p.num && (
        <div className="lg:hidden text-xs font-mono text-accent font-bold tracking-widest mb-2">
          0{p.num}
        </div>
      )}
      <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground leading-relaxed">
        {p.category}
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase mb-5 sm:mb-8">
        {p.title}
      </h2>

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
        {p.tags.map((t: string) => (
          <span key={t} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border text-xs font-mono text-foreground hover:border-accent hover:text-accent transition-colors">
            {t}
          </span>
        ))}
        <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-2 text-xs font-mono text-foreground">
          {p.year}
        </span>
      </div>

      <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
        {p.summary}
      </p>

      {p.lesson && (
        <div className="max-w-2xl bg-surface p-4 rounded-md border border-border mb-8">
          <p className="text-sm font-mono text-muted-foreground italic">
            <span className="text-accent font-bold not-italic me-2 inline-flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              <span>{tr.behindCode}</span>
            </span>
            {p.lesson}
          </p>
        </div>
      )}

      {/* Metrics */}
      <div className="flex flex-wrap gap-2 mb-8">
        {p.metrics.map((m: string) => (
          <span
            key={m}
            className="text-xs font-mono px-3 py-1 border border-border text-muted-foreground transition-all hover:border-accent hover:text-accent"
          >
            {m}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2">
        {p.links?.map((l, i: number) => (
          <a 
            key={i}
            href={l.url} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] border border-border bg-surface hover:border-accent text-accent hover:text-foreground transition-colors font-mono uppercase tracking-widest text-xs"
          >
            <span>{l.label}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rtl:-scale-x-100">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}

        {p.link && (
          <a 
            href={p.link} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] border border-border bg-surface hover:border-accent text-accent hover:text-foreground transition-colors font-mono uppercase tracking-widest text-xs"
          >
            <span>{tr.viewRepo}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rtl:-scale-x-100">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}

        {/* Case Study Links */}
        <a 
          href={`/${lang}/case-studies/${p.slug || (p.num === "1" ? "qr-attendance-system" : p.num === "2" ? "nodesecure-open-source" : "dragonsploit")}`}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] border border-accent/40 bg-accent/10 hover:border-accent text-accent hover:text-foreground transition-colors font-mono uppercase tracking-widest text-xs"
        >
          <span>{lang === "ar" ? "اقرأ دراسة الحالة" : lang === "tr" ? "Örnek Olayı Oku" : "Read Case Study"}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rtl:rotate-180">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLang();
  const tr = t[lang].projects;
  const eyebrow =
    lang === "ar" ? "أعمال حية وإنتاجية" : lang === "tr" ? "Canlı Projeler" : "Selected Work";
  const heading =
    lang === "ar" ? "أبرز المشاريع" : lang === "tr" ? "Seçilmiş Projeler" : "Featured Projects";

  return (
    <section id="projects" className="px-5 sm:px-8 md:px-20 lg:px-28 border-t border-border relative pt-16 md:pt-24 lg:pt-28 pb-16 lg:pb-28">
      <div className="max-w-6xl mx-auto mb-6 lg:mb-10 relative z-10">
        <p className="section-label mb-4">{eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase text-foreground">
          {heading}
        </h2>
      </div>

      {/* Sticky Header area for the massive numbers */}
      <div className="sticky top-0 h-screen w-full hidden lg:flex items-center pointer-events-none z-0 overflow-hidden">
         <div className="max-w-7xl mx-auto w-full flex">
            {/* LEFT: Sticky Massive Number */}
            <div className="w-full lg:w-1/3 flex-shrink-0 relative">
              <div className="relative flex items-center h-[20rem]" dir="ltr">
                {/* Fixed "0" */}
                <span 
                  className="font-bold leading-none tracking-tighter text-border/30"
                  style={{ fontSize: "clamp(10rem, 20vw, 20rem)" }}
                  aria-hidden="true"
                >
                  0
                </span>

                {/* Animated Right Digit Container */}
                <div 
                  className="relative overflow-hidden" 
                  style={{ height: "clamp(10rem, 20vw, 20rem)", width: "clamp(6rem, 12vw, 12rem)" }}
                >
                  <motion.div
                    className="absolute left-0 top-0 flex flex-col w-full h-full"
                    animate={{ y: `-${activeIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    {tr.items.map((p) => (
                      <span 
                        key={p.num}
                        className="font-bold leading-none tracking-tighter text-border/30 flex items-center h-full w-full"
                        style={{ fontSize: "clamp(10rem, 20vw, 20rem)" }}
                        aria-hidden="true"
                      >
                        {p.num}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
              </div>
            </div>
         </div>
      </div>

      {/* RIGHT: Scrolling Content */}
      {/* We put this in a relative container pulled UP over the sticky background */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative z-10 lg:-mt-[100vh]">
        <div className="hidden lg:block lg:w-1/3 flex-shrink-0" /> {/* Spacer for left column */}
        <div className="w-full lg:w-2/3 pt-4 lg:pt-16">
          {tr.items.map((p, i) => (
            <ProjectCard 
              key={p.num} 
              p={p} 
              index={i} 
              onInView={setActiveIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
