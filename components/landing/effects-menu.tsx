"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Image" | "Video" | "3D" | "AI";

type Effect = {
  name: string;
  description: string;
  image: string;
  href: string;
  category: Category;
};

const CATEGORIES: Category[] = ["Image", "Video", "3D", "AI"];

const effects: Effect[] = [
  { name: "Dots", description: "Halftone dot patterns that follow brightness in real time.", image: "/effects/dots.webp", href: "/edit?m=dots", category: "Image" },
  { name: "ASCII", description: "Render images and video as live ASCII art with tone maps.", image: "/effects/ascii.webp", href: "/edit?m=ascii", category: "Image" },
  { name: "Dithered Image", description: "Ordered dithering for crisp retro halftones.", image: "/effects/dithered-image.webp", href: "/edit?m=dithered-image", category: "Image" },
  { name: "Recolor", description: "Remap colors and palettes across your footage.", image: "/effects/recolor.webp", href: "/edit?m=recolor", category: "Image" },
  { name: "Bevel", description: "Embossed bevel edges for a raised, tactile look.", image: "/effects/bevel.webp", href: "/edit?m=bevel", category: "Image" },
  { name: "Crystal Edge", description: "Faceted crystalline edges with sharp highlights.", image: "/effects/crystal-edge.webp", href: "/edit?m=crystal-edge", category: "Image" },
  { name: "Patterns", description: "Tile and repeat your source into rhythmic patterns.", image: "/effects/patterns.webp", href: "/edit?m=patterns", category: "Image" },
  { name: "Gradients", description: "Map smooth gradient ramps across luminance in real time.", image: "/effects/gradients.webp", href: "/edit?m=gradients", category: "Image" },
  { name: "Trames", description: "Engraved line screens that follow image tones.", image: "/effects/trames.webp", href: "/edit?m=trames", category: "Image" },
  { name: "Stippling", description: "Pen-and-ink stipple shading driven by image tones.", image: "/effects/stippling.webp", href: "/edit?m=stippling", category: "Image" },
  { name: "Glyph", description: "Map glyphs onto your footage for typographic textures.", image: "/effects/glyph.webp", href: "/edit?m=glyph", category: "Image" },
  { name: "Displace", description: "Warp pixels using a displacement map.", image: "/effects/displace.webp", href: "/edit?m=displace", category: "Image" },
  { name: "Distort", description: "Liquid distortion that bends and stretches the image.", image: "/effects/distort.webp", href: "/edit?m=distort", category: "Image" },
  { name: "Pinch", description: "Pinch and squeeze the image around a point.", image: "/effects/pinch.webp", href: "/edit?m=pinch", category: "Image" },
  { name: "Swirl", description: "Twist the image into a spiraling swirl.", image: "/effects/swirl.webp", href: "/edit?m=swirl", category: "Image" },
  { name: "Ripple", description: "Concentric ripples that ripple across the frame.", image: "/effects/ripple.webp", href: "/edit?m=ripple", category: "Image" },
  { name: "Warp", description: "Free-form warping that bends the whole image.", image: "/effects/warp.webp", href: "/edit?m=warp", category: "Image" },
  { name: "Scatter", description: "Break footage into drifting particles that react to motion.", image: "/effects/scatter.webp", href: "/edit?m=scatter", category: "Image" },
  { name: "Super G", description: "Bold gradient overlays with smooth color blends.", image: "/effects/super-g.webp", href: "/edit?m=super-g", category: "Image" },
  { name: "Glassify", description: "Frosted glass distortion with soft refraction.", image: "/effects/glassify.webp", href: "/edit?m=glassify", category: "Image" },
  { name: "Scanline", description: "CRT-style scanlines and retro display artifacts.", image: "/effects/scanline.webp", href: "/edit?m=scanline", category: "Image" },
  { name: "ASCII Background", description: "Generate an animated ASCII backdrop from your source.", image: "/effects/ascii-bg.webp", href: "/edit?m=ascii-bg", category: "Video" },
  { name: "BabyTrack", description: "Motion tracking that follows subjects across frames.", image: "/effects/babytrack.webp", href: "/edit?m=babytrack", category: "Video" },
  { name: "ToneKit", description: "Color grading and tone shaping for a cinematic look.", image: "/effects/tonekit.webp", href: "/edit?m=tonekit", category: "Video" },
  { name: "Blur Suite", description: "Selective and gradient blur passes for depth and focus.", image: "/effects/blur.webp", href: "/edit?m=blur", category: "Video" },
  { name: "Trigger Wave", description: "Audio-reactive waves that pulse with the beat.", image: "/effects/trigger-wave.webp", href: "/edit?m=trigger-wave", category: "Video" },
  { name: "RetroMan", description: "Retro dithered shading with a vintage console feel.", image: "/effects/retro-man.webp", href: "/edit?m=retro-man", category: "Video" },
  { name: "Loop Flow", description: "Seamless flowing loops driven by optical motion.", image: "/effects/loop-flow.webp", href: "/edit?m=loop-flow", category: "Video" },
  { name: "Change Capture", description: "Highlight motion and changes between frames.", image: "/effects/change-capture.webp", href: "/edit?m=change-capture", category: "Video" },
  { name: "ImageTrack", description: "Anchor effects to features tracked in your image.", image: "/effects/image-track.webp", href: "/edit?m=image-track", category: "Video" },
  { name: "Layered FX", description: "Stack multiple effects into one composited look.", image: "/effects/layered-fx.webp", href: "/edit?m=layered-fx", category: "Video" },
  { name: "AR Word Tracker", description: "Pin words onto moving objects in real time.", image: "/effects/ar-word-tracker.webp", href: "/edit?m=ar-word-tracker", category: "Video" },
  { name: "Matrix Rain", description: "Cascading code rain inspired by the Matrix.", image: "/effects/matrix-rain.webp", href: "/edit?m=matrix-rain", category: "Video" },
  { name: "Slide", description: "Sliding panel transitions that reveal your source.", image: "/effects/slide.webp", href: "/edit?m=slide", category: "Video" },
  { name: "Stack", description: "Layer offset copies into a stacked echo effect.", image: "/effects/stack.webp", href: "/edit?m=stack", category: "Video" },
  { name: "Deconstruction Grid", description: "Slice your source into a shifting modular grid.", image: "/effects/deconstruction-grid.webp", href: "/edit?m=deconstruction-grid", category: "Video" },
  { name: "Text Blur", description: "Motion-blurred text streaks for kinetic typography.", image: "/effects/text-blur.webp", href: "/edit?m=text-blur", category: "Video" },
  { name: "Cellular Automata", description: "Living patterns that evolve from your image.", image: "/effects/cellular-automata.webp", href: "/edit?m=cellular-automata", category: "Video" },
  { name: "3D Text", description: "Turn type into rendered three-dimensional text.", image: "/effects/threed-text.webp", href: "/edit?m=threed-text", category: "3D" },
  { name: "3D Extrude", description: "Extrude shapes and edges into 3D geometry.", image: "/effects/threed-extrude.webp", href: "/edit?m=threed-extrude", category: "3D" },
  { name: "AI Textures", description: "Generate AI-driven textures from a prompt.", image: "/effects/ai-texture.webp", href: "/edit?m=ai-texture", category: "AI" },
  { name: "AI 3D", description: "Create 3D scenes and depth with AI.", image: "/effects/ai-3d.webp", href: "/edit?m=ai-3d", category: "AI" },
];

