"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

type BuyerCTAProps = {
  lang: string;
  page: "hire" | "service" | "case-study";
  slug?: string;
  contextTitle: string;
  variant?: "hero" | "bottom" | "sidebar";
  secondaryLink?: { href: string; label: string };
};

const WHATSAPP_NUMBER = "905060453906";
const EMAIL = "hamed.m.abdelalim@gmail.com";

export function BuyerCTA({
  lang,
  page,
  slug,
  contextTitle,
  variant = "hero",
  secondaryLink,
}: BuyerCTAProps) {
  const safeLang = lang === "ar" || lang === "tr" ? lang : "en";

  const whatsappMessage =
    safeLang === "ar"
      ? `مرحباً حامد، أنا مهتم بـ "${contextTitle}". أود مناقشة تفاصيل مشروعي.`
      : safeLang === "tr"
        ? `Merhaba Hamed, "${contextTitle}" hakkında projemi görüşmek istiyorum.`
        : `Hi Hamed, I'm interested in "${contextTitle}". I'd like to discuss my project.`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(contextTitle)}`;

  const labels = {
    en: {
      whatsapp: variant === "sidebar" ? "Message on WhatsApp" : "Chat on WhatsApp",
      email: "Send Email",
    },
    ar: {
      whatsapp: variant === "sidebar" ? "راسلني على واتساب" : "تواصل عبر واتساب",
      email: "أرسل بريداً إلكترونياً",
    },
    tr: {
      whatsapp: variant === "sidebar" ? "WhatsApp ile İletişim" : "WhatsApp'tan Yaz",
      email: "E-posta Gönder",
    },
  }[safeLang];

  const eventProps = {
    lang: safeLang,
    page,
    slug: slug || "index",
  };

  const handleTrack = (eventName: "cta_whatsapp_click" | "cta_email_click") => {
    try {
      track(eventName, eventProps);
    } catch {
      // Analytics must never block navigation
    }
  };

  if (variant === "sidebar") {
    return (
      <div className="flex flex-col gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp"
          onClick={() => handleTrack("cta_whatsapp_click")}
          className="block w-full text-center py-3 bg-accent text-black font-mono uppercase tracking-widest text-xs font-bold hover:bg-foreground transition-colors"
        >
          {labels.whatsapp}
        </a>
        <a
          href={mailtoHref}
          data-cta="email"
          onClick={() => handleTrack("cta_email_click")}
          className="block w-full text-center py-3 border border-border text-foreground font-mono uppercase tracking-widest text-xs hover:border-accent hover:text-accent transition-colors"
        >
          {labels.email}
        </a>
      </div>
    );
  }

  const paddingClass = variant === "bottom" ? "px-10 py-5" : "px-8 py-4";

  return (
    <div className="flex flex-wrap gap-4">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp"
        onClick={() => handleTrack("cta_whatsapp_click")}
        className={`${paddingClass} bg-accent text-black font-mono uppercase tracking-widest text-sm font-bold hover:bg-foreground transition-colors inline-flex items-center gap-2`}
      >
        {labels.whatsapp}
      </a>
      <a
        href={mailtoHref}
        data-cta="email"
        onClick={() => handleTrack("cta_email_click")}
        className={`${paddingClass} border border-border text-foreground font-mono uppercase tracking-widest text-sm hover:border-accent hover:text-accent transition-colors inline-flex items-center`}
      >
        {labels.email}
      </a>
      {secondaryLink && (
        <Link
          href={secondaryLink.href}
          className={`${paddingClass} border border-border text-muted-foreground font-mono uppercase tracking-widest text-sm hover:border-foreground hover:text-foreground transition-colors inline-flex items-center`}
        >
          {secondaryLink.label}
        </Link>
      )}
    </div>
  );
}
