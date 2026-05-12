"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stackGroups = [
  {
    label: "Languages",
    items: ["JavaScript (ES2022+)", "TypeScript", "Python", "C#", "Java", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Redux", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "RESTful APIs", "PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: "Security & DevOps",
    items: ["SAST / DAST", "CI/CD Pipelines", "Docker", "Circuit Breaker", "SSRF Detection", "AST Analysis", "Threat Modeling"],
  },
];

export function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="py-40 px-8 md:px-20 lg:px-28 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-28"
        >
          <p className="section-label mb-8">
            <span className="section-line" />
            Technologies
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase text-foreground">My Stack</h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {stackGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] mb-5 flex items-center gap-3 accent-text">
                <span className="w-5 h-px bg-accent" />
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-mono px-4 py-2 transition-colors duration-200 cursor-default border border-border text-muted-foreground hover:border-accent hover:text-foreground"
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
