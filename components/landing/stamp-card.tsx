"use client";

import { motion } from "framer-motion";

const W = 260;
const H = 330;
const PAD = 18;
const ART_H = 218;
const FOOTER_H = H - PAD * 2 - ART_H;
const PERF_R = 6.5;

// Blue bird silhouettes on cream background
// Each bird is a group of paths forming a realistic dove/pigeon silhouette
// Varied: some facing left, some right, some wings up, some gliding

function Bird({ flip = false, variant = 0 }: { flip?: boolean; variant?: number }) {
  // variant 0: wings up (soaring)
  // variant 1: wings mid (flapping)
  // variant 2: gliding flat
  // variant 3: small distant bird
  const color = "#4a7eb5";

  if (variant === 3) {
    // tiny distant bird: simple V shape
    return (
      <path
        d="M-8,0 C-4,-5 0,-6 0,-4 C0,-6 4,-5 8,0 C4,-2 0,-1 0,1 C0,-1 -4,-2 -8,0Z"
        fill={color}
      />
    );
  }

  if (variant === 2) {
    // gliding: wide flat wings
    return (
      <g>
        <ellipse cx="0" cy="2" rx="7" ry="4" fill={color} />
        <path d="M-5,1 C-12,-2 -22,-1 -24,3 C-18,2 -10,3 -5,4Z" fill={color} />
        <path d="M5,1 C12,-2 22,-1 24,3 C18,2 10,3 5,4Z" fill={color} />
        <path d="M-5,4 C-8,8 -10,12 -7,13 C-4,10 0,8 0,6 C0,8 4,10 7,13 C10,12 8,8 5,4Z" fill={color} />
        <circle cx="0" cy="-2" r="3.5" fill={color} />
      </g>
    );
  }

  if (variant === 1) {
    // flapping: wings angled down
    return (
      <g>
        <ellipse cx="0" cy="0" rx="7" ry="4.5" fill={color} />
        <path d="M-4,-1 C-10,4 -20,6 -22,10 C-16,7 -8,5 -4,3Z" fill={color} />
        <path d="M4,-1 C10,4 20,6 22,10 C16,7 8,5 4,3Z" fill={color} />
        <path d="M-4,3 C-7,8 -9,12 -6,13 C-3,10 0,8 0,5 C0,8 3,10 6,13 C9,12 7,8 4,3Z" fill={color} />
        <circle cx="0" cy="-3" r="3.5" fill={color} />
      </g>
    );
  }

  // variant 0: wings up (soaring) - most common
  return (
    <g>
      <ellipse cx="0" cy="1" rx="7" ry="4.5" fill={color} />
      <path d="M-4,-1 C-9,-8 -20,-10 -22,-6 C-16,-7 -8,-4 -4,2Z" fill={color} />
      <path d="M4,-1 C9,-8 20,-10 22,-6 C16,-7 8,-4 4,2Z" fill={color} />
      <path d="M-4,3 C-7,8 -9,12 -6,13 C-3,10 0,8 0,5 C0,8 3,10 6,13 C9,12 7,8 4,3Z" fill={color} />
      <circle cx="0" cy="-3" r="3.5" fill={color} />
    </g>
  );
}

// Dense bird scatter data — (x%, y% of art area, rotation, scale, variant, flip)
const BIRDS: Array<[number, number, number, number, number, boolean]> = [
  // top row
  [5,   4,  -15, 0.65, 3, false],
  [18,  2,   20, 0.80, 0, true],
  [34,  1,  -10, 0.90, 0, false],
  [52,  3,   25, 0.70, 3, true],
  [65,  0,  -20, 0.85, 1, false],
  [80,  5,   10, 0.75, 0, true],
  [92,  2,  -30, 0.65, 3, false],

  // row 2
  [2,   14,  12, 0.90, 1, false],
  [14,  12, -25, 1.10, 0, true],
  [28,  16,  18, 0.80, 2, false],
  [44,  11,  -8, 1.05, 0, true],
  [58,  15,  30, 0.70, 3, false],
  [70,  10, -15, 1.00, 1, true],
  [84,  14,  22, 0.88, 0, false],
  [95,  11, -10, 0.72, 3, true],

  // row 3
  [6,   26, -20, 1.00, 0, false],
  [20,  24,   8, 0.85, 2, true],
  [36,  28, -12, 1.15, 1, false],
  [50,  23,  28, 0.78, 0, true],
  [63,  27,  -5, 1.05, 0, false],
  [76,  22,  20, 0.90, 3, true],
  [88,  26, -25, 1.10, 1, false],

  // row 4
  [1,   38,  15, 0.88, 3, false],
  [12,  36, -18, 1.05, 0, true],
  [26,  40,  10, 0.92, 2, false],
  [40,  35, -22, 1.20, 1, true],
  [54,  39,  18, 0.82, 0, false],
  [67,  34,  -8, 1.08, 0, true],
  [80,  38,  25, 0.75, 3, false],
  [92,  35, -15, 1.00, 2, true],

  // row 5
  [4,   50, -10, 1.10, 1, false],
  [17,  48,  22, 0.88, 0, true],
  [31,  52, -28, 1.00, 0, false],
  [46,  47,  12, 1.15, 2, true],
  [60,  51,  -5, 0.85, 1, false],
  [73,  46,  20, 1.05, 0, true],
  [86,  50, -18, 0.90, 3, false],

  // row 6
  [8,   62,  18, 0.85, 0, true],
  [22,  60, -12, 1.10, 1, false],
  [36,  64,  25, 0.78, 0, true],
  [50,  59,  -8, 1.05, 2, false],
  [64,  63,  15, 0.92, 0, true],
  [78,  58, -22, 1.15, 1, false],
  [90,  62,  10, 0.80, 3, true],

  // row 7
  [2,   74, -15, 1.00, 2, false],
  [16,  72,  20, 0.90, 0, true],
  [30,  76,  -8, 1.08, 1, false],
  [44,  71,  28, 0.82, 0, true],
  [58,  75, -18, 1.12, 0, false],
  [72,  70,  12, 0.88, 2, true],
  [85,  74, -25, 1.00, 1, false],
  [96,  71,   5, 0.75, 3, true],

  // row 8
  [10,  86, -20, 0.92, 1, false],
  [24,  84,  15, 1.05, 0, true],
  [38,  88,  -5, 0.85, 0, false],
  [52,  83,  22, 1.10, 2, true],
  [66,  87, -12, 0.80, 1, false],
  [79,  82,  18, 1.00, 0, true],
  [92,  86, -28, 0.88, 3, false],

  // row 9 (near bottom)
  [5,   95,  10, 0.80, 3, true],
  [20,  93, -18, 1.00, 0, false],
  [35,  96,  25, 0.88, 1, true],
  [50,  92,  -8, 1.05, 0, false],
  [65,  95,  15, 0.82, 2, true],
  [80,  92, -20, 1.10, 0, false],
  [93,  95,   8, 0.78, 3, true],
];

