"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SPRING_PRESS = { type: "spring" as const, stiffness: 620, damping: 20 };

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center border transition-[background-color,border-color]",
          "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-foreground/80 opacity-50",
          className
        )}
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-3.5 h-3.5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggle}
      title="Toggle theme"
      whileTap={{ scale: 0.96 }}
      transition={SPRING_PRESS}
      className={cn(
        "relative flex items-center justify-center cursor-pointer shrink-0 h-9 w-9 rounded-md bg-card text-foreground shadow-sm hover:opacity-85 transition-[opacity,transform,background-color,color] duration-150 ease-out",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolvedTheme}
          initial={{ opacity: 0, scale: 0.75, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.75, rotate: 12 }}
          transition={{ duration: 0.18, ease: [0.215, 0.61, 0.355, 1] }}
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 0,
          }}
        >
          {isDark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function ThemeTogglePreview() {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center" style={{ backgroundColor: "var(--color-surface)" }}>
      <ThemeToggle />
    </div>
  );
}

