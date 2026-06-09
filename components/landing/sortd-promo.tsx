"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SiBrave,
  SiInstagram,
  SiNotion,
  SiSafari,
  SiTelegram,
  SiTiktok,
  SiX,
} from "react-icons/si";
import { LuStickyNote } from "react-icons/lu";

/**
 * Sortd bookmark micro-interaction (animation only).
 * Timeline:
 *  1. FEED — 6 content cards fall from the top one-by-one; the central bookmark
 *     "eats" each, belly-bulging from the middle then settling. Cards are
 *     clipped to the bookmark silhouette so nothing shows outside it.
 *  2. SETTLE — bookmark wobbles to ~20deg then back to 0.
 *  3. ORBIT — concentric orbits fade in; 8 real app icons pop in and rotate
 *     continuously along the orbit paths (counter-rotated to stay upright).
 */

const NUM_CARDS = 6;
const EAT_INTERVAL = 360; // ms between each card being eaten

// --- Orbit nodes: real brand SVGs ---
type OrbitNode = { id: string; r: number; angle: number; node: React.ReactNode };

function IconChip({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-[11px] text-white ring-1 ring-black/[0.06] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.12),0_4px_14px_-4px_rgba(0,0,0,0.10)]"
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

const INNER_R = 92;
const OUTER_R = 148;
const ICON = 18;

const NODES: OrbitNode[] = [
  { id: "ig", r: INNER_R, angle: 0, node: <IconChip bg="linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)"><SiInstagram size={ICON} /></IconChip> },
  { id: "x", r: INNER_R, angle: 90, node: <IconChip bg="#0A0A0A"><SiX size={ICON} /></IconChip> },
  { id: "notion", r: INNER_R, angle: 180, node: <IconChip bg="#FFFFFF"><SiNotion size={ICON} color="#0A0A0A" /></IconChip> },
  { id: "tg", r: INNER_R, angle: 270, node: <IconChip bg="#2AABEE"><SiTelegram size={ICON} /></IconChip> },
  { id: "safari", r: OUTER_R, angle: 45, node: <IconChip bg="#1E90FF"><SiSafari size={ICON} /></IconChip> },
  { id: "brave", r: OUTER_R, angle: 135, node: <IconChip bg="#FB542B"><SiBrave size={ICON} /></IconChip> },
  { id: "note", r: OUTER_R, angle: 225, node: <IconChip bg="#FFB100"><LuStickyNote size={ICON} color="#0A0A0A" /></IconChip> },
  { id: "tt", r: OUTER_R, angle: 315, node: <IconChip bg="#0A0A0A"><SiTiktok size={ICON} /></IconChip> },
];

// Bookmark is a rounded square (squircle) with a small bottom V-notch.
// Bookmark drawn in a 120-wide x 130-tall viewBox with 20px side padding
// (so the belly can bulge outward without clipping). Box renders 1:1 to keep
// the shape undistorted.
const PAD = 20; // horizontal headroom for the bulge each side
const BODY_W = 100; // bookmark body width
const BODY_H = 130; // bookmark body height
const BM_W = BODY_W + PAD * 2; // rendered svg width (incl. padding)
const BM_H = BODY_H; // rendered svg height
/**
 * Bookmark path. Origin x=PAD..PAD+BODY_W, y=0..BODY_H.
 * @param bulge 0 = rest (straight sides); higher = belly bows outward.
 */
function bookmarkPath(bulge: number) {
  const r = 22; // top corner radius (soft squircle)
  const notch = 20; // notch depth from bottom (clear ribbon tail)
  const L = PAD; // left edge
  const R = PAD + BODY_W; // right edge
  const cx = PAD + BODY_W / 2;
  const my = BODY_H / 2; // vertical midpoint
  const b = bulge;
  return [
    `M ${L + r} 0`,
    `H ${R - r}`,
    `Q ${R} 0 ${R} ${r}`, // top-right corner
    `Q ${R + b} ${my} ${R} ${BODY_H}`, // right side bows out by b
    `L ${cx} ${BODY_H - notch}`, // down to notch tip
    `L ${L} ${BODY_H}`, // up to bottom-left
    `Q ${L - b} ${my} ${L} ${r}`, // left side bows out by b
    `Q ${L} 0 ${L + r} 0`, // top-left corner
    "Z",
  ].join(" ");
}

// Realistic saved-page previews. Monochrome chrome; thumbnails are kept
// desaturated/neutral so the only saturated color in the scene is the brand
// icons on the orbit (the intended focal point).
const CARD_VARIANTS = [
  { source: "timeout.com", dot: "#E4484D", thumb: "linear-gradient(135deg,#e7e2dc,#cbb9a6)", title: "53 unmissable things to do in Paris" },
  { source: "are.na", dot: "#27272A", thumb: "linear-gradient(135deg,#e9e9ec,#cfcfd6)", title: "A reading list on slow design" },
  { source: "nytimes.com", dot: "#52525B", thumb: "linear-gradient(135deg,#ededed,#d6d6d6)", title: "The quiet art of saving things" },
  { source: "eater.com", dot: "#C2410C", thumb: "linear-gradient(135deg,#ece4dd,#d4c3b3)", title: "Hidden cafés you have to try" },
  { source: "bonappetit", dot: "#3F6212", thumb: "linear-gradient(135deg,#e6e9e1,#cdd4c2)", title: "10-minute weeknight dinners" },
  { source: "notion.so", dot: "#18181B", thumb: "linear-gradient(135deg,#eaeaee,#d2d2da)", title: "A complete guide to focus" },
];

// Card is clearly narrower/shorter than the bookmark body so it fully hides.
const CARD_W = 78;
const CARD_H = 100;

