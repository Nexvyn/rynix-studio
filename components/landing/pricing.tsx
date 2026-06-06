"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, inViewport, STAGGER } from "@/lib/motion";
import { ctaButtonClassName } from "@/components/ui/cta-button-style";

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

function PriceBand({
  price,
  annual,
  bandClass,
  mutedClass,
  frameClass,
  innerBorderClass,
  dark,
}: {
  price: number;
  annual: boolean;
  bandClass: string;
  mutedClass: string;
  frameClass: string;
  innerBorderClass: string;
  dark: boolean;
}) {
  return (
    <div className={`rounded-[24px] border p-1.5 ${frameClass}`}>
      <div className={`relative overflow-hidden rounded-[18px] border ${innerBorderClass} px-6 py-4 ${bandClass}`}>
        {!dark && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 select-none bg-[url(/dot-grid-pattern.svg)] bg-[length:24px_24px] bg-repeat opacity-60 dark:invert"
          />
        )}
        <div className="relative">
          <span className={`text-[11px] font-semibold uppercase tracking-wide ${mutedClass}`}>
            {price === 0 ? "Forever" : annual ? "Per month, billed yearly" : "Per month"}
          </span>
          <div className="mt-1.5 text-3xl font-semibold tracking-tight tabular-nums">
            ${price}
            <span className={`ml-1 text-base font-normal ${mutedClass}`}>/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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

        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier, i) => {
            const price = annual ? tier.annual : tier.monthly;
            const dark = tier.name === "Team";
            const bandClass = tier.featured
              ? "bg-accent text-foreground"
              : "bg-card text-foreground";
            const bodyClass = dark
              ? "bg-foreground text-background"
              : tier.featured
              ? "bg-accent text-foreground"
              : "bg-card text-foreground";
            const mutedClass = dark ? "text-background/55" : "text-muted-foreground";
            const frameClass = "border-border/65 bg-muted/40";
            const innerBorderClass = "border-border";

            return (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inViewport}
                transition={{ delay: i * STAGGER.item }}
                className="flex flex-col gap-1.5"
              >
                <PriceBand
                  price={price}
                  annual={annual}
                  bandClass={bandClass}
                  mutedClass="text-muted-foreground"
                  frameClass="border-border/65 bg-muted/40"
                  innerBorderClass="border-border"
                  dark={false}
                />

                <div className={`flex flex-1 rounded-[24px] border p-1.5 ${frameClass}`}>
                  <div className={`relative flex flex-1 flex-col overflow-hidden rounded-[18px] border ${innerBorderClass} px-6 pt-5 pb-6 ${bodyClass}`}>
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 select-none bg-current [mask-image:url(/squiggle-pattern.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:cover] ${
                        dark ? "text-background/[0.06]" : "text-foreground/[0.05]"
                      }`}
                    />
                    <span className={`text-[11px] font-medium uppercase tracking-wide ${mutedClass}`}>
                      Plan
                    </span>

                    <div className="relative mt-8 mb-6">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight">{tier.name}</h3>
                      {tier.featured && (
                        <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium text-background">
                          Most popular
                        </span>
                      )}
                    </div>

                    <ul className="mt-3 space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className={`flex items-start gap-2 text-[13px] leading-snug ${mutedClass}`}>
                          <Check size={14} className="mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    </div>

                    <Link
                      href={tier.href}
                      className={`${ctaButtonClassName} mt-auto w-full px-5 py-2.5 text-sm ${dark ? "!bg-white !text-[#0a0a0b]" : ""}`}
                      style={
                        dark
                          ? { color: "#0a0a0b", background: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }
                          : {
                              color: "var(--background)",
                              background: "var(--foreground)",
                              boxShadow: "0 0 0 1.5px rgba(126,184,188,0.5), 0 2px 4px rgba(0,0,0,0.4)",
                            }
                      }
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
