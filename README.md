# Hamed Mohamed — Portfolio

> Personal portfolio of Hamed Mohamed, Full-Stack Engineer specializing in Node.js, Application Security, and High-Throughput Backend Systems.

**Live site:** [hamed.dev](https://hamed.dev) *(coming soon)*

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| Font | Inter + JetBrains Mono |
| Deployment | Vercel |

---

## Key Features

- **Scramble Text Effect** — Name animates character-by-character on load
- **Magnetic Buttons** — Physics-based cursor attraction on CTAs
- **Sticky Scroll Numbers** — IntersectionObserver-driven project counter
- **Boot Terminal** — Animated server-log sequence in the Hero section
- **Sliding Nav Pill** — Framer Motion `layoutId` hover animation on desktop nav
- **Hand-Drawn SVG Highlight** — Animated underline on the About heading
- **Console Easter Egg** — Message for developers who open DevTools
- **Status Widget** — Live clock with availability status (bottom-right)

---

## Performance (Production Build)

```
Route (app)          Size
─────────────────────────
○ /                  static
○ /_not-found        static

Build: ✓ Exit code 0
TypeScript: ✓ No errors
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build check
npm run build
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Page composition
│   └── globals.css         # Design tokens (CSS variables)
├── components/
│   ├── sections/           # Page sections (Hero, About, Projects...)
│   └── ui/                 # Reusable components (MagneticButton, ScrambleText...)
public/
│   ├── logo.png            # Personal logo
│   └── Hamed_Mohamed_CV.pdf
```

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import repo
3. No env vars needed — deploy as-is
4. Vercel auto-detects Next.js. Hit **Deploy**.

---

## Contact

- **Email:** hamed.m.abdelalim@gmail.com
- **GitHub:** [github.com/7amed3li](https://github.com/7amed3li)
- **Phone:** +90 506 045 3906
