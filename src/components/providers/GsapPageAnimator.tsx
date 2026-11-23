"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP ScrollTrigger kinetic typography & section reveal controller.
 * - Respects prefers-reduced-motion
 * - Never hides above-the-fold LCP content (only animates below-the-fold elements)
 * - Uses clearProps so completed animations leave clean, accessible DOM
 * - Cleans up cleanly on every locale/route transition
 */
export function GsapPageAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const foldY = window.innerHeight * 0.92;

      const headings = gsap.utils.toArray<HTMLElement>(
        "main h2, main .section-label, [data-gsap='heading']"
      );

      headings.forEach((el) => {
        if (el.dataset.gsapSkip === "true") return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= foldY) return;

        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.72,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        });
      });

      const lines = gsap.utils.toArray<HTMLElement>("main .section-line");
      lines.forEach((line) => {
        const rect = line.getBoundingClientRect();
        if (rect.top <= foldY) return;

        gsap.from(line, {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          ease: "back.out(2)",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: line,
            start: "top 92%",
            once: true,
          },
        });
      });

      const reveals = gsap.utils.toArray<HTMLElement>("[data-gsap='reveal']");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= foldY) return;

        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      });
    });

    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
