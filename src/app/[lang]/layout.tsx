import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cairo } from "next/font/google";
import "@/app/globals.css";
import { ConsoleMessage } from "@/components/ui/ConsoleMessage";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
    title: {
      default: lang === "ar" 
        ? "حامد محمد | مهندس برمجيات وباحث أمني" 
        : lang === "tr"
        ? "Hamed Mohamed | Full-Stack Mühendisi & Güvenlik Araştırmacısı"
        : "Hamed Mohamed | Full-Stack Engineer & Security Researcher",
      template: "%s | Hamed Mohamed",
    },
    description: lang === "ar"
      ? "مطور فول ستاك (Node.js & React) وباحث أمني. قمت ببناء أنظمة عالية الأداء تخدم أكثر من 2000 مستخدم مع تقليل زمن الاستجابة بنسبة 98%."
      : lang === "tr"
      ? "Node.js, React ve Uygulama Güvenliği alanında uzmanlaşmış Full-Stack Mühendisi."
      : "Full-Stack Engineer specializing in Node.js, React, and Application Security. Built high-throughput systems serving 2,000+ users with 98% latency reduction. Open-source contributor to NodeSecure ecosystem.",

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
      "مطور فول ستاك",
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
      "Open Source Contributor"
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
        ? "مطور فول ستاك وباحث أمني" 
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
        ? "مطور فول ستاك وباحث أمني. أبني أنظمة خلفية سريعة وآمنة."
        : lang === "tr"
        ? "Hızlı ve güvenli backend sistemleri inşa ediyorum."
        : "I build fast, secure backends. Open-source contributor to NodeSecure.",
      images: ["/logo.png"],
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
          "Hamed"
        ],
        url: siteUrl,
        image: `${siteUrl}/logo.png`,
        jobTitle: ["Full-Stack Engineer", "Security Researcher", "مطور ويب", "مطور نود جي اس"],
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
        knowsLanguage: ["Arabic", "English", "Turkish"],
        knowsAbout: [
          "Node.js", "React", "TypeScript", "JavaScript", 
          "Application Security", "Cybersecurity", "PostgreSQL", 
          "Redis", "Express.js", "Next.js", "SAST", "DAST", 
          "Performance Engineering", "AST Analysis"
        ],
        sameAs: [
          "https://github.com/7amed3li",
          "https://www.linkedin.com/in/hamed-abdelalim"
        ],
        email: "hamed.m.abdelalim@gmail.com",
        telephone: "+905060453906",
        description: "Hamed Mohamed (حامد محمد) is an Egyptian Full-Stack Engineer and Security Researcher who studied in Turkey. He specializes in Node.js, React, and building highly secure, scalable backend architectures."
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Hamed Mohamed Portfolio",
        publisher: {
          "@id": `${siteUrl}/#person`
        }
      }
    ]
  };

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${cairo.variable} h-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <ConsoleMessage />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
