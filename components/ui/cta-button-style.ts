import type { CSSProperties } from "react";

// Shared visual for the primary "try now" style CTA: black gradient body with a
// brand-teal glow ring. Used in the hero, nav, pricing, and final CTA.
export const ctaButtonClassName =
  "group flex items-center justify-center gap-1.5 font-medium rounded-md transition-[filter,box-shadow] duration-150 ease-out hover:brightness-105 active:scale-[0.96]";

export const ctaButtonStyle: CSSProperties = {
  color: "#F0F0F0",
  background: "linear-gradient(180deg, #2a2a2e 0%, #0a0a0b 100%)",
  boxShadow:
    "0 0 0 1.5px rgba(126,184,188,0.6), 0 0 14px rgba(126,184,188,0.35), 0 2px 4px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.12)",
  textShadow: "0 0 0.5px rgba(255,255,255,0.6)",
};
