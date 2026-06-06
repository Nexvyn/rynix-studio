"use client";

import { useState, useRef } from "react";

import Link from "next/link";
import { useTransitionRouter } from "glimm/next";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { Image, VideoCamera, Camera, ArrowRight } from "@phosphor-icons/react";
import { GithubIcon, GithubIconHandle } from "@/components/icons/github-icon";
import { GradientWaveText } from "@/components/gradient-wave-text";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { ctaButtonClassName } from "@/components/ui/cta-button-style";
// import { StampCard } from "@/components/landing/stamp-card";

function MagneticButton({ children, className, href, style }: { children: React.ReactNode; className: string; href: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shimmer = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });
  const router = useTransitionRouter();

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function onMouseEnter() {
    shimmer.start({ x: ["-100%", "200%"], transition: { duration: 0.55, ease: "easeInOut" } });
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      data-cta-transition="true"
      className={`${className} relative overflow-hidden`}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.span
        aria-hidden
        animate={shimmer}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          skewX: -15,
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.a>
  );
}

const wordIcons = {
  images: <Image size={16} weight="fill" className="text-white" />,
  video: <VideoCamera size={16} weight="fill" className="text-white" />,
  camera: <Camera size={16} weight="fill" className="text-white" />,
};

function AppIconBox({ icon }: { icon: React.ReactNode }) {
  return (
    <span
      className="flex items-center justify-center rounded-[7px]"
      style={{
        width: 28,
        height: 28,
        background: "linear-gradient(180deg, #7db4ff 0%, #3d7df0 55%, #1e5fe0 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.55)",
      }}
    >
      {icon}
    </span>
  );
}

const ICON_WIDTH = 36;

function HoverLetters({ word }: { word: keyof typeof wordIcons }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [letterWidths, setLetterWidths] = useState<number[]>([]);
  const letters = word.split("");

  return (
    <span className="cursor-default whitespace-nowrap align-baseline inline-flex">
      {letters.map((char, i) => {
        const isHovered = hoveredIndex === i;
        const naturalWidth = letterWidths[i];

        return (
          <motion.span
            key={i}
            ref={(el) => {
              if (el && naturalWidth === undefined) {
                const w = el.getBoundingClientRect().width;
                setLetterWidths((prev) => {
                  const next = [...prev];
                  next[i] = w;
                  return next;
                });
              }
            }}
            className="relative inline-flex items-center justify-center align-baseline"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex((curr) => (curr === i ? null : curr))}
            animate={naturalWidth !== undefined ? { width: isHovered ? ICON_WIDTH : naturalWidth } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 12, mass: 0.6 }}
          >
            <motion.span
              animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.4 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
            >
              {char}
            </motion.span>
            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.3, rotate: isHovered ? 0 : -15 }}
              transition={{ type: "spring", stiffness: 400, damping: isHovered ? 18 : 12 }}
              style={{ pointerEvents: "none" }}
            >
              <AppIconBox icon={wordIcons[word]} />
            </motion.span>
          </motion.span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const githubIconRef = useRef<GithubIconHandle>(null);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 py-24"
      style={{ overflow: "hidden" }}
    >

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/chree.webp"
        alt=""
        className="dark:hidden h-[36vh] sm:h-[60vh] md:h-[80vh] left-[-2rem] bottom-[-2rem] sm:left-[-10%] sm:bottom-[-10%] md:left-[-16%] md:bottom-[-20%]"
        style={{
          position: "absolute",
          width: "auto", opacity: 0.45,
          pointerEvents: "none", userSelect: "none", zIndex: 0,
          filter: "var(--tree-filter)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/chree.webp"
        alt=""
        className="dark:hidden h-[40vh] sm:h-[65vh] md:h-[85vh] right-[-8rem] top-[-6rem] sm:right-[-16%] sm:top-[-16%] md:right-[-21%] md:top-[-22%]"
        style={{
          position: "absolute",
          width: "auto",
          opacity: 0.45,
          pointerEvents: "none", userSelect: "none", zIndex: 0,
          filter: "var(--tree-filter)",
          transform: "rotate(180deg)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/NLwBxZVw4wLgxhng4Id8wsXpQo.avif"
        alt=""
        className="hidden dark:block"
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "auto",
          opacity: 0.18,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        className="relative z-10 flex flex-row items-center justify-center gap-8 sm:gap-16 max-w-5xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* <StampCard /> */}
        <div className="max-w-2xl flex flex-col items-center">
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1] text-balance"
          >
            Real-time{" "}
            <GradientWaveText
              repeat
              inView
              once={false}
              speed={1.2}
              className="[--gradient-wave-base:rgb(29,29,31)] dark:[--gradient-wave-base:rgb(255,255,255)]"
            >
              creative effects
            </GradientWaveText>
            {" "}for{" "}
            <HoverLetters word="images" />,{" "}
            <HoverLetters word="video" />, and{" "}
            <HoverLetters word="camera" />
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto text-pretty"
          >
            Turn any photo, video, or live camera feed into a work of art in seconds.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              href="/edit"
              className={`${ctaButtonClassName} px-5 py-2.5 text-sm`}
              style={{ color: "#F0F0F0", background: "linear-gradient(180deg, #2a2a2e 0%, #0a0a0b 100%)" }}
            >
              try now
              <ArrowRight size={14} weight="bold" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </MagneticButton>
            <Link
              href="https://github.com/Nexvyn/rynix-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-foreground rounded-md border border-border/60 bg-card backdrop-blur-sm shadow-sm hover:bg-accent hover:border-border hover:shadow-md transition-[background-color,border-color,scale,box-shadow] duration-150 ease-out active:scale-[0.96]"
              onMouseEnter={() => githubIconRef.current?.startAnimation()}
              onMouseLeave={() => githubIconRef.current?.stopAnimation()}
            >
              <GithubIcon ref={githubIconRef} size={14} className="flex items-center" />
              <span>Github</span>
            </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 text-xs text-muted-foreground tracking-wide"
      >
        Free to start · Runs in your browser · No sign-up required
      </motion.p>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        style={{
          height: "220px",
          background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
        }}
      />
    </section>
  );
}
