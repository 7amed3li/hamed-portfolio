"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const tr = t[lang].about;

  return (
    <section id="about" className="py-40 px-8 md:px-20 lg:px-28 border-t border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="section-label mb-8">
            <span className="section-line" />
            {tr.label}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-12 text-foreground">
            {tr.heading1}<br />
            <span className="relative inline-block accent-text">
              {tr.heading2}
              <svg
                className="absolute -bottom-2 left-0 w-full overflow-visible"
                viewBox="0 0 200 10"
                fill="none"
              >
                <motion.path
                  d="M2 7C50 3 150 2 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                />
              </svg>
            </span>
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>{tr.bio1}</p>
            <p>
              {tr.bio2part1}{" "}
              <strong className="text-foreground">{tr.bio2strong1}</strong>
              {tr.bio2part2}{" "}
              <strong className="accent-text">{tr.bio2strong2}</strong>
              {tr.bio2part3}
            </p>
            <div className="p-5 border-l-2 border-accent bg-accent/5 rounded-r-lg my-6">
              <h4 className="text-foreground font-mono text-sm uppercase tracking-widest mb-2">
                {tr.philosophyTitle}
              </h4>
              <p className="text-sm">{tr.philosophyText}</p>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap gap-4">
            <a
              href="mailto:hamed.m.abdelalim@gmail.com"
              className="text-xs font-mono uppercase tracking-widest px-6 py-3 transition-colors bg-accent text-black hover:bg-foreground"
            >
              {tr.cta_talk}
            </a>
            <a
              href="https://github.com/7amed3li"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono uppercase tracking-widest px-6 py-3 transition-colors border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              {tr.cta_github}
            </a>
            <a
              href="/Hamed_Mohamed_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono uppercase tracking-widest px-6 py-3 transition-colors border border-border text-muted-foreground hover:border-accent hover:text-accent flex items-center gap-2"
            >
              {tr.cta_cv}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Quick Info */}
          <div className="space-y-4">
            {tr.info.map(({ label, value }) => (
              <div key={label} className="flex gap-6 py-4 border-b border-border">
                <span className="text-xs font-mono uppercase tracking-widest w-28 flex-shrink-0 mt-0.5 text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground">{value}</span>
              </div>
            ))}
          </div>

          {/* Opinionated Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-6 text-muted-foreground">
              {tr.stackTitle}
            </h4>
            <div className="space-y-3">
              {tr.stack.map(({ tech, comment }) => (
                <div key={tech} className="p-4 bg-surface rounded-lg border border-border hover:border-accent/50 transition-colors group">
                  <h5 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{tech}</h5>
                  <p className="text-xs font-mono text-muted-foreground">{comment}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
