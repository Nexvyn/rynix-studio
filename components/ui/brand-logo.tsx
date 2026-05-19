"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Logo } from "@/components/ui/logo";

interface BrandLogoProps {
  size?: number | string;
  className?: string;
  animKey?: number;
  /** Pass false to suppress the built-in grid (e.g. when parent renders its own). */
  showGrid?: boolean;
  /** Control hover state externally. If omitted, component manages it internally. */
  hovered?: boolean;
}

const SPRING = { type: "spring" as const, stiffness: 500, damping: 34, mass: 0.6 };

export function BrandLogo({
  size = 28,
  className = "",
  animKey = 0,
  showGrid = true,
  hovered: controlledHovered,
}: BrandLogoProps) {
  const [internalHovered, setInternalHovered] = useState(false);
  const hovered = controlledHovered !== undefined ? controlledHovered : internalHovered;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const uid = useId().replace(/:/g, "");

  const gradId = `bl-grad-${uid}`;
  const maskId = `bl-mask-${uid}`;

  const gridStyle =
    typeof size === "number"
      ? { left: -size, top: -size, width: size * 3, height: size * 3 }
      : { left: `-${size}`, top: `-${size}`, width: `calc(${size} * 3)`, height: `calc(${size} * 3)` };

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size, overflow: "visible" }}
      onMouseEnter={() => setInternalHovered(true)}
      onMouseLeave={() => setInternalHovered(false)}
    >
      {showGrid && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ ...gridStyle, zIndex: 50 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="100%" height="100%" viewBox="0 0 300 300">
            <defs>
              <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
                <stop offset="30%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="90%" stopColor="#000000" stopOpacity="1" />
              </radialGradient>
              <mask id={maskId}>
                <rect width="300" height="300" fill={`url(#${gradId})`} />
              </mask>
            </defs>
            <g
              stroke={isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.16)"}
              strokeWidth="1.5"
              mask={`url(#${maskId})`}
            >
              <line x1="100" y1="0" x2="100" y2="300" />
              <line x1="200" y1="0" x2="200" y2="300" />
              <line x1="0"   y1="100" x2="300" y2="100" />
              <line x1="0"   y1="200" x2="300" y2="200" />
            </g>
          </svg>
        </motion.div>
      )}

      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          animate={{ y: hovered ? "-100%" : "0%" }}
          transition={SPRING}
        >
          <Logo
            key={animKey}
            width="100%"
            height="100%"
            showHoverEffect={false}
            themeOverride={isDark ? "dark" : "light"}
          />
        </motion.div>
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          animate={{ y: hovered ? "0%" : "100%" }}
          transition={SPRING}
        >
          <Logo
            width="100%"
            height="100%"
            showHoverEffect={false}
            themeOverride="hover-orange"
          />
        </motion.div>
      </div>
    </div>
  );
}