function stampPath(w: number, h: number, r: number, step: number): string {
  const hCount = Math.round(w / step);
  const vCount = Math.round(h / step);
  const hStep = w / hCount;
  const vStep = h / vCount;

  let d = "";

  // Top edge left→right
  d += `M0,0 `;
  for (let i = 0; i < hCount; i++) {
    const cx = hStep * i + hStep / 2;
    d += `L${cx - r},0 A${r},${r} 0 0 0 ${cx + r},0 `;
  }
  d += `L${w},0 `;

  // Right edge top→bottom
  for (let i = 0; i < vCount; i++) {
    const cy = vStep * i + vStep / 2;
    d += `L${w},${cy - r} A${r},${r} 0 0 0 ${w},${cy + r} `;
  }
  d += `L${w},${h} `;

  // Bottom edge right→left
  for (let i = hCount - 1; i >= 0; i--) {
    const cx = hStep * i + hStep / 2;
    d += `L${cx + r},${h} A${r},${r} 0 0 0 ${cx - r},${h} `;
  }
  d += `L0,${h} `;

  // Left edge bottom→top
  for (let i = vCount - 1; i >= 0; i--) {
    const cy = vStep * i + vStep / 2;
    d += `L0,${cy + r} A${r},${r} 0 0 0 0,${cy - r} `;
  }
  d += "Z";

  return d;
}

export function StampCard() {
  const innerW = W - PAD * 2;
  const artW = innerW;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      whileHover={{ rotate: 0, scale: 1.04, y: -8 }}
      style={{
        width: W,
        flexShrink: 0,
        filter: "drop-shadow(0 32px 60px rgba(0,0,0,0.65))",
        cursor: "default",
      }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <clipPath id="stamp-outer-clip">
            <path d={stampPath(W, H, PERF_R, 14)} />
          </clipPath>
          <clipPath id="art-area-clip">
            <rect x={PAD} y={PAD} width={artW} height={ART_H} />
          </clipPath>
        </defs>

        {/* White stamp body clipped to perforation shape */}
        <rect x={0} y={0} width={W} height={H} fill="white" clipPath="url(#stamp-outer-clip)" />

        {/* Art area: cream background */}
        <rect x={PAD} y={PAD} width={artW} height={ART_H} fill="#ddd8c8" />

        {/* Birds rendered inside art area */}
        <g clipPath="url(#art-area-clip)">
          {BIRDS.map(([xp, yp, rot, scale, variant, flip], i) => {
            const x = PAD + (xp / 100) * artW;
            const y = PAD + (yp / 100) * ART_H;
            return (
              <g
                key={i}
                transform={`translate(${x},${y}) rotate(${rot}) scale(${flip ? -scale : scale},${scale})`}
              >
                <Bird variant={variant} flip={flip} />
              </g>
            );
          })}
        </g>

        {/* Footer: white area */}
        <rect x={PAD} y={PAD + ART_H} width={artW} height={FOOTER_H} fill="white" />

        {/* Kanji 青鳥 — left side */}
        <text
          x={PAD + 6}
          y={PAD + ART_H + FOOTER_H - 10}
          fontFamily="'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif"
          fontSize="52"
          fontWeight="900"
          fill="#111111"
        >
          青鳥
        </text>

        {/* Right text block */}
        {/* Blue Bird Whirl */}
        <text
          x={PAD + 116}
          y={PAD + ART_H + 30}
          fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
          fontSize="17"
          fontWeight="700"
          fill="#4a7eb5"
          letterSpacing="0.3"
        >
          Blue Bird Whirl
        </text>

        {/* Japanese subtitle */}
        <text
          x={PAD + 116}
          y={PAD + ART_H + 46}
          fontFamily="'Noto Serif JP', 'Hiragino Mincho ProN', serif"
          fontSize="9"
          fill="#333"
          letterSpacing="1.5"
        >
          聖堂・鳥・日本・印
        </text>

        {/* Date */}
        <text
          x={PAD + 116}
          y={PAD + ART_H + 61}
          fontFamily="'Courier New', 'Lucida Console', monospace"
          fontSize="8.5"
          fill="#222"
          letterSpacing="0.5"
        >
          23.-30. SEPTEMBER 1970
        </text>
      </svg>
    </motion.div>
  );
}
