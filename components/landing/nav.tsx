"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
// import { StarDoodle } from "@/components/ui/star-doodle";
import { GithubDoodle } from "@/components/ui/github-doodle";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon, GithubIconHandle } from "@/components/ui/github-icon";
import { EffectsMenu } from "./effects-menu";
import { usePageTransition } from "@/components/ui/page-transition";
import { EASE_OUT } from "@/lib/motion";
import NumberFlow from "@number-flow/react";
import { Star } from "lucide-react";

function NavLogo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/"
      className="relative flex items-center gap-2 h-9 text-[13px] tracking-tight text-foreground bg-card shadow-sm rounded-md px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 select-none"
      style={{ overflow: "visible", zIndex: 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <BrandLogo size={24} hovered={hovered} />
      <span className="relative" style={{ zIndex: 1 }}>Rynix Studio</span>
      <motion.span
        className="relative ml-1 px-[3px] py-0.5 text-[10px] font-medium rounded bg-muted text-muted-foreground inline-block origin-center"
        style={{ zIndex: 1 }}
        animate={{ rotate: [-10, -16, -4, -12, -10] }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
      >
        Beta
      </motion.span>
    </Link>
  );
}

export function Nav() {
  const githubIconRef = useRef<GithubIconHandle>(null);
  const [scrolled, setScrolled] = useState(false);
  const [stars, setStars] = useState<number>(0);
  const { triggerTransition } = usePageTransition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Check cache first
    try {
      const cached = localStorage.getItem("rynix_github_stars");
      const cachedTs = localStorage.getItem("rynix_github_stars_ts");
      if (cached && cachedTs) {
        const age = Date.now() - parseInt(cachedTs, 10);
        if (age < 3600000) { // 1 hour cache
          setStars(parseInt(cached, 10));
          return;
        }
      }
    } catch (e) {}

    // Fetch from GitHub API
    fetch("https://api.github.com/repos/Nexvyn/rynix-studio")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          const count = data.stargazers_count;
          setStars(count);
          try {
            localStorage.setItem("rynix_github_stars", String(count));
            localStorage.setItem("rynix_github_stars_ts", String(Date.now()));
          } catch (e) {}
        }
      })
      .catch(() => {
        try {
          const cached = localStorage.getItem("rynix_github_stars");
          setStars(cached ? parseInt(cached, 10) : 142);
        } catch (e) {
          setStars(142);
        }
      });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-2">
      <motion.nav
        aria-label="Main"
        initial={false}
        animate={{ maxWidth: scrolled ? "56rem" : "72rem" }}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.5 }}
        className={`relative flex items-center justify-between px-1.5 py-1.5 mx-auto rounded-md shadow-sm border transition-all duration-300 ${
          scrolled 
            ? "bg-muted border-border/40 shadow-md" 
            : "bg-muted border-border/20 shadow-sm"
        }`}
      >
        <NavLogo />

        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ isolation: "isolate" }}>
          <EffectsMenu />
        </div>

        <div className="flex items-center gap-1" style={{ isolation: "isolate" }}>
          <a
            href="https://github.com/Nexvyn/rynix-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="group/star relative z-0 flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 select-none"
            onMouseEnter={() => githubIconRef.current?.startAnimation()}
            onMouseLeave={() => githubIconRef.current?.stopAnimation()}
          >
            <span className="relative z-10 flex items-center gap-1.5 h-9 px-3 text-[12px] font-medium rounded-md bg-card text-foreground shadow-sm hover:opacity-85 transition-[opacity,scale] duration-150 ease-out motion-safe:active:scale-[0.96] select-none">
              <GithubIcon ref={githubIconRef} size={14} className="flex items-center text-foreground" />
              <span className="hidden sm:inline">GitHub</span>
              {stars > 0 && (
                <div className="flex items-center gap-0.5 ml-1 pl-1.5 border-l border-border/80 text-muted-foreground text-[11px] font-semibold">
                  <Star size={11} className="fill-amber-500/10 text-amber-500 shrink-0" />
                  <NumberFlow value={stars} />
                </div>
              )}
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 bottom-full z-0 -translate-x-1/2 translate-y-4 opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover/star:opacity-100 group-hover/star:translate-y-1"
            >
              <GithubDoodle />
            </span>
          </a>

          <a
            href="/edit"
            onClick={(e) => {
              e.preventDefault();
              triggerTransition(e.currentTarget.getBoundingClientRect(), "/edit");
            }}
            className="flex items-center h-9 px-3 text-[12px] font-medium rounded-md bg-foreground text-background shadow-sm hover:opacity-85 motion-safe:active:scale-[0.96] transition-[opacity,scale] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 select-none"
          >
            Try now
          </a>

          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  );
}