// Card queue (a "train" of cards above the bookmark; relative to shared center).
// TUCK: fully inside the bookmark body → occluded by the opaque shape.
// QUEUE_Y0: the front-of-queue slot, fully visible just above the bookmark top.
// QUEUE_GAP: vertical spacing between cards in the queue (train cars).
const CARD_TUCK_Y = 0;
const QUEUE_Y0 = -128; // front card sits here, fully above the bookmark
const QUEUE_GAP = 118; // each card behind is one gap higher

function ContentCard({ v }: { v: (typeof CARD_VARIANTS)[number] }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[12px] border border-black/[0.06] bg-white font-sans shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-6px_rgba(0,0,0,0.12)]"
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* thumbnail */}
      <div className="h-[44px] w-full shrink-0" style={{ background: v.thumb }} />
      {/* meta */}
      <div className="flex flex-1 flex-col gap-[3px] px-2 pt-1.5">
        <div className="flex items-center gap-1">
          <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: v.dot }} />
          <span className="truncate text-[8px] font-medium leading-none text-zinc-400">{v.source}</span>
        </div>
        <p className="text-[10px] font-semibold leading-[1.25] tracking-[-0.01em] text-zinc-900">{v.title}</p>
      </div>
    </div>
  );
}

export default function SortdPromo() {
  const reduced = useReducedMotion();
  const bookmark = useAnimationControls(); // svg wrapper: rotate/wobble
  const bookmarkController = useAnimationControls(); // path: belly bulge morph

  // eaten = how many cards have been swallowed; flags gate orbits/nodes.
  const [eaten, setEaten] = useState(reduced ? NUM_CARDS : 0);
  const [orbitOn, setOrbitOn] = useState(reduced);
  const [nodesOn, setNodesOn] = useState(reduced);

  // Master timeline.
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. FEED — eat one card per EAT_INTERVAL, gulp on each.
    for (let i = 0; i < NUM_CARDS; i++) {
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setEaten(i + 1);
          // belly bulge: sides bow outward from the middle, then settle.
          bookmarkController.start({
            d: [bookmarkPath(0), bookmarkPath(16), bookmarkPath(0)],
            transition: { duration: 0.4, ease: "easeOut" },
          });
        }, 500 + i * EAT_INTERVAL)
      );
    }

    const feedEnd = 500 + NUM_CARDS * EAT_INTERVAL;

    // 2. SETTLE — wobble to 20deg then back to 0.
    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        bookmark.start({
          rotate: [0, 20, 0],
          transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
        });
      }, feedEnd + 100)
    );

    // 3. ORBIT — orbits then nodes.
    timers.push(setTimeout(() => !cancelled && setOrbitOn(true), feedEnd + 700));
    timers.push(setTimeout(() => !cancelled && setNodesOn(true), feedEnd + 1000));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduced, bookmark, bookmarkController]);

  return (
    <div className="relative grid aspect-square w-full max-w-[480px] place-items-center bg-[#FAFAF9] font-sans">
      {/* Center of the whole animation */}
      <div className="relative grid place-items-center">
        {/* Orbits */}
        {[INNER_R, OUTER_R].map((r) => (
          <motion.div
            key={r}
            className="col-start-1 row-start-1 rounded-full border border-black/[0.05]"
            style={{ width: r * 2, height: r * 2 }}
            initial={false}
            animate={orbitOn ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Rotating node ring */}
        <motion.div
          className="col-start-1 row-start-1"
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {NODES.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = Math.cos(rad) * n.r;
            const y = Math.sin(rad) * n.r;
            return (
              <motion.div
                key={n.id}
                className="absolute left-0 top-0"
                style={{ x, y }}
                initial={false}
                animate={nodesOn ? { scale: [0, 1.1, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: nodesOn ? i * 0.05 : 0,
                }}
              >
                <motion.div
                  className="-translate-x-1/2 -translate-y-1/2"
                  animate={reduced ? {} : { rotate: -360 }}
                  transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                >
                  {n.node}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---- Feed + Bookmark ----
            Cards form a vertical QUEUE (a train) above the bookmark. The front
            card sits just above the bookmark top (visible); each card behind is
            one QUEUE_GAP higher. When the front card is eaten it slides down
            behind the opaque bookmark (z-10) and the whole train advances one
            slot. First in → first eaten. No clip-path, so queued cards stay
            visible in flight; the eaten card is hidden by occlusion. */}
        <div className="col-start-1 row-start-1 grid place-items-center">
          {!reduced &&
            CARD_VARIANTS.map((v, i) => {
              const isEaten = i < eaten;
              const slot = i - eaten; // 0 = front of queue, about to be eaten
              const y = isEaten ? CARD_TUCK_Y : QUEUE_Y0 - slot * QUEUE_GAP;
              // Cards lower in the queue sit in front so the train overlaps
              // correctly (front car on top), but all stay behind the bookmark.
              return (
                <motion.div
                  key={i}
                  className="col-start-1 row-start-1"
                  style={{ zIndex: isEaten ? 0 : 5 - slot }}
                  initial={false}
                  animate={{ y }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ContentCard v={v} />
                </motion.div>
              );
            })}

          {/* Bookmark (opaque squircle; belly-bulges on each eat, wobbles after) */}
          <motion.svg
            className="col-start-1 row-start-1 z-10 block"
            width={BM_W}
            height={BM_H}
            viewBox={`0 0 ${BM_W} ${BM_H}`}
            style={{ transformOrigin: "center center", overflow: "visible" }}
            animate={bookmark}
          >
            <defs>
              <filter id="bm-shadow" x="-40%" y="-20%" width="180%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000000" floodOpacity="0.18" />
              </filter>
            </defs>
            <motion.path
              fill="#0A0A0A"
              filter="url(#bm-shadow)"
              initial={{ d: bookmarkPath(0) }}
              animate={bookmarkController}
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
