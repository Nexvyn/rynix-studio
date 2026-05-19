"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface RectData {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface TransitionContextType {
  triggerTransition: (rect: DOMRect, href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [transitionState, setTransitionState] = useState<"idle" | "expanding" | "shrinking">("idle");
  const [targetRect, setTargetRect] = useState<RectData | null>(null);
  const [targetHref, setTargetHref] = useState<string>("");

  useEffect(() => {
    // Check if we navigated back
    if (typeof window !== "undefined") {
      const isBack = sessionStorage.getItem("rynix-transition-back");
      if (isBack === "true") {
        sessionStorage.removeItem("rynix-transition-back");
        // Start shrinking from full-screen
        setTransitionState("shrinking");
        
        // Wait a frame for layout to settle, then find the CTA button to shrink down to
        requestAnimationFrame(() => {
          // Look for hero CTA button
          const ctaBtn = document.querySelector('[data-cta-transition="true"]');
          if (ctaBtn) {
            const rect = ctaBtn.getBoundingClientRect();
            setTargetRect({
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            });
          } else {
            // Fallback to center-screen shrink if button not found
            setTargetRect({
              left: window.innerWidth / 2 - 60,
              top: window.innerHeight / 2 - 20,
              width: 120,
              height: 40,
            });
          }
        });
      }
    }
  }, []);

  const triggerTransition = (rect: DOMRect, href: string) => {
    setTargetRect({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setTargetHref(href);
    setTransitionState("expanding");
  };

  const handleExpandingComplete = () => {
    if (transitionState === "expanding") {
      router.push(targetHref);
      // Keep it filled briefly, then reset back to idle after new page mounts
      setTimeout(() => {
        setTransitionState("idle");
        setTargetRect(null);
      }, 500);
    }
  };

  const handleShrinkingComplete = () => {
    if (transitionState === "shrinking") {
      setTransitionState("idle");
      setTargetRect(null);
    }
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning: transitionState !== "idle" }}>
      {children}

      <AnimatePresence>
        {transitionState === "expanding" && targetRect && (
          <motion.div
            initial={{
              position: "fixed",
              left: targetRect.left,
              top: targetRect.top,
              width: targetRect.width,
              height: targetRect.height,
              borderRadius: "8px",
              zIndex: 99999,
              background: "var(--background, #0f0f0f)",
            }}
            animate={{
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: "0px",
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 24,
              mass: 0.9,
            }}
            onAnimationComplete={handleExpandingComplete}
          />
        )}

        {transitionState === "shrinking" && targetRect && (
          <motion.div
            initial={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: "0px",
              zIndex: 99999,
              background: "var(--background, #0f0f0f)",
              opacity: 1,
            }}
            animate={{
              left: targetRect.left,
              top: targetRect.top,
              width: targetRect.width,
              height: targetRect.height,
              borderRadius: "8px",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 25,
              mass: 0.8,
            }}
            onAnimationComplete={handleShrinkingComplete}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
