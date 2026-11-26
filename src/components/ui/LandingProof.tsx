import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type Lang = "en" | "ar" | "tr";

type Project = {
  name: string;
  domain: string;
  liveUrl: string;
  image: string;
  caseStudySlug: string;
  fact: Record<Lang, string>;
};

const projects: Project[] = [
  {
    name: "Kardeşler Kebap — Cihangir",
    domain: "kardeslercihangir.com",
    liveUrl: "https://www.kardeslercihangir.com",
    image: "/ad-images/kardesler-191.jpg",
    caseStudySlug: "kardesler-restaurant-platform",
    fact: {
      tr: "10 dil, 6 para biriminde fiyatlar, 106 ürün — komisyonsuz WhatsApp siparişi",
      ar: "10 لغات، أسعار بـ 6 عملات، 106 منتجات — طلب واتساب بدون عمولة",
      en: "10 languages, prices in 6 currencies, 106 products — commission-free WhatsApp ordering",
    },
  },
  {
    name: "Cihangir Ev Yemekleri",
    domain: "cihangirevyemekler.com.tr",
    liveUrl: "https://www.cihangirevyemekler.com.tr",
    image: "/ad-images/cihangir-191.jpg",
    caseStudySlug: "cihangir-ev-yemekleri-platform",
    fact: {
      tr: "10 dil (tam RTL desteği), 970+ sayfa — günlük değişen menü ve online sipariş",
      ar: "10 لغات (دعم RTL كامل)، أكثر من 970 صفحة — قائمة يومية وطلب أونلاين",
      en: "10 languages (full RTL), 970+ pages — daily-changing menu and online ordering",
    },
  },
  {
    name: "Lucky Sushi & Chinese",
    domain: "luckysushichinese.com.tr",
    liveUrl: "https://www.luckysushichinese.com.tr",
    image: "/ad-images/lucky-191.jpg",
    caseStudySlug: "lucky-sushi-multi-branch-platform",
    fact: {
      tr: "3 İstanbul şubesi, 5 dil, 140+ ürün — şubeye özel WhatsApp siparişi ve yönetim paneli",
      ar: "3 فروع في إسطنبول، 5 لغات، أكثر من 140 منتجاً — طلب واتساب حسب الفرع ولوحة تحكم",
      en: "3 Istanbul branches, 5 languages, 140+ products — branch-specific WhatsApp ordering and an admin panel",
    },
  },
  {
    name: "Genç Group",
    domain: "gencgroupinsaat.com.tr",
    liveUrl: "https://www.gencgroupinsaat.com.tr",
    image: "/ad-images/genc-191.jpg",
    caseStudySlug: "genc-group-corporate-platform",
    fact: {
      tr: "İnşaat ve otomotiv için iki markalı kurumsal site — 8 aşamalı canlı proje günlüğü",
      ar: "موقع مؤسسي لعلامتين (الإنشاءات والسيارات) — سجل مشاريع حي من 8 مراحل",
      en: "Dual-brand corporate site for construction and automotive — a live 8-stage project diary",
    },
  },
  {
    name: "Healix Medical",
    domain: "healixistanbul.com.tr",
    liveUrl: "https://www.healixistanbul.com.tr",
    image: "/ad-images/healix-191.jpg",
    caseStudySlug: "healix-medical-platform",
    fact: {
      tr: "Uluslararası hasta koordinasyon platformu — 5 dil, dil başına 12 hizmet sayfası, Türkiye'de 33 anlaşmalı sağlık kuruluşu",
      ar: "منصة دولية لتنسيق علاج المرضى — 5 لغات، 12 صفحة خدمة لكل لغة، 33 منشأة رعاية صحية متعاقدة في تركيا",
      en: "International patient-coordination platform — 5 languages, 12 service pages per language, 33 contracted healthcare facilities in Türkiye",
    },
  },
];

