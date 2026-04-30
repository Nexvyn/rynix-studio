"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  themeOverride?: "dark" | "light" | string;
}

export function Logo({
  width = 28,
  height = 30,
  className = "",
  themeOverride,
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = themeOverride 
    ? themeOverride 
    : mounted && (resolvedTheme === "dark" || theme === "dark") 
      ? "dark" 
      : "light";
      
  const isDark = currentTheme === "dark";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 85"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#e7f1d8" : "#5a7a4a"} />
          <stop offset="100%" stopColor={isDark ? "#d6eaf8" : "#4a6a8a"} />
        </linearGradient>
      </defs>
      <rect fill="#00000000" width="80" height="85" />
      <polygon
        fill="url(#logoGrad)"
        points="30 1.9 10.8 1.9 10.8 11.9 20.2 11.9 20.2 21.1 20.2 21.1 20.2 30.7 2 30.7 2 21.1 20.2 21.1 30 21.1 30 30.7 39.5 30.7 39.5 38.6 49.4 38.6 49.4 50.8 39.5 50.8 39.5 60.7 49.4 60.7 49.4 55.9 59.3 55.9 59.3 47.2 69.2 47.2 69.2 38.5 59.3 38.5 59.3 30.7 49.4 30.7 49.4 21.1 39.5 21.1 39.5 11.9 29.9 11.9"
      />
      <polygon
        fill="url(#logoGrad)"
        points="29.9 31.1 20.3 31 20.1 47.2 10.7 47.2 10.7 60.8 2 60.8 2 70.3 10.8 70.3 10.8 65.7 20.2 65.6 20.2 55.9 29.9 55.9 29.9 47.3 39.5 47.3 39.5 38.5 29.9 38.5"
      />
      <polygon
        fill="url(#logoGrad)"
        points="30 60.7 30 65.6 20.2 65.6 20.2 72.6 10.8 72.7 10.8 82.1 20.2 82.1 20.2 75.1 29.9 75.1 29.9 70.3 39.5 70.3 39.5 60.7"
      />
      <rect fill="url(#logoGrad)" x="39.5" y="1.9" width="9.7" height="9.7" />
      <rect fill="url(#logoGrad)" x="59.2" y="11.9" width="9.7" height="9.2" />
      <rect fill="url(#logoGrad)" x="59.2" y="60.7" width="9.7" height="9.6" />
      <rect fill="url(#logoGrad)" x="39.5" y="70.2" width="9.6" height="9.5" />
      <rect fill="url(#logoGrad)" x="71.5" y="33.4" width="7.2" height="7.6" />
      <rect fill="url(#logoGrad)" x="73.9" y="60.7" width="4.8" height="4.8" />
    </svg>
  );
}
