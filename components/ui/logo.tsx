"use client";

import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useId } from "react";

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  themeOverride?: "dark" | "light" | string;
  showHoverEffect?: boolean;
  hovered?: boolean;
}

// Each petal's path + the direction it flies in from on mount
const PETALS = [
  {
    d: "M7.25 16.0996C8.47968 16.1917 9.41168 16.3691 10.2373 16.7109C12.5242 17.6582 14.3418 19.4758 15.2891 21.7627C15.6308 22.5881 15.8073 23.5199 15.8994 24.749C15.8544 25.0446 15.7917 25.2975 15.6953 25.5303C15.2893 26.5104 14.5104 27.2893 13.5303 27.6953C12.7952 27.9997 11.8635 28 10 28C8.1365 28 7.20476 27.9997 6.46973 27.6953C5.48961 27.2893 4.71066 26.5104 4.30469 25.5303C4.00034 24.7952 4 23.8635 4 22C4 20.1365 4.00034 19.2048 4.30469 18.4697C4.71066 17.4896 5.48961 16.7107 6.46973 16.3047C6.70228 16.2084 6.95476 16.1446 7.25 16.0996Z",
    dx: -5, dy: 5, delay: 0.1,
  },
  {
    d: "M24.749 16.0996C25.0447 16.1446 25.2975 16.2083 25.5303 16.3047C26.5104 16.7107 27.2893 17.4896 27.6953 18.4697C27.9997 19.2048 28 20.1365 28 22C28 23.8635 27.9997 24.7952 27.6953 25.5303C27.2893 26.5104 26.5104 27.2893 25.5303 27.6953C24.7952 27.9997 23.8635 28 22 28C20.1365 28 19.2048 27.9997 18.4697 27.6953C17.4896 27.2893 16.7107 26.5104 16.3047 25.5303C16.2083 25.2975 16.1446 25.0447 16.0996 24.749C16.1918 23.5198 16.3692 22.5881 16.7109 21.7627C17.6582 19.4758 19.4758 17.6582 21.7627 16.7109C22.5881 16.3692 23.5198 16.1918 24.749 16.0996Z",
    dx: 5, dy: 5, delay: 0.2,
  },
  {
    d: "M10 4C11.8635 4 12.7952 4.00034 13.5303 4.30469C14.5104 4.71066 15.2893 5.48961 15.6953 6.46973C15.7916 6.70224 15.8544 6.95483 15.8994 7.25C15.8073 8.47965 15.6309 9.4117 15.2891 10.2373C14.3418 12.5242 12.5242 14.3418 10.2373 15.2891C9.4117 15.6309 8.47965 15.8073 7.25 15.8994C6.95483 15.8544 6.70224 15.7916 6.46973 15.6953C5.48961 15.2893 4.71066 14.5104 4.30469 13.5303C4.00034 12.7952 4 11.8635 4 10C4 8.1365 4.00034 7.20476 4.30469 6.46973C4.71066 5.48961 5.48961 4.71066 6.46973 4.30469C7.20476 4.00034 8.1365 4 10 4Z",
    dx: -5, dy: -5, delay: 0.0,
  },
  {
    d: "M22 4C23.8635 4 24.7952 4.00034 25.5303 4.30469C26.5104 4.71066 27.2893 5.48961 27.6953 6.46973C27.9997 7.20476 28 8.1365 28 10C28 11.8635 27.9997 12.7952 27.6953 13.5303C27.2893 14.5104 26.5104 15.2893 25.5303 15.6953C25.2975 15.7917 25.0446 15.8544 24.749 15.8994C23.5199 15.8073 22.5881 15.6308 21.7627 15.2891C19.4758 14.3418 17.6582 12.5242 16.7109 10.2373C16.3691 9.41168 16.1917 8.47968 16.0996 7.25C16.1446 6.95476 16.2084 6.70228 16.3047 6.46973C16.7107 5.48961 17.4896 4.71066 18.4697 4.30469C19.2048 4.00034 20.1365 4 22 4Z",
    dx: 5, dy: -5, delay: 0.3,
  },
];

function LogoShapes({ fill, animKey }: { fill: string; animKey?: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {PETALS.map((petal, i) => (
        <motion.g
          key={`${animKey}-${i}`}
          initial={shouldReduceMotion ? false : { x: petal.dx, y: petal.dy, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            delay: petal.delay,
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <path fill={fill} d={petal.d} />
        </motion.g>
      ))}
    </>
  );
}

export function Logo({
  width = 28,
  height = 30,
  className = "",
  themeOverride,
  showHoverEffect = true,
  hovered,
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [internalHovered, setInternalHovered] = useState(false);
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = themeOverride
    ? themeOverride
    : mounted && (resolvedTheme === "dark" || theme === "dark")
      ? "dark"
      : "light";

  const isDark = currentTheme === "dark";
  const isOrange = currentTheme === "hover-orange";
  const useHoverEffect = showHoverEffect && mounted;
  const isHovered = hovered !== undefined ? hovered : internalHovered;

  const defaultFill = isOrange ? "var(--brand-accent)" : "currentColor";
  const hoverFill = "var(--brand-accent)";

  const numericWidth = typeof width === "number" ? width : 28;
  const numericHeight = typeof height === "number" ? height : 30;
  const gw = numericWidth * 3;
  const gh = numericHeight * 3;

  const gradId = `grid-fade-${uid}`;
  const maskId = `fade-mask-${uid}`;

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setInternalHovered(true)}
      onMouseLeave={() => setInternalHovered(false)}
      style={{ width, height }}
    >
      {useHoverEffect && (
        <motion.svg
          className="absolute pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ left: -numericWidth, top: -numericHeight }}
          width={gw}
          height={gh}
          viewBox="0 0 300 300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
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
            stroke={isDark ? "rgba(255, 255, 255, 0.28)" : "rgba(0, 0, 0, 0.16)"}
            strokeWidth="1.5"
            mask={`url(#${maskId})`}
          >
            <line x1="100" y1="0" x2="100" y2="300" />
            <line x1="200" y1="0" x2="200" y2="300" />
            <line x1="0" y1="100" x2="300" y2="100" />
            <line x1="0" y1="200" x2="300" y2="200" />
          </g>
        </motion.svg>
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        <rect fill="transparent" width="32" height="32" />

        <motion.g
          animate={{ opacity: isHovered && useHoverEffect ? 0 : 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoShapes fill={defaultFill} animKey={mounted ? 1 : 0} />
        </motion.g>

        <motion.g
          animate={{ opacity: isHovered && useHoverEffect ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoShapes fill={hoverFill} />
          {useHoverEffect && (
            <motion.circle
              cx="26"
              cy="26"
              r="1"
              fill={hoverFill}
              animate={{
                scale: isHovered ? [0, 1.2, 1] : 0,
                opacity: isHovered ? 1 : 0,
              }}
              initial={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            />
          )}
        </motion.g>
      </svg>
    </div>
  );
}
