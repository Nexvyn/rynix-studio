import type { Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  enter: 0.4,
  exit: 0.15,
} as const;

export const STAGGER = {
  group: 0.1,
  item: 0.08,
} as const;

export const inViewport = { once: true, margin: "-80px" } as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.group } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.enter, ease: EASE_OUT },
  },
};

export const fadeUpExit = {
  opacity: 0,
  y: -12,
  filter: "blur(4px)",
  transition: { duration: DURATION.exit, ease: "easeIn" as const },
};
