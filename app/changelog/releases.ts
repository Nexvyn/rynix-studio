export type ChangeKind = "Added" | "Changed" | "Fixed" | "Removed";

export interface Change {
  kind: ChangeKind;
  text: string;
}

export interface Release {
  version: string;
  date: string;
  summary?: string;
  changes: Change[];
}

export const RELEASES: Release[] = [
  {
    version: "0.5.0",
    date: "2026-06-16",
    summary: "Landing page polish and new sections.",
    changes: [
      { kind: "Added", text: "Blocks-reveal section with scroll-driven animation." },
      { kind: "Added", text: "Floral and squiggle pattern assets." },
      { kind: "Changed", text: "Updated hero, nav, pricing, and FAQ sections." },
      { kind: "Changed", text: "Refined brand logo and social icons." },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-06-10",
    summary: "Landing redesign and legal pages.",
    changes: [
      { kind: "Added", text: "Terms, privacy, and pricing pages." },
      { kind: "Added", text: "Manga showcase and feature-effects sections." },
      { kind: "Added", text: "Shared CTA button styles across landing sections." },
      { kind: "Changed", text: "Updated layout metadata and OG images." },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-05-19",
    summary: "Initial landing page launch.",
    changes: [
      { kind: "Added", text: "Hero, nav, FAQ, pricing, and footer sections." },
      { kind: "Added", text: "Theme toggle and page transitions." },
      { kind: "Added", text: "Brand logo and gradient effects." },
    ],
  },
];