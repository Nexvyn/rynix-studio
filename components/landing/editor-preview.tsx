"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp, inViewport } from "@/lib/motion";

const DEMO_IMAGE =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600&auto=format&fit=crop";

type EffectId = "ascii" | "dots" | "halftone" | "matrix" | "glitch";

const EFFECTS: { id: EffectId; label: string }[] = [
  { id: "ascii", label: "ASCII" },
  { id: "dots", label: "Dots" },
  { id: "halftone", label: "Halftone" },
  { id: "matrix", label: "Matrix" },
  { id: "glitch", label: "Glitch" },
];

const ASCII_CHARS = " .:-=+*#%@";
const MATRIX_CHARS = "ｱｲｳｴｵｶｷｸ01234789ﾊﾋﾌﾍﾎ";

// Sample the source image into a low-res luminance grid the effects read from.
type LumaGrid = { data: Float32Array; cols: number; rows: number };

function buildLumaGrid(
  img: HTMLImageElement,
  cell: number,
  w: number,
  h: number,
  scratch: HTMLCanvasElement
): LumaGrid {
  const cols = Math.max(1, Math.floor(w / cell));
  const rows = Math.max(1, Math.floor(h / cell));
  scratch.width = cols;
  scratch.height = rows;
  const sctx = scratch.getContext("2d", { willReadFrequently: true })!;
  // cover-fit the image into the grid
  const ir = img.width / img.height;
  const gr = cols / rows;
  let sw = img.width, sh = img.height, sx = 0, sy = 0;
  if (ir > gr) { sw = img.height * gr; sx = (img.width - sw) / 2; }
  else { sh = img.width / gr; sy = (img.height - sh) / 2; }
  sctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
  const px = sctx.getImageData(0, 0, cols, rows).data;
  const data = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
    data[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  return { data, cols, rows };
}

type DrawCtx = {
  ctx: CanvasRenderingContext2D;
  grid: LumaGrid;
  cell: number;
  w: number;
  h: number;
  t: number;
  fg: string;
  bg: string;
  intensity: number; // 0..1
};

function paintBg({ ctx, w, h, bg }: DrawCtx) {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
}

const drawers: Record<EffectId, (d: DrawCtx) => void> = {
  ascii(d) {
    paintBg(d);
    const { ctx, grid, cell, fg } = d;
    ctx.fillStyle = fg;
    ctx.font = `${cell}px monospace`;
    ctx.textBaseline = "top";
    for (let y = 0; y < grid.rows; y++) {
      for (let x = 0; x < grid.cols; x++) {
        const luma = grid.data[y * grid.cols + x];
        const idx = Math.round(luma * (ASCII_CHARS.length - 1));
        const ch = ASCII_CHARS[idx];
        if (ch !== " ") ctx.fillText(ch, x * cell, y * cell);
      }
    }
  },
  dots(d) {
    paintBg(d);
    const { ctx, grid, cell, fg, intensity } = d;
    ctx.fillStyle = fg;
    const max = cell * 0.5 * (0.6 + intensity * 0.8);
    for (let y = 0; y < grid.rows; y++) {
      for (let x = 0; x < grid.cols; x++) {
        const luma = grid.data[y * grid.cols + x];
        const r = max * luma;
        if (r < 0.3) continue;
        ctx.beginPath();
        ctx.arc(x * cell + cell / 2, y * cell + cell / 2, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
  halftone(d) {
    paintBg(d);
    const { ctx, grid, cell, fg, intensity } = d;
    ctx.fillStyle = fg;
    const max = cell * 0.62 * (0.6 + intensity * 0.8);
    for (let y = 0; y < grid.rows; y++) {
      for (let x = 0; x < grid.cols; x++) {
        // halftone reads dark areas as bigger dots → invert luma
        const luma = 1 - grid.data[y * grid.cols + x];
        const r = max * luma;
        if (r < 0.3) continue;
        const ox = (y % 2) * (cell / 2);
        ctx.beginPath();
        ctx.arc(x * cell + cell / 2 + ox, y * cell + cell / 2, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
  matrix(d) {
    paintBg(d);
    const { ctx, grid, cell, t, intensity } = d;
    ctx.font = `${cell}px monospace`;
    ctx.textBaseline = "top";
    const speed = 4 + intensity * 10;
    for (let x = 0; x < grid.cols; x++) {
      const head = ((t * speed + x * 1.7) % grid.rows);
      for (let y = 0; y < grid.rows; y++) {
        const luma = grid.data[y * grid.cols + x];
        if (luma < 0.25) continue;
        const dist = (head - y + grid.rows) % grid.rows;
        const fade = Math.max(0, 1 - dist / (grid.rows * 0.55));
        const lit = fade * luma;
        if (lit < 0.05) continue;
        const g = Math.round(80 + lit * 175);
        ctx.fillStyle = dist < 1 ? "#d7ffe7" : `rgb(${Math.round(g * 0.3)},${g},${Math.round(g * 0.45)})`;
        const ci = (x * 13 + y * 7 + Math.floor(t * 6)) % MATRIX_CHARS.length;
        ctx.fillText(MATRIX_CHARS[ci], x * cell, y * cell);
      }
    }
  },
  glitch(d) {
    const { ctx, grid, cell, w, h, t, fg, bg, intensity } = d;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < grid.rows; y++) {
      const shift = Math.sin(y * 0.4 + t * 3) * cell * 1.5 * intensity;
      for (let x = 0; x < grid.cols; x++) {
        const luma = grid.data[y * grid.cols + x];
        const lum = Math.round(luma * 255);
        ctx.fillStyle = `rgb(${lum},${lum},${lum})`;
        ctx.fillRect(x * cell + shift, y * cell, cell - 0.5, cell - 0.5);
      }
    }
    // occasional RGB tear lines
    for (let i = 0; i < 3; i++) {
      const phase = t * (1.3 + i * 0.6) + i * 2.4;
      if (Math.sin(phase) < 0.75) continue;
      const ty = ((Math.sin(phase * 0.7) * 0.5 + 0.5) * h) | 0;
      ctx.fillStyle = i % 2 ? "rgba(255,45,135,0.35)" : "rgba(80,200,255,0.35)";
      ctx.fillRect(0, ty, w, Math.max(2, cell * 0.5));
    }
    void fg;
  },
};

export function EditorPreview() {
  const [effect, setEffect] = useState<EffectId>("ascii");
  const [intensity, setIntensity] = useState(0.6);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratchRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const reducedRef = useRef(false);
  // live refs so the loop reads latest controls without re-subscribing
  const effectRef = useRef(effect);
  const intensityRef = useRef(intensity);
  effectRef.current = effect;
  intensityRef.current = intensity;

  const themeColors = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.classList.contains("dark");
    return {
      fg: styles.getPropertyValue("--foreground").trim() || (isDark ? "#fff" : "#111"),
      bg: styles.getPropertyValue("--background").trim() || (isDark ? "#0a0a0a" : "#fff"),
    };
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = DEMO_IMAGE;
    img.onload = () => { imgRef.current = img; };
    scratchRef.current = document.createElement("canvas");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    let gridCache: LumaGrid | null = null;
    let gridKey = "";
    const start = performance.now();

    function frame(now: number) {
      rafRef.current = requestAnimationFrame(frame);
      if (!canvas || !imgRef.current || !visibleRef.current) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cell = Math.max(6, Math.round(w / 64));
      const key = `${effectRef.current}-${cell}-${w}-${h}`;
      if (key !== gridKey) {
        gridCache = buildLumaGrid(imgRef.current, cell, w, h, scratchRef.current!);
        gridKey = key;
      }

      const { fg, bg } = themeColors();
      const t = reducedRef.current ? 0 : (now - start) / 1000;
      drawers[effectRef.current]({
        ctx, grid: gridCache!, cell, w, h, t, fg, bg,
        intensity: intensityRef.current,
      });
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [themeColors]);

  return (
    <section className="w-full py-24 bg-background flex flex-col items-center">
      <motion.div
        className="max-w-6xl w-full px-8 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={inViewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="w-full mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground text-balance">
            See it work, right here
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-pretty">
            Pick an effect and watch it render live — the same engine that powers the editor.
          </p>
        </motion.div>

        {/* Editor-style window */}
        <motion.div
          variants={fadeUp}
          className="w-full grid gap-3 md:grid-cols-[1fr_280px]"
        >
          {/* Canvas frame */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
            {/* notch header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 h-12">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </span>
              <span className="text-[11px] font-medium text-muted-foreground capitalize tabular-nums">
                {effect} · live
              </span>
            </div>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>

          {/* Settings rail */}
          <div className="rounded-2xl bg-card border border-border p-4 flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2.5">
                Effect
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {EFFECTS.map((e) => {
                  const active = e.id === effect;
                  return (
                    <button
                      key={e.id}
                      onClick={() => setEffect(e.id)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-[opacity,scale,background-color] duration-150 ease-out active:scale-[0.96] ${
                        active
                          ? "bg-foreground text-background shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {e.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Intensity
                </p>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {Math.round(intensity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-foreground cursor-pointer"
              />
            </div>

            <div className="mt-auto pt-2">
              <Link
                href={`/edit?m=${effect === "halftone" || effect === "glitch" ? "dots" : effect === "matrix" ? "matrix-rain" : effect}`}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm transition-[background-color,scale] duration-150 ease-out hover:bg-foreground/90 active:scale-[0.96]"
              >
                Open in editor
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
