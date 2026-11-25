/************************************************************
 * GOOGLE ADS CONVERSION TRACKING — SCAFFOLD (INERT UNTIL FILLED)
 *
 * Single source of truth for the Google tag (gtag.js) and the
 * three conversion actions the HMD portfolio campaigns need
 * (see ~/workspace/portfolio-ads/PLAN.md):
 *
 *   hire_submit    — contact form submitted successfully
 *   whatsapp_click — any wa.me / WhatsApp link clicked
 *   call_click     — any tel: link clicked
 *
 * While the placeholders below are unset, this module is a NO-OP:
 * AdsTracking renders nothing, no gtag script is loaded, no network
 * calls are made, and trackConversion() returns immediately.
 *
 * ======================= LAUNCH DAY =======================
 * In the Google Ads account (135-039-4545, shared with the
 * restaurant campaigns):
 *   1. Create three website conversion actions — one per event
 *      above — and copy each action's ID + label.
 *   2. Fill them in HERE, in this file only:
 *        - ADS_ID: set the NEXT_PUBLIC_ADS_ID env var (Vercel +
 *          .env.local) to the real "AW-…" id, or replace the
 *          "AW-XXXXXXXXX" placeholder below.
 *        - CONVERSION_LABELS: paste each action's label.
 *   3. Merge the feat/ads-tracking branch to main and redeploy.
 *   4. In Ads, verify each action moves from "Inactive" to
 *      "No recent conversions" / recording after a real test
 *      click/submit, then switch HMD-TR + HMD-AR from
 *      Maximize Clicks to Maximize Conversions.
 * ==========================================================
 ************************************************************/

/** Google Ads tag ID. Placeholder until launch day (see note above). */
export const ADS_ID: string =
  process.env.NEXT_PUBLIC_ADS_ID ?? "AW-XXXXXXXXX";

/**
 * Per-conversion labels from the Ads account. The "REPLACE_WITH_…"
 * placeholders keep tracking inert — trackConversion() refuses to
 * fire for any event whose label is still a placeholder.
 */
export const CONVERSION_LABELS = {
  hire_submit: "REPLACE_WITH_HIRE_SUBMIT_LABEL",
  whatsapp_click: "REPLACE_WITH_WHATSAPP_CLICK_LABEL",
  call_click: "REPLACE_WITH_CALL_CLICK_LABEL",
} as const;

export type ConversionEvent = keyof typeof CONVERSION_LABELS;

/** True only when ADS_ID looks like a real Ads tag (AW-<digits>). */
export function isAdsTrackingEnabled(): boolean {
  return /^AW-\d+$/.test(ADS_ID);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire one Ads conversion. Safe to call anywhere on the client:
 * no-ops when tracking is unconfigured, when the event's label is
 * still a placeholder, or when gtag has not loaded yet. Never throws.
 */
export function trackConversion(event: ConversionEvent): void {
  try {
    if (!isAdsTrackingEnabled()) return;
    const label = CONVERSION_LABELS[event];
    if (!label || label.startsWith("REPLACE_WITH_")) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: `${ADS_ID}/${label}`,
    });
  } catch {
    // Tracking must never break the page.
  }
}
