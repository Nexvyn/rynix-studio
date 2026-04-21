"use client";

import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";

export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-background ${GeistSans.className}`}>
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className={`text-lg font-medium tracking-tight text-foreground ${GeistPixelSquare.className}`}>
          {'>'} Studio
        </div>
        <div className="flex items-center gap-8">
          <Link
            href="/edit"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Editor
          </Link>
          <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-32 pb-24">
        <div className="max-w-2xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs mb-6 ${GeistPixelSquare.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            ASCII STUDIO v1.0
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            A clean space for your ideas
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
            Write, edit, and refine your thoughts. Distraction-free and built for focus.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/edit"
              className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Open Editor
            </Link>
            <Link
              href="#"
              className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-border pt-12">
          <div>
            <h3 className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}>// MINIMAL</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No clutter. Just you and your words.
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}>// FAST</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Instant saves and seamless editing.
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}>// FOCUSED</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Built for deep work and clear thinking.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
