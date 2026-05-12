"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const projects = [
  {
    num: "1",
    title: "QR Attendance System",
    category: "Backend · Performance Engineering",
    tags: ["Node.js", "PostgreSQL", "Redis", "Docker", "JWT", "Opossum"],
    year: "2025–Present",
    summary: "Hybrid QR verification pipeline serving 2,000+ daily users. 98% latency reduction — from 94ms down to 1.5ms. +6,100% throughput. Circuit Breaker pattern for 99.9% uptime.",
    lesson: "Lesson Learned: High throughput requires aggressive caching. I had to rip out the original DB queries and rewrite them to use Redis.",
    metrics: ["94ms → 1.5ms latency", "+6,100% throughput", "2,000+ daily users", "99.9% uptime"],
    link: null,
  },
  {
    num: "2",
    title: "NodeSecure OSS Contributions",
    category: "Security Research · Open Source",
    tags: ["TypeScript", "AST Analysis", "SSRF Detection", "Security"],
    year: "Q1 2026",
    summary: "7 merged PRs to the NodeSecure ecosystem. Built insecure-random probe, improved SSRF detection, added configurable sensitivity modes and performance benchmarking.",
    lesson: "Lesson Learned: AST analysis is incredibly powerful but resource-intensive. Writing efficient recursive tree walkers is harder than it looks.",
    metrics: ["7 merged PRs", "Math.random probe", "SSRF detection", "AST benchmarks"],
    link: "https://github.com/NodeSecure",
  },
  {
    num: "3",
    title: "DragonSploit",
    category: "AI · Orchestration · Security",
    tags: ["Node.js", "AI Orchestration", "Security", "Stack Detection"],
    year: "2025",
    summary: "AI-powered vulnerability scanning with intent-based orchestration engine. Dynamic strategy selection gives ~40% efficiency gain. Stack-detection module cuts false-positive alerts by 70%.",
    lesson: "Lesson Learned: AI engines can hallucinate vulnerabilities. The real challenge was building a deterministic validation layer to verify the AI's claims.",
    metrics: ["+40% efficiency", "-70% false positives", "Intent-based engine", "Stack detection"],
    link: null,
  },
];

function ProjectCard({ p, index, onInView }: { p: any, index: number, onInView: (i: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

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
            <span className="text-accent font-bold not-italic mr-2">💡 Behind the code:</span>
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

      {p.link && (
        <a 
          href={p.link} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-3 text-accent hover:text-foreground transition-colors font-mono uppercase tracking-widest text-sm"
        >
          View Repository
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="projects" className="px-8 md:px-20 lg:px-28 border-t border-border relative pb-40">
      {/* Sticky Header area for the massive numbers */}
      <div className="sticky top-0 h-screen w-full flex items-center pointer-events-none z-0 overflow-hidden">
         <div className="max-w-7xl mx-auto w-full flex">
            {/* LEFT: Sticky Massive Number */}
            <div className="w-full lg:w-1/3 flex-shrink-0 relative">
              <div className="relative flex items-center h-[20rem]">
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
                    {projects.map((p) => (
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
          {projects.map((p, i) => (
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
