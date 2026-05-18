"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

function AsciiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = c.width, H = c.height;
    ctx.fillStyle = "#0e0e0e";
    ctx.fillRect(0, 0, W, H);
    const chars = "▓▒░█▄▀@#%&*+=-.,";
    const cols = 22, rows = 28;
    const cw = W / cols, ch = H / rows;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const nx = col / cols, ny = row / rows;
        const dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.45) ** 2);
        const wave = Math.sin(nx * 12 + ny * 8) * 0.5 + 0.5;
        const brightness = Math.max(0, 1 - dist * 1.6) * wave;
        if (brightness < 0.07) continue;
        const charIdx = Math.floor(brightness * (chars.length - 1));
        const hue = 200 + nx * 40;
        ctx.fillStyle = `hsl(${hue},60%,${20 + brightness * 55}%)`;
        ctx.font = `bold ${Math.round(cw * 0.85)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(chars[charIdx], col * cw + cw / 2, row * ch + ch / 2);
      }
    }
  }, []);
  return <canvas ref={ref} width={320} height={400} className="w-full h-full object-cover" />;
}

function DotsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = c.width, H = c.height;
    ctx.fillStyle = "#f5f0e8";
    ctx.fillRect(0, 0, W, H);
    const cols = 30, rows = 38;
    const cw = W / cols, ch = H / rows;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const nx = col / cols, ny = row / rows;
        const dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2);
        const wave = (Math.sin(nx * 10) * 0.5 + 0.5) * (Math.cos(ny * 8) * 0.5 + 0.5);
        const density = Math.max(0, 1 - dist * 1.4) * (0.4 + wave * 0.6);
        const r = (cw * 0.45) * density;
        if (r < 0.5) continue;
        ctx.beginPath();
        ctx.arc(col * cw + cw / 2, row * ch + ch / 2, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(40,60,120,${0.5 + density * 0.5})`;
        ctx.fill();
      }
    }
  }, []);
  return <canvas ref={ref} width={320} height={400} className="w-full h-full object-cover" />;
}

function ToneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = c.width, H = c.height;
    ctx.fillStyle = "#1a0a00";
    ctx.fillRect(0, 0, W, H);
    // CMYK-style line screen
    const spacing = 7;
    for (let y = 0; y < H; y += spacing) {
      for (let x = 0; x < W; x += 1) {
        const nx = x / W, ny = y / H;
        const dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.45) ** 2);
        const bright = Math.max(0, 1 - dist * 1.5);
        const lw = bright * (spacing * 0.85);
        if (lw < 0.3) continue;
        const hue = 20 + nx * 30 + ny * 20;
        ctx.strokeStyle = `hsl(${hue},80%,${30 + bright * 50}%)`;
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y);
        ctx.stroke();
      }
    }
  }, []);
  return <canvas ref={ref} width={320} height={400} className="w-full h-full object-cover" />;
}

const EFFECTS = [
  {
    id: "ascii",
    Canvas: AsciiCanvas,
    label: "01",
    title: "ASCII Art",
    desc: "Dense character art from any image or video. 8 character sets, full color, export as PNG, HTML, SVG, or animated typewriter.",
  },
  {
    id: "dots",
    Canvas: DotsCanvas,
    label: "02",
    title: "Dot Render",
    desc: "Halftone dot effects with 20+ algorithms and 26+ shapes. Ordered dither, live video support, SVG output.",
  },
  {
    id: "tonekit",
    Canvas: ToneCanvas,
    label: "03",
    title: "ToneKit Halftone",
    desc: "CMYK, duotone, line screen, mezzotint. Print simulation presets for newspaper, silkscreen, and offset.",
  },
];

export function BotanicalEffects() {
  return (
    <section className="relative w-full overflow-hidden py-32">
      {/* Botanical frame image — covers the section as a decorative border */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/botanical-frame.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          pointerEvents: "none",
          userSelect: "none",
          opacity: 0.18,
          filter: "var(--tree-filter)",
          zIndex: 0,
          mixBlendMode: "multiply",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 font-mono">
            Visual Effects
          </p>
          <h2
            className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.1]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Three engines.<br />Infinite expression.
          </h2>
        </motion.div>

        {/* Effect cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {EFFECTS.map((effect, i) => {
            const Canvas = effect.Canvas;
            return (
              <motion.div
                key={effect.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <Link href={`/edit?mode=${effect.id}`} className="group block">
                  {/* Preview card */}
                  <div
                    className="relative w-full overflow-hidden rounded-xl border border-border"
                    style={{ aspectRatio: "4 / 5" }}
                  >
                    <Canvas />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                    {/* Number label */}
                    <span
                      className="absolute top-3 left-3 text-xs font-mono text-white/60"
                    >
                      {effect.label}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="pt-5">
                    <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-foreground/70 transition-colors">
                      {effect.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {effect.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom botanical frame accent — larger frame centered below cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/botanical-frame.png"
            alt=""
            aria-hidden
            style={{
              width: 480,
              maxWidth: "90%",
              opacity: 0.55,
              filter: "var(--tree-filter)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
