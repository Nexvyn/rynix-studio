import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import { RELEASES, type ChangeKind } from "./releases";
import { BetaCornerChip } from "@/components/ui/beta-badge";

export const metadata = {
  title: "Changelog — Rynix Studio",
  description:
    "Every product release from Rynix Studio — new render modes, fixes, and shipped features.",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  // "June 16, 2026"
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const KIND_ORDER: ChangeKind[] = ["Added", "Changed", "Fixed", "Removed"];

function groupByKind(
  changes: (typeof RELEASES)[number]["changes"],
): { kind: ChangeKind; items: typeof changes }[] {
  const out: { kind: ChangeKind; items: typeof changes }[] = [];
  for (const kind of KIND_ORDER) {
    const items = changes.filter((c) => c.kind === kind);
    if (items.length > 0) out.push({ kind, items });
  }
  return out;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ChangelogPage() {
  const latest = RELEASES[0];
  const first = RELEASES[RELEASES.length - 1];

  return (
    <div className={`min-h-screen bg-background ${GeistSans.className}`}>
      <div className="max-w-[640px] mx-auto px-6 py-14 sm:py-20">

        {/* Back link, identical to the legal pages */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 mb-14"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M11 7H3M7 3L3 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Rynix Studio
        </Link>

        {/* Page header — eyebrow / title / summary, same shape as Terms & Privacy */}
        <header className="mb-10">
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground/60 mb-3">
            What’s new
          </p>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-foreground mb-3">
            Changelog
          </h1>
          <p className="text-sm text-muted-foreground/70">
            Curated release notes for Rynix Studio. {RELEASES.length} releases
            from {formatDate(first.date)} to {formatDate(latest.date)}.
          </p>
        </header>

        {/* Thin divider, identical to Terms & Privacy */}
        <div className="w-full h-px bg-border mb-10" />

        {/* Releases, newest first. Each release is one section in the same
            prose rhythm as the legal pages, with Added / Changed / Fixed
            sub-headings inside. */}
        <article className="space-y-12">

          {RELEASES.map((release) => {
            const grouped = groupByKind(release.changes);
            return (
              <section key={release.version}>
                {/* Release header: version + date, summary as the section lead */}
                <header className="mb-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[13px] font-semibold tracking-tight text-foreground tabular-nums">
                      v{release.version}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/60 tabular-nums">
                      {formatDate(release.date)}
                    </span>
                  </div>
                  {release.summary && (
                    <p className="mt-2 text-[15px] text-foreground/85 leading-[1.75]">
                      {release.summary}
                    </p>
                  )}
                </header>

                {/* Sub-sections: Added / Changed / Fixed / Removed */}
                <div className="space-y-6">
                  {grouped.map(({ kind, items }) => (
                    <div key={kind}>
                      <h3 className="text-[12px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
                        {kind}
                      </h3>
                      <ul className="space-y-2 text-[15px] text-foreground/80 leading-[1.75]">
                        {items.map((c, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-muted-foreground/40 select-none shrink-0 mt-[2px]">
                              &bull;
                            </span>
                            <span className="flex-1 min-w-0">{c.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </article>

        {/* Footer, identical to Terms & Privacy */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-muted-foreground">
          <span>© {new Date().getFullYear()} Rynix Studio · v0.5.0 beta</span>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors duration-150"
          >
            Privacy Policy →
          </Link>
        </div>

      </div>
      <BetaCornerChip pageKey="changelog" />
</div>
  );
}
