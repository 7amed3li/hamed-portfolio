import type { ReactNode } from "react";

export type TactileVariant =
  | "primary"
  | "accentOutline"
  | "outline"
  | "subtle"
  | "live";

const BASE_CLASSES =
  "rounded-[6px] font-mono uppercase select-none transition-all duration-150 ease-out active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const VARIANT_CLASSES: Record<TactileVariant, string> = {
  primary:
    "bg-accent text-black font-bold border border-[#dfff9f] shadow-[0_3px_0_0_#7aa336,inset_0_1px_0_rgba(255,255,255,0.45)] hover:bg-[#d8ff93] hover:-translate-y-[1px] hover:shadow-[0_4px_0_0_#7aa336,inset_0_1px_0_rgba(255,255,255,0.55)]",
  accentOutline:
    "bg-surface text-accent font-semibold border border-accent/60 shadow-[0_3px_0_0_rgba(201,253,116,0.28),inset_0_1px_0_rgba(201,253,116,0.14)] hover:bg-accent hover:text-black hover:border-[#dfff9f] hover:-translate-y-[1px] hover:shadow-[0_4px_0_0_#7aa336]",
  outline:
    "bg-surface text-foreground border border-[#2d2d2d] shadow-[0_3px_0_0_#141414,inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-accent/70 hover:text-accent hover:bg-surface-2 hover:-translate-y-[1px] hover:shadow-[0_4px_0_0_#141414,inset_0_1px_0_rgba(255,255,255,0.12)]",
  subtle:
    "bg-background text-muted-foreground border border-border shadow-[0_3px_0_0_#121212,inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-foreground/50 hover:text-foreground hover:bg-surface hover:-translate-y-[1px]",
  live:
    "bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-400/50 shadow-[0_3px_0_0_rgba(16,185,129,0.35),inset_0_1px_0_rgba(110,231,183,0.2)] hover:bg-emerald-400 hover:text-black hover:-translate-y-[1px] hover:shadow-[0_4px_0_0_rgba(16,185,129,0.5)]",
};

export function tactileButtonClasses(
  variant: TactileVariant = "outline",
  extra: string = ""
): string {
  return extra
    ? `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${extra}`
    : `${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`;
}

export function TactileIconBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center w-11 h-11 rounded-lg bg-surface-2 border border-[#2a2a2a] text-accent shadow-[0_3px_0_0_#111111,inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:border-accent/60 group-hover:-translate-y-0.5 transition-all duration-150 ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