const PER_PAGE = 4;

export function EffectsMenu() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState<Category>("Image");
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = effects.filter((e) => e.category === category);
  const pageCount = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  function openCategory(cat: Category) {
    if (open && category === cat) {
      setOpen(false);
    } else {
      setCategory(cat);
      setPage(0);
      setOpen(true);
    }
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {/* Nav-level category pills */}
      <div className="flex items-center gap-0.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-expanded={open && category === cat}
            aria-haspopup="true"
            onClick={() => openCategory(cat)}
            className={`relative flex items-center gap-1.5 h-9 px-3 text-[12px] font-medium rounded-md bg-card text-foreground shadow-sm transition-[opacity,scale] duration-150 ease-out motion-safe:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
              open && category === cat ? "opacity-100" : "hover:opacity-85"
            }`}
          >
            {cat}
            <motion.svg
              width="9"
              height="9"
              viewBox="0 0 10 10"
              fill="none"
              animate={{ rotate: open && category === cat ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="opacity-60"
            >
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.14, ease: [0.4, 0, 1, 1] } }}
            transition={{ type: "spring", stiffness: 460, damping: 32, mass: 0.9 }}
            style={{ x: "-50%", transformOrigin: "top center" }}
            className="absolute left-1/2 top-full z-50 mt-2 w-[min(460px,calc(100vw-2rem))] rounded-md bg-neutral-50 dark:bg-neutral-950 p-1 overflow-hidden shadow-[0_24px_40px_-20px_rgba(0,0,0,0.30),0_10px_24px_0_rgba(0,0,0,0.06),0_1px_1px_0_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.05),0_8px_14px_-10px_rgba(0,0,0,0.40)] dark:shadow-[0_24px_40px_-20px_rgba(0,0,0,0.60),0_0_0_1px_rgba(255,255,255,0.06),0_8px_14px_-10px_rgba(0,0,0,0.70)]"
          >
            <div className="rounded-md overflow-hidden bg-white dark:bg-neutral-900 shadow-[0_1px_1px_0_rgba(0,0,0,0.08),0_4px_12px_-6px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${page}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-2"
                >
                  {pageItems.map((effect, i) => (
                    <Link
                      key={effect.name}
                      href={effect.href}
                      className={`group flex flex-col gap-2.5 p-6 transition-colors hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 border-solid border-neutral-200/60 dark:border-neutral-800/60 ${
                        i % 2 === 0 ? "border-r" : ""
                      } ${i < 2 ? "border-b" : ""}`}
                    >
                      <EffectPreview name={effect.name} />
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{effect.name}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{effect.description}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {pageCount > 1 && (
              <div className="flex items-center justify-between border-t border-solid border-neutral-200/60 dark:border-neutral-800/60 px-6 py-4">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to page ${i + 1}`}
                      aria-current={i === page}
                      onClick={() => setPage(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === page ? "w-4 bg-foreground" : "w-1.5 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Next page"
                  disabled={page === pageCount - 1}
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EffectPreview({ name }: { name: string }) {
  const baseSvgProps = {
    className: "aspect-[16/10] w-full bg-neutral-50/50 dark:bg-neutral-900/50 rounded-lg border border-neutral-100 dark:border-neutral-800/40 text-neutral-400 dark:text-neutral-500",
    viewBox: "0 0 160 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.2",
  };

  switch (name) {
    case "Dots":
      return (
        <svg {...baseSvgProps}>
          <g className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1">
            <line x1="10" y1="10" x2="150" y2="10" strokeDasharray="2 4" />
            <line x1="10" y1="30" x2="150" y2="30" strokeDasharray="2 4" />
            <line x1="10" y1="50" x2="150" y2="50" strokeDasharray="2 4" />
            <line x1="10" y1="70" x2="150" y2="70" strokeDasharray="2 4" />
            <line x1="10" y1="90" x2="150" y2="90" strokeDasharray="2 4" />
          </g>
          <circle cx="30" cy="50" r="4" className="fill-neutral-300 dark:fill-neutral-700" />
          <circle cx="50" cy="50" r="7" className="fill-neutral-400 dark:fill-neutral-600" />
          <circle cx="80" cy="50" r="14" className="fill-neutral-400/30 dark:fill-neutral-500/20" />
          <circle cx="80" cy="50" r="8" className="fill-neutral-500 dark:fill-neutral-500" />
          <circle cx="110" cy="50" r="7" className="fill-neutral-400 dark:fill-neutral-600" />
          <circle cx="130" cy="50" r="4" className="fill-neutral-300 dark:fill-neutral-700" />
          <path d="M50 82h60M50 79v6M110 79v6" className="stroke-neutral-300 dark:stroke-neutral-700" />
          <text x="80" y="76" textAnchor="middle" fontSize="6" className="fill-neutral-400 dark:fill-neutral-500 stroke-none font-mono">halftone grid</text>
        </svg>
      );

    case "ASCII":
      return (
        <svg {...baseSvgProps}>
          <rect x="25" y="15" width="110" height="70" rx="4" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <path d="M25 32.5h110M25 50h110M25 67.5h110M52.5 15v70M80 15v70M107.5 15v70" className="stroke-neutral-100 dark:stroke-neutral-800/40" />
          <g fontSize="7" className="fill-neutral-400 dark:fill-neutral-500 stroke-none font-mono" textAnchor="middle">
            <text x="38.75" y="27">A</text> <text x="66.25" y="27">S</text> <text x="93.75" y="27">C</text> <text x="121.25" y="27">I</text>
            <text x="38.75" y="44.5">#</text> <text x="66.25" y="44.5">@</text> <text x="93.75" y="44.5">8</text> <text x="121.25" y="44.5">%</text>
            <text x="38.75" y="62">0</text> <text x="66.25" y="62">1</text> <text x="93.75" y="62">*</text> <text x="121.25" y="62">+</text>
            <text x="38.75" y="79.5">:</text> <text x="66.25" y="79.5">.</text> <text x="93.75" y="79.5">-</text> <text x="121.25" y="79.5">x</text>
          </g>
        </svg>
      );

    case "ASCII Background":
      return (
        <svg {...baseSvgProps}>
          <g className="stroke-neutral-200 dark:stroke-neutral-800" strokeWidth="1">
            <line x1="20" y1="10" x2="20" y2="90" />
            <line x1="60" y1="10" x2="60" y2="90" />
            <line x1="100" y1="10" x2="100" y2="90" />
            <line x1="140" y1="10" x2="140" y2="90" />
          </g>
          <g fontSize="6" className="fill-neutral-400 dark:fill-neutral-600 stroke-none font-mono">
            <text x="17" y="20">01</text><text x="17" y="35">10</text><text x="17" y="60">11</text>
            <text x="57" y="30">##</text><text x="57" y="45">@@</text><text x="57" y="75">%%</text>
            <text x="97" y="15">XX</text><text x="97" y="55">YY</text><text x="97" y="80">ZZ</text>
            <text x="137" y="25">//</text><text x="137" y="40">/*</text><text x="137" y="70">*/</text>
          </g>
        </svg>
      );

    case "BabyTrack":
      return (
        <svg {...baseSvgProps}>
          <circle cx="80" cy="46" r="22" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <path d="M68 62c0 8 24 8 24 0" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <rect x="48" y="16" width="64" height="64" rx="2" className="stroke-neutral-400 dark:stroke-neutral-600" strokeDasharray="3 2" />
          <path d="M48 26v-10h10M112 26v-10h-10M48 70v10h10M112 70v10h-10" className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1.5" />
          <text x="54" y="27" fontSize="5" className="fill-neutral-400 dark:fill-neutral-500 stroke-none font-mono">TRACKING</text>
          <text x="54" y="74" fontSize="5" className="fill-neutral-400 dark:fill-neutral-500 stroke-none font-mono">x: 80.4 y: 46.2</text>
        </svg>
      );

    case "ToneKit":
      return (
        <svg {...baseSvgProps}>
          <rect x="25" y="15" width="110" height="70" rx="3" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <path d="M25 50h110M80 15v70" className="stroke-neutral-100 dark:stroke-neutral-800/40" />
          <path d="M25 85 C 55 85, 65 15, 135 15" className="stroke-neutral-400 dark:stroke-neutral-500" strokeWidth="1.6" />
          <circle cx="25" cy="85" r="2.5" className="fill-white stroke-neutral-500 dark:fill-neutral-900" />
          <circle cx="70" cy="45" r="2.5" className="fill-white stroke-neutral-500 dark:fill-neutral-900" />
          <circle cx="135" cy="15" r="2.5" className="fill-white stroke-neutral-500 dark:fill-neutral-900" />
          <path d="M12 15h6M12 50h6M12 85h6" className="stroke-neutral-300 dark:stroke-neutral-700" />
        </svg>
      );

    case "Blur Suite":
      return (
        <svg {...baseSvgProps}>
          <circle cx="80" cy="50" r="32" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <circle cx="80" cy="50" r="20" className="stroke-neutral-200 dark:stroke-neutral-800" strokeDasharray="3 3" />
          <circle cx="80" cy="50" r="8" className="stroke-neutral-300 dark:stroke-neutral-700" />
          <path d="M80 8v10M80 82v10M38 50h10M112 50h10" className="stroke-neutral-300 dark:stroke-neutral-700" />
          <path d="M120 70l10 10h15" className="stroke-neutral-300 dark:stroke-neutral-700" />
          <text x="132" y="76" fontSize="5" className="fill-neutral-400 dark:fill-neutral-500 stroke-none font-mono">f/1.8 BLUR</text>
        </svg>
      );

    case "Trigger Wave":
      return (
        <svg {...baseSvgProps}>
          <path d="M15 50 Q 30 15, 45 50 T 75 50 T 105 50 T 135 50" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <path d="M15 50 Q 35 25, 55 50 T 95 50 T 135 50" className="stroke-neutral-300 dark:stroke-neutral-700" strokeDasharray="2 2" />
          <path d="M15 50 Q 40 5, 65 50 T 115 50 T 145 50" className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1.5" />
          <line x1="15" y1="50" x2="145" y2="50" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <path d="M30 47v6M60 47v6M90 47v6M120 47v6" className="stroke-neutral-300 dark:stroke-neutral-700" />
        </svg>
      );

    case "RetroMan":
      return (
        <svg {...baseSvgProps}>
          <rect x="25" y="15" width="110" height="70" rx="10" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.5" />
          <rect x="30" y="20" width="100" height="60" rx="6" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <path d="M55 20v60M80 20v60M105 20v60M30 40h100M30 60h100" className="stroke-neutral-100 dark:stroke-neutral-800/40" />
          <path d="M72 45h16v10h-16zM76 41h8v4h-8zM68 49h4v8h-4zM88 49h4v8h-4z" className="fill-neutral-400 dark:fill-neutral-600 stroke-none" />
        </svg>
      );

    default:
      return (
        <svg {...baseSvgProps}>
          <rect x="15" y="15" width="130" height="70" rx="3" className="stroke-neutral-200 dark:stroke-neutral-800" />
          <path d="M15 32.5h130M15 50h130M15 67.5h130M47.5 15v70M80 15v70M112.5 15v70" className="stroke-neutral-100 dark:stroke-neutral-800/30" />
          <circle cx="80" cy="50" r="15" className="stroke-neutral-300 dark:stroke-neutral-700" />
          <path d="M80 30v40M60 50h40" className="stroke-neutral-200 dark:stroke-neutral-800" strokeDasharray="2 2" />
          <text x="83" y="28" fontSize="4.5" className="fill-neutral-400 dark:fill-neutral-500 stroke-none font-mono">GRID SCALE: 1.0</text>
        </svg>
      );
  }
}
