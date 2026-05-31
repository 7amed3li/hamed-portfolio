# Hamed Mohamed — Engineering Portfolio & Native Blog

> The personal portfolio and technical blog of Hamed Mohamed, a Full-Stack Software Engineer specializing in Node.js, Application Security, and High-Throughput Backend Systems.

🌍 **Live Site:** [hamedmohamed.dev](https://hamedmohamed.dev)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)
![Velite](https://img.shields.io/badge/Velite-MDX_Engine-purple?style=flat)

---

## 🏗️ Architecture & Core Features

This project isn't just a static portfolio; it's a production-grade, SEO-optimized web application engineered for maximum performance and global reach.

### 1. 🌐 Full Internationalization (i18n)
- Natively supports **English (`en`), Arabic (`ar`), and Turkish (`tr`)**.
- Uses Next.js App Router `[lang]` dynamic segments.
- Custom translation engine with strict typing for all localized strings.
- Bi-directional support (RTL for Arabic, LTR for EN/TR) dynamically injected into the `<html>` tag.

### 2. 📝 Git-Backed MDX Blog (Velite)
- **Type-Safe Content:** Uses [Velite](https://velite.js.org/) and Zod to parse, validate, and compile MDX files at build time. If a post is missing required frontmatter, the build fails.
- **Custom Components:** MDX articles support custom React components (e.g., `<Callout />`, `<CodeBlock />`, `<CTA />`).
- **Interactive UI:** Real-time client-side search and tag filtering using Framer Motion layout animations.

### 3. 🔍 Advanced SEO & Discoverability
- **JSON-LD Schema.org:** Dynamically injected structured data (`Person`, `WebSite`, `BlogPosting`) for rich Google Search results.
- **Dynamic Metadata:** Programmatically generated `generateMetadata` for dynamic OpenGraph tags, Twitter Cards, and canonical URLs.
- **Global Indexing:** Automated `sitemap.ts` and `hreflang` tags to link translated versions of the same page.
- **RSS Feed:** Programmatically generated `rss.xml` for content syndication.

### 4. ⚡ Performance & Observability
- **Zero Database:** The entire app and blog compile to static HTML/JSON during the build process, resulting in sub-50ms response times globally via Vercel's Edge Network.
- **Analytics & Insights:** Integrated `@vercel/analytics` and `@vercel/speed-insights` for real-time monitoring of Core Web Vitals and user behavior.
- **Contact Form:** Serverless AJAX form submission via FormSubmit, completely decoupling the frontend from email-sending overhead.

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js (App Router) | Server Components, Routing, SSG |
| **Language** | TypeScript | End-to-end type safety |
| **Styling** | Tailwind CSS + CSS Vars | Responsive design, Dark mode |
| **Animation** | Framer Motion | Fluid micro-interactions & page transitions |
| **Content Engine** | Velite + Zod + MDX | Compiling and validating markdown articles |
| **Syntax Highlighting** | Rehype Pretty Code | VS Code-like code blocks in the blog |
| **Deployment** | Vercel | Global CDN, Edge Caching, CI/CD |

---

## 📂 Project Structure

```text
├── public/                 # Static assets (fonts, CV, blog covers)
├── src/
│   ├── app/                
│   │   ├── [lang]/         # Internationalized App Router (en, ar, tr)
│   │   ├── rss.xml/        # Dynamic RSS Feed Route
│   │   └── sitemap.ts      # Dynamic Sitemap Generator
│   ├── components/         # Reusable React UI Components
│   ├── content/blog/       # Raw MDX files categorized by language
│   ├── contexts/           # React Contexts (Language Provider)
│   ├── lib/                # Utilities, Translations, and Blog logic
│   └── middleware.ts       # Language redirection & route protection
├── velite.config.ts        # MDX schema & content modeling definitions
└── next.config.ts          # Next.js bundler configuration
```

---

## 🛠️ Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/7amed3li/hamed-portfolio.git

# 2. Install dependencies
npm install

# 3. Start the development server (localhost:3000)
npm run dev

# 4. Run a production build test
npm run build
```

---

## 📝 Authoring Blog Posts (For AI & Devs)

We use a strict Git-backed workflow for publishing case studies.
For detailed instructions on adding new articles, including frontmatter schema and image handling, please refer to the [AI Blog Authoring Guide](./AI_BLOG_AUTHORING_GUIDE.md).

---

## 📬 Contact

- **Email:** hamed.m.abdelalim@gmail.com
- **LinkedIn:** [Hamed Mohamed](https://www.linkedin.com/in/hamed-mohamed/)
- **GitHub:** [@7amed3li](https://github.com/7amed3li)
