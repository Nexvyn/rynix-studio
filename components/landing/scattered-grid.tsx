"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Tile {
  cx: number;
  cy: number;
  size: number;
  tilt: number;
  initRotate: number;
  colorIdx: number;
}

const COLORS = [
  "#7eb8bc",
  "oklch(0.269 0 0)",
  "color-mix(in oklab, #7eb8bc 35%, oklch(0.145 0 0))",
  "oklch(0.205 0 0)",
  "color-mix(in oklab, #7eb8bc 15%, oklch(0.205 0 0))",
];

const TILES: Tile[] = [
  // left — upper
  { cx: -580, cy: -200, size: 118, tilt: -10, initRotate:  42, colorIdx: 0 },
  { cx: -500, cy:  -60, size: 105, tilt:  14, initRotate: -58, colorIdx: 2 },
  { cx: -450, cy: -350, size:  92, tilt: -22, initRotate:  68, colorIdx: 4 },
  // left — lower
  { cx: -520, cy:  130, size: 110, tilt:   6, initRotate: -35, colorIdx: 1 },
  { cx: -440, cy:  295, size:  98, tilt:  -5, initRotate:  55, colorIdx: 3 },
  // left near-center
  { cx: -340, cy: -150, size:  88, tilt:  18, initRotate: -72, colorIdx: 2 },
  { cx: -360, cy:  120, size:  95, tilt: -14, initRotate:  48, colorIdx: 0 },
  // right — upper
  { cx:  570, cy: -210, size: 115, tilt:  12, initRotate: -44, colorIdx: 1 },
  { cx:  490, cy:  -70, size: 102, tilt: -16, initRotate:  62, colorIdx: 3 },
  { cx:  440, cy: -355, size:  95, tilt:  24, initRotate: -66, colorIdx: 0 },
  // right — lower
  { cx:  500, cy:  140, size: 108, tilt:  -8, initRotate:  38, colorIdx: 4 },
  { cx:  430, cy:  305, size: 100, tilt:   7, initRotate: -52, colorIdx: 2 },
  // right near-center
  { cx:  345, cy: -160, size:  90, tilt: -20, initRotate:  74, colorIdx: 3 },
  { cx:  355, cy:  110, size:  93, tilt:  16, initRotate: -45, colorIdx: 1 },
  // top near-center
  { cx: -180, cy: -320, size:  85, tilt:  28, initRotate: -80, colorIdx: 4 },
  { cx:  190, cy: -330, size:  88, tilt: -25, initRotate:  78, colorIdx: 0 },
  // bottom near-center
  { cx: -165, cy:  305, size:  85, tilt: -20, initRotate:  65, colorIdx: 2 },
  { cx:  170, cy:  315, size:  88, tilt:  22, initRotate: -70, colorIdx: 1 },
  // far left/right (partially clipped)
  { cx: -660, cy:   30, size: 128, tilt:  -4, initRotate:  28, colorIdx: 1 },
  { cx:  650, cy:   20, size: 125, tilt:   6, initRotate: -32, colorIdx: 3 },
];

export function ScatteredGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {TILES.map((tile, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -tile.size / 2,
            marginTop: -tile.size / 2,
            width: tile.size,
            height: tile.size,
            borderRadius: Math.round(tile.size * 0.18),
            background: COLORS[tile.colorIdx],
            border: "1px solid oklch(1 0 0 / 10%)",
            willChange: "transform",
          }}
          initial={{ x: 0, y: 0, scale: 0.05, opacity: 0, rotate: tile.initRotate }}
          animate={
            inView
              ? { x: tile.cx, y: tile.cy, scale: 1, opacity: 1, rotate: tile.tilt }
              : {}
          }
          transition={{
            delay: i * 0.04,
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}
