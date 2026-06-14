"use client";

import React from "react";

type PanelData = {
  id: number;
  image: string;
  scale: number;
  position: { x: number; y: number };
  points: string;
  filter: string;
};

const SHOWCASE_PANELS: PanelData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    scale: 110,
    position: { x: 50, y: 50 },
    points: "0,0 300,0 380,275 0,362",
    filter: "grayscale(100%) contrast(160%) brightness(1.1)",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    scale: 130,
    position: { x: 50, y: 40 },
    points: "300,0 550,0 820,225 530,625 380,275",
    filter: "grayscale(100%) contrast(150%) brightness(1.05)",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=600&auto=format&fit=crop",
    scale: 120,
    position: { x: 50, y: 50 },
    points: "550,0 1000,0 1000,312 820,225",
    filter: "grayscale(100%) contrast(170%) brightness(1.1)",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    scale: 140,
    position: { x: 50, y: 50 },
    points: "0,362 210,314 210,625 0,625",
    filter: "grayscale(100%) contrast(140%) brightness(1.1)",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=600&auto=format&fit=crop",
    scale: 125,
    position: { x: 45, y: 50 },
    points: "210,314 380,275 530,625 210,625",
    filter: "grayscale(100%) contrast(160%) brightness(1.05)",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    scale: 135,
    position: { x: 50, y: 50 },
    points: "820,225 1000,312 1000,625 530,625",
    filter: "grayscale(100%) contrast(180%) brightness(1.1)",
  },
];

export function MangaShowcase() {
  return (
    <section className="w-full py-24 bg-background flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full px-8 flex flex-col items-center">
        <div className="w-full mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground text-balance">
            One source, every style
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-pretty">
            Drop in a single image and reframe it through any of the studio&rsquo;s real-time effects.
          </p>
        </div>

        <div className="w-full aspect-[16/10] bg-card border border-border rounded-2xl p-2.5 relative shadow-2xl overflow-hidden">
          <div className="w-full h-full relative overflow-hidden bg-background rounded-xl">
            {SHOWCASE_PANELS.map((panel) => {
              // Convert shared coordinate points (0-1000, 0-625) to percentage path
              const pts = panel.points.split(" ").map(pt => {
                const [x, y] = pt.split(",").map(Number);
                return `${(x / 10).toFixed(2)}% ${(y / 6.25).toFixed(2)}%`;
              }).join(", ");

              const clipPath = `polygon(${pts})`;

              return (
                <div
                  key={panel.id}
                  style={{
                    clipPath,
                    WebkitClipPath: clipPath,
                  }}
                  className="absolute inset-0 bg-muted"
                >
                  <div className="w-full h-full relative">
                    {/* Render subtle comic screen halftones to complete manga aesthetics */}
                    {panel.id % 2 === 0 && (
                      <div 
                        className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-25 bg-[radial-gradient(#000_15%,transparent_15%)] bg-[length:5px_5px]"
                      />
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* <img
                      src={panel.image}
                      alt=""
                      className="absolute object-cover pointer-events-none select-none max-w-none w-full h-full"
                      style={{
                        width: `${panel.scale}%`,
                        height: `${panel.scale}%`,
                        left: `${panel.position.x}%`,
                        top: `${panel.position.y}%`,
                        transform: "translate(-50%, -50%)",
                        filter: panel.filter,
                      }}
                    /> */}
                  </div>
                </div>
              );
            })}

            {/* The SVG Gutter Overlay Mask: guarantees exactly uniform, parallel gaps */}
            <svg
              viewBox="0 0 1000 625"
              className="absolute inset-0 w-full h-full pointer-events-none z-20 text-background"
              preserveAspectRatio="none"
            >
              {SHOWCASE_PANELS.map((panel) => (
                <polygon
                  key={panel.id}
                  points={panel.points}
                  fill="none"
                  className="stroke-current"
                  strokeWidth="14"
                  strokeLinejoin="round"
                />
              ))}
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
