import { defineConfig } from "@playwright/test";

/**
 * Site-audit regression suite.
 *
 * Runs against a local production server (`next start`). By default the
 * server is started automatically on port 3100; set E2E_BASE_URL to point the
 * suite at an already-running server instead.
 *
 * The browser channel defaults to the locally installed Microsoft Edge so no
 * Playwright browser download is required. Override with E2E_CHANNEL
 * (e.g. "chrome" or "chromium").
 */
const PORT = Number(process.env.E2E_PORT || 3100);
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  timeout: 180_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: 0,
  reporter: [
    ["list"],
    ["json", { outputFile: "reports/site-audit/artifacts/playwright-results.json" }],
  ],
  use: {
    baseURL,
    channel: process.env.E2E_CHANNEL || "msedge",
    screenshot: "only-on-failure",
    trace: "off",
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: `${baseURL}/en`,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
