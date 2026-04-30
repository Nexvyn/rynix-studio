"use client";

import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { AsciiLandscape } from "@/components/ui/ascii-landscape";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`bg-background ${GeistSans.className}`}>
      <div className="min-h-screen flex flex-col">
        <nav className="w-full flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div
          className={`flex items-center gap-3 text-lg font-medium tracking-tight text-foreground ${GeistPixelSquare.className}`}
        >
          <Logo />
          Rynix Studio
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/edit"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Editor
          </Link>
          <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Github
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-8 flex flex-col justify-center items-center text-center pb-24">
        <div className="max-w-2xl flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Transform your images into stunning visual effects
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Apply real-time creative effects to any image.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/edit"
              className="px-5 py-2.5 text-sm font-medium bg-[#fafafa] text-black rounded-md border border-[#e6e6e6] shadow-sm hover:bg-gray-50 transition-colors"
            >
              Open Editor
            </Link>
            <Link
              href="#"
              className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Github
            </Link>
          </div>
        </div>

        {/* <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-border pt-12">
          <div>
            <h3
              className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}
            >
              // MINIMAL
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No clutter. Just you and your words.
            </p>
          </div>
          <div>
            <h3
              className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}
            >
              // FAST
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Instant saves and seamless editing.
            </p>
          </div>
          <div>
            <h3
              className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}
            >
              // FOCUSED
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Built for deep work and clear thinking.
            </p>
          </div>
        </div> */}
        </main>
      </div>

      <div className="relative">
        <div
          className="absolute -top-48 left-0 right-0 h-48 z-10 pointer-events-none"
          style={{
            backdropFilter: "blur(8px)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          }}
        />
        {/* <section className="w-full h-screen relative border-y border-border">
          <AsciiLandscape />
        </section> */}
      </div>

      {/* <footer className="w-full overflow-hidden flex justify-center pb-8 mt-auto">
        <h1
          className="relative z-10 whitespace-nowrap text-[16vw] leading-none md:text-[min(14rem,13vw)]"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            color: "#3b2ca2",
            textShadow: "0 -1px 0 rgba(14, 4, 44, 0.55), -1px 0 0 rgba(14, 4, 44, 0.35), 0 1px 0 rgba(170, 160, 255, 0.5), 1px 0 0 rgba(170, 160, 255, 0.3), 0 2px 4px rgba(170, 160, 255, 0.2), 0 -2px 3px rgba(11, 2, 36, 0.25)",
          }}
        >
          <span style={{ fontFamily: "var(--font-retrogression)" }}>A</span>man <span style={{ fontFamily: "var(--font-retrogression)" }}>G</span>upta
        </h1>
      </footer> */}
    </div>
  );
}
