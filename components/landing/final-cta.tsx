import { usePageTransition } from "@/components/ui/page-transition";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ArcCarousel, type ArcItem } from "@/components/gather/arc-carousel";
import { staggerContainer, fadeUp, inViewport } from "@/lib/motion";

const CAROUSEL_ITEMS: ArcItem[] = Array.from({ length: 12 }, () => ({
  src: "",
  alt: "",
  color: "var(--brand-accent)",
}));

export function FinalCta() {
  const { triggerTransition } = usePageTransition();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <ArcCarousel items={CAROUSEL_ITEMS} />
      </div>

      {/* Radial fade behind the headline keeps text readable without graying the tiles */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, var(--background) 0%, color-mix(in oklab, var(--background) 60%, transparent) 40%, transparent 75%)",
        }}
      />

      {/* Bottom fade so the moving tiles dissolve into the page instead of a hard cut */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-8 py-24 text-center flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={inViewport}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground max-w-xl leading-tight text-balance"
        >
          Open the editor and start making something.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-muted-foreground max-w-md text-pretty">
          No sign-up. No install. Just drop your image and go.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
          <a
            href="/edit"
            onClick={(e) => {
              e.preventDefault();
              triggerTransition(e.currentTarget.getBoundingClientRect(), "/edit");
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-[background-color,scale] duration-150 ease-out active:scale-[0.96]"
          >
            Open Rynix Studio
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