const copy = {
  tr: {
    proofLabel: "Canlıdaki İşlerim",
    proofTitle: "Söylediklerimi değil, yayındaki siteleri inceleyin",
    proofDesc:
      "Aşağıdaki beş site de şu an yayında. Bağlantılara tıklayıp kendiniz gezebilir, menülere bakabilir, hatta sipariş akışını deneyebilirsiniz.",
    visitSite: "Canlı Site",
    caseStudy: "Vaka Analizi",
    stepsLabel: "Nasıl Çalışırız?",
    stepsTitle: "Üç adımda siteniz yayında",
    steps: [
      {
        title: "WhatsApp'tan yazın",
        desc: "İşletmenizi ve ihtiyacınızı birkaç cümleyle anlatın. 24 saat içinde size net bir kapsam, süre ve teklifle dönerim.",
      },
      {
        title: "Kapsamı netleştirip başlarız",
        desc: "Onayınızla tasarımı ve geliştirmeyi ben üstlenirim. Ajans yok, aracı yok — baştan sona doğrudan benimle çalışırsınız.",
      },
      {
        title: "Siteniz yayına girer",
        desc: "Sipariş ve rezervasyonlarınız aracı platformlar yerine doğrudan size gelmeye başlar; siteniz Google'da bulunmaya hazır teslim edilir.",
      },
    ],
  },
  ar: {
    proofLabel: "أعمالي المنشورة",
    proofTitle: "لا تكتفِ بكلامي — عاين المواقع الحية بنفسك",
    proofDesc:
      "المواقع الخمسة التالية منشورة الآن. اضغط على الروابط وتصفحها بنفسك، واطّلع على القوائم، وجرّب مسار الطلب.",
    visitSite: "الموقع الحي",
    caseStudy: "دراسة الحالة",
    stepsLabel: "كيف نعمل؟",
    stepsTitle: "ثلاث خطوات ويصبح موقعك حياً",
    steps: [
      {
        title: "راسلني على واتساب",
        desc: "اشرح نشاطك وما تحتاجه في سطور قليلة. أرد عليك خلال 24 ساعة بنطاق عمل واضح ومدة وسعر محدد.",
      },
      {
        title: "نثبّت النطاق ونبدأ",
        desc: "بموافقتك أتولى التصميم والتطوير بنفسي. لا وكالات ولا وسطاء — تتعامل معي مباشرة من البداية للنهاية.",
      },
      {
        title: "موقعك يصبح حياً",
        desc: "تبدأ الطلبات والحجوزات في الوصول إليك مباشرة بدلاً من المنصات الوسيطة، ويُسلَّم موقعك جاهزاً للظهور في جوجل.",
      },
    ],
  },
  en: {
    proofLabel: "My Live Work",
    proofTitle: "Don't take my word for it — inspect the live sites",
    proofDesc:
      "All five sites below are live right now. Click through, browse the menus, and try the ordering flow yourself.",
    visitSite: "Live Site",
    caseStudy: "Case Study",
    stepsLabel: "How It Works",
    stepsTitle: "Your site live in three steps",
    steps: [
      {
        title: "Message me on WhatsApp",
        desc: "Describe your business and what you need in a few lines. I reply within 24 hours with a clear scope, timeline, and quote.",
      },
      {
        title: "We lock the scope and start",
        desc: "With your approval, I handle the design and development myself. No agency, no middlemen — you work directly with me throughout.",
      },
      {
        title: "Your site goes live",
        desc: "Orders and bookings start coming straight to you instead of through platforms, and your site is delivered ready to be found on Google.",
      },
    ],
  },
} as const;

function safeLang(lang: string): Lang {
  return lang === "ar" || lang === "tr" ? lang : "en";
}

export function ProjectProofStrip({ lang }: { lang: string }) {
  const l = safeLang(lang);
  const t = copy[l];
  const isRTL = l === "ar";

  return (
    <section className="px-5 sm:px-6 md:px-20 lg:px-28 py-12 sm:py-16 border-b border-border">
      <div className="max-w-6xl">
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
          {t.proofLabel}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          {t.proofTitle}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-8 sm:mb-10">
          {t.proofDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <article key={p.domain} className="border border-border bg-surface overflow-hidden">
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={1200}
                  height={628}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </a>
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{p.fact[l]}</p>
                <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent hover:underline font-bold"
                  >
                    <span>
                      {t.visitSite} · {p.domain}
                    </span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <Link
                    href={`/${l}/case-studies/${p.caseStudySlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {t.caseStudy} {isRTL ? "←" : "→"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ lang }: { lang: string }) {
  const l = safeLang(lang);
  const t = copy[l];

  return (
    <section className="px-5 sm:px-6 md:px-20 lg:px-28 py-12 sm:py-16 border-b border-border">
      <div className="max-w-6xl">
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
          {t.stepsLabel}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8 sm:mb-10">
          {t.stepsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.steps.map((step, i) => (
            <div key={step.title} className="p-6 border border-border bg-surface">
              <p className="text-3xl font-mono font-bold text-accent mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-base font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
