"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  ADS_ID,
  isAdsTrackingEnabled,
  trackConversion,
} from "@/lib/ads-tracking";

/**
 * Google tag (gtag.js) loader + delegated click tracking for the
 * WhatsApp / phone conversions (see src/lib/ads-tracking.ts).
 *
 * INERT while the Ads ID is a placeholder: renders nothing and
 * registers no listeners, so pages are byte-identical to before.
 *
 * Clicks are captured by ONE delegated document listener instead of
 * per-component handlers, so every current and future wa.me / tel:
 * link (BuyerCTA, blog CTA, hire page, services pages, contact
 * section) is covered exactly once — no double-firing.
 */
export function AdsTracking() {
  const enabled = isAdsTrackingEnabled();

  useEffect(() => {
    if (!enabled) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
        trackConversion("whatsapp_click");
      } else if (href.startsWith("tel:")) {
        trackConversion("call_click");
      }
    };

    // Capture phase: fire before the browser starts navigating away.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}
