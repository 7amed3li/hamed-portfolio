"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { tactileButtonClasses } from "@/components/ui/TactilePrimitives";

type CTAProps = {
  lang?: "en" | "ar" | "tr";
  title?: string;
  description?: string;
  topic?: string;
  serviceSlug?: string;
  serviceLabel?: string;
};

const WHATSAPP_NUMBER = "905060453906";
const EMAIL = "hamed.m.abdelalim@gmail.com";

export function CTA({
  lang = "en",
  title,
  description,
  topic,
  serviceSlug,
  serviceLabel,
}: CTAProps) {
  const safeLang = lang === "ar" || lang === "tr" ? lang : "en";
  const isRTL = safeLang === "ar";

  const copy = {
    en: {
      defaultTitle: "Need help building or optimizing your system?",
      defaultDesc:
        "I build fast, secure web platforms, Next.js sites, Node.js backends, and custom QR systems. Share your requirements and get a clear plan within 24 hours.",
      whatsapp: "Chat on WhatsApp",
      email: "Send Email",
      defaultServiceLabel: "Explore Service",
      waPrefix: "Hi Hamed, I read your article",
      waSuffix: "and would like to discuss my project.",
    },
    ar: {
      defaultTitle: "هل تحتاج مساعدة في بناء أو تسريع نظامك؟",
      defaultDesc:
        "أبني منصات ويب سريعة وآمنة بـ Next.js وNode.js وأنظمة QR مخصصة. اشرح لي فكرتك وسأرد عليك بخطة واضحة والمدة خلال 24 ساعة.",
      whatsapp: "تواصل عبر واتساب",
      email: "أرسل بريداً إلكترونياً",
      defaultServiceLabel: "تفاصيل الخدمة",
      waPrefix: "مرحباً حامد، قرأت مقالك",
      waSuffix: "وأود مناقشة مشروعي.",
    },
    tr: {
      defaultTitle: "Sisteminizi kurmak veya hızlandırmak için destek mi lazım?",
      defaultDesc:
        "Next.js, Node.js ve özel QR sistemleriyle hızlı ve güvenli platformlar geliştiriyorum. Projenizi paylaşın, 24 saat içinde net bir plan sunayım.",
      whatsapp: "WhatsApp'tan Yaz",
      email: "E-posta Gönder",
      defaultServiceLabel: "Hizmeti İncele",
      waPrefix: "Merhaba Hamed, yazınızı okudum",
      waSuffix: "ve projem hakkında görüşmek istiyorum.",
    },
  }[safeLang];

  const resolvedTitle = title || copy.defaultTitle;
  const resolvedDesc = description || copy.defaultDesc;
  const waText = topic
    ? `${copy.waPrefix} ("${topic}") ${copy.waSuffix}`
    : `${copy.waPrefix} ${copy.waSuffix}`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(topic || resolvedTitle)}`;

  const eventProps = {
    lang: safeLang,
    page: "blog",
    slug: serviceSlug || "article",
  };

  const handleTrack = (eventName: "cta_whatsapp_click" | "cta_email_click") => {
    try {
      track(eventName, eventProps);
    } catch {
      // Analytics must never block navigation
    }
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="my-10 sm:my-12 rounded-xl border border-accent/25 bg-accent/5 p-5 sm:p-8 text-center"
    >
      <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-foreground">{resolvedTitle}</h3>
      <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {resolvedDesc}
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp"
          onClick={() => handleTrack("cta_whatsapp_click")}
          className={tactileButtonClasses(
            "primary",
            "flex sm:inline-flex items-center justify-center text-center px-2.5 py-3.5 sm:px-6 sm:py-3 tracking-wide sm:tracking-widest text-[11px] sm:text-sm leading-tight min-h-[46px] gap-1.5 sm:gap-2"
          )}
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span>{copy.whatsapp}</span>
        </a>
        <a
          href={mailtoHref}
          data-cta="email"
          onClick={() => handleTrack("cta_email_click")}
          className={tactileButtonClasses(
            "outline",
            "flex sm:inline-flex items-center justify-center text-center px-2.5 py-3.5 sm:px-6 sm:py-3 tracking-wide sm:tracking-widest text-[11px] sm:text-sm leading-tight min-h-[46px] gap-1.5 sm:gap-2"
          )}
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span>{copy.email}</span>
        </a>
        {serviceSlug && (
          <Link
            href={`/${safeLang}/services/${serviceSlug}`}
            className={tactileButtonClasses(
              "subtle",
              "col-span-2 sm:col-span-1 flex sm:inline-flex items-center justify-center text-center px-2.5 py-3.5 sm:px-6 sm:py-3 tracking-wide sm:tracking-widest text-[11px] sm:text-sm leading-tight min-h-[46px] gap-1.5 sm:gap-2"
            )}
          >
            <span>{serviceLabel || copy.defaultServiceLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 rtl:rotate-180" />
          </Link>
        )}
      </div>
    </div>
  );
}
