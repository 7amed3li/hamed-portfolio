"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const tr = t[lang].stack;

  return (
    <section id="stack" className="py-16 md:py-24 lg:py-28 px-5 sm:px-8 md:px-20 lg:px-28 border-t border-border overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <p className="section-label mb-4">
            <span className="section-line" />
            {tr.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase text-foreground">{tr.heading}</h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {tr.groups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-surface-2 border border-[#2b2b2b] shadow-[0_2px_0_0_#0a0a0a,inset_0_1px_0_rgba(255,255,255,0.08)] text-[11px] font-mono font-semibold uppercase tracking-[0.16em] mb-5 accent-text">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs sm:text-sm font-mono px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-[6px] bg-surface border border-[#242424] text-muted-foreground shadow-[0_2px_0_0_#0d0d0d,inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-accent/70 hover:text-foreground hover:-translate-y-[1px] transition-all duration-150 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
