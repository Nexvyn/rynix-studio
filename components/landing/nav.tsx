"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
// import { StarDoodle } from "@/components/ui/star-doodle";
import { GithubDoodle } from "@/components/ui/github-doodle";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon } from "@/components/icons/github-icon";
import { EffectsMenu } from "./effects-menu";
import { usePageTransition } from "@/components/ui/page-transition";
import { ctaButtonClassName } from "@/components/ui/cta-button-style";
import { EASE_OUT } from "@/lib/motion";

function Star3D({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" strokeLinejoin="round" />
      <path d="M12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2" fill="#fbbf24" strokeWidth="0" />
    </svg>
  );
}


function GitHubStarButton({ stars }: { stars: number }) {
  const [isStarred, setIsStarred] = useState(false);
  const [displayCount, setDisplayCount] = useState(stars);
  const [plusOne, setPlusOne] = useState(false);
  const btnControls = useAnimation();
  const shadowControls = useAnimation();

  useEffect(() => { setDisplayCount(stars); }, [stars]);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isStarred) {
      setIsStarred(false);
      setDisplayCount((c) => c - 1);
      return;
    }

    setIsStarred(true);
    setDisplayCount((c) => c + 1);
    setPlusOne(true);
    setTimeout(() => setPlusOne(false), 900);

    await btnControls.start({ scale: 0.94, transition: { duration: 0.08 } });
    btnControls.start({ scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } });

    shadowControls.start({
      boxShadow: ["0 0 0 0 rgba(251,191,36,0)", "0 0 18px 6px rgba(251,191,36,0.55)", "0 0 0 0 rgba(251,191,36,0)"],
      transition: { duration: 0.7, ease: "easeOut" },
    });

    window.open("https://github.com/Nexvyn/rynix-studio", "_blank", "noopener,noreferrer");
  }, [isStarred, btnControls, shadowControls]);

  return (
    <motion.button
      animate={btnControls}
      onClick={handleClick}
      className="group/star relative z-0 flex items-center h-8 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 select-none cursor-pointer"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <motion.span
        animate={shadowControls}
        className="relative z-10 flex items-center h-8 rounded-md bg-card text-foreground shadow-sm overflow-hidden select-none"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        {/* Left section */}
        <span className="flex items-center gap-1.5 px-2.5 text-[12px] font-semibold text-foreground hover:bg-accent transition-colors duration-150 h-full">
          <AnimatePresence mode="wait" initial={false}>
            {!isStarred ? (
              <motion.span key="3d" initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                <Star3D size={13} />
              </motion.span>
            ) : (
              <motion.span key="none" initial={{ scale: 0 }} animate={{ scale: 0 }} exit={{ scale: 0 }} />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            {isStarred ? (
              <motion.span key="starred" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="text-amber-500">
                Starred
              </motion.span>
            ) : (
              <motion.span key="star" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}>
                Star
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* Divider */}
        <span className="w-px h-4 bg-border/60 flex-shrink-0" />

        {/* Right section — number roll */}
        <span className="relative flex items-center px-2 text-[11px] font-semibold text-muted-foreground overflow-hidden h-full" style={{ minWidth: 28 }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={displayCount}
              initial={{ y: isStarred ? 10 : -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1, color: isStarred ? "#f59e0b" : undefined }}
              exit={{ y: isStarred ? -10 : 10, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onAnimationComplete={() => {}}
              style={{ display: "block", position: "relative" }}
            >
              <motion.span
                animate={isStarred ? { color: ["#f59e0b", "#6b7280"], transition: { delay: 0.3, duration: 0.4 } } : { color: "#6b7280" }}
              >
                {displayCount}
              </motion.span>
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>

      {/* +1 badge */}
      <AnimatePresence>
        {plusOne && (
          <motion.span
            key="plusone"
            initial={{ opacity: 1, y: 0, x: "-50%" }}
            animate={{ opacity: 0, y: -22, x: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute -top-1 right-2 text-[11px] font-bold text-amber-400 z-20"
            style={{ position: "absolute" }}
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>

      {/* Hover doodle */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-full z-0 -translate-x-1/2 translate-y-4 opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover/star:opacity-100 group-hover/star:translate-y-1"
      >
        <GithubDoodle />
      </span>
    </motion.button>
  );
}

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
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-4">
      <motion.nav
        aria-label="Main"
        initial={false}
        animate={{ maxWidth: scrolled ? "64rem" : "72rem" }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.6 }}
        className={`relative flex items-center justify-between px-1.5 py-1.5 mx-auto rounded-md shadow-sm border transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-muted border-border/40 shadow-md"
            : "bg-muted border-border/20 shadow-sm"
        }`}
        style={{ borderWidth: "0.5px" }}
      >
        <NavLogo />

        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ isolation: "isolate" }}>
          <EffectsMenu />
        </div>

        <div className="flex items-center gap-1" style={{ isolation: "isolate" }}>
          {stars > 0 && <GitHubStarButton stars={stars} />}

          <a
            href="/edit"
            onClick={(e) => {
              e.preventDefault();
              triggerTransition(e.currentTarget.getBoundingClientRect(), "/edit");
            }}
            className={`${ctaButtonClassName} h-8 px-2.5 text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 select-none`}
            style={{ color: "#F0F0F0", background: "linear-gradient(180deg, #2a2a2e 0%, #0a0a0b 100%)" }}
          >
            Try now
          </a>

          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  );
}
