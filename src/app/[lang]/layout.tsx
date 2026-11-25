import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  IBM_Plex_Sans_Arabic,
  Readex_Pro,
  Plus_Jakarta_Sans,
  DM_Sans,
} from "next/font/google";
import "@/app/globals.css";
import { ConsoleMessage } from "@/components/ui/ConsoleMessage";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GsapPageAnimator } from "@/components/providers/GsapPageAnimator";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AdsTracking } from "@/components/providers/AdsTracking";

// English: Space Grotesk (display) + Inter (body)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-en",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans-en",
  subsets: ["latin"],
  display: "swap",
});

// Arabic: Readex Pro (modern geometric display) + IBM Plex Sans Arabic (crisp editorial body)
const readexPro = Readex_Pro({
  variable: "--font-display-ar",
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-sans-ar",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Turkish: Plus Jakarta Sans (display, latin-ext) + DM Sans (body, latin-ext)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display-tr",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans-tr",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Shared Technical Monospace (with Turkish latin-ext glyphs)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = "https://www.hamedmohamed.dev";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "tr" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = langParam || "en";
  
  return {
    metadataBase: new URL(siteUrl),
    applicationName: lang === "ar" ? "حامد محمد" : "Hamed Mohamed",
    title: {
      default: lang === "ar" 
        ? "حامد محمد | مهندس برمجيات وباحث أمني" 
        : lang === "tr"
        ? "Hamed Mohamed | Full-Stack Mühendisi & Güvenlik Araştırmacısı"
        : "Hamed Mohamed | Full-Stack Engineer & Security Researcher",
      template: "%s | Hamed Mohamed",
    },
    description: lang === "ar"
      ? "مطور برمجيات متكامل (Node.js & React) وباحث أمني. قمت ببناء أنظمة عالية الأداء تخدم أكثر من 2000 مستخدم مع تقليل زمن الاستجابة بنسبة 98%."
      : lang === "tr"
      ? "Node.js, React ve Uygulama Güvenliği alanında uzmanlaşmış Full-Stack Mühendisi."
      : "Full-Stack Engineer specializing in Node.js, React, and App Security. Built production systems for 2,000+ users with 98% latency reduction. NodeSecure contributor.",

    authors: [
      {
        name: "Hamed Mohamed Abdelalim",
        url: "https://github.com/7amed3li",
      },
    ],
    creator: "Hamed Mohamed Abdelalim (حامد محمد عبدالعليم)",
    publisher: "Hamed Mohamed",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        "x-default": `${siteUrl}/en`,
        "en": `${siteUrl}/en`,
        "ar": `${siteUrl}/ar`,
        "tr": `${siteUrl}/tr`,
      }
    },

    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_EG" : lang === "tr" ? "tr_TR" : "en_US",
      url: `${siteUrl}/${lang}`,
      siteName: "Hamed Mohamed | حامد محمد",
      title: lang === "ar" 
        ? "حامد محمد | مهندس برمجيات وباحث أمني" 
        : lang === "tr"
        ? "Hamed Mohamed | Full-Stack Mühendisi & Güvenlik Araştırmacısı"
        : "Hamed Mohamed | Full-Stack Engineer & Security Researcher",
      description: lang === "ar" 
        ? "مطور برمجيات متكامل وباحث أمني" 
        : lang === "tr" 
        ? "Node.js, React ve Uygulama Güvenliği alanında uzmanlaşmış Full-Stack Mühendisi."
        : "Full-Stack Engineer & Security Researcher",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Hamed Mohamed: Full-Stack Engineer & Security Researcher",
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: lang === "ar" 
        ? "حامد محمد | مهندس برمجيات وباحث أمني" 
        : lang === "tr"
        ? "Hamed Mohamed | Full-Stack Mühendisi"
        : "Hamed Mohamed | Full-Stack Engineer",
      description: lang === "ar" 
        ? "مطور برمجيات متكامل وباحث أمني. أبني أنظمة خلفية سريعة وآمنة."
        : lang === "tr"
        ? "Hızlı ve güvenli backend sistemleri inşa ediyorum."
        : "I build fast, secure backends. Open-source contributor to NodeSecure.",
      images: ["/logo.png"],
    },

    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/logo.png', type: 'image/png', sizes: '1024x1024' },
      ],
      apple: '/logo.png',
    },

    category: "technology",
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: langParam } = await params;
  const lang = langParam || "en";
  const isRTL = lang === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Hamed Mohamed Abdelalim",
        alternateName: [
          "حامد محمد",
          "حامد محمد عبدالعليم كامل",
          "حامد المصري",
          "Hamed Mohamed",
          "Hamed",
          "حامد اللي درس في تركيا"
        ],
        url: siteUrl,
        image: `${siteUrl}/logo.png`,
        jobTitle: ["Full-Stack Engineer", "Security Researcher", "مطور ويب", "مطور نود جي اس", "مهندس برمجيات"],
        nationality: {
          "@type": "Country",
          name: "Egypt"
        },
        worksFor: {
          "@type": "Organization",
          name: "AI & Digital Transformation Unit: Tokat Gaziosmanpaşa University"
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Tokat Gaziosmanpaşa University",
          location: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Turkey"
            }
          }
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Bachelor of Science",
          educationalLevel: "B.Sc. Computer Engineering",
          recognizedBy: {
            "@type": "CollegeOrUniversity",
            name: "Tokat Gaziosmanpaşa University"
          }
        },
        knowsLanguage: [
          { "@type": "Language", name: "Arabic", alternateName: "ar" },
          { "@type": "Language", name: "English", alternateName: "en" },
          { "@type": "Language", name: "Turkish", alternateName: "tr" }
        ],
        knowsAbout: [
          "Node.js", "React.js", "Next.js", "TypeScript", "JavaScript",
          "Express.js", "PostgreSQL", "Redis", "MongoDB", "MySQL",
          "Application Security", "Cybersecurity", "SAST", "DAST",
          "Performance Engineering", "AST Analysis", "Circuit Breaker",
          "SSRF Detection", "Threat Modeling", "Docker", "CI/CD",
          "RESTful API Design", "Python", "Java", "C#",
          "Full-Stack Web Development", "Backend Engineering",
          "Open Source Security", "High-Throughput Systems"
        ],
        hasOccupation: [
          {
            "@type": "Occupation",
            name: "Full-Stack Engineer",
            occupationLocation: { "@type": "Country", name: "Turkey" },
            skills: "Node.js, React, TypeScript, PostgreSQL, Redis, Express.js, Next.js, Docker, CI/CD"
          },
          {
            "@type": "Occupation",
            name: "Security Researcher",
            skills: "SAST, DAST, SSRF Detection, AST Analysis, Threat Modeling, Circuit Breaker"
          }
        ],
        sameAs: [
          "https://github.com/7amed3li",
          "https://www.linkedin.com/in/h-amedmohamed/"
        ],
        email: "hamed.m.abdelalim@gmail.com",
        telephone: "+905060453906",
        description: lang === "ar"
          ? "حامد محمد مهندس برمجيات متكامل (Full-Stack) وباحث أمني متخصص في Node.js وReact وبناء الأنظمة عالية الأداء. طوّر منصة حضور بالـ QR تخدم أكثر من 2000 مستخدم مع تقليل زمن الاستجابة بنسبة 98%، وساهم بـ 7 طلبات دمج في NodeSecure."
          : lang === "tr"
          ? "Hamed Mohamed; Node.js, React ve uygulama güvenliği alanında uzmanlaşmış Full-Stack yazılım mühendisidir. 2.000'den fazla kullanıcıya hizmet veren yüksek performanslı QR yoklama platformu geliştirdi (%98 gecikme azaltımı) ve NodeSecure açık kaynak ekosistemine 7 PR ile katkıda bulundu."
          : "Hamed Mohamed is an Egyptian Full-Stack Engineer and Security Researcher who studied in Turkey. He specializes in Node.js, React, and building highly secure, scalable backend architectures. He shipped a high-throughput QR attendance platform serving 2,000+ users across 6 faculties with 98% latency reduction. He is an active open-source contributor to the NodeSecure ecosystem with 7 merged pull requests.",
        makesOffer: [
          { "@id": `${siteUrl}/#service-fullstack` },
          { "@id": `${siteUrl}/#service-backend` },
          { "@id": `${siteUrl}/#service-security` }
        ]
      },
      // Service: Full-Stack Web Development
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-fullstack`,
        name: "Full-Stack Web Application Development",
        description: "End-to-end web application development using Node.js, Express.js, React, Next.js, and TypeScript. From database design and REST API architecture to dynamic, responsive frontends. Proven track record building systems serving 2,000+ users across 6 faculties.",
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: "Web Development",
        areaServed: "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteUrl}/${lang}#contact`,
          servicePhone: "+905060453906"
        }
      },
      // Service: Backend Engineering
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-backend`,
        name: "High-Performance Backend Engineering",
        description: "Scalable backend architecture with Node.js, Express.js, PostgreSQL, Redis, and MongoDB. Performance engineering achieving 98% latency reduction and +6,100% throughput improvement. Circuit Breaker patterns for 99.9% uptime.",
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: "Backend Development",
        areaServed: "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteUrl}/${lang}#contact`,
          servicePhone: "+905060453906"
        }
      },
      // Service: Security
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-security`,
        name: "Application Security & Vulnerability Assessment",
        description: "Security-first development with SAST/DAST integration, SSRF prevention, AST analysis, Circuit Breaker patterns, and threat modeling. Active contributor to NodeSecure open-source security ecosystem. Built DragonSploit AI-powered vulnerability scanner.",
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: "Application Security",
        areaServed: "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteUrl}/${lang}#contact`,
          servicePhone: "+905060453906"
        }
      },

      // WebSite
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: lang === "ar" ? "حامد محمد" : "Hamed Mohamed",
        description: lang === "ar"
          ? "الموقع الشخصي لحامد محمد عبدالعليم، مهندس برمجيات متكامل وباحث أمني متخصص في Node.js وReact وأمن التطبيقات."
          : lang === "tr"
          ? "Hamed Mohamed Abdelalim portföyü, Node.js, React ve uygulama güvenliği alanında uzmanlaşmış Full-Stack yazılım mühendisi."
          : "Portfolio of Hamed Mohamed Abdelalim. Full-Stack Engineer & Security Researcher specializing in Node.js, React, and Application Security.",
        inLanguage: ["en", "ar", "tr"],
        publisher: {
          "@id": `${siteUrl}/#person`
        }
      }
    ]
  };

  const fontVars = [
    spaceGrotesk.variable,
    inter.variable,
    readexPro.variable,
    ibmPlexArabic.variable,
    plusJakarta.variable,
    dmSans.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"} data-scroll-behavior="smooth" suppressHydrationWarning className={`${fontVars} h-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <GsapPageAnimator />
          <ConsoleMessage />
          <Nav />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer lang={lang} />
          <Analytics />
          <SpeedInsights />
          <AdsTracking />
        </LanguageProvider>
      </body>
    </html>
  );
}
