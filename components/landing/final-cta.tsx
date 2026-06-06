import { usePageTransition } from "@/components/ui/page-transition";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScatteredGrid } from "@/components/landing/scattered-grid";
import { staggerContainer, fadeUp, inViewport } from "@/lib/motion";
import { ctaButtonClassName, ctaButtonStyle } from "@/components/ui/cta-button-style";

export function FinalCta() {
  const { triggerTransition } = usePageTransition();

  return (
    <section className="w-full py-2">
      {/* Constrain to the same max-w as Pricing/Footer so it sits in the same visual column */}
      <motion.div drag dragMomentum={false} className="relative max-w-6xl mx-auto min-h-screen flex flex-col justify-center cursor-grab active:cursor-grabbing">
        <ScatteredGrid />

        {/* Radial fade keeps the headline readable */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, var(--background) 0%, color-mix(in oklab, var(--background) 65%, transparent) 45%, transparent 80%)",
          }}
        />

        {/* Top section transition */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: "linear-gradient(to bottom, color-mix(in oklab, var(--background) 50%, transparent) 0%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />

        {/* Bottom section transition */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />

        <motion.div
          className="relative z-10 px-8 py-0 text-center flex flex-col items-center"
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
              className={`${ctaButtonClassName} px-8 py-3.5 text-sm`}
              style={ctaButtonStyle}
            >
              Open Rynix Studio
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
