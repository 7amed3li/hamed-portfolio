# AI Blog Authoring Guide (Native MDX Hub)

This document provides strict instructions for any AI assistant or developer adding a new blog post to this Next.js project. The blog uses **Velite** with strict Zod validation for MDX files.

## 📁 1. Directory Structure
Articles must be created as `.mdx` files in their respective language directories:
- **English:** `src/content/blog/en/`
- **Arabic:** `src/content/blog/ar/`
- **Turkish:** `src/content/blog/tr/`

## 🖼️ 2. Image Handling & Generation (CRITICAL)
- **Uniqueness Requirement:** NEVER reuse the same cover image for different blog posts. You MUST generate or request a unique, highly relevant, visually stunning cover image for EVERY new post.
- **Location:** ALL images (covers or content images) MUST be saved inside `public/static/blog/`.
- **Naming:** Use lowercase, hyphenated names relevant to the post topic (e.g., `jwt-security-cover.png`).
- **Referencing in MDX:** Always use the absolute web path starting with `/static/blog/`. Do NOT use relative paths like `../../public`.
  - *Example in Frontmatter:* `coverImage: "/static/blog/post-cover.png"`
  - *Example in Content:* `![Alt Text](/static/blog/post-cover.png)`

## 📋 3. Frontmatter Schema (Zod Validated)
Every MDX file must start with exactly this Frontmatter block. If any required field is missing or typed incorrectly, the Next.js build WILL FAIL.

```yaml
---
title: "Article Title Here (Max 60 chars)"
description: "Brief SEO description here (Max 160 chars)"
slug: "unique-url-slug-without-spaces"
lang: "en" # 'en', 'ar', or 'tr' MUST MATCH FOLDER
date: "YYYY-MM-DD" # e.g., "2026-06-01"
author: "Hamed Mohamed"
tags: ["node", "performance", "security"] # Array of lowercase strings
series: "Name of Series" # (Optional) Use if part of a multi-part series
coverImage: "/static/blog/your-cover-image.png" # Required! Must exist in public/static/blog/
published: true # Set to false if it is a draft
featured: false # Set to true to show on the Home Page
---
```

## 🧩 4. Custom React Components (MDX)
You can use the following custom React components directly inside the Markdown text:

### A. Callouts (Alerts)
Used to highlight important information, warnings, or tips.
```tsx
<Callout type="info">
This is an informational note.
</Callout>

<Callout type="warning">
This is a warning or critical note.
</Callout>

<Callout type="danger">
This is a danger alert (e.g., security vulnerabilities).
</Callout>
```

### B. CTA (Call To Action)
Should be placed at the very end of EVERY engineering article to convert readers into clients. It automatically translates based on the `lang` prop passed natively by the system.
```tsx
<CTA />
```

## 📝 5. Content Guidelines
1. **Engineering Tone:** Posts should be framed as "Case Studies" or "War Stories" rather than generic tutorials. Focus on *Problem -> Context -> Impact -> Solution -> Results*.
2. **Code Blocks:** Always specify the language for syntax highlighting.
   ````markdown
   ```typescript
   function example() {
     return true;
   }
   ```
   ````
3. **Internal Links:** When linking to other parts of the site, always prefix with the language variable. (e.g., `[Contact Me](/en#contact)`).

## 🚀 AI Agent Workflow Example
If the USER asks: *"Write an article about JWT security for my blog in Arabic"*:
1. Generate a brand new, highly relevant cover image for JWT Security using your internal image generation tools.
2. Tell the user you are saving the cover image to `public/static/blog/jwt-security-cover.png`.
3. Generate the article content in Arabic.
4. Create the file `src/content/blog/ar/jwt-security.mdx`.
5. Ensure the frontmatter is populated exactly as defined above (e.g., `lang: "ar"`, `coverImage: "/static/blog/jwt-security-cover.png"`).
6. Add `<CTA />` at the bottom of the content.
