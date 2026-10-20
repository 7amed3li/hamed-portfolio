import { test, expect, type Page } from "@playwright/test";
import { HISTORICAL_ROUTES, VIEWPORTS } from "./routes";

/**
 * RSP regression matrix: every historical route × 11 viewports.
 *
 * A page passes when document.documentElement.scrollWidth <= innerWidth.
 * On failure the test reports the elements that extend past the viewport and
 * are NOT clipped by a scrolling/hidden ancestor, which points at the root
 * cause rather than the symptom.
 */

type OverflowResult = {
  innerWidth: number;
  scrollWidth: number;
  offenders: string[];
};

async function measureOverflow(page: Page): Promise<OverflowResult> {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const describe = (el: Element) => {
      const id = el.id ? `#${el.id}` : "";
      const cls =
        typeof el.className === "string" && el.className
          ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
          : "";
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    };
    const clippedByAncestor = (el: Element) => {
      let p = el.parentElement;
      while (p && p !== document.body && p !== document.documentElement) {
        const ox = getComputedStyle(p).overflowX;
        if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") return true;
        p = p.parentElement;
      }
      return false;
    };
    const offenders: string[] = [];
    for (const el of Array.from(document.body.querySelectorAll("*"))) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const style = getComputedStyle(el);
      if (style.position === "fixed") continue;
      if (r.right > vw + 1 || r.left < -1) {
        if (!clippedByAncestor(el)) {
          offenders.push(`${describe(el)} [${Math.round(r.left)}→${Math.round(r.right)}]`);
        }
      }
      if (offenders.length >= 8) break;
    }
    return {
      innerWidth: vw,
      scrollWidth: document.documentElement.scrollWidth,
      offenders,
    };
  });
}

for (const route of HISTORICAL_ROUTES) {
  test(`no horizontal overflow: ${route}`, async ({ page }) => {
    const res = await page.goto(route, { waitUntil: "load" });
    expect(res?.status(), `${route} should resolve with 200`).toBe(200);
    // Allow entrance animations / fonts to settle.
    await page.waitForTimeout(400);

    const failures: string[] = [];
    for (const vp of VIEWPORTS) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(150);
      const m = await measureOverflow(page);
      if (m.scrollWidth > m.innerWidth) {
        failures.push(
          `${vp.width}x${vp.height}: scrollWidth=${m.scrollWidth} > innerWidth=${m.innerWidth}` +
            (m.offenders.length ? `\n      offenders: ${m.offenders.join(", ")}` : "")
        );
        await page.screenshot({
          path: `test-results/overflow/${route.replace(/\//g, "_")}_${vp.width}x${vp.height}.png`,
        });
      }
    }
    expect(failures, `Overflow on ${route}:\n  ${failures.join("\n  ")}`).toEqual([]);
  });
}

test.describe("code blocks contain their own horizontal scroll", () => {
  const articles = HISTORICAL_ROUTES.filter((r) => r.includes("/blog/"));
  for (const route of articles) {
    test(`code blocks scroll internally: ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto(route, { waitUntil: "load" });
      const blocks = await page.evaluate(() =>
        Array.from(document.querySelectorAll("article pre")).map((pre) => {
          const r = pre.getBoundingClientRect();
          const cs = getComputedStyle(pre);
          return {
            right: r.right,
            left: r.left,
            overflowX: cs.overflowX,
            scrollable: pre.scrollWidth > pre.clientWidth,
            tabIndex: (pre as HTMLElement).tabIndex,
          };
        })
      );
      expect(blocks.length, "article should contain code blocks").toBeGreaterThan(0);
      for (const b of blocks) {
        expect(b.right).toBeLessThanOrEqual(321);
        expect(b.left).toBeGreaterThanOrEqual(-1);
        expect(["auto", "scroll"]).toContain(b.overflowX);
        // Scrollable regions must be keyboard reachable (WCAG 2.1.1).
        if (b.scrollable) expect(b.tabIndex).toBeGreaterThanOrEqual(0);
      }
    });
  }
});

test.describe("contact email link on narrow screens", () => {
  for (const lang of ["en", "tr", "ar"]) {
    test(`email wraps and stays a mailto link: /${lang}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto(`/${lang}#contact`, { waitUntil: "load" });
      const link = page.locator('#contact a[href^="mailto:"]').first();
      await expect(link).toHaveAttribute("href", "mailto:hamed.m.abdelalim@gmail.com");
      await link.scrollIntoViewIfNeeded();
      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(320);
    });
  }
});
