"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, inViewport } from "@/lib/motion";

function BlocksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const COLS = 20;
    const ROWS = 12;
    const BW = W / COLS;
    const BH = H / ROWS;
    const TOTAL = COLS * ROWS;
    const CYCLE = 4000; // ms for one full reveal cycle

    // Precompute a shuffled reveal order
    const order = Array.from({ length: TOTAL }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    // Colour palette per block (precomputed)
    const palette = [
      "#1e5fe0", "#3d7df0", "#7db4ff",
      "#2a2a2e", "#3a3a40", "#4a4a52",
      "#0a0a0b", "#16161a", "#222228",
    ];
    const blockColors = order.map(() => palette[Math.floor(Math.random() * palette.length)]);

    function draw(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = (elapsed % CYCLE) / CYCLE; // 0..1 looping

      ctx!.clearRect(0, 0, W, H);

      // Background
      ctx!.fillStyle = "#0a0a0b";
      ctx!.fillRect(0, 0, W, H);

      for (let k = 0; k < TOTAL; k++) {
        const idx = order[k];
        const col = idx % COLS;
        const row = Math.floor(idx / COLS);
        const x = col * BW;
        const y = row * BH;

        // Each block reveals at a staggered progress threshold
        const threshold = k / TOTAL;
        // Reveal phase: 0..0.6 of cycle; hold phase: 0.6..0.8; fade out: 0.8..1.0
        let alpha = 0;
        if (progress < 0.6) {
          const revealP = progress / 0.6;
          alpha = revealP > threshold ? Math.min(1, (revealP - threshold) / 0.08) : 0;
        } else if (progress < 0.8) {
          alpha = 1;
        } else {
          const fadeP = (progress - 0.8) / 0.2;
          alpha = 1 - fadeP;
        }

        if (alpha <= 0) continue;

        const color = blockColors[k];
        ctx!.globalAlpha = alpha * 0.85;

        // 3D-ish cube face
        const gap = 2;
        const bx = x + gap / 2;
        const by = y + gap / 2;
        const bw = BW - gap;
        const bh = BH - gap;
        const depth = 5;

        // Top face (lighter)
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.moveTo(bx, by + depth);
        ctx!.lineTo(bx + depth, by);
        ctx!.lineTo(bx + bw, by);
        ctx!.lineTo(bx + bw - depth, by + depth);
        ctx!.closePath();
        ctx!.fill();

        // Front face
        ctx!.fillStyle = color;
        ctx!.globalAlpha = alpha * 0.65;
        ctx!.fillRect(bx, by + depth, bw - depth, bh - depth);

        // Right face (darker)
        ctx!.fillStyle = "#000";
        ctx!.globalAlpha = alpha * 0.3;
        ctx!.beginPath();
        ctx!.moveTo(bx + bw - depth, by + depth);
        ctx!.lineTo(bx + bw, by);
        ctx!.lineTo(bx + bw, by + bh - depth);
        ctx!.lineTo(bx + bw - depth, by + bh);
        ctx!.closePath();
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={480}
      className="w-full h-full object-cover"
    />
  );
}

export function BlocksReveal() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={inViewport}
          variants={staggerContainer}
        >
          {/* Text side */}
          <div className="flex-1 max-w-lg">
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Deconstruction Grid
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground leading-tight text-balance"
            >
              Deconstruct. Rebuild. Transform.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-muted-foreground leading-relaxed text-pretty">
              Break your visuals into pixel-like cubes, then rebuild them piece by piece.
              This block-by-block reveal creates a sense of futuristic construction —
              precision and sophistication built into every frame.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Supports images and video sources",
                "Scroll-based and variant-driven animations",
                "Adjustable block size, depth, and reveal order",
                "High-performance — built for production pages",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                  {f}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Canvas side */}
          <motion.div
            variants={fadeUp}
            className="flex-1 w-full rounded-2xl overflow-hidden border border-border shadow-2xl"
            style={{ aspectRatio: "5/3" }}
          >
            <BlocksCanvas />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
