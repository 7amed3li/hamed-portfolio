"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Full-Stack Engineer & Security Researcher",
    company: "AI & Digital Transformation Unit",
    location: "Tokat, Turkey",
    period: "Apr 2024 – Present",
    type: "Hybrid",
    highlights: [
      "Led 3-person team building QR attendance system for 2,000+ daily users",
      "98% latency reduction (94.91ms → 1.53ms) and +6,100% throughput (653 req/s)",
      "Implemented Opossum Circuit Breaker for 99.9% service availability",
      "Ingestion scripts processing 25,000+ records in <1.5s",
      "~85% backend test coverage · SAST/DAST CI/CD · Fixed 15+ vulns before prod",
    ],
  },
  {
    title: "Open Source Contributor",
    company: "NodeSecure Ecosystem",
    location: "Remote",
    period: "Q1 2026",
    type: "OSS",
    highlights: [
      "7 merged PRs across js-x-ray & scanner repositories",
      "Built insecure-random probe (flags Math.random() misuse) — PR #452",
      "Improved localhost/SSRF detection in shady-url checker — PR #462",
      "Added sensitivity option (conservative/aggressive) across AstAnalyser — PR #456",
      "Built benchmarking infra with mitata to track AST baselines — PR #496",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-40 px-8 md:px-20 lg:px-28 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-28">
          <p className="section-label mb-8">
            <span className="section-line" />
            Career & Experience
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase text-foreground">
            Experience
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row gap-8 md:gap-0"
              >
                {/* Date column */}
                <div className="md:w-[200px] flex-shrink-0 flex md:flex-col gap-3 md:gap-1 pl-0 md:pr-10 relative">
                  {/* Dot */}
                  <div className="absolute left-0 md:left-[196px] top-1.5 w-2 h-2 rounded-full border border-accent bg-background" />
                  <div className="md:hidden w-2 h-2 flex-shrink-0 mt-1.5" />
                  <span className="text-xs font-mono text-accent tracking-wider uppercase">
                    {exp.period}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {exp.type}
                  </span>
                </div>

                {/* Content */}
                <div className="md:pl-10 flex-1">
                  <h3 className="text-xl font-bold tracking-tight mb-1 text-foreground">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 font-mono">
                    {exp.company} · {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-28 pt-12 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div>
            <p className="section-label mb-2">Education</p>
            <h3 className="text-xl font-bold tracking-tight text-foreground">B.Sc. Computer Engineering</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tokat Gaziosmanpaşa University, Turkey · GPA 3.38/4.0
            </p>
          </div>
          <div className="border border-accent/30 px-6 py-3 text-sm font-mono text-accent">
            Expected Jul 2026
          </div>
        </motion.div>
      </div>
    </section>
  );
}
