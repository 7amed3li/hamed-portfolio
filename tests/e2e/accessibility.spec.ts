import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { LOCALES } from "./routes";

/**
 * A11Y-01: mobile menu semantics + keyboard behaviour, and automated axe-core
 * scans of representative templates in all three locales.
 *
 * axe-core only detects a subset of WCAG failures; manual screen-reader and
 * device testing is still required (see reports/site-audit).
 */

test.describe("mobile menu (A11Y-01)", () => {
  for (const lang of LOCALES) {
    test(`menu semantics and keyboard behaviour: /${lang}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/${lang}`, { waitUntil: "load" });

      const trigger = page.locator("#mobile-menu-trigger");
      await expect(trigger).toBeVisible();
      expect(await trigger.evaluate((el) => el.tagName)).toBe("BUTTON");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(trigger).toHaveAttribute("aria-controls", "mobile-menu");
      const name = await trigger.getAttribute("aria-label");
      expect(name && name.trim().length).toBeTruthy();

      // Open with keyboard.
      await trigger.focus();
      await page.keyboard.press("Enter");
      const menu = page.locator("#mobile-menu");
      await expect(menu).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      // Focus moves into the menu.
      await expect
        .poll(() => page.evaluate(() => !!document.activeElement?.closest("#mobile-menu")))
        .toBe(true);
      // Menu contains a labelled navigation landmark.
      await expect(menu.locator("nav[aria-label]")).toHaveCount(1);

      // Escape closes and returns focus to the trigger.
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(trigger).toBeFocused();

      // Close button works.
      await trigger.click();
      await expect(menu).toBeVisible();
      await page.locator("#mobile-menu-close").click();
      await expect(menu).toBeHidden();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  }
});

test.describe("document language and direction", () => {
  for (const lang of LOCALES) {
    for (const path of ["", "/blog", "/hire", "/faq", "/blog/how-i-stopped-nodejs-from-freezing"]) {
      test(`lang/dir on /${lang}${path}`, async ({ page }) => {
        await page.goto(`/${lang}${path}`);
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await expect(page.locator("html")).toHaveAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        await expect(page.locator("main")).toHaveCount(1);
        await expect(page.locator("h1")).toHaveCount(1);
      });
    }
  }
});

const AXE_TEMPLATES = [
  "",
  "/blog",
  "/blog/refactoring-production-backend-lessons",
  "/hire",
  "/faq",
  "/case-studies/qr-attendance-system",
  "/services/nodejs-backend-development",
  "/apps/sila",
];

test.describe("axe-core WCAG 2.x A/AA scan", () => {
  for (const lang of LOCALES) {
    for (const path of AXE_TEMPLATES) {
      test(`axe: /${lang}${path}`, async ({ page }, testInfo) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(`/${lang}${path}`, { waitUntil: "load" });
        await page.waitForTimeout(800);
        const results = await new AxeBuilder({ page })
          .exclude("iframe, iframe *, pre, pre *")
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const serious = results.violations.filter(
          (v) => v.impact === "critical" || v.impact === "serious"
        );
        await testInfo.attach("axe-violations", {
          body: JSON.stringify(
            results.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.length,
              sample: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
            })),
            null,
            2
          ),
          contentType: "application/json",
        });
        expect(
          serious.map((v) => `${v.id} (${v.impact}) ×${v.nodes.length}: ${v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(" "))
            .join(" | ")}`)
        ).toEqual([]);
      });
    }
  }
});
