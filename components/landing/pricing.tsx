"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, inViewport, STAGGER } from "@/lib/motion";

type Tier = {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    description: "Everything you need to start creating in the browser.",
    features: [
      "All real-time effects",
      "Image, video & webcam input",
      "PNG & SVG export",
      "Runs fully offline",
    ],
    cta: "Get started",
    href: "/edit",
  },
  {
    name: "Pro",
    monthly: 12,
    annual: 10,
    description: "For creators who ship work every day.",
    features: [
      "Everything in Free",
      "4K & video export",
      "AI texture & 3D generation",
      "Priority rendering",
      "Saved presets",
    ],
    cta: "Start Pro trial",
    href: "/edit",
    featured: true,
  },
  {
    name: "Team",
    monthly: 40,
    annual: 34,
    description: "Shared workspaces for studios and teams.",
    features: [
      "Everything in Pro",
      "Shared preset libraries",
      "Team workspaces",
      "Cloud render hosting",
      "Priority support",
    ],
    cta: "Contact sales",
    href: "/edit",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-8 py-24">
        <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">
          Pricing
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Start free, upgrade when you need more. No sign-up to try.
        </p>

        <div className="mb-14 inline-flex items-center gap-1 rounded-md border border-border bg-muted p-1">
          {(["monthly", "annual"] as const).map((mode) => {
            const active = (mode === "annual") === annual;
            return (
              <button
                key={mode}
                onClick={() => setAnnual(mode === "annual")}
                className={`relative rounded px-4 py-1.5 text-sm font-medium capitalize transition-[opacity,scale] duration-150 ease-out active:scale-[0.96] ${
                  active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode}
                {mode === "annual" && (
                  <span className="ml-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">−15%</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((tier, i) => {
            const price = annual ? tier.annual : tier.monthly;
            return (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inViewport}
                transition={{ delay: i * STAGGER.item }}
                className={
                  tier.featured
                    ? "rounded-2xl border border-border bg-muted/90 p-1"
                    : "rounded-2xl border border-border bg-background"
                }
              >
                <div
                  className={
                    tier.featured
                      ? "h-full rounded-xl bg-card p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                      : "h-full p-7"
                  }
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{tier.name}</h3>
                    {tier.featured && (
                      <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium text-background">
                        Most popular
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl font-medium tracking-tight text-foreground tabular-nums">
                      ${price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {price === 0 ? "forever" : annual ? "per month, billed yearly" : "per month"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>

                  <Link
                    href={tier.href}
                    className={
                      tier.featured
                        ? "mt-6 flex w-full items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm transition-[background-color,scale] duration-150 ease-out hover:bg-foreground/90 active:scale-[0.96]"
                        : "mt-6 flex w-full items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-[opacity,scale] duration-150 ease-out hover:opacity-85 active:scale-[0.96]"
                    }
                  >
                    {tier.cta}
                  </Link>

                  <ul className="mt-7 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={15} className="mt-0.5 shrink-0 text-foreground" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
