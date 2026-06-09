"use client";

import { useState, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePageTransition } from "@/components/ui/page-transition";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { Image, VideoCamera, Camera } from "@phosphor-icons/react";
import { GithubIcon, GithubIconHandle } from "@/components/ui/github-icon";
import { GradientWaveText } from "@/components/gradient-wave-text";
import { staggerContainer, fadeUp } from "@/lib/motion";
// import { StampCard } from "@/components/landing/stamp-card";

function MagneticButton({ children, className, href }: { children: React.ReactNode; className: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shimmer = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });
  const { triggerTransition } = usePageTransition();

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
    if (ref.current) {
      triggerTransition(ref.current.getBoundingClientRect(), href);
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      data-cta-transition="true"
      className={`${className} relative overflow-hidden`}
      style={{ x: sx, y: sy }}
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
  images: <Image size={24} weight="fill" className="text-white" />,
  video: <VideoCamera size={24} weight="fill" className="text-white" />,
  camera: <Camera size={24} weight="fill" className="text-white" />,
};

function AppIconBox({ icon }: { icon: React.ReactNode }) {
  return (
    <span
      className="flex items-center justify-center rounded-[11px]"
      style={{
        width: 44,
        height: 44,
        background: "linear-gradient(180deg, #7db4ff 0%, #3d7df0 55%, #1e5fe0 100%)",
        boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.55)",
      }}
    >
      {icon}
    </span>
  );
}

function HoverWord({ word }: { word: keyof typeof wordIcons }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="cursor-default whitespace-nowrap align-baseline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="inline-flex items-center justify-center overflow-hidden align-middle"
        initial={false}
        animate={{ width: isHovered ? 52 : 0, marginRight: isHovered ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <motion.span
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <AppIconBox icon={wordIcons[word]} />
        </motion.span>
      </motion.span>
      <motion.span
        className="align-baseline"
        initial={false}
        animate={{ color: isHovered ? "var(--brand-accent)" : "var(--foreground)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {word}
      </motion.span>
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
        className="h-[36vh] sm:h-[60vh] md:h-[80vh] left-[-2rem] bottom-[-2rem] sm:left-[-10%] sm:bottom-[-10%] md:left-[-16%] md:bottom-[-20%]"
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
        className="h-[40vh] sm:h-[65vh] md:h-[85vh] right-[-8rem] top-[-6rem] sm:right-[-16%] sm:top-[-16%] md:right-[-21%] md:top-[-22%]"
        style={{
          position: "absolute",
          width: "auto",
          opacity: 0.45,
          pointerEvents: "none", userSelect: "none", zIndex: 0,
          filter: "var(--tree-filter)",
          transform: "rotate(180deg)",
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
            <HoverWord word="images" />,{" "}
            <HoverWord word="video" />, and{" "}
            <HoverWord word="camera" />
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto text-pretty"
          >
            Turn any photo, video, or live camera feed into a work of art — in seconds.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              href="/edit"
              className="px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-md shadow-sm hover:opacity-85 transition-opacity duration-150 ease-out active:scale-[0.96]"
            >
              try now
            </MagneticButton>
            <Link
              href="https://github.com/Nexvyn/rynix-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-transparent text-muted-foreground rounded-md border border-border hover:text-foreground hover:bg-accent transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.96]"
              onMouseEnter={() => githubIconRef.current?.startAnimation()}
              onMouseLeave={() => githubIconRef.current?.stopAnimation()}
            >
              <GithubIcon ref={githubIconRef} size={14} className="flex items-center" />
              <span>Github</span>
            </Link>
            </div>
            <p className="text-xs text-muted-foreground/60 tracking-wide">
              Free to start · Runs in your browser · No sign-up required
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
