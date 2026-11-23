"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  Building2,
  Gauge,
  Globe,
  Layers,
  LayoutDashboard,
  QrCode,
  Server,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { servicesData } from "@/lib/services-data";
import { TactileIconBadge } from "@/components/ui/TactilePrimitives";

const SERVICE_ICONS = [
  Globe,
  UtensilsCrossed,
  Layers,
  Server,
  LayoutDashboard,
  Bug,
  Gauge,
  ShieldCheck,
  QrCode,
  Building2,
];

export function EngineeringPrinciples() {
  const { lang } = useLang();
  const langServices = servicesData[lang] || servicesData.en;

  const ui = {
    en: {
      eyebrow: "What I Build",
      heading: "Services",
      subtitle:
        "Production websites, backend systems, and security-hardened web apps. Click any service for scope, deliverables, and live proof.",
      learnMore: "View service details",
      allDetails: "Full hiring guide, process & FAQ",
    },
    ar: {
      eyebrow: "ماذا أبني لك",
      heading: "الخدمات",
      subtitle:
        "مواقع إنتاجية حقيقية، أنظمة خلفية، وتطبيقات ويب آمنة. اضغط على أي خدمة لمعرفة التفاصيل والأمثلة الحية.",
      learnMore: "تفاصيل الخدمة",
      allDetails: "دليل التعاقد الكامل والأسئلة الشائعة",
    },
    tr: {
      eyebrow: "Neler Geliştiriyorum",
      heading: "Hizmetler",
      subtitle:
        "Canlı kurumsal web siteleri, backend sistemleri ve güvenli web uygulamaları. Kapsam ve canlı örnekler için hizmete tıklayın.",
      learnMore: "Hizmet detayları",
      allDetails: "Tüm işe alım rehberi ve SSS",
    },
  }[lang];

  return (
    <section
      id="services"
      className="py-16 md:py-24 lg:py-28 px-5 sm:px-8 md:px-20 lg:px-28 border-t border-border overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <div className="mb-4">
            <span className="section-label">{ui.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            {ui.heading}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {ui.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {langServices.map((s, index) => {
            const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
            return (
              <Link
                key={s.slug}
                href={`/${lang}/services/${s.slug}`}
                className="group p-5 sm:p-6 border border-border hover:border-accent/80 transition-all duration-200 bg-surface rounded-[6px] flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <TactileIconBadge>
                      <Icon className="w-5 h-5" />
                    </TactileIconBadge>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {s.intro}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/50 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent">
                  <span>{ui.learnMore}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 rtl:-scale-x-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12 pt-6 border-t border-border/60 flex justify-start">
          <Link
            href={`/${lang}/hire`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors group"
          >
            <span>{ui.allDetails}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 rtl:-scale-x-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
