import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.hamedmohamed.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "google25a857f9c98e0560",
  },
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
        {children}
      </body>
    </html>
  );
}
