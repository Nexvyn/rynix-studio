"use client";

import { GeistPixelSquare } from "geist/font/pixel";
import { useEffect, useRef } from "react";
import Link from "next/link";

function AsciiPreviewCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    // Silver/metallic gradient background like the reference card 1
    const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
    bg.addColorStop(0, "#d8d8d8");
    bg.addColorStop(0.4, "#e8e8e8");
    bg.addColorStop(0.7, "#c8c8c8");
    bg.addColorStop(1, "#b0b0b0");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Soft blurred blobs for depth
    const blob1 = ctx.createRadialGradient(W * 0.35, H * 0.38, 0, W * 0.35, H * 0.38, W * 0.55);
    blob1.addColorStop(0, "rgba(255,255,255,0.55)");
    blob1.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = blob1;
    ctx.fillRect(0, 0, W, H);

    const blob2 = ctx.createRadialGradient(W * 0.7, H * 0.65, 0, W * 0.7, H * 0.65, W * 0.4);
    blob2.addColorStop(0, "rgba(140,160,130,0.4)");
    blob2.addColorStop(1, "rgba(140,160,130,0)");
    ctx.fillStyle = blob2;
    ctx.fillRect(0, 0, W, H);

    // Centered "screen" panel
    const panelX = W * 0.1;
    const panelY = H * 0.12;
    const panelW = W * 0.8;
    const panelH = H * 0.72;
    const r = 12;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(panelX + r, panelY);
    ctx.lineTo(panelX + panelW - r, panelY);
    ctx.quadraticCurveTo(panelX + panelW, panelY, panelX + panelW, panelY + r);
    ctx.lineTo(panelX + panelW, panelY + panelH - r);
    ctx.quadraticCurveTo(panelX + panelW, panelY + panelH, panelX + panelW - r, panelY + panelH);
    ctx.lineTo(panelX + r, panelY + panelH);
    ctx.quadraticCurveTo(panelX, panelY + panelH, panelX, panelY + panelH - r);
    ctx.lineTo(panelX, panelY + r);
    ctx.quadraticCurveTo(panelX, panelY, panelX + r, panelY);
    ctx.closePath();
    ctx.shadowColor = "rgba(0,0,0,0.18)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fill();
    ctx.restore();

    // ASCII art inside panel
    ctx.save();
    ctx.beginPath();
    ctx.rect(panelX, panelY, panelW, panelH);
    ctx.clip();

    ctx.fillStyle = "#0e0e0e";
    ctx.fillRect(panelX, panelY, panelW, panelH);

    const chars = "▓▒░█▄▀@#%&*+=-.,:;";
    const cols = 28;
    const rows = 36;
    const cw = panelW / cols;
    const ch = panelH / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const nx = col / cols;
        const ny = row / rows;
        const dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.45) ** 2);
        const wave = Math.sin(nx * 14 + ny * 9) * 0.5 + 0.5;
        const brightness = Math.max(0, 1 - dist * 1.5) * wave;
        if (brightness < 0.06) continue;
        const charIdx = Math.floor(brightness * (chars.length - 1));
        const hue = 85 + nx * 50;
        const sat = 45 + brightness * 35;
        const light = 22 + brightness * 52;
        ctx.fillStyle = `hsl(${hue},${sat}%,${light}%)`;
        ctx.font = `bold ${Math.round(cw * 0.88)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(chars[charIdx], panelX + col * cw + cw / 2, panelY + row * ch + ch / 2);
      }
    }
    ctx.restore();

    // Panel shadow overlay at bottom
    const panelFade = ctx.createLinearGradient(0, panelY + panelH * 0.65, 0, panelY + panelH);
    panelFade.addColorStop(0, "rgba(14,14,14,0)");
    panelFade.addColorStop(1, "rgba(14,14,14,0.7)");
    ctx.fillStyle = panelFade;
    ctx.fillRect(panelX, panelY, panelW, panelH);
  }, []);

  return (
    <canvas ref={canvasRef} width={520} height={640} className="w-full h-full object-cover" />
  );
}

function DotRenderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    // Muted sage/green gradient background like reference card 2
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#b8c4a8");
    bg.addColorStop(0.5, "#c8d4b8");
    bg.addColorStop(1, "#9aaa8a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const blob1 = ctx.createRadialGradient(W * 0.3, H * 0.35, 0, W * 0.3, H * 0.35, W * 0.6);
    blob1.addColorStop(0, "rgba(220,230,200,0.55)");
    blob1.addColorStop(1, "rgba(220,230,200,0)");
    ctx.fillStyle = blob1;
    ctx.fillRect(0, 0, W, H);

    const blob2 = ctx.createRadialGradient(W * 0.75, H * 0.6, 0, W * 0.75, H * 0.6, W * 0.45);
    blob2.addColorStop(0, "rgba(100,120,80,0.35)");
    blob2.addColorStop(1, "rgba(100,120,80,0)");
    ctx.fillStyle = blob2;
    ctx.fillRect(0, 0, W, H);

    // Floating UI cards showing dot stats
    const drawCard = (x: number, y: number, w: number, h: number, label: string, value: string, accent: string, highlight: boolean) => {
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = highlight ? accent : "rgba(255,255,255,0.88)";
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 10);
      ctx.fill();
      ctx.restore();

      const iconSize = 28;
      ctx.fillStyle = highlight ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.08)";
      ctx.beginPath();
      ctx.arc(x + 20 + iconSize / 2, y + h / 2, iconSize / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = highlight ? "rgba(255,255,255,0.9)" : "#444";
      ctx.font = `500 11px system-ui, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x + 56, y + h / 2 - 8);

      ctx.fillStyle = highlight ? "rgba(255,255,255,0.7)" : "#888";
      ctx.font = `400 10px system-ui, sans-serif`;
      ctx.fillText("Total rendered", x + 56, y + h / 2 + 8);

      ctx.fillStyle = highlight ? "#fff" : "#111";
      ctx.font = `bold 20px system-ui, sans-serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(value, x + w - 16, y + h / 2);
    };

    const cardW = W * 0.72;
    const cardH = 54;
    const startX = (W - cardW) / 2;

    drawCard(startX, H * 0.18, cardW, cardH, "Rejected shapes", "12", "#aaa", false);
    drawCard(startX, H * 0.38, cardW, cardH, "Successfully added", "25", "#c06040", true);
    drawCard(startX, H * 0.58, cardW, cardH, "Dots completed", "15", "#aaa", false);
  }, []);

  return (
    <canvas ref={canvasRef} width={520} height={640} className="w-full h-full object-cover" />
  );
}

function ToneKitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    // Olive/warm gradient background like reference card 3
    const bg = ctx.createLinearGradient(0, 0, W * 0.5, H);
    bg.addColorStop(0, "#c8c090");
    bg.addColorStop(0.5, "#d4c898");
    bg.addColorStop(1, "#a89870");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const blob1 = ctx.createRadialGradient(W * 0.4, H * 0.3, 0, W * 0.4, H * 0.3, W * 0.6);
    blob1.addColorStop(0, "rgba(255,248,220,0.5)");
    blob1.addColorStop(1, "rgba(255,248,220,0)");
    ctx.fillStyle = blob1;
    ctx.fillRect(0, 0, W, H);

    // "Successfully Hired" card panel
    const panelX = W * 0.12;
    const panelY = H * 0.1;
    const panelW = W * 0.76;
    const panelH = H * 0.4;

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.18)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 14);
    ctx.fill();
    ctx.restore();

    // "Successfully Hired" header
    ctx.fillStyle = "#111";
    ctx.font = `600 13px system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Successfully Hired", panelX + 16, panelY + 14);

    // Green checkmark circle
    ctx.fillStyle = "#4caf50";
    ctx.beginPath();
    ctx.arc(panelX + panelW - 22, panelY + 20, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = `bold 11px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✓", panelX + panelW - 22, panelY + 20);

    // Profile image area
    const imgX = panelX + 12;
    const imgY = panelY + 44;
    const imgW = panelW - 24;
    const imgH = panelH - 80;

    const imgGrad = ctx.createLinearGradient(imgX, imgY, imgX + imgW, imgY + imgH);
    imgGrad.addColorStop(0, "#e8e0d0");
    imgGrad.addColorStop(1, "#c8c0b0");
    ctx.fillStyle = imgGrad;
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgW, imgH, 8);
    ctx.fill();

    // Silhouette
    ctx.fillStyle = "#b0a890";
    ctx.beginPath();
    ctx.arc(imgX + imgW / 2, imgY + imgH * 0.35, imgH * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(imgX + imgW / 2, imgY + imgH * 0.85, imgH * 0.28, imgH * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bottom tag
    const tagX = panelX + 12;
    const tagY = panelY + panelH - 30;
    const tagW = panelW - 24;
    ctx.fillStyle = "rgba(240,240,240,0.95)";
    ctx.beginPath();
    ctx.roundRect(tagX, tagY, tagW, 22, 5);
    ctx.fill();

    ctx.fillStyle = "#555";
    ctx.font = `500 9.5px system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("Hired as Sr. Field Engineer", tagX + 8, tagY + 11);

    ctx.fillStyle = "#999";
    ctx.font = `400 8.5px system-ui, sans-serif`;
    ctx.textAlign = "right";
    ctx.fillText("Sigma.com • Avg. $300K", tagX + tagW - 8, tagY + 11);
  }, []);

  return (
    <canvas ref={canvasRef} width={520} height={640} className="w-full h-full object-cover" />
  );
}

