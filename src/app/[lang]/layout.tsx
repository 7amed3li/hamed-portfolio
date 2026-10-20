import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cairo } from "next/font/google";
import "@/app/globals.css";
import { ConsoleMessage } from "@/components/ui/ConsoleMessage";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
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

    keywords: [
      // English Names & Variations
      "Hamed Mohamed",
      "Hamed Mohamed Abdelalim",
      "Hamed Mohamed Abdelalim Kamel",
      "Hamed",
      "Hamed the Egyptian",
      
      // Arabic Names & Variations
      "حامد",
      "حامد محمد",
      "حامد محمد عبد العليم",
      "حامد محمد عبدالعليم",
      "حامد محمد عبدالعليم كامل",
      "حامد المصري",
      "حامد اللي درس في تركيا",
      "حامد اللي درس ف تركيا",
      "مبرمج مصري في تركيا",
      "حامد محمد مصر",
      "حامد محمد المنيا",
      "حامد محمد قريه ابشاق",
      "حامد محمد السعوديه",
      "حامد محمد جده",
      "حامد محمد الرياض",
      "مبرمج المنيا",
      "مبرمج ابشاق",

      // Titles (English)
      "Full-Stack Engineer",
      "Full Stack Developer",
      "Node.js Developer",
      "React Developer",
      "Backend Engineer",
      "Security Researcher",
      "Application Security Engineer",
      "Software Engineer",
      "Performance Engineer",
      
      // Titles (Arabic)
      "مطور ويب",
      "مطور برمجيات متكامل",
      "مطور نود جي اس",
      "مطور رياكت",
      "مهندس برمجيات",
      "باحث أمني",
      "مهندس أمن سيبراني",
      "مبرمج نود",
      "مبرمج باك اند",
      
      // Technologies & Skills
      "Node.js",
      "React.js",
      "Next.js",
      "Express.js",
      "TypeScript",
      "JavaScript",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "MySQL",
      "Python",
      "Java",
      "C#",
      "Tailwind CSS",
      "Redux",
      "SAST",
      "DAST",
      "Circuit Breaker",
      "Opossum",
      "SSRF",
      "AST Analysis",
      "Threat Modeling",
      "Docker",
      "CI/CD",
      
      // Projects & Organizations
      "NodeSecure",
      "DragonSploit",
      "QR Attendance System",
      "Tokat Gaziosmanpaşa University",
      "Open Source Contributor",

      // Sila App
      "Sila App",
      "Sıla",
      "تطبيق صلة",
      "صلة",
      "تطبيق اسلامي",
      "مواقيت الصلاة",
      "تطبيق قران",
      "تطبيق قرآن",
      "تسميع القران",
      "حفظ القران",
      "تطبيق اذكار",
      "أذكار",
      "Islamic app",
      "prayer times app",
      "Quran app",
      "Quran memorization",
      "namaz vakitleri",
      "Kuran uygulaması",
      "Flutter Islamic app",
    ],

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
          alt: "Hamed Mohamed — Full-Stack Engineer & Security Researcher",
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
          name: "AI & Digital Transformation Unit — Tokat Gaziosmanpaşa University"
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
        description: "Hamed Mohamed (حامد محمد) is an Egyptian Full-Stack Engineer and Security Researcher who studied in Turkey. He specializes in Node.js, React, and building highly secure, scalable backend architectures. He shipped a high-throughput QR attendance platform serving 2,000+ users across 6 faculties with 98% latency reduction. He is an active open-source contributor to the NodeSecure ecosystem with 7 merged pull requests.",
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
          serviceUrl: `${siteUrl}/en#contact`,
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
        areaServed: "Worldwide"
      },
      // Service: Security
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-security`,
        name: "Application Security & Vulnerability Assessment",
        description: "Security-first development with SAST/DAST integration, SSRF prevention, AST analysis, Circuit Breaker patterns, and threat modeling. Active contributor to NodeSecure open-source security ecosystem. Built DragonSploit AI-powered vulnerability scanner.",
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: "Application Security",
        areaServed: "Worldwide"
      },

      // WebSite
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: lang === "ar" ? "حامد محمد" : "Hamed Mohamed",
        description: "Portfolio of Hamed Mohamed Abdelalim — Full-Stack Engineer & Security Researcher specializing in Node.js, React, and Application Security.",
        inLanguage: ["en", "ar", "tr"],
        publisher: {
          "@id": `${siteUrl}/#person`
        }
      }
    ]
  };

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"} data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${cairo.variable} h-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <ConsoleMessage />
          <Nav />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer lang={lang} />
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
