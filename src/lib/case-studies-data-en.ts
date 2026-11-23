import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  {
    slug: "qr-attendance-system",
    title: "QR Attendance System",
    metaTitle: "QR Attendance System Case Study | Hamed Mohamed",
    metaDescription:
      "How Hamed Mohamed built a QR-based attendance system for 2,000+ students across 6 faculties, achieving 98% latency reduction and 99.9% uptime.",
    category: "Full-Stack System · Performance Engineering",
    year: "2025–Present",
    tags: ["Node.js", "React.js", "PostgreSQL", "Redis", "Docker", "QR", "Admin Dashboard"],
    heroStat: { value: "2,000+", label: "Users in Production" },
    problem:
      "A university needed to track attendance for thousands of students across 6 different faculties. The existing process was manual, paper registers, spreadsheets, and a lot of wasted time for instructors. The system had to handle peak load when hundreds of students scan at the same time at the start of a lecture, work on any phone without an app, give admins a dashboard to view and export records, and stay up 100% of the time during working hours.",
    solution:
      "Hamed designed and built a complete QR-based attendance system. Students scan a QR code displayed in class, it opens in their browser, records attendance instantly, and closes. Each QR code is time-limited to prevent cheating. Instructors and faculty admins log into a dashboard to see records, generate reports, and manage the system. On the backend, Hamed built a hybrid verification pipeline: fast in-memory checks for speed, database confirmation for accuracy, and automatic fallback if any part fails. Redis caching was added to dramatically reduce database load during peak scanning times.",
    technologies: [
      "Node.js + Express.js (backend API)",
      "React.js (student check-in UI)",
      "React.js + admin dashboard (faculty control panel)",
      "PostgreSQL (student and attendance database)",
      "Redis (caching layer for peak load)",
      "Docker (containerized deployment)",
      "JWT (secure time-limited QR tokens)",
      "Opossum (Circuit Breaker for 99.9% uptime)",
    ],
    results: [
      {
        metric: "98% latency reduction",
        description: "API response time dropped from 94.91ms to just 1.53ms after Redis caching and query optimization.",
      },
      {
        metric: "+6,100% throughput",
        description: "System now handles up to 653 requests per second, able to process hundreds of students scanning at the same moment.",
      },
      {
        metric: "2,000+ registered users",
        description: "The system runs in production for students and faculty across 6 university faculties.",
      },
      {
        metric: "99.9% uptime",
        description: "Circuit Breaker pattern (Opossum) ensures the system stays live even if a backend service experiences issues.",
      },
      {
        metric: "~85% test coverage",
        description: "Comprehensive test suite covering verification flows, failure scenarios, and edge cases.",
      },
      {
        metric: "15+ vulnerabilities fixed",
        description: "SAST/DAST security scanning caught and resolved 15+ issues before the system went live.",
      },
    ],
    clientProof:
      "This is a live production system, not a demo. It runs every day for real students and faculty at Tokat Gaziosmanpaşa University, Turkey. The admin panel is accessible at yzdd.gop.edu.tr/qr-admin/ and the student UI at yzdd.gop.edu.tr/qr-ui/.",
    cta: "If you need an attendance system for your school, company, or event, Hamed can build one for you.",
  },
  {
    slug: "kardesler-restaurant-platform",
    title: "Kardeşler Cihangir: Production Restaurant Platform",
    metaTitle: "Kardeşler Restaurant Platform Case Study | Hamed Mohamed",
    metaDescription: "How Hamed Mohamed built kardeslercihangir.com: 10 languages, live currency for 6 currencies, WhatsApp ordering, and Schema.org SEO for a Turkish restaurant.",
    category: "Full-Stack · Next.js · Production Client Website",
    year: "2026",
    tags: ["Next.js 16", "React 19", "Supabase", "Tailwind CSS v4", "Schema.org SEO", "10 Languages", "Live Currency", "WhatsApp Ordering"],
    heroStat: { value: "100+", label: "Daily Visitors in Production" },
    problem: "Kardeşler Kebap & Cafe is a 28-year-old restaurant in Cihangir, Istanbul, one of the most touristic neighborhoods near Taksim. The restaurant was running an outdated WordPress site that was slow, not mobile-friendly, and only available in Turkish. The menu was a static PDF that tourists couldn't read, and the owner had no way to update prices without calling a developer. The site had zero structured data for Google, no multilingual support, and was invisible to international tourists searching for restaurants in the area.",
    solution: "Built a complete digital restaurant platform from scratch using Next.js 16 (App Router), React 19, Tailwind CSS v4, and Supabase. Implemented dynamic routing for 10 languages (Turkish, English, Arabic, Russian, French, Persian, German, Italian, Spanish, Chinese) with full hreflang coverage. Built a live currency converter supporting 6 currencies (TRY, USD, EUR, GBP, RUB, SAR) via real-time exchange rate API. Built WhatsApp direct ordering with localized message templates in each visitor's language. Created a non-technical owner admin panel for real-time price and availability updates via Supabase. Executed a full WordPress migration with 25+ permanent 301 redirect rules preserving all Google rankings. Implemented comprehensive Local SEO: Schema.org structured data (Restaurant, Menu, ImageGallery, BreadcrumbList, WebSite), Open Graph tags, Twitter Cards, dynamic sitemap, and canonical URLs.",
    technologies: ["Next.js 16 (App Router)", "React 19", "Tailwind CSS v4", "Supabase (Auth + PostgreSQL)", "Sharp (Image Optimization)", "Schema.org (Restaurant, Menu, ImageGallery)", "WhatsApp Business API", "Real-time Currency API", "Vercel Analytics"],
    results: [
      { metric: "~100 Daily Visitors", description: "Live production site serving real visitors daily, tourists, locals, and returning customers" },
      { metric: "10 Languages Live", description: "Full internationalization covering Turkish, English, Arabic, Russian, French, Persian, German, Italian, Spanish, and Chinese" },
      { metric: "6 Live Currencies", description: "Real-time currency conversion (TRY, USD, EUR, GBP, RUB, SAR) so tourists see prices in their own currency" },
      { metric: "WordPress → Next.js Migration", description: "Full migration from legacy WordPress with 25+ redirect rules, zero loss in Google rankings" },
      { metric: "Comprehensive Local SEO", description: "Schema.org structured data, hreflang for 10 languages, Open Graph, Twitter Cards, dynamic sitemap, and canonical URLs" },
      { metric: "WhatsApp Order Flow", description: "Direct WhatsApp order dispatch with auto-localized order messages across all 10 languages" },
      { metric: "Owner Admin Panel", description: "Non-technical restaurant owner can update prices, availability, and menu items in real-time without a developer" },
    ],
    clientProof: "This is a live commercial website, not a demo or side project. It runs every day for a real 28-year-old restaurant in one of Istanbul's most touristic neighborhoods. You can visit it at kardeslercihangir.com. The developer credit page is officially documented on the live domain at kardeslercihangir.com/tasarim-gelistirme.",
    cta: "If you need a restaurant website, digital menu, or multilingual business platform, Hamed can build it for you.",
    liveUrl: "https://www.kardeslercihangir.com",
    statusBadge: "Live in Production",
    images: [
      { src: "/case-studies/kardesler/hero.png", alt: "Kardeşler Cihangir Desktop Homepage", caption: "Multilingual homepage with real-time currency selector and interactive menu highlights" },
      { src: "/case-studies/kardesler/menu.png", alt: "Kardeşler Cihangir Digital Menu & Cart", caption: "Digital menu with categorized dishes, live prices in 6 currencies, and WhatsApp ordering" },
      { src: "/case-studies/kardesler/mobile.png", alt: "Kardeşler Cihangir Mobile Responsive Experience", caption: "Optimized mobile view designed for fast tourist access via QR code" },
    ],
  },
  {
    slug: "nodesecure-open-source",
    title: "NodeSecure Open-Source Security Contributions",
    metaTitle: "NodeSecure Open-Source Contributions | Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed contributed 7 merged pull requests to NodeSecure, a security scanning ecosystem for Node.js, improving AST analysis, SSRF detection, and benchmarking.",
    category: "Security Research · Open Source",
    year: "Q1 2026",
    tags: ["TypeScript", "AST Analysis", "SSRF Detection", "Node.js", "Security", "Open Source"],
    heroStat: { value: "7", label: "Merged Pull Requests" },
    problem:
      "NodeSecure is a security scanning ecosystem used by developers worldwide to analyze JavaScript and Node.js code for vulnerabilities. The tools needed improvements in several areas: better detection of unsafe code patterns (like insecure random number generation), smarter SSRF (Server-Side Request Forgery) detection, the ability to tune detection sensitivity, and performance benchmarking to track analysis speed over time.",
    solution:
      "Hamed contributed 7 pull requests across the NodeSecure repositories (js-x-ray and scanner), each targeting a specific improvement: building new security probes that detect unsafe code patterns, improving URL analysis to catch SSRF risks, adding configurable sensitivity levels so developers can choose between strict and lenient analysis, and setting up a benchmarking system to measure analysis performance over time.",
    technologies: [
      "TypeScript (all contributions)",
      "AST (Abstract Syntax Tree) analysis",
      "NodeSecure js-x-ray (code analysis engine)",
      "NodeSecure scanner (full project scanner)",
      "mitata (benchmarking library)",
      "Node.js runtime security patterns",
    ],
    results: [
      {
        metric: "PR #452. Insecure Random Probe",
        description: "Built a probe that flags use of Math.random() in security-sensitive contexts, helping developers avoid a common cryptography mistake.",
      },
      {
        metric: "PR #462, SSRF Detection",
        description: "Improved the shady-url checker to better detect localhost references and SSRF-risky URL patterns in Node.js code.",
      },
      {
        metric: "PR #456. Sensitivity Option",
        description: "Added conservative/aggressive sensitivity modes across AstAnalyser, ProbeRunner, and SourceFile, without breaking any existing behavior.",
      },
      {
        metric: "PR #467. Named Main Handlers",
        description: "Added the Named Main Handlers pattern to isSerializeEnv so probes can handle multiple validation scenarios cleanly.",
      },
      {
        metric: "PR #468. Email Literal Detection",
        description: "Implemented email literal collection using the CollectableSet API, with 5 comprehensive test cases.",
      },
      {
        metric: "PR #496. Benchmarking Infrastructure",
        description: "Built a complete benchmarking setup using mitata to track AST analysis performance across NodeSecure releases.",
      },
    ],
    clientProof:
      "These contributions are public and verifiable on GitHub under the NodeSecure organization. They demonstrate Hamed's ability to work on real security tooling, understand complex AST analysis code, and contribute clean, tested improvements to a production open-source project used by developers globally.",
    cta: "If you need security expertise applied to your application (code review, vulnerability scanning, or security architecture) Hamed can help.",
  },
  {
    slug: "dragonsploit",
    title: "DragonSploit: AI-Powered Vulnerability Scanner",
    metaTitle: "DragonSploit AI Vulnerability Scanner | Hamed Mohamed",
    metaDescription:
      "How Hamed Mohamed built DragonSploit: an AI vulnerability scanner with stack-aware scanning and deterministic checks, reducing false positives by 70%.",
    category: "AI · Security · Backend Engineering",
    year: "2025",
    tags: ["Node.js", "AI Orchestration", "Vulnerability Scanning", "Stack Detection", "Security"],
    heroStat: { value: "70%", label: "Fewer False Positive Alerts" },
    problem:
      "Traditional vulnerability scanners run the same checks on every target regardless of what technology it's running. This creates two problems: wasted time running irrelevant checks, and too many false positive alerts that developers learn to ignore. The challenge was to build a smarter scanner that understands what kind of system it's scanning and runs only the relevant security tests.",
    solution:
      "Hamed built DragonSploit with an intent-based orchestration engine. Instead of running a fixed list of checks, the engine first analyzes the target to detect what technology stack it's using (WordPress, Nginx, Node.js, etc.) and then dynamically selects the most relevant vulnerability tests to run. An AI layer helps interpret scan intent and route to the right strategy. A deterministic validation layer verifies AI outputs to prevent hallucinations from generating false results.",
    technologies: [
      "Node.js (orchestration engine)",
      "AI / LLM integration (intent-based routing)",
      "Stack detection module (WordPress, Nginx, Node.js, etc.)",
      "Deterministic validation layer",
      "Modular probe architecture",
    ],
    results: [
      {
        metric: "+40% efficiency gain",
        description: "By running only relevant checks for each target, the scanner completes faster than static queue-based approaches.",
      },
      {
        metric: "70% fewer false positives",
        description: "Context-aware stack detection means the scanner doesn't flag issues that don't apply to the target's actual technology.",
      },
      {
        metric: "Intent-based orchestration",
        description: "The engine interprets scanning intent and dynamically selects strategies, no manual configuration required.",
      },
      {
        metric: "AI hallucination protection",
        description: "A deterministic validation layer confirms AI-generated findings before they're reported, ensuring accuracy.",
      },
    ],
    clientProof:
      "DragonSploit demonstrates Hamed's ability to combine AI capabilities with practical security engineering, building systems that are not just technically impressive but actually more accurate and useful than traditional approaches.",
    cta: "If you need a security review of your application or want to discuss a custom security tool, contact Hamed.",
  },
  {
    slug: "genc-group-corporate-platform",
    title: "Genç Group: Corporate Construction & Automotive Platform",
    metaTitle: "Genç Group Corporate Platform Case Study | Hamed Mohamed",
    metaDescription:
      "How Hamed Mohamed built the multilingual corporate website for Genç Group (İnşaat & AutoClub Merter) in Istanbul with interactive 3D/AI architecture views.",
    category: "Corporate Website · Construction & Automotive · 3D / Next.js",
    year: "2026",
    tags: [
      "Next.js 16",
      "React 19",
      "Three.js / 3D",
      "Framer Motion",
      "TR / EN / AR (RTL)",
      "Corporate SEO",
      "Construction & Automotive",
    ],
    heroStat: { value: "2 Divisions", label: "Corporate Holding Platform · 3 Languages" },
    problem:
      "Genç Group operates two flagship commercial divisions in Istanbul. Genç Group İnşaat (architectural construction and urban renovation in Zeytinburnu) and AutoClub Merter (luxury bodywork restoration, optical color-matched painting, and PPF protection in Güngören). The company needed a unified corporate web presence that presents both divisions with luxury editorial authority, demonstrates real construction stages and automotive engineering precision interactively, supports Turkish, English, and RTL Arabic seamlessly, and captures qualified leads through validated contact workflows.",
    solution:
      "Designed and engineered a bespoke corporate holding platform with Next.js 16, React 19, Tailwind CSS v4, and Three.js + Draco 3D visualization. Built dedicated division experiences for Construction (/construction, including project transformation stages and before/after comparisons) and Automotive (/automotive, featuring a 4-stage interactive vehicle anatomy showcase and portfolio gallery). Engineered an interactive 3D & AI architectural spatial study studio (/case-study) allowing decision-makers to switch volumetric massing, facade materiality, and lighting scenarios in real time. Added full Turkish, English, and Arabic (RTL) localization, Zod-validated lead forms via React Hook Form, and Corporate Schema.org structured metadata.",
    technologies: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Three.js & Draco 3D Geometry Compression",
      "Framer Motion",
      "Tailwind CSS v4",
      "React Hook Form + Zod",
      "Schema.org Corporate Local SEO",
    ],
    results: [
      {
        metric: "Unified 2-Sector Corporate Platform",
        description:
          "Connected Genç Group İnşaat and AutoClub Merter under one cohesive corporate identity at gencgroupinsaat.com.tr.",
      },
      {
        metric: "Interactive 3D / AI Architecture Lab",
        description:
          "Built a real-time conceptual workbench (/case-study) switching building massing, materials (travertine, exposed concrete, glass), and golden/blue-hour lighting.",
      },
      {
        metric: "4-Stage Automotive Assembly Anatomy",
        description:
          "Interactive technical callouts and laser-tolerance inspection cards (±0.05 mm alignment) for AutoClub Merter's services.",
      },
      {
        metric: "Trilingual Corporate UX (TR / EN / AR)",
        description:
          "Seamless switching across Turkish, English, and full RTL Arabic across corporate overview, project pages, and lead forms.",
      },
    ],
    clientProof:
      "This is a live commercial company website deployed for Genç Group in Istanbul (Genç Group İnşaat in Zeytinburnu & AutoClub Merter in Platform Merter Suites). Live at gencgroupinsaat.com.tr, with the developer interactive architectural studio credited at gencgroupinsaat.com.tr/case-study.",
    cta: "Need a high-authority corporate website or interactive product platform for your company? Contact Hamed directly.",
    liveUrl: "https://www.gencgroupinsaat.com.tr",
    statusBadge: "Live in Production",
    images: [
      {
        src: "/case-studies/genc-group/hero.png",
        alt: "Genç Group Corporate Platform Homepage",
        caption: "Unified corporate platform uniting Genç Group İnşaat and AutoClub Merter in Istanbul",
      },
      {
        src: "/case-studies/genc-group/case-study.png",
        alt: "Genç Group Interactive 3D & Architectural Studio",
        caption: "Interactive architectural massing, material, and lighting concept workbench",
      },
      {
        src: "/case-studies/genc-group/mobile.png",
        alt: "Genç Group Mobile Corporate Experience",
        caption: "Responsive mobile layout built for executive and client discovery",
      },
    ],
  },
  {
    slug: "cihangir-ev-yemekleri-platform",
    title: "Cihangir Ev Yemekleri & Pide: 10-Language Restaurant & Admin Platform",
    metaTitle: "Cihangir Ev Yemekleri Case Study | Hamed Mohamed",
    metaDescription:
      "How Hamed Mohamed engineered cihangirevyemekler.com.tr: 970+ static pages across 10 languages (RTL), 6 live currencies, PostgreSQL + Prisma, and an Argon2 admin portal.",
    category: "Full-Stack · Next.js 16 · Restaurant Platform & Admin Portal",
    year: "2026",
    tags: [
      "Next.js 16",
      "React 19",
      "PostgreSQL",
      "Prisma ORM",
      "Argon2 Auth",
      "10 Languages (RTL)",
      "6 Live Currencies",
      "970+ SSG Pages",
    ],
    heroStat: { value: "970+", label: "Prerendered Static Pages (10 Languages)" },
    problem:
      "Located in Cihangir, Beyoğlu, one of Istanbul's busiest tourist and residential districts, Cihangir Ev Yemekleri & Pide serves 85+ daily home-cooked stews and wood-fired pides to locals and international guests. They needed a flagship digital menu platform capable of serving 10 languages cleanly (including Arabic and Persian RTL), showing real-time prices across 6 currencies, managing changing Daily Menu specials and price history in PostgreSQL without engineering help, and delivering instant zero-FOUC mobile performance.",
    solution:
      "Built a full-stack Next.js 16 (App Router + Turbopack) and PostgreSQL + Prisma 7 platform generating 970+ static locale/dish pages at build time. Designed a self-healing database layer with 12 relational models (Products, Categories, DailyMenu, Offers, PriceHistory, AuditLog, AdminUser) and multi-language translation tables. Built an authenticated Admin Portal protected with Argon2 password hashing, RBAC, and complete audit logging for real-time daily pot updates. Engineered a 318 KB 10-layer WebP Smart Splash entrance (0 ms FOUC) and live currency conversion via /api/rates.",
    technologies: [
      "Next.js 16 (App Router & Turbopack SSG)",
      "React 19 & TypeScript",
      "PostgreSQL + Prisma 7 ORM (12 Models)",
      "Argon2 Authentication & Audit Logging",
      "10-Language Dynamic Routing + RTL",
      "Live Multi-Currency Exchange API",
      "Schema.org Restaurant & Menu Rich Snippets",
      "Vercel Analytics",
    ],
    results: [
      {
        metric: "970+ SSG Pages Across 10 Languages",
        description:
          "Dedicated localized routes for every dish, category, allergen notice, and legal page across TR, EN, AR, RU, FA, FR, DE, IT, ES, and ZH.",
      },
      {
        metric: "Self-Healing PostgreSQL + Prisma 7 Schema",
        description:
          "12 relational tables tracking daily menus, multi-item offers, historical price changes, and admin audit logs.",
      },
      {
        metric: "Argon2-Secured Owner Admin Dashboard",
        description:
          "Role-based dashboard enabling instant updates to daily hot pots, stock availability, and promotional offers.",
      },
      {
        metric: "85+ Catalog Dishes · 6 Live Currencies",
        description:
          "Instant currency switching across TRY, USD, EUR, GBP, RUB, and SAR with zero-FOUC 10-layer WebP splash craft.",
      },
    ],
    clientProof:
      "This is a live production commercial platform running at cihangirevyemekler.com.tr in Beyoğlu, Istanbul. The official developer case study and interactive UI showcase are published live at cihangirevyemekler.com.tr/tr/tasarim-gelistirme.",
    cta: "Want a high-speed 10-language restaurant platform with a real PostgreSQL admin dashboard? Get in touch with Hamed.",
    liveUrl: "https://www.cihangirevyemekler.com.tr",
    statusBadge: "Live in Production",
    images: [
      {
        src: "/case-studies/cihangir-ev-yemekleri/hero.png",
        alt: "Cihangir Ev Yemekleri & Pide Desktop Homepage",
        caption: "10-language editorial storefront built for locals and Beyoğlu tourists",
      },
      {
        src: "/case-studies/cihangir-ev-yemekleri/menu.png",
        alt: "Cihangir Ev Yemekleri Interactive Menu & Live Currencies",
        caption: "85+ home-cooked stews and pide dishes with instant currency switching",
      },
      {
        src: "/case-studies/cihangir-ev-yemekleri/mobile.png",
        alt: "Cihangir Ev Yemekleri Mobile QR Menu Experience",
        caption: "Fast mobile menu designed for table QR scanning in Cihangir, Istanbul",
      },
    ],
  },
  {
    slug: "lucky-sushi-multi-branch-platform",
    title: "Lucky Sushi & Chinese: 3-Branch Asian Delivery Platform",
    metaTitle: "Lucky Sushi & Chinese Case Study | Hamed Mohamed",
    metaDescription:
      "How Hamed Mohamed built luckysushichinese.com.tr: a 3-branch Istanbul late-night Asian food ordering platform in 5 languages using Next.js 16, next-intl, and Supabase.",
    category: "Full-Stack · Next.js · Multi-Branch Restaurant Platform",
    year: "2026",
    tags: [
      "Next.js 16",
      "React 19",
      "next-intl",
      "Supabase",
      "5 Languages (RTL + ZH)",
      "3 Branches Routing",
      "WhatsApp Checkout",
      "JSON-LD SEO",
    ],
    heroStat: { value: "3 Branches", label: "Istanbul Late-Night Kitchens · 5 Languages" },
    problem:
      "Lucky Sushi & Chinese operates three specialized kitchens across European Istanbul. Alibeyköy HQ (dine-in + delivery open until 04:00 AM), Zeytinburnu (pickup + delivery until 03:00 AM), and Reşitpaşa/Sarıyer (cloud delivery kitchen until 03:00 AM). A generic single-branch menu confused customers about service types, closing hours, and coverage zones, while international customers in Istanbul needed natural menus in Turkish, English, Arabic, Russian, and Chinese.",
    solution:
      "Architected a branch-aware multilingual ordering platform with Next.js App Router, React 19, next-intl, and Supabase. Built centralized single-source-of-truth branch configuration and delivery-zone matching so diners immediately see their nearest kitchen's operating hours, fulfillment modes (dine-in, pickup, or delivery-only), and WhatsApp dispatch line. Implemented 5-language SEO routing (TR, EN, AR, RU, ZH) with full RTL Arabic layout switching, reciprocal hreflang tags, dynamic sitemaps, and Restaurant + BreadcrumbList JSON-LD schemas.",
    technologies: [
      "Next.js 16 App Router (SSG)",
      "React 19",
      "next-intl (5-Language I18n & RTL)",
      "Supabase",
      "Branch-Aware Cart & Delivery Zone Routing",
      "Direct WhatsApp Branch Dispatch",
      "JSON-LD Restaurant Schema & Sitemap",
      "Vercel Analytics",
    ],
    results: [
      {
        metric: "3-Branch Istanbul Kitchen Routing",
        description:
          "Coordinates Alibeyköy (till 04:00), Zeytinburnu (till 03:00), and Reşitpaşa/Sarıyer with branch-specific delivery zones and direct kitchen WhatsApp routing.",
      },
      {
        metric: "5 Native Languages (TR / EN / AR / RU / 中文)",
        description:
          "Complete localized UX including full right-to-left Arabic interface and Asian script typography.",
      },
      {
        metric: "Zero-Commission Direct WhatsApp Orders",
        description:
          "Mobile-first cart prepares itemized orders routed directly to the selected branch without marketplace fees.",
      },
      {
        metric: "Full Local SEO Coverage Across Istanbul",
        description:
          "Dynamic per-dish slugs, reciprocal hreflang matrix across all 5 languages, and Restaurant structured data.",
      },
    ],
    clientProof:
      "This is a live multi-branch commercial website serving customers across Istanbul at luckysushichinese.com.tr. The official developer case study and interactive mobile flow simulator are published at luckysushichinese.com.tr/en/tasarim-gelistirme.",
    cta: "Running a multi-branch restaurant or cloud kitchen chain? Let Hamed build your unified ordering platform.",
    liveUrl: "https://www.luckysushichinese.com.tr",
    statusBadge: "Live in Production",
    images: [
      {
        src: "/case-studies/lucky-sushi/hero.png",
        alt: "Lucky Sushi & Chinese Desktop Homepage",
        caption: "5-language storefront serving Alibeyköy, Zeytinburnu, and Sarıyer in Istanbul",
      },
      {
        src: "/case-studies/lucky-sushi/menu.png",
        alt: "Lucky Sushi & Chinese Menu & Branch Selector",
        caption: "Extensive sushi, wok, and ramen catalog with branch-aware WhatsApp ordering",
      },
      {
        src: "/case-studies/lucky-sushi/mobile.png",
        alt: "Lucky Sushi & Chinese Mobile Menu View",
        caption: "Late-night mobile ordering flow built for fast conversion",
      },
    ],
  },
  {
    slug: "healix-medical-platform",
    title: "Healix Medical: 5-Language International Patient Coordination Platform",
    metaTitle: "Healix Medical Case Study | 5-Language Next.js Healthcare Platform | Hamed Mohamed",
    metaDescription:
      "Case study: 5-language international patient coordination platform in Istanbul with 142 static pages, Arabic RTL, 33 facilities, and #1 Google brand rank.",
    category: "Corporate & Healthcare Platforms · Next.js 16 · Multilingual SEO & GEO",
    year: "2026",
    tags: [
      "Next.js 16.4 (SSG)",
      "React 19 RSC",
      "TypeScript 5",
      "Tailwind CSS v4 (Logical RTL)",
      "5 Languages (AR / EN / FR / RU / TR)",
      "Build-Time i18n Gate",
      "Technical SEO + GEO (llms.txt)",
      "Privacy-First Enquiry API",
    ],
    heroStat: {
      value: "#1 on Google · 142 SSG Pages",
      label: "5 languages (native Arabic RTL), 12 medical specialties, 3 legal guides & 33 contracted facilities",
    },
    problem:
      "Healix Medical, an Istanbul-based international patient coordination company, had no official website, causing prospective international patients to land on third-party marketplaces instead. They needed an authoritative, privacy-first platform across 5 languages (Arabic RTL, English, French, Russian, and Turkish) covering 12 medical coordination specialties, 3 Turkish transplant law guides, and a searchable directory of 33 contracted hospitals without collecting sensitive medical files on-site or making clinical promises.",
    solution:
      "I designed and engineered the platform end-to-end using Next.js 16.4 App Router, React 19 Server Components, and Tailwind CSS v4 logical properties. I built a zero-dependency prebuild i18n verification gate (validate-i18n.mjs) enforcing 100% key parity across 4,395 translated strings before compilation. For search and AI discovery, I implemented a 135-URL multilingual XML image sitemap with reciprocal hreflang tags, resolved www vs non-www canonical alignment, added an AI-crawler-aware Edge Proxy serving instant 200 OK SSR responses, and shipped a privacy-first enquiry API with honeypot and fill-duration anti-bot guards.",
    technologies: [
      "Next.js 16.4 (App Router & Static Site Generation)",
      "React 19 Server Components",
      "TypeScript 5",
      "Tailwind CSS v4 Logical Properties (0.00 CLS Native Arabic RTL)",
      "Build-Time i18n Schema Verifier (validate-i18n.mjs · 4,395 strings)",
      "135-URL Multilingual XML Image Sitemap & Reciprocal Hreflang",
      "AI-Crawler Edge Proxy + /llms.txt & /llms-full.txt (GEO)",
      "Privacy-First Webhook / Resend Enquiry API + Anti-Bot Guards",
    ],
    results: [
      {
        metric: "#1 Google Ranking for Brand Queries",
        description:
          "Ranked #1 on Google for 'healix istanbul' shortly after launch, with 110+ localized URLs discovered and indexed in Google Search Console.",
      },
      {
        metric: "142 Static Pages Across 5 Languages",
        description:
          "Pre-rendered across Arabic (100% native RTL), English, French, Russian, and Turkish covering 12 specialties and 3 Turkish transplant law guides.",
      },
      {
        metric: "33-Facility Interactive Healthcare Directory",
        description:
          "Searchable registry of 33 contracted hospitals and university centers across 13 Turkish cities (Medical Park, Liv Hospital, İstinye & Aydın University).",
      },
      {
        metric: "Privacy-First Architecture & Zero Clinical Drift",
        description:
          "Strict coordination-only compliance, zero patient medical file storage, zero third-party ad pixels, and automated build-time i18n parity enforcement.",
      },
    ],
    clientProof:
      "This is a live production platform operating at healixistanbul.com.tr across 5 languages. The dedicated developer attribution and bilingual architecture breakdown are published directly on the client's domain at healixistanbul.com.tr/en/tasarim-gelistirme and healixistanbul.com.tr/ar/tasarim-gelistirme.",
    cta: "Need a multilingual healthcare, corporate, or international client coordination platform that ranks on Google and AI search? Contact Hamed Mohamed.",
    liveUrl: "https://www.healixistanbul.com.tr",
    statusBadge: "Live in Production",
    images: [
      {
        src: "/case-studies/healix-medical/hero-en.png",
        alt: "Healix Medical Desktop Homepage in English (LTR)",
        caption: "Desktop (1440×900) English LTR storefront with navy world-map hero and clear clinical coordination boundaries",
      },
      {
        src: "/case-studies/healix-medical/hero-ar.png",
        alt: "Healix Medical Desktop Homepage in Arabic (Native RTL)",
        caption: "Desktop (1440×900) Arabic native RTL architecture with zero layout shift (0.00 CLS)",
      },
      {
        src: "/case-studies/healix-medical/service-ar.png",
        alt: "Healix Medical Arabic Liver Transplantation Service Detail Page",
        caption: "Desktop service detail page combining anatomical visual clarity with strict coordination-only medical disclaimers",
      },
      {
        src: "/case-studies/healix-medical/tablet-facilities.png",
        alt: "Healix Medical Tablet View of 33 Contracted Healthcare Facilities Directory",
        caption: "Tablet (820×1080) interactive directory filtering 33 contracted hospitals across 13 Turkish cities",
      },
      {
        src: "/case-studies/healix-medical/mobile-en.jpg",
        alt: "Healix Medical Mobile View of Transplant Ethics Commission Guide (English)",
        caption: "Mobile (390×844) English legal guide explaining Turkish Transplant Ethics Commission document preparation",
      },
      {
        src: "/case-studies/healix-medical/mobile-ar.jpg",
        alt: "Healix Medical Mobile View of Transplant Ethics Commission Guide (Arabic RTL)",
        caption: "Mobile (390×844) Arabic RTL counterpart of the same legal guide with full typographic parity",
      },
    ],
  },
];
