import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Rynix Studio",
  description: "How Rynix Studio handles your data.",
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "The short version",
    body: "Rynix Studio runs entirely in your browser. Your images, videos, and webcam feeds are processed locally on your device and never sent to any server. We don't track you, we don't sell data, and we keep what we collect to an absolute minimum.",
  },
  {
    heading: "What we collect",
    body: "Standard server logs may capture your IP address, browser type, and pages accessed when you visit the site. That's it.",
  },
  {
    heading: "Your media stays on your device",
    body: "Images, videos, and webcam feeds you load into Rynix Studio are processed in your browser using the Canvas API and WebAssembly. They are never transmitted to, stored on, or seen by our servers. Exports are generated locally and saved directly to your machine.",
  },
  {
    heading: "Local storage",
    body: "We store small amounts of data in your browser's local storage to remember your preferences — theme, last-used mode, editor settings. No tracking cookies are set. You can clear this at any time through your browser settings.",
  },
  {
    heading: "Third-party services",
    body: (
      <>
        Google Fonts may be loaded for typography. See{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Google&apos;s privacy policy
        </a>{" "}
        for details. We do not run behavioural tracking, fingerprinting, or advertising pixels of any kind.
      </>
    ),
  },
  {
    heading: "Your rights",
    body: "You can request access to, correction of, or deletion of any personal data we hold about you. Since we hold very little, the process is simple. Email us and we will respond within 30 days.",
  },
  {
    heading: "Changes",
    body: `We may update this policy as the product evolves. Material changes will be reflected in the "Last updated" date. Continuing to use Rynix Studio after a change constitutes acceptance of the updated policy.`,
  },
  {
    heading: "Contact",
    body: "Questions? Reach us at privacy@rynix.studio.",
  },
];

export default function PrivacyPage() {
  return (
    <div className={`min-h-screen bg-background ${GeistSans.className}`}>
      <div className="max-w-[640px] mx-auto px-6 py-14 sm:py-20">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 mb-14"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M11 7H3M7 3L3 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Rynix Studio
        </Link>

        <header className="mb-10">
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground/60 mb-3">
            Legal
          </p>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground/70">Last updated June 5, 2025</p>
        </header>

        <div className="w-full h-px bg-border mb-10" />

        <article className="space-y-9">
          {sections.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-[13px] font-semibold tracking-wide uppercase text-muted-foreground mb-2.5">
                {heading}
              </h2>
              <p className="text-[15px] text-foreground/80 leading-[1.75]">{body}</p>
            </section>
          ))}
        </article>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-muted-foreground">
          <span>© {new Date().getFullYear()} Rynix Studio</span>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors duration-150"
          >
            Terms of Service →
          </Link>
        </div>

      </div>
    </div>
  );
}
