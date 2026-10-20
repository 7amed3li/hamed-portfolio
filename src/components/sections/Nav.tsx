"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { lang, toggleLang, isRTL } = useLang();
  const pathname = usePathname();
  const tr = t[lang].nav;

  // Calculate next language and path for SEO-friendly language switcher
  const nextLang = lang === "en" ? "tr" : lang === "tr" ? "ar" : "en";
  let nextPath = `/${nextLang}`;
  if (pathname) {
    const segments = pathname.split("/");
    if (segments.length >= 2 && ["en", "ar", "tr"].includes(segments[1])) {
      segments[1] = nextLang;
      nextPath = segments.join("/");
    }
  }

  const links = [
    { label: tr.about, href: `/${lang}#about` },
    { label: tr.services, href: `/${lang}#services` },
    { label: tr.experience, href: `/${lang}#experience` },
    { label: tr.projects, href: `/${lang}#projects` },
    { label: tr.stack, href: `/${lang}#stack` },
    { label: tr.blog, href: `/${lang}/blog` },
    { label: tr.contact, href: `/${lang}#contact` },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 h-20 flex items-center justify-between transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(8, 8, 8, 0.95)" : "rgba(8, 8, 8, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Link
          href={`/${lang}`}
          className="block"
          aria-label="Hamed Mohamed - Home"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/logo.png"
              alt="Hamed Mohamed Logo"
              width={48}
              height={48}
              className="object-contain invert mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isHovered = hoveredLink === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${isHovered ? "text-black" : "text-muted-foreground"}`}
              >
                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-accent rounded-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right side: Resume + Lang Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Resume CTA */}
          <a
            href="/Hamed_Mohamed_FullStack_NodeJS_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200 group"
          >
            {tr.resume}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>

          {/* Language Toggle (SEO Friendly) */}
          <a
            href={nextPath}
            onClick={(e) => {
              e.preventDefault();
              toggleLang();
            }}
            className="group flex items-center gap-2 w-[4.5rem] justify-center px-0 py-2 text-xs font-mono uppercase tracking-widest border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300"
            aria-label={lang === "en" ? "EN - Switch language" : lang === "tr" ? "TR - Dili değiştir" : "ع - تبديل اللغة"}
            title="Switch Language"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:rotate-180 transition-transform duration-500">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className={`w-4 text-center ${lang === "ar" ? "text-base font-bold leading-none mb-0.5" : ""}`} style={lang === "ar" ? { fontFamily: "inherit" } : {}}>
              {lang === "en" ? "EN" : lang === "tr" ? "TR" : "ع"}
            </span>
          </a>
        </div>

        {/* Mobile: Lang toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <a
            href={nextPath}
            onClick={(e) => {
              e.preventDefault();
              toggleLang();
            }}
            aria-label={lang === "en" ? "EN - Switch language" : lang === "tr" ? "TR - Dili değiştir" : "ع - تبديل اللغة"}
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className={`w-4 text-center ${lang === "ar" ? "text-sm font-bold leading-none" : ""}`} style={lang === "ar" ? { fontFamily: "inherit" } : {}}>
              {lang === "en" ? "EN" : lang === "tr" ? "TR" : "ع"}
            </span>
          </a>
          <motion.button
            ref={triggerRef}
            id="mobile-menu-trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1.5 p-2 group"
            aria-label={lang === "ar" ? "فتح القائمة" : lang === "tr" ? "Menüyü Aç" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="block w-6 h-px bg-current transition-all group-hover:w-8" />
            <span className="block w-4 h-px bg-current transition-all group-hover:w-8" />
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />

            {/* Sidebar */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={lang === "ar" ? "قائمة التنقل" : lang === "tr" ? "Gezinme Menüsü" : "Navigation menu"}
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className={`fixed top-0 ${isRTL ? "left-0" : "right-0"} h-full w-[340px] max-w-[85vw] z-50 flex flex-col bg-surface-2 border-${isRTL ? "r" : "l"} border-border`}
            >
              <div className="flex items-center justify-between px-8 h-16 border-b border-border">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {lang === "ar" ? "القائمة" : "Menu"}
                </span>
                <button
                  ref={closeBtnRef}
                  id="mobile-menu-close"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:text-accent transition-colors"
                  aria-label={lang === "ar" ? "إغلاق القائمة" : lang === "tr" ? "Menüyü Kapat" : "Close menu"}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>

              <nav
                aria-label={lang === "ar" ? "التنقل الرئيسي" : lang === "tr" ? "Ana Gezinme" : "Main navigation"}
                className="flex-1 flex flex-col justify-center px-8 gap-2"
              >
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-border text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
                    >
                      <span>{l.label}</span>
                      <span className="text-xs font-mono opacity-30 group-hover:opacity-100 transition-opacity accent-text">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-8 py-8 border-t border-border">
                <a
                  href="mailto:hamed.m.abdelalim@gmail.com"
                  className="text-xs font-mono tracking-wider text-muted-foreground break-all"
                >
                  hamed.m.abdelalim@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
