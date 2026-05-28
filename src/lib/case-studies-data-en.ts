import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  {
    slug: "qr-attendance-system",
    title: "QR Attendance System",
    metaTitle: "QR Attendance System Case Study — Hamed Mohamed",
    metaDescription:
      "How Hamed Mohamed built a QR-based attendance system for 2,000+ students across 7 faculties, achieving 98% latency reduction and 99.9% uptime.",
    category: "Full-Stack System · Performance Engineering",
    year: "2024–Present",
    tags: ["Node.js", "React.js", "PostgreSQL", "Redis", "Docker", "QR", "Admin Dashboard"],
    heroStat: { value: "2,000+", label: "Daily Users in Production" },
    problem:
      "A university needed to track attendance for thousands of students across 7 different faculties. The existing process was manual — paper registers, spreadsheets, and a lot of wasted time for instructors. The system had to handle peak load when hundreds of students scan at the same time at the start of a lecture, work on any phone without an app, give admins a dashboard to view and export records, and stay up 100% of the time during working hours.",
    solution:
      "Hamed designed and built a complete QR-based attendance system. Students scan a QR code displayed in class — it opens in their browser, records attendance instantly, and closes. Each QR code is time-limited to prevent cheating. Instructors and faculty admins log into a dashboard to see records, generate reports, and manage the system. On the backend, Hamed built a hybrid verification pipeline: fast in-memory checks for speed, database confirmation for accuracy, and automatic fallback if any part fails. Redis caching was added to dramatically reduce database load during peak scanning times.",
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
        description: "System now handles up to 653 requests per second — able to process hundreds of students scanning at the same moment.",
      },
      {
        metric: "2,000+ daily users",
        description: "The system runs in production daily for students and faculty across 7 university faculties.",
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
    cta: "If you need an attendance system for your school, company, or event — Hamed can build one for you.",
  },
  {
    slug: "nodesecure-open-source",
    title: "NodeSecure Open-Source Security Contributions",
    metaTitle: "NodeSecure Open-Source Contributions — Hamed Mohamed",
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
        metric: "PR #452 — Insecure Random Probe",
        description: "Built a probe that flags use of Math.random() in security-sensitive contexts, helping developers avoid a common cryptography mistake.",
      },
      {
        metric: "PR #462 — SSRF Detection",
        description: "Improved the shady-url checker to better detect localhost references and SSRF-risky URL patterns in Node.js code.",
      },
      {
        metric: "PR #456 — Sensitivity Option",
        description: "Added conservative/aggressive sensitivity modes across AstAnalyser, ProbeRunner, and SourceFile — without breaking any existing behavior.",
      },
      {
        metric: "PR #467 — Named Main Handlers",
        description: "Added the Named Main Handlers pattern to isSerializeEnv so probes can handle multiple validation scenarios cleanly.",
      },
      {
        metric: "PR #468 — Email Literal Detection",
        description: "Implemented email literal collection using the CollectableSet API, with 5 comprehensive test cases.",
      },
      {
        metric: "PR #496 — Benchmarking Infrastructure",
        description: "Built a complete benchmarking setup using mitata to track AST analysis performance across NodeSecure releases.",
      },
    ],
    clientProof:
      "These contributions are public and verifiable on GitHub under the NodeSecure organization. They demonstrate Hamed's ability to work on real security tooling, understand complex AST analysis code, and contribute clean, tested improvements to a production open-source project used by developers globally.",
    cta: "If you need security expertise applied to your application — code review, vulnerability scanning, or security architecture — Hamed can help.",
  },
  {
    slug: "dragonsploit",
    title: "DragonSploit — AI-Powered Vulnerability Scanner",
    metaTitle: "DragonSploit AI Vulnerability Scanner — Hamed Mohamed",
    metaDescription:
      "How Hamed Mohamed built DragonSploit, an AI-powered vulnerability scanning platform with intent-based orchestration and stack-aware scanning that reduced false positives by 70%.",
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
        description: "The engine interprets scanning intent and dynamically selects strategies — no manual configuration required.",
      },
      {
        metric: "AI hallucination protection",
        description: "A deterministic validation layer confirms AI-generated findings before they're reported, ensuring accuracy.",
      },
    ],
    clientProof:
      "DragonSploit demonstrates Hamed's ability to combine AI capabilities with practical security engineering — building systems that are not just technically impressive but actually more accurate and useful than traditional approaches.",
    cta: "If you need a security review of your application or want to discuss a custom security tool — contact Hamed.",
  },
];
