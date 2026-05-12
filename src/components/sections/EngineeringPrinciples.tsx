"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const services = [
  {
    num: "( 01 )",
    title: "Backend Engineering",
    desc: "I build APIs and backends that scale. I focus on keeping latency low, database queries efficient, and the architecture clean.",
    subServices: ["01 API Design", "02 Database Optimization", "03 Node.js & React", "04 High-Throughput Systems"],
  },
  {
    num: "( 02 )",
    title: "Application Security",
    desc: "Security shouldn't be an afterthought. I write custom AST checkers, find SSRF vulnerabilities, and integrate security directly into the CI/CD pipeline.",
    subServices: ["01 SAST/DAST", "02 Vulnerability Research", "03 Threat Modeling", "04 Open Source Auditing"],
  },
  {
    num: "( 03 )",
    title: "System Resilience",
    desc: "Servers go down and networks fail. I use circuit breakers and automated fallbacks to make sure the system stays up even when things go wrong.",
    subServices: ["01 Circuit Breakers", "02 Automated Fallbacks", "03 Load Testing", "04 Performance Tuning"],
  },
];

export function EngineeringPrinciples() {
  const [hovered, setHovered] = useState<number | null>(0); // Default open first one

  return (
    <section id="services" className="py-40 px-8 md:px-20 lg:px-28 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="divide-y divide-border">
          {services.map((s, i) => {
            const isOpen = hovered === i;

            return (
              <div
                key={s.num}
                className="py-10 cursor-pointer transition-colors"
                onMouseEnter={() => setHovered(i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-8 items-start">
                  {/* Number */}
                  <h3 className="text-3xl md:text-5xl font-bold font-mono text-foreground">
                    {s.num}
                  </h3>

                  {/* Title & Expandable Content */}
                  <div>
                    <h2 
                      className={`text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      {s.title}
                    </h2>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 max-w-2xl">
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-8">
                              {s.desc}
                            </p>

                            <div className="space-y-4">
                              {s.subServices.map((sub, j) => (
                                <div key={j} className="border-b border-border/50 pb-4 hover-glow hover:border-accent/50 pl-2 -ml-2 rounded-sm transition-all">
                                  <span className="text-lg md:text-2xl font-bold text-foreground flex items-center">
                                    <span className="text-sm font-mono text-accent mr-3">{sub.substring(0, 2)}</span>
                                    {sub.substring(3)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`mt-2 transition-transform duration-500 ${isOpen ? 'rotate-45 opacity-100' : 'opacity-50'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isOpen ? "text-accent" : "text-muted-foreground"}>
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