const EFFECTS = [
  {
    id: "ascii",
    canvas: AsciiPreviewCanvas,
    title: "ASCII Art",
    description:
      "Convert any image or video into dense, expressive character art. Choose from 8 character sets, add color, and export as PNG, HTML, SVG, or animated typewriter.",
  },
  {
    id: "dots",
    canvas: DotRenderCanvas,
    title: "Dot Render",
    description:
      "Apply halftone dot effects with 20+ algorithms and 26+ shapes. Supports ordered dither and more. Works on images, SVGs, and live video.",
  },
  {
    id: "tonekit",
    canvas: ToneKitCanvas,
    title: "ToneKit Halftone",
    description:
      "Professional print simulation with CMYK, duotone, line screen, and mezzotint. Presets for newspaper, silkscreen, and offset print.",
  },
];

export function FeatureEffects() {
  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-8 py-24">

        {/* Header — label left, heading right, same row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-16 mb-16">
          <div className="sm:w-52 shrink-0 pt-1">
            <p className={`text-xs text-muted-foreground leading-[1.6] ${GeistPixelSquare.className}`}>
              Let us be your<br />creative advantage
            </p>
          </div>
          <div className="flex-1">
            <h2
              className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.1]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Scale your creative output<br />
              with effects, not effort.<br />
              How Rynix Studio runs.
            </h2>
          </div>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {EFFECTS.map((effect) => {
            const Canvas = effect.canvas;
            return (
              <Link
                key={effect.id}
                href={`/edit?mode=${effect.id}`}
                className="group flex flex-col"
              >
                {/* Preview image area — rounded, ~3:4 aspect */}
                <div
                  className="w-full rounded-2xl overflow-hidden"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Canvas />
                </div>

                {/* Text below image, plain bg */}
                <div className="pt-5 pb-2">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">
                    {effect.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {effect.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom rule + tagline */}
        <div className="mt-20 pt-16 border-t border-border">
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Rynix Studio plugs you into eight distinct visual engines with real-time preview,
            live webcam support, and one-click export in any format — all running natively in
            the browser.
          </p>
        </div>

      </div>
    </section>
  );
}
