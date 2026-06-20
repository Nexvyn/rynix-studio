"use client";

import { useEffect, useState } from "react";

/**
 * Canonical "Beta" chip. Matches the existing on-brand chip pattern used in
 * <Pricing /> ("Most popular" badge) so the beta signal reads as part of the
 * design system rather than something bolted on.
 *
 * Pattern (mirrored from components/landing/pricing.tsx):
 *   rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium text-background
 *
 * Use it inline next to brand text, or inside a <BetaCornerChip /> wrapper
 * for the bottom-right floating version.
 */
export function BetaBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-background select-none ${className}`}
      aria-label="Beta"
    >
      Beta
    </span>
  );
}

/**
 * Fixed bottom-right corner chip. Same visual register as BetaBadge but
 * pinned to the viewport corner with a tiny dismiss affordance. Dismissal
 * is per-pageKey and lasts 7 days before re-showing.
 *
 * This is intentionally minimal — no card chrome, no shadow, no entrance
 * animation. Just the chip and a tiny ✕, sitting in the bottom-right.
 */

const REAPPEAR_DAYS = 7;

export function BetaCornerChip({
  pageKey,
  className = "",
}: {
  pageKey: string;
  className?: string;
}) {
  const storageKey = `rynix-corner-beta:${pageKey}`;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let dismissedAt: number | null = null;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const ts = parseInt(raw, 10);
        if (Number.isFinite(ts)) dismissedAt = ts;
      }
    } catch {
      /* ignore */
    }
    const expired =
      dismissedAt === null ||
      Date.now() - dismissedAt > REAPPEAR_DAYS * 24 * 60 * 60 * 1000;
    if (expired) setOpen(true);
  }, [storageKey]);

  function dismiss() {
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!mounted || !open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 ${className}`}
    >
      <span
        className="inline-flex items-center rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-background select-none"
        aria-label="Beta"
      >
        Beta
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss beta notice"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
      >
        <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M3 3L11 11M11 3L3 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
