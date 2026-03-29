"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="text-lg font-medium tracking-tight text-zinc-900">Studio</div>
        <div className="flex items-center gap-8">
          <Link
            href="/edit"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Editor
          </Link>
          <button className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-32 pb-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-zinc-900 leading-[1.1]">
            A clean space for your ideas
          </h1>
          <p className="mt-6 text-lg text-zinc-500 leading-relaxed max-w-lg">
            Write, edit, and refine your thoughts. Distraction-free and built for focus.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/edit"
              className="px-5 py-2.5 text-sm font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors"
            >
              Open Editor
            </Link>
            <Link
              href="#"
              className="px-5 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-zinc-100 pt-12">
          <div>
            <h3 className="text-sm font-medium text-zinc-900">Minimal</h3>
            <p className="mt-2 text-sm text-zinc-500">
              No clutter. Just you and your words.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-900">Fast</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Instant saves and seamless editing.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-900">Focused</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Built for deep work and clear thinking.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
