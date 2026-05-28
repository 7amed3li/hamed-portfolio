"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

export function StatusWidget() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      // Tokat, Turkey is in UTC+3 (same as Riyadh, KSA)
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { isRTL, lang } = useLang();

  return (
    <div className={`fixed bottom-8 ${isRTL ? "left-8" : "right-8"} z-50 hidden md:flex items-center gap-4 bg-surface/50 backdrop-blur-md border border-border py-3 px-5 rounded-full shadow-2xl`}>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-foreground">
          {lang === "ar" ? "متاح" : lang === "tr" ? "Müsait" : "Available"}
        </span>
      </div>
      <div className="w-px h-4 bg-border" />
      <div className="text-xs font-mono tracking-widest text-muted-foreground uppercase flex gap-2">
        <span>{lang === "ar" ? "توكات، تركيا" : "Tokat, TR"}</span>
        <span className="text-foreground">{time}</span>
      </div>
    </div>
  );
}
