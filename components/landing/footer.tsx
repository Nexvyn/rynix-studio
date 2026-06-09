"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { GithubIcon } from "@/components/icons/github-icon";
import { XIcon } from "@/components/icons/x-icon";
import { DocumentIcon } from "@/components/icons/document-icon";

export function Footer() {
  const [logoKey, setLogoKey] = useState(0);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = watermarkRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLogoKey(k => k + 1); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rivetClass = "absolute w-2.5 h-2.5 rounded-full bg-card shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.55),inset_0_-1px_1px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-black/10";

  const navLinkClass = "group text-sm inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-[var(--brand-accent)]";

  return (
    <footer className="relative w-full max-w-6xl mx-auto my-1 px-4 sm:px-8">
      <div className="rounded-[28px] border border-border/65 bg-muted/40 p-1.5 sm:p-2">
      <div className="relative rounded-[22px] p-6 pt-12 sm:p-12 sm:pt-16 overflow-hidden min-h-[480px] flex flex-col bg-foreground/[0.025] border border-border/60">
        <span className={`${rivetClass} top-5 left-5`} aria-hidden="true" />
        <span className={`${rivetClass} top-5 right-5`} aria-hidden="true" />
        <span className={`${rivetClass} bottom-5 left-5`} aria-hidden="true" />
        <span className={`${rivetClass} bottom-5 right-5`} aria-hidden="true" />

        <div className="flex flex-col sm:flex-row justify-between items-start gap-10 z-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-[2.25rem] font-medium tracking-tight leading-none text-foreground"> Made by
            </h2>
            <a
              href="https://x.com/Nexvyn/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-baseline"
            >
              <span
                style={{ fontFamily: "var(--font-playwrite), cursive" }}
                className="text-[1.35rem] text-foreground leading-none"
              >
                Nexvyn
              </span>
              <span className="absolute left-full bottom-0 translate-y-[5px] text-[1.3em] leading-none -translate-x-10 opacity-0 group-hover:-translate-x-8 group-hover:opacity-100 transition-all duration-150 inline-block">
                ↗
              </span>
            </a>
          </div>

          <div className="flex flex-col items-start gap-6">
            <p className="text-base text-muted-foreground">
              © {new Date().getFullYear()} Rynix Studio
            </p>
            <nav className="flex gap-6" aria-label="Social Media Links">
              <a href="https://github.com/Nexvyn/rynix-studio" target="_blank" rel="noopener noreferrer" className={`${navLinkClass} relative`}>
                <GithubIcon size={16} className="inline-block" />
                GitHub<span className="absolute left-full ml-0.5 text-[1.1em] leading-none translate-y-[1px] -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-150 inline-block">↗</span>
              </a>
              <a href="https://x.com/rynix" target="_blank" rel="noopener noreferrer" className={`${navLinkClass} relative`}>
                <XIcon className="h-3.5 w-3.5 inline-block" />
                <span className="absolute left-full ml-0.5 text-[1.1em] leading-none translate-y-[1px] -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-150 inline-block">↗</span>
              </a>
            </nav>
            <nav className="flex gap-4" aria-label="Legal">
              <a href="/privacy" className={navLinkClass}>
                <DocumentIcon className="h-3.5 w-3.5 inline-block" />
                Privacy
              </a>
              <a href="/terms" className={navLinkClass}>
                <DocumentIcon className="h-3.5 w-3.5 inline-block" />
                Terms
              </a>
            </nav>
          </div>
        </div>

        <div ref={watermarkRef} className="relative mt-auto h-[220px] flex justify-center items-end">
          <div
            className="absolute inset-0 flex items-end justify-center select-none pb-[0.5vw]"
            style={{ gap: "min(2vw, 1.5rem)" }}
            aria-hidden="true"
          >
            <span className="relative z-20 inline-flex">
              <BrandLogo size="min(11vw, 8.25rem)" animKey={logoKey} />
            </span>
            <div className="relative pointer-events-none" style={{ lineHeight: "0.8" }}>
              <div className="pointer-events-none absolute inset-x-0 bottom-full z-10" aria-hidden="true">
                <div className="relative flex justify-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <img key={i} src="/footer-art.svg" alt="" className="w-32 sm:w-44 -ml-[3.2rem] sm:-ml-[4.4rem] first:ml-0" />
                  ))}
                </div>
                {[
                  { left: "10%", delay: "0s", dur: "1.1s" },
                  { left: "20%", delay: "0.5s", dur: "1.3s" },
                  { left: "30%", delay: "0.2s", dur: "1.0s" },
                  { left: "40%", delay: "0.8s", dur: "1.2s" },
                  { left: "50%", delay: "0.3s", dur: "1.1s" },
                  { left: "60%", delay: "0.7s", dur: "1.3s" },
                  { left: "70%", delay: "0.1s", dur: "1.0s" },
                  { left: "80%", delay: "0.6s", dur: "1.2s" },
                  { left: "90%", delay: "0.4s", dur: "1.1s" },
                ].map((d, i) => (
                  <span
                    key={i}
                    className="footer-rain-drop absolute top-full block h-2 w-1 bg-slate-400/60"
                    style={{ left: d.left, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", animation: `footer-rain-drop ${d.dur} linear infinite`, animationDelay: d.delay }}
                  />
                ))}
              </div>
              <span
                className="leading-[0.8] tracking-tighter text-foreground"
                style={{ fontSize: "min(16vw, 12rem)", fontWeight: 800, display: "block" }}
              >
                rynix
                <span style={{ fontFamily: "cursive", fontSize: "0.32em", fontWeight: 400, letterSpacing: "-0.04em" }}>studio</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
