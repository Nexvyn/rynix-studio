import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Rynix Studio",
  description: "The terms governing your use of Rynix Studio.",
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Acceptance",
    body: "By using Rynix Studio you agree to these terms. If you do not agree, please do not use the service. These terms apply to all visitors and users.",
  },
  {
    heading: "The service",
    body: "Rynix Studio is a browser-based creative tool for applying visual effects to images and videos. The core processing runs locally in your browser. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.",
  },
  {
    heading: "Your content",
    body: "You retain full ownership of any images, videos, or other media you load into Rynix Studio. Since your media never leaves your device, we make no claim over it. You are responsible for ensuring you have the rights to use any content you process with the tool.",
  },
  {
    heading: "Acceptable use",
    body: "You agree not to use Rynix Studio to process or distribute content that is illegal, defamatory, or violates the rights of others. You agree not to attempt to reverse-engineer, scrape, or otherwise misuse the service. We reserve the right to terminate access for violations.",
  },
  {
    heading: "Intellectual property",
    body: "The Rynix Studio name, logo, source code, and visual design are the property of Nexvyn and are protected by applicable intellectual property law. The open-source portions of the project are governed by their respective licenses, available in the GitHub repository.",
  },
  {
    heading: "No warranty",
    body: `Rynix Studio is provided "as is" without warranty of any kind, express or implied. We do not warrant that the service will be uninterrupted, error-free, or fit for any particular purpose. Your use of the service is at your own risk.`,
  },
  {
    heading: "Limitation of liability",
    body: "To the maximum extent permitted by law, Nexvyn shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use Rynix Studio.",
  },
  {
    heading: "Changes",
    body: `We may update these terms from time to time. Material changes will be reflected in the "Last updated" date below. Continuing to use the service after changes take effect constitutes your acceptance of the revised terms.`,
  },
  {
    heading: "Contact",
    body: "Questions about these terms? Reach us at legal@rynix.studio.",
  },
];

export default function TermsPage() {
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
            Terms of Service
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
            href="/privacy"
            className="hover:text-foreground transition-colors duration-150"
          >
            Privacy Policy →
          </Link>
        </div>

      </div>
    </div>
  );
}
