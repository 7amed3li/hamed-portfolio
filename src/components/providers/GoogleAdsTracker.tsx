"use client";

import { useEffect } from "react";
import Script from "next/script";

const GOOGLE_ADS_ID = "AW-18422246734";

const CONVERSION_TARGETS = {
  whatsapp: `${GOOGLE_ADS_ID}/pFIzCPeRzcAdEM7atNBE`,
  call: `${GOOGLE_ADS_ID}/LNk0CPqRzcAdEM7atNBE`,
  email: `${GOOGLE_ADS_ID}/IXS5CP2RzcAdEM7atNBE`,
} as const;

type ConversionKey = keyof typeof CONVERSION_TARGETS;

const lastFiredAt: Partial<Record<ConversionKey, number>> = {};

function fireConversion(key: ConversionKey) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (now - (lastFiredAt[key] || 0) < 500) return;
  lastFiredAt[key] = now;

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };

  if (typeof w.gtag === "function") {
    w.gtag("event", "conversion", {
      send_to: CONVERSION_TARGETS[key],
      value: 1.0,
      currency: "TRY",
    });
  } else if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push([
      "event",
      "conversion",
      {
        send_to: CONVERSION_TARGETS[key],
        value: 1.0,
        currency: "TRY",
      },
    ]);
  }
}

export function GoogleAdsTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";

      if (href.includes("wa.me/") || href.includes("api.whatsapp.com/")) {
        fireConversion("whatsapp");
      } else if (href.startsWith("tel:")) {
        fireConversion("call");
      } else if (href.startsWith("mailto:")) {
        fireConversion("email");
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <Script
        id="google-ads-gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`,
        }}
      />
    </>
  );
}
