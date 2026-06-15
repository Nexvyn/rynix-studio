"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { GeistSans } from "geist/font/sans";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";

import { Faq } from "@/components/landing/faq";
import { Pricing } from "@/components/landing/pricing";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { GradientBlur } from "@/components/ui/gradient-blur";
import { MangaShowcase } from "@/components/landing/manga-showcase";
import { FeatureEffects } from "@/components/landing/feature-effects";
import { BlocksReveal } from "@/components/landing/blocks-reveal";
// import { BotanicalEffects } from "@/components/landing/botanical-effects";

export function LandingPage() {

  return (
    <MotionConfig reducedMotion="user">
      <div className={`relative z-10 w-full ${GeistSans.className}`}>
        <Nav />
        <Hero />
        <MangaShowcase />
        {/* // <BotanicalEffects /> */}
        <FeatureEffects />
        <BlocksReveal />
        <Faq />
        <Pricing />
        <FinalCta />
        <Footer />
        <GradientBlur />
      </div>
    </MotionConfig>
  );
}
