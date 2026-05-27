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
    "Hamed Mohamed",
    "حامد محمد",
    "Full-Stack Engineer",
    "Full Stack Developer",
    "مطور ويب",
    "Node.js Developer",
    "مطور نود جي اس",
    "React Developer",
    "Application Security",
    "Backend Engineer",
    "Security Researcher",
    "NodeSecure",
    "Performance Engineering",
    "QR Attendance System",
    "DragonSploit",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "Express.js",
    "Next.js",
    "SAST",
    "DAST",
    "Circuit Breaker",
    "Open Source Contributor",
  ],

  authors: [
    {
      name: "Hamed Mohamed Abdelalim",
      url: "https://github.com/7amed3li",
    },
  ],
  creator: "Hamed Mohamed Abdelalim",
  publisher: "Hamed Mohamed Abdelalim",

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
    locale: "en_US",
    url: siteUrl,
    siteName: "Hamed Mohamed — Portfolio",
    title: "Hamed Mohamed | Full-Stack Engineer & Security Researcher",
    description:
      "Full-Stack Engineer specializing in Node.js, React, and Application Security. Built high-throughput systems serving 2,000+ users with 98% latency reduction. Open-source contributor to NodeSecure.",
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
    title: "Hamed Mohamed | Full-Stack Engineer & Security Researcher",
    description:
      "I build fast, secure backends — then prove it with numbers. 98% latency reduction. 7 merged PRs in NodeSecure. Open-source security tooling.",
    images: ["/logo.png"],
  },

  verification: {
    google: "google25a857f9c98e0560",
  },

  category: "technology",
};

// JSON-LD Structured Data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamed Mohamed Abdelalim",
  url: siteUrl,
  image: `${siteUrl}/logo.png`,
  jobTitle: "Full-Stack Engineer & Security Researcher",
  worksFor: {
    "@type": "Organization",
    name: "AI & Digital Transformation Unit — Tokat Gaziosmanpaşa University",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tokat Gaziosmanpaşa University",
  },
  knowsAbout: [
    "Node.js",
    "React",
    "TypeScript",
    "Application Security",
    "PostgreSQL",
    "Redis",
    "Express.js",
    "Next.js",
    "SAST/DAST",
    "Performance Engineering",
  ],
  sameAs: [
    "https://github.com/7amed3li",
    "https://linkedin.com/in/hamed-abdelalim",
  ],
  email: "hamed.m.abdelalim@gmail.com",
  telephone: "+905060453906",
  description:
    "Full-Stack Engineer with 1+ year of production experience building and securing Node.js/React systems. Shipped a high-throughput QR attendance platform serving 2,000+ daily users.",
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
