"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DURATION } from "@/lib/motion";

const faqs = [
  {
    question: "Is my data private?",
    answer: "Yes. Everything runs entirely in your browser. No files are uploaded to any server. Your videos and data never leave your device.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    gradient: "linear-gradient(165deg, #0c1a12 0%, #16331f 28%, #3f6b3a 58%, #7fae5e 82%, #cfe6a8 100%)"
  },
  {
    question: "What video formats are supported?",
    answer: "All modern web video formats including MP4, WebM, and MOV. As long as your browser can play it, we can process it.",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop",
    gradient: "linear-gradient(165deg, #0a1320 0%, #122a45 30%, #1e5fe0 65%, #6fa8ff 100%)"
  },
  {
    question: "Is there a file size limit?",
    answer: "No. Since processing happens locally in your browser, there are no server-side file size restrictions. The only limit is your device's memory.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    gradient: "linear-gradient(165deg, #1c0f1e 0%, #3a1838 30%, #8a2f7a 65%, #d98fd0 100%)"
  },
  {
    question: "Can I use this offline?",
    answer: "Yes. Once the page loads, you can work completely offline. All processing happens in your browser using WebGL and Canvas 2D.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    gradient: "linear-gradient(165deg, #1f1408 0%, #422a10 30%, #c0742a 65%, #f0c088 100%)"
  },
  {
    question: "What browsers are supported?",
    answer: "All modern browsers with WebGL support: Chrome, Firefox, Safari, and Edge. We recommend the latest version for best performance.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    gradient: "linear-gradient(165deg, #0a1a1c 0%, #103538 30%, #2a9fa8 65%, #8fe0e6 100%)"
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="w-full py-24 bg-background">
      {/* Two-column container */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full max-w-6xl mx-auto px-8">

        {/* ── LEFT PANEL (Gradient + Floating Sidecard) ── */}
        <div className="w-full lg:flex-1 rounded-2xl flex items-center justify-center min-h-[440px] lg:min-h-[560px] p-8 lg:p-12 relative overflow-hidden">
          {/* Crossfading gradient backdrop — all layers persist, only opacity animates */}
          {faqs.map((faq, index) => (
            <div
              key={index}
              aria-hidden
              className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                background: faq.gradient,
                opacity: activeImage === index ? 1 : 0,
                willChange: "opacity",
              }}
            />
          ))}

          {/* Floating White/Dark Card */}
          <div
            className="bg-card rounded-xl w-full lg:max-w-[360px] border border-border relative z-10"
            style={{
              padding: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.12)",
            }}
          >
            <div className="aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden border border-border relative">
              {faqs.map((faq, index) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={index}
                  src={faq.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover grayscale dark:opacity-90 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    opacity: activeImage === index ? 1 : 0,
                    willChange: "opacity",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL (Accordion / Content) ── */}
        <div
          className="w-full lg:flex-1 flex flex-col min-h-[440px] lg:min-h-[560px]"
          style={{ padding: "40px 36px 36px" }}
        >
          {/* Intro description */}
          <h2 className="text-2xl font-semibold tracking-tight text-foreground m-0">
            FAQ
          </h2>

          {/* Spacer */}
          <div className="flex-1 min-h-[24px]" />

          {/* FAQ Accordion list */}
          <div className="space-y-1">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-border">
                  <button
                    onClick={() => {
                      setOpenIndex(isOpen ? null : index);
                      setActiveImage(index);
                    }}
                    onMouseEnter={() => setActiveImage(index)}
                    className="w-full flex items-center justify-between gap-4 py-4 bg-transparent border-none cursor-pointer text-left text-foreground hover:opacity-85 transition-opacity duration-150"
                  >
                    <span className="text-sm font-semibold leading-snug tracking-tight">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: DURATION.exit, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs leading-relaxed text-muted-foreground m-0 pb-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
