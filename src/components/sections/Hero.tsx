"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(ease * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const bootSequence = [
  "> Initialize system boot...",
  "> Loading Node.js environment v20.11...",
  "> Establishing secure PostgreSQL connection... [OK]",
  "> Initializing Redis cache cluster... [OK]",
  "> Mounting Circuit Breaker (Opossum)...",
  "> Running static AST security checks...",
  "> Scanning for SSRF vulnerabilities... 0 found.",
  "> System fully operational. Ready for high-throughput.",
];

function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    setLines([]); // Reset on mount for strict mode
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        // Safe closure capture
        const lineToAdd = bootSequence[currentLine];
        setLines((prev) => [...prev, lineToAdd]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400); // 400ms delay between lines

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block absolute right-20 rtl:right-auto rtl:left-20 top-40 w-96 bg-surface/80 backdrop-blur border border-border p-6 rounded-lg font-mono text-xs shadow-2xl opacity-80">
      <div className="flex gap-2 mb-4 pb-4 border-b border-border/50">
        <div className="w-3 h-3 rounded-full bg-dangerous/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-accent/80" />
        <span className="ml-4 text-muted-foreground opacity-50">server-logs.sh</span>
      </div>
      <div className="space-y-2 text-muted-foreground">
        {lines.map((line, i) => {
          if (!line) return null;
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
            >
              {line.includes("[OK]") || line.includes("0 found.") ? (
                 <span>{line.split("...")[0]}... <span className="text-accent">{line.split("...")[1]}</span></span>
              ) : line.includes("high-throughput") ? (
                 <span className="text-foreground">{line}</span>
              ) : (
                 <span>{line}</span>
              )}
            </motion.div>
          );
        })}
        {lines.length === bootSequence.length && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-4 bg-accent mt-2"
          />
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const { lang } = useLang();
  const tr = t[lang].hero;
  return (
    <section className="min-h-screen flex flex-col justify-end px-6 md:px-20 lg:px-28 pb-24 pt-32 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Lime glow top-left */}
      <div
        className="absolute top-[20%] -left-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <TerminalAnimation />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl w-full"
      >
        {/* Availability badge */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-14">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
            {tr.badge}
          </span>
        </motion.div>

        {lang === "ar" ? (
          <motion.h1
            variants={fadeUp}
            className="font-bold leading-tight mb-12 text-foreground"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            حامد<br />
            <span className="accent-text">محمد</span>
            <span className="text-foreground font-mono">.</span>
          </motion.h1>
        ) : (
          <motion.h1
            variants={fadeUp}
            className="font-bold leading-[0.88] tracking-[-0.03em] uppercase mb-12 text-foreground"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            <ScrambleText text="Hamed" /><br />
            <span className="accent-text"><ScrambleText text="Mohamed" /></span>
            <span className="text-foreground">.</span>
          </motion.h1>
        )}

        {/* Tagline */}
        <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light max-w-xl mb-16 text-muted-foreground relative z-20">
          {tr.tagline}{" "}
          <span className="text-foreground">{tr.taglineSub}</span>
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mb-28 relative z-20">
          <MagneticButton strength={60}>
            <a
              href="#projects"
              className="block px-8 py-4 text-sm font-mono uppercase tracking-widest font-bold bg-accent text-black hover:bg-foreground transition-colors hover-glow"
            >
              {tr.cta_work}
            </a>
          </MagneticButton>
          <MagneticButton strength={40}>
            <a
              href="#contact"
              className="block px-8 py-4 text-sm font-mono uppercase tracking-widest border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors bg-background"
            >
              {tr.cta_contact}
            </a>
          </MagneticButton>
          <MagneticButton strength={40}>
            <a
              href="/Hamed_Mohamed_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono uppercase tracking-widest border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors bg-background group"
            >
              {tr.cta_resume}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-10 border-t border-border"
        >
          {tr.stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1 accent-text">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
