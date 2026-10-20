import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { t } from "../../src/lib/translations";

/**
 * Content consistency checks (source-level + rendered).
 *
 * The GPA value was confirmed by the site owner as 3.5/4.0 (2026-10-20).
 * Facts listed in reports/site-audit/CONTENT_CREDIBILITY_AUDIT.md as
 * "awaiting owner confirmation" are intentionally NOT asserted here.
 */

const ROOT = path.resolve(__dirname, "../..");
const CONFIRMED_GPA = "3.5";

function walk(dir: string, exts: string[], out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(p);
  }
  return out;
}

const contentFiles = [
  ...walk(path.join(ROOT, "src"), [".ts", ".tsx", ".mdx"]),
  path.join(ROOT, "public", "llms.txt"),
  path.join(ROOT, "public", "llms-full.txt"),
  path.join(ROOT, "cv.md"),
];

test("GPA is consistent (owner-confirmed 3.5/4.0) across all content sources", () => {
  const found: string[] = [];
  for (const f of contentFiles) {
    const text = fs.readFileSync(f, "utf8");
    for (const m of text.matchAll(/(\d\.\d{1,2})\s*\/\s*4(?:\.0)?\b/g)) {
      if (m[1] !== CONFIRMED_GPA) found.push(`${path.relative(ROOT, f)}: ${m[0]}`);
    }
  }
  expect(found).toEqual([]);
});

test("QR system scope is described consistently (6 faculties, users not daily users)", () => {
  const issues: string[] = [];
  for (const f of contentFiles) {
    const text = fs.readFileSync(f, "utf8");
    const rel = path.relative(ROOT, f);
    if (/7 faculties|7 fakülte|7 كليات/i.test(text)) issues.push(`${rel}: '7 faculties' contradicts CV (6)`);
    if (/2,000\+ daily users|2\.000\+ günlük kullanıcı|2,000\+ مستخدم يومي|مستخدم نشط يومياً/i.test(text))
      issues.push(`${rel}: '2,000+ daily users' contradicts CV (2,000+ users, ~300 DAU)`);
  }
  expect(issues).toEqual([]);
});

function shape(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) return [`${prefix}[]`];
  if (obj && typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => shape(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

test("translation dictionaries have identical key structure", () => {
  const en = shape(t.en).sort();
  expect(shape(t.tr).sort()).toEqual(en);
  expect(shape(t.ar).sort()).toEqual(en);
});

test.describe("blog listing localisation (I18N-01)", () => {
  const forbiddenEnglish = ["Engineering Notes", "Case studies, performance optimizations", "Engineering Blog |"];
  for (const lang of ["tr", "ar"] as const) {
    test(`/${lang}/blog has no English UI strings and uses locale dates`, async ({ page }) => {
      await page.goto(`/${lang}/blog`);
      const h1 = (await page.locator("h1").innerText()).trim();
      const title = await page.title();
      const body = await page.locator("main").innerText();
      for (const s of forbiddenEnglish) {
        expect(h1).not.toContain(s);
        expect(title).not.toContain(s);
        expect(body).not.toContain(s);
      }
      // English short month names must not appear in the date stamps.
      const dates = await page.locator("main time").allInnerTexts();
      expect(dates.length).toBeGreaterThan(0);
      for (const d of dates) {
        if (lang === "tr") {
          expect(d).not.toMatch(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
        } else {
          expect(d).not.toMatch(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
        }
      }
      if (lang === "tr") expect(dates.join(" ")).toMatch(/Oca|Şub|Mar|Nis|May|Haz|Tem|Ağu|Eyl|Eki|Kas|Ara/);
    });
  }

  for (const lang of ["tr", "ar"] as const) {
    test(`/${lang} home + article pages have no stray English UI labels`, async ({ page }) => {
      await page.goto(`/${lang}`);
      const home = await page.locator("main").innerText();
      expect(home).not.toMatch(/View all posts|Try Again/);
      await page.goto(`/${lang}/blog/how-i-stopped-nodejs-from-freezing`);
      const dates = await page.locator("main time").allInnerTexts();
      for (const d of dates) expect(d).not.toMatch(/\b(January|February|March|April|May(?!ıs)|June|July|August|September|October|November|December)\b/u);
    });
  }
});
