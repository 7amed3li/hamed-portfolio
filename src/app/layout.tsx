import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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

const siteUrl = "https://hamedme.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Hamed Mohamed | Full-Stack Engineer & Security Researcher",
    template: "%s | Hamed Mohamed",
  },
  description:
    "Full-Stack Engineer specializing in Node.js, React, and Application Security. Built high-throughput systems serving 2,000+ users with 98% latency reduction. Open-source contributor to NodeSecure ecosystem.",

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
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Hamed Mohamed | حامد محمد",
    title: "Hamed Mohamed | Full-Stack Engineer & Security Researcher",
    description:
      "مطور فول ستاك (Node.js & React) وباحث أمني. Full-Stack Engineer specializing in Node.js, React, and Application Security. Built systems serving 2,000+ users.",
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
    title: "Hamed Mohamed | حامد محمد",
    description:
      "I build fast, secure backends. مطور فول ستاك وباحث أمني.",
    images: ["/logo.png"],
  },

  verification: {
    google: "google25a857f9c98e0560",
  },

  category: "technology",
};

// Advanced JSON-LD Structured Data for Maximum E-E-A-T and Identity Recognition
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
        "https://linkedin.com/in/hamed-abdelalim"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
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
