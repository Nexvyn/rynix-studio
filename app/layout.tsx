import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { Borel } from "next/font/google";
import { Agentation } from "agentation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ServiceWorkerRegister } from "./sw-register";
import { PageTransitionProvider } from "@/components/ui/page-transition";
import "./globals.css";

const borel = Borel({ subsets: ["latin"], variable: "--font-borel", weight: "400" });


const BASE_URL = "https://rynix.studio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rynix Studio",
    template: "%s · Rynix Studio",
  },
  description:
    "Creative media effects that run entirely in your browser — halftone, ASCII art, dithering, dot grids, and 30+ more algorithms. No upload, no server, fully on-device.",
  keywords: [
    "halftone",
    "ASCII art",
    "dithering",
    "dot grid",
    "image effects",
    "video effects",
    "on-device",
    "browser editor",
    "creative tools",
    "WebGL",
  ],
  authors: [{ name: "Nexvyn", url: BASE_URL }],
  creator: "Nexvyn",
  publisher: "Nexvyn",
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Rynix Studio",
    title: "Rynix Studio — Creative media effects, on-device",
    description:
      "Halftone, ASCII art, dithering, dot grids, and 30+ more effects. Runs entirely in your browser — no upload needed.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rynix Studio — Creative media effects, on-device",
    description:
      "Halftone, ASCII art, dithering, dot grids, and 30+ more effects. Runs entirely in your browser — no upload needed.",
    creator: "@nexvyn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} ${borel.variable} h-full antialiased dark scrollbar-hide`}
      style={{ fontFamily: `${GeistMono.style.fontFamily}, monospace` }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden scrollbar-hide" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </ThemeProvider>
        <ServiceWorkerRegister />
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
