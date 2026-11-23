"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { tactileButtonClasses } from "@/components/ui/TactilePrimitives";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const tr = t[lang].about;

  return (
    <section id="about" className="py-16 md:py-24 lg:py-28 px-5 sm:px-8 md:px-20 lg:px-28 border-t border-border overflow-x-clip">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="section-label mb-4">
            <span className="section-line" />
            {tr.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 sm:mb-8 text-foreground">
            {tr.heading1}<br />
            <span className="accent-text">
              {tr.heading2}
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
            <div className="p-4 sm:p-5 border-s-2 border-accent bg-accent/5 rounded-e-lg my-6">
              <h3 className="text-foreground font-mono text-sm uppercase tracking-widest mb-2">
                {tr.philosophyTitle}
              </h3>
              <p className="text-sm">{tr.philosophyText}</p>
            </div>
          </div>
          <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-4">
            <a
              href="mailto:hamed.m.abdelalim@gmail.com"
              className={tactileButtonClasses(
                "primary",
                "flex items-center justify-center text-center gap-1.5 text-[11px] sm:text-xs tracking-wider sm:tracking-widest px-3 py-3 sm:px-6 sm:py-3 min-h-[44px]"
              )}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>{tr.cta_talk}</span>
            </a>
            <a
              href="https://github.com/7amed3li"
              target="_blank"
              rel="noreferrer"
              className={tactileButtonClasses(
                "outline",
                "flex items-center justify-center text-center gap-1.5 text-[11px] sm:text-xs tracking-wider sm:tracking-widest px-3 py-3 sm:px-6 sm:py-3 min-h-[44px]"
              )}
            >
              <FaGithub className="w-3.5 h-3.5 shrink-0" />
              <span>{tr.cta_github}</span>
            </a>
            <a
              href="/Hamed_Mohamed_FullStack_NodeJS_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className={tactileButtonClasses(
                "subtle",
                "col-span-2 sm:col-span-1 flex items-center justify-center text-center gap-1.5 text-[11px] sm:text-xs tracking-wider sm:tracking-widest px-3 py-3 sm:px-6 sm:py-3 min-h-[44px]"
              )}
            >
              <span>{tr.cta_cv}</span>
              <Download className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="space-y-10 sm:space-y-12"
        >
          {/* Quick Info */}
          <div className="space-y-4">
            {tr.info.map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-3.5 sm:py-4 border-b border-border">
                <span className="text-xs font-mono uppercase tracking-widest sm:w-28 flex-shrink-0 mt-0.5 text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground">{value}</span>
              </div>
            ))}
          </div>

          {/* Opinionated Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest mb-6 text-muted-foreground">
              {tr.stackTitle}
            </h3>
            <div className="space-y-3">
              {tr.stack.map(({ tech, comment }) => (
                <div key={tech} className="p-4 bg-surface rounded-lg border border-border hover:border-accent/50 transition-colors group">
                  <h4 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{tech}</h4>
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
