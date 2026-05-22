import { GeistPixelSquare } from "geist/font/pixel";
import { Type, Circle, Camera, Layers, Wind, Radio, Monitor, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

const MODES = [
  {
    icon: Type,
    label: "// ASCII_ART",
    name: "ASCII Art",
    description:
      "Convert any image or video into dense, expressive ASCII character art. Choose from 8 character sets, control resolution, add color, effects, and export as PNG, HTML, SVG, or animated typewriter.",
  },
  {
    icon: Circle,
    label: "// DOT_RENDER",
    name: "Dot Render",
    description:
      "Apply halftone dot effects with 20+ algorithms and 26+ shapes. Supports halftone, threshold, ordered dither, and more. Works on images, SVGs, and live video.",
  },
  {
    icon: Camera,
    label: "// BABYTRACK",
    name: "BabyTrack Motion",
    description:
      "Real-time motion blob detection with visual styles including bounding boxes, particle trails, plexus connections, and motion paths. Works with webcam or video files.",
  },
  {
    icon: Activity,
    label: "// CHANGE_CAPTURE",
    name: "Change Capture",
    description:
      "Frame-differencing motion visualizer with flowing ink strokes. Detects pixel-level motion and renders temporal trails with Perlin-noise flow fields. Works with webcam or uploaded video.",
  },
  {
    icon: Layers,
    label: "// TONEKIT",
    name: "ToneKit Halftone",
    description:
      "Professional print simulation with CMYK, duotone, line screen, mezzotint, and crosshatch algorithms. Presets for newspaper, silkscreen, risograph, and offset print.",
  },
  {
    icon: Wind,
    label: "// BLUR_SUITE",
    name: "Blur Suite",
    description:
      "Advanced motion blur, radial blur, zoom blur, wave distortion, and directional blur effects. Apply masks, feathering, and post-processing to images and video.",
  },
  {
    icon: Radio,
    label: "// TRIGGER_WAVE",
    name: "Trigger Wave",
    description:
      "Audio-reactive visual engine that responds to beat detection and frequency bands. Create pulsing, rippling, and wave-based effects synchronized to music or any audio source.",
  },
  {
    icon: Monitor,
    label: "// RETRO_MAN",
    name: "RetroMan",
    description:
      "Retro dithering and pixel-art effects using Bayer matrix, Floyd-Steinberg, Atkinson, and Blue Noise algorithms. Full control over scale, contrast, and foreground/background palette.",
  },
];

export function Modes() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-28">
      <div className="mb-16">
        <span className={`text-xs text-muted-foreground tracking-widest ${GeistPixelSquare.className}`}>
          // EFFECTS
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
          Eight ways to see differently
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Each mode is a complete creative tool. Mix parameters, switch between modes, and export
          in any format — all without leaving the browser.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          return (
            <div
              key={mode.label}
              className="bg-background p-8 flex flex-col gap-4 hover:bg-secondary/40 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-secondary">
                  <Icon size={16} className="text-foreground/70" />
                </div>
                <span className={`text-[10px] text-muted-foreground/50 tracking-widest ${GeistPixelSquare.className}`}>
                  {mode.label}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {mode.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mode.description}
                </p>
              </div>
            </div>
          );
        })}
        <div className="bg-background p-8 flex flex-col justify-between gap-4 hover:bg-secondary/40 transition-colors">
          <div>
            <span className={`text-[10px] text-muted-foreground/50 tracking-widest ${GeistPixelSquare.className}`}>
              // GET_STARTED
            </span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              All effects run entirely in the browser. No uploads, no servers, no accounts.
            </p>
          </div>
          <Link
            href="/edit"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Try the editor
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
