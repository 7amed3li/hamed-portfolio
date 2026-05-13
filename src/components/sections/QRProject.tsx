"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

function ProjectCard({ p, index, onInView }: { p: any, index: number, onInView: (i: number) => void }) {
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
    <div ref={ref} className="project-card flex flex-col justify-center min-h-[80vh] py-20">
      <div className="mb-6 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground leading-relaxed">
        {p.category}
      </div>

      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase mb-8">
        {p.title}
      </h3>

      <div className="flex flex-wrap gap-4 mb-12">
        {p.tags.map((t: string) => (
          <span key={t} className="px-4 py-2 rounded-full border border-border text-xs font-mono text-foreground hover:border-accent hover:text-accent transition-colors">
            {t}
          </span>
        ))}
        <span className="px-4 py-2 rounded-full bg-surface-2 text-xs font-mono text-foreground">
          {p.year}
        </span>
      </div>

      <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
        {p.summary}
      </p>

      {p.lesson && (
        <div className="max-w-2xl bg-surface p-4 rounded-md border border-border mb-8">
          <p className="text-sm font-mono text-muted-foreground italic">
            <span className="text-accent font-bold not-italic mr-2">{tr.behindCode}</span>
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

      <div className="flex flex-wrap gap-6 mt-4">
        {p.links?.map((l: any, i: number) => (
          <a 
            key={i}
            href={l.url} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-accent hover:text-foreground transition-colors font-mono uppercase tracking-widest text-sm"
          >
            {l.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}

        {p.link && (
          <a 
            href={p.link} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-accent hover:text-foreground transition-colors font-mono uppercase tracking-widest text-sm"
          >
            {tr.viewRepo}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLang();
  const tr = t[lang].projects;

  return (
    <section id="projects" className="px-8 md:px-20 lg:px-28 border-t border-border relative pb-40">
      {/* Sticky Header area for the massive numbers */}
      <div className="sticky top-0 h-screen w-full flex items-center pointer-events-none z-0 overflow-hidden">
         <div className="max-w-7xl mx-auto w-full flex">
            {/* LEFT: Sticky Massive Number */}
            <div className="w-full lg:w-1/3 flex-shrink-0 relative">
              <div className="relative flex items-center h-[20rem]" dir="ltr">
                {/* Fixed "0" */}
                <h2 
                  className="font-bold leading-none tracking-tighter text-border/30"
                  style={{ fontSize: "clamp(10rem, 20vw, 20rem)" }}
                >
                  0
                </h2>

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
                      <h2 
                        key={p.num}
                        className="font-bold leading-none tracking-tighter text-border/30 flex items-center h-full w-full"
                        style={{ fontSize: "clamp(10rem, 20vw, 20rem)" }}
                      >
                        {p.num}.
                      </h2>
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
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative z-10 -mt-[100vh]">
        <div className="hidden lg:block lg:w-1/3 flex-shrink-0" /> {/* Spacer for left column */}
        <div className="w-full lg:w-2/3 pt-40">
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
