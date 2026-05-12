"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-12 text-foreground">
            Full-Stack Engineer.<br />
            <span className="relative inline-block accent-text">
              Node.js & React.
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
            <p>
              I&apos;m Hamed, a Full-Stack Engineer based in Turkey. I currently work at the AI & Digital Transformation Unit at Tokat University, where I build and secure Node.js systems.
            </p>
            <p>
              Recently, I helped ship a high-throughput QR attendance platform for <strong className="text-foreground">2,000+ daily users</strong>. We managed to cut the response latency by <strong className="accent-text">98%</strong> while keeping the system highly available using circuit breakers.
            </p>
            <div className="p-5 border-l-2 border-accent bg-accent/5 rounded-r-lg my-6">
              <h4 className="text-foreground font-mono text-sm uppercase tracking-widest mb-2">My Philosophy</h4>
              <p className="text-sm">
                I don&apos;t build WordPress themes and I don&apos;t ignore edge cases. I care deeply about data integrity, system resilience, and treating security as a feature, not an afterthought. When I&apos;m not writing APIs, I&apos;m hunting for vulnerabilities in open-source tools like NodeSecure.
              </p>
            </div>
          </div>
          <div className="mt-14 flex gap-4">
            <a
              href="mailto:hamed.m.abdelalim@gmail.com"
              className="text-xs font-mono uppercase tracking-widest px-6 py-3 transition-colors bg-accent text-black hover:bg-foreground"
            >
              Let&apos;s Talk
            </a>
            <a
              href="https://github.com/7amed3li"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono uppercase tracking-widest px-6 py-3 transition-colors border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              GitHub
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
            {[
              { label: "University", value: "Tokat Gaziosmanpaşa University, Turkey" },
              { label: "Degree", value: "B.Sc. Computer Engineering · GPA 3.38/4.0" },
              { label: "Location", value: "Tokat, Turkey · Open to KSA" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-6 py-4 border-b border-border">
                <span className="text-xs font-mono uppercase tracking-widest w-24 flex-shrink-0 mt-0.5 text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground">{value}</span>
              </div>
            ))}
          </div>

          {/* Opinionated Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-6 text-muted-foreground">My Core Stack (Honest Opinions)</h4>
            <div className="space-y-3">
              {[
                { tech: "Node.js", comment: "Fast I/O. I love it, but I use strict linting to avoid spaghetti." },
                { tech: "PostgreSQL", comment: "My go-to database. Data integrity is better than NoSQL hype." },
                { tech: "Redis", comment: "Mandatory for rate-limiting and caching. Saves the DB from melting." },
                { tech: "React", comment: "Great ecosystem, but I keep renders strictly controlled." },
              ].map(({ tech, comment }) => (
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
