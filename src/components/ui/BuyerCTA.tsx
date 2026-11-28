"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { tactileButtonClasses } from "./TactilePrimitives";

type BuyerCTAProps = {
  lang: string;
  page: "hire" | "service" | "case-study";
  slug?: string;
  contextTitle: string;
  variant?: "hero" | "bottom" | "sidebar";
  secondaryLink?: { href: string; label: string };
  showPhone?: boolean;
};

const WHATSAPP_NUMBER = "905060453906";
const PHONE_NUMBER = "+905060453906";
const EMAIL = "hamed.m.abdelalim@gmail.com";

export function BuyerCTA({
  lang,
  page,
  slug,
  contextTitle,
  variant = "hero",
  secondaryLink,
  showPhone = true,
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
      call: "Call Now",
    },
    ar: {
      whatsapp: variant === "sidebar" ? "راسلني على واتساب" : "تواصل عبر واتساب",
      email: "أرسل بريداً إلكترونياً",
      call: "اتصل الآن",
    },
    tr: {
      whatsapp: variant === "sidebar" ? "WhatsApp ile İletişim" : "WhatsApp'tan Yaz",
      email: "E-posta Gönder",
      call: "Hemen Ara",
    },
  }[safeLang];

  const eventProps = {
    lang: safeLang,
    page,
    slug: slug || "index",
  };

  const handleTrack = (eventName: "cta_whatsapp_click" | "cta_email_click" | "cta_call_click") => {
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
          className={tactileButtonClasses(
            "primary",
            "flex items-center justify-center gap-2 w-full text-center py-3 px-4 tracking-widest text-xs"
          )}
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{labels.whatsapp}</span>
        </a>
        <a
          href={mailtoHref}
          data-cta="email"
          onClick={() => handleTrack("cta_email_click")}
          className={tactileButtonClasses(
            "outline",
            "flex items-center justify-center gap-2 w-full text-center py-3 px-4 tracking-widest text-xs"
          )}
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span>{labels.email}</span>
        </a>
      </div>
    );
  }

  const paddingClass =
    variant === "bottom"
      ? "px-2.5 py-3.5 sm:px-9 sm:py-4"
      : "px-2.5 py-3.5 sm:px-7 sm:py-3.5";

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-4 w-full sm:w-auto">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp"
        onClick={() => handleTrack("cta_whatsapp_click")}
        className={tactileButtonClasses(
          "primary",
          `${paddingClass} tracking-wide sm:tracking-widest text-[11px] sm:text-sm flex sm:inline-flex items-center justify-center text-center leading-tight min-h-[46px] gap-1.5 sm:gap-2`
        )}
      >
        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span>{labels.whatsapp}</span>
      </a>
      {showPhone && (
        <a
          href={`tel:${PHONE_NUMBER}`}
          data-cta="call"
          onClick={() => handleTrack("cta_call_click")}
          className={tactileButtonClasses(
            "outline",
            `${paddingClass} tracking-wide sm:tracking-widest text-[11px] sm:text-sm flex sm:inline-flex items-center justify-center text-center leading-tight min-h-[46px] gap-1.5 sm:gap-2`
          )}
        >
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span>{labels.call}</span>
        </a>
      )}
      <a
        href={mailtoHref}
        data-cta="email"
        onClick={() => handleTrack("cta_email_click")}
        className={tactileButtonClasses(
          "outline",
          `${paddingClass} tracking-wide sm:tracking-widest text-[11px] sm:text-sm flex sm:inline-flex items-center justify-center text-center leading-tight min-h-[46px] gap-1.5 sm:gap-2`
        )}
      >
        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span>{labels.email}</span>
      </a>
      {secondaryLink && (
        <Link
          href={secondaryLink.href}
          className={tactileButtonClasses(
            "subtle",
            `${paddingClass} col-span-2 sm:col-span-1 tracking-wide sm:tracking-widest text-[11px] sm:text-sm flex sm:inline-flex items-center justify-center text-center leading-tight min-h-[46px] gap-1.5 sm:gap-2`
          )}
        >
          <span>{secondaryLink.label}</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 rtl:-scale-x-100" />
        </Link>
      )}
    </div>
  );
}
