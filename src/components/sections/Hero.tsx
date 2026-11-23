"use client";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Briefcase, Download, Send } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { tactileButtonClasses } from "@/components/ui/TactilePrimitives";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) {
      setVal(to);
      return;
    }

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = setTimeout(() => {
        setVal(to);
        ran.current = true;
      }, 0);
      return () => clearTimeout(timer);
    }

    let tween: gsap.core.Tween | null = null;

    const startAnimation = () => {
      if (ran.current) return;
      ran.current = true;
      const counterObj = { current: 0 };

      tween = gsap.to(counterObj, {
        current: to,
        duration: 1.45,
        ease: "power3.out",
        onUpdate: () => setVal(Math.round(counterObj.current)),
        onComplete: () => setVal(to),
      });
    };

    const checkInView = () => {
      if (!ref.current) return false;
      const rect = ref.current.getBoundingClientRect();
      return rect.top < window.innerHeight + 150 && rect.bottom > -150;
    };

    if (checkInView()) {
      const timer = setTimeout(startAnimation, 220);
      return () => {
        clearTimeout(timer);
        tween?.kill();
      };
    }

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              startAnimation();
              io?.disconnect();
              break;
            }
          }
        },
        { rootMargin: "150px 0px" }
      );
      if (ref.current) io.observe(ref.current);
    }

    const failsafeTimer = setTimeout(() => {
      if (!ran.current) startAnimation();
    }, 650);

    return () => {
      io?.disconnect();
      clearTimeout(failsafeTimer);
      tween?.kill();
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

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
    <div className="hidden lg:block absolute right-20 rtl:right-auto rtl:left-20 top-28 w-96 bg-surface/80 backdrop-blur border border-border p-6 rounded-lg font-mono text-xs shadow-2xl opacity-80">
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
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", immediateRender: false } });

      tl.from(
        ".hero-title-line",
        {
          yPercent: 45,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          clearProps: "transform,opacity",
        }
      )
        .from(
          ".hero-copy",
          {
            y: 14,
            opacity: 0,
            duration: 0.42,
            stagger: 0.05,
            clearProps: "transform,opacity",
          },
          "-=0.3"
        )
        .from(
          ".hero-cta-item",
          {
            y: 12,
            opacity: 0,
            duration: 0.38,
            stagger: 0.04,
            clearProps: "transform,opacity",
          },
          "-=0.25"
        )
        .from(
          ".hero-stat-item",
          {
            y: 12,
            opacity: 0,
            duration: 0.4,
            stagger: 0.04,
            clearProps: "transform,opacity",
          },
          "-=0.22"
        );

      gsap.to(".hero-glow-orb", {
        x: 24,
        y: -18,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={heroRef}
      className="min-h-[100svh] flex flex-col justify-center px-5 sm:px-6 md:px-20 lg:px-28 pt-24 sm:pt-24 pb-8 sm:pb-10 relative overflow-hidden"
    >
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
        className="hero-glow-orb absolute top-[20%] -left-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <TerminalAnimation />

      <div className="relative z-10 max-w-6xl w-full">
        {lang === "ar" ? (
          <h1
            className="font-bold leading-[1.12] mb-4 sm:mb-5 text-foreground"
            style={{ fontSize: "clamp(2.5rem, min(7.8vw, 10vh), 6rem)" }}
          >
            <span className="block overflow-hidden py-0.5">
              <span className="hero-title-line block">حامد</span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="hero-title-line block accent-text">محمـــــــــد</span>
            </span>
          </h1>
        ) : (
          <h1
            className="font-bold leading-[0.9] tracking-[-0.03em] uppercase mb-4 sm:mb-5 text-foreground"
            style={{ fontSize: "clamp(2.5rem, min(8.2vw, 10.5vh), 6.75rem)" }}
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block">
                <ScrambleText text="Hamed" />
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block">
                <span className="accent-text"><ScrambleText text="Mohamed" /></span>
                <span className="text-foreground">.</span>
              </span>
            </span>
          </h1>
        )}

        {/* Tagline */}
        <p className="hero-copy text-base sm:text-lg md:text-xl font-light max-w-xl mb-3 sm:mb-4 text-muted-foreground relative z-20">
          {tr.tagline}{" "}
          <span className="text-foreground font-medium">{tr.taglineSub}</span>
        </p>

        {/* Client-focused description: visible to users and AI crawlers */}
        {lang === "en" && (
          <p className="hero-copy text-xs sm:text-sm max-w-2xl mb-5 sm:mb-7 text-muted-foreground/75 leading-relaxed relative z-20">
            Hamed Mohamed helps clients build <strong className="text-muted-foreground">websites</strong>, <strong className="text-muted-foreground">landing pages</strong>, <strong className="text-muted-foreground">dashboards</strong>, <strong className="text-muted-foreground">backend APIs</strong>, <strong className="text-muted-foreground">QR attendance systems</strong>, and secure full-stack web applications using React, Next.js, Node.js, and PostgreSQL.
          </p>
        )}
        {lang === "ar" && (
          <p className="hero-copy text-xs sm:text-sm max-w-2xl mb-5 sm:mb-7 text-muted-foreground/75 leading-relaxed relative z-20">
            حامد محمد يساعد العملاء في بناء <strong className="text-muted-foreground">المواقع الإلكترونية</strong> و<strong className="text-muted-foreground">صفحات الهبوط</strong> و<strong className="text-muted-foreground">لوحات التحكم</strong> و<strong className="text-muted-foreground">واجهات برمجة التطبيقات</strong> وأنظمة <strong className="text-muted-foreground">الحضور بـ QR</strong> وتطبيقات الويب الكاملة.
          </p>
        )}

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3.5 md:gap-4 mb-7 sm:mb-10 relative z-20">
          <div className="hero-cta-item w-full sm:w-auto">
            <MagneticButton strength={60} className="w-full sm:w-auto">
              <a
                href="#projects"
                className={tactileButtonClasses(
                  "primary",
                  "w-full sm:w-auto flex items-center justify-center text-center gap-1.5 sm:gap-2 px-3 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm tracking-wider sm:tracking-widest leading-tight min-h-[46px]"
                )}
              >
                <ArrowDownRight className="w-3.5 h-3.5 shrink-0 rtl:rotate-90" />
                <span>{tr.cta_work}</span>
              </a>
            </MagneticButton>
          </div>
          <div className="hero-cta-item w-full sm:w-auto">
            <MagneticButton strength={40} className="w-full sm:w-auto">
              <a
                href={`/${lang}/hire`}
                className={tactileButtonClasses(
                  "accentOutline",
                  "w-full sm:w-auto flex items-center justify-center text-center gap-1.5 sm:gap-2 px-3 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm tracking-wider sm:tracking-widest leading-tight min-h-[46px]"
                )}
              >
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span>{lang === "ar" ? "وظّفني" : lang === "tr" ? "İşe Al" : "Hire Me"}</span>
              </a>
            </MagneticButton>
          </div>
          <div className="hero-cta-item w-full sm:w-auto">
            <MagneticButton strength={40} className="w-full sm:w-auto">
              <a
                href="#contact"
                className={tactileButtonClasses(
                  "outline",
                  "w-full sm:w-auto flex items-center justify-center text-center gap-1.5 sm:gap-2 px-3 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm tracking-wider sm:tracking-widest leading-tight min-h-[46px]"
                )}
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>{tr.cta_contact}</span>
              </a>
            </MagneticButton>
          </div>
          <div className="hero-cta-item w-full sm:w-auto">
            <MagneticButton strength={40} className="w-full sm:w-auto">
              <a
                href="/Hamed_Mohamed_FullStack_NodeJS_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={tactileButtonClasses(
                  "subtle",
                  "w-full sm:w-auto flex items-center justify-center text-center gap-1.5 sm:gap-2 px-3 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm tracking-wider sm:tracking-widest leading-tight min-h-[46px]"
                )}
              >
                <span>{tr.cta_resume}</span>
                <Download className="w-3.5 h-3.5 shrink-0" />
              </a>
            </MagneticButton>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 pt-6 sm:pt-8 border-t border-border">
          {tr.stats.map((s) => (
            <div key={s.label} className="hero-stat-item">
              <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1 accent-text">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
