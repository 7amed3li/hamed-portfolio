import Link from "next/link";
import { servicesData } from "@/lib/services-data";
import { caseStudiesData } from "@/lib/case-studies-data";

export function Footer({ lang }: { lang: string }) {
  const isRTL = lang === "ar";
  
  // Safe fallback if lang is invalid
  const services = servicesData[lang] || servicesData.en;
  const caseStudies = caseStudiesData[lang] || caseStudiesData.en;
  
  const tr = {
    en: {
      services: "Services",
      caseStudies: "Case Studies",
      quickLinks: "Quick Links",
      hire: "Hire Me",
      faq: "FAQ",
      home: "Home",
      aiContext: "AI Context (llms.txt)",
      copyright: "Hamed Mohamed. All rights reserved.",
      location: "Tokat, Turkey / Global",
    },
    ar: {
      services: "الخدمات",
      caseStudies: "دراسات الحالة",
      quickLinks: "روابط سريعة",
      hire: "وظّفني",
      faq: "الأسئلة الشائعة",
      home: "الرئيسية",
      aiContext: "سياق الذكاء الاصطناعي (llms.txt)",
      copyright: "حامد محمد. جميع الحقوق محفوظة.",
      location: "توكات، تركيا / عالمي",
    },
    tr: {
      services: "Hizmetler",
      caseStudies: "Örnek Olaylar",
      quickLinks: "Hızlı Bağlantılar",
      hire: "Beni İşe Al",
      faq: "SSS",
      home: "Ana Sayfa",
      aiContext: "Yapay Zeka Bağlamı (llms.txt)",
      copyright: "Hamed Mohamed. Tüm hakları saklıdır.",
      location: "Tokat, Türkiye / Küresel",
    }
  };
  
  const text = tr[lang as keyof typeof tr] || tr.en;

  return (
    <footer className="border-t border-border bg-surface-2 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href={`/${lang}`} className="block">
              <img
                src="/logo.png"
                alt="Hamed Mohamed Logo"
                width={48}
                height={48}
                className="object-contain invert mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {lang === "ar" 
                ? "مهندس برمجيات (Full-Stack) وباحث أمني. أبني أنظمة سريعة، آمنة وقابلة للتوسع." 
                : lang === "tr"
                ? "Full-Stack Mühendisi ve Güvenlik Araştırmacısı. Hızlı, güvenli ve ölçeklenebilir sistemler geliştiriyorum."
                : "Full-Stack Engineer & Security Researcher. Building fast, secure, and scalable backend architectures."}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://github.com/7amed3li" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/h-amedmohamed/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-mono tracking-widest text-foreground uppercase mb-2">{text.services}</h3>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${lang}/services/${service.slug}`} className="text-xs text-muted-foreground hover:text-accent transition-colors line-clamp-1">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Case Studies Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-mono tracking-widest text-foreground uppercase mb-2">{text.caseStudies}</h3>
            <ul className="flex flex-col gap-3">
              {caseStudies.map((cs) => (
                <li key={cs.slug}>
                  <Link href={`/${lang}/case-studies/${cs.slug}`} className="text-xs text-muted-foreground hover:text-accent transition-colors line-clamp-1">
                    {cs.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-mono tracking-widest text-foreground uppercase mb-2">{text.quickLinks}</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-accent transition-colors">
                  {text.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/hire`} className="text-xs text-muted-foreground hover:text-accent transition-colors">
                  {text.hire}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="text-xs text-muted-foreground hover:text-accent transition-colors">
                  {text.faq}
                </Link>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" className="text-[10px] font-mono text-accent opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2 mt-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  {text.aiContext}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <p>© {new Date().getFullYear()} {text.copyright}</p>
          <p>{text.location}</p>
        </div>
      </div>
    </footer>
  );
}
