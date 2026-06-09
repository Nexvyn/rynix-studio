import type { Metadata } from "next";
import Link from "next/link";
import { Pricing } from "@/components/landing/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start free, upgrade when you need more. No sign-up to try Rynix Studio.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-8 py-6 flex items-center justify-between border-b border-border max-w-6xl mx-auto">
        <Link href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
          ← Rynix Studio
        </Link>
      </header>
      <main>
        <Pricing />
      </main>
    </div>
  );
}
