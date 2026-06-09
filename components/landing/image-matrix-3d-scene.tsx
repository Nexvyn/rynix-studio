"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- Procedural texture generators ---

type ArtStyle =
  | "starburst"
  | "particles"
  | "waves"
  | "rings"
  | "dots"
  | "glitch"
  | "lines"
  | "noise";

const ART_STYLES: ArtStyle[] = [
  "starburst",
  "particles",
  "waves",
  "rings",
  "dots",
  "glitch",
  "lines",
  "noise",
];

const ACCENT_COLORS = [
  "#4fc3f7",
  "#ce93d8",
  "#a5d6a7",
  "#ffcc80",
  "#90caf9",
  "#f48fb1",
  "#80cbc4",
  "#fff176",
];

function buildTexture(style: ArtStyle, accent: string): THREE.CanvasTexture {
  const W = 320, H = 224;
  const el = document.createElement("canvas");
  el.width = W;
  el.height = H;
  const ctx = el.getContext("2d")!;

  ctx.fillStyle = "#080808";
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2, cy = H / 2;

  switch (style) {
    case "starburst": {
      const rays = 72;
      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2;
        const len = 80 + (i % 5) * 12;
        const gradient = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        gradient.addColorStop(0, accent);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = i % 3 === 0 ? 1.5 : 0.7;
        ctx.globalAlpha = 0.55 + (i % 4) * 0.1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
      break;
    }
    case "particles": {
      const seed = accent.charCodeAt(1);
      const lcg = (n: number) => (n * 1664525 + 1013904223) & 0xffffffff;
      let s = seed;
      for (let i = 0; i < 120; i++) {
        s = lcg(s);
        const x = ((s >>> 0) % W);
        s = lcg(s);
        const y = ((s >>> 0) % H);
        s = lcg(s);
        const r = 1 + ((s >>> 0) % 4);
        s = lcg(s);
        const alpha = 0.3 + ((s >>> 0) % 70) / 100;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? accent : "#ffffff";
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      break;
    }
    case "waves": {
      for (let row = 0; row < 8; row++) {
        const yBase = (row / 7) * H;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y = yBase + Math.sin((x / W) * Math.PI * 4 + row * 0.7) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = row % 2 === 0 ? accent : "#444";
        ctx.lineWidth = row % 2 === 0 ? 1.2 : 0.6;
        ctx.globalAlpha = 0.5 + (row / 7) * 0.4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      break;
    }
    case "rings": {
      for (let i = 8; i >= 1; i--) {
        const r = (i / 8) * Math.min(cx, cy) * 1.1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? accent : "#333";
        ctx.lineWidth = i % 2 === 0 ? 1.5 : 0.7;
        ctx.globalAlpha = 0.3 + (i / 8) * 0.5;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
      break;
    }
    case "dots": {
      const cols = 12, rows = 8;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c / (cols - 1)) * W;
          const y = (r / (rows - 1)) * H;
          const dist = Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy);
          ctx.beginPath();
          ctx.arc(x, y, (1 - dist * 0.7) * 4, 0, Math.PI * 2);
          ctx.fillStyle = (r + c) % 3 === 0 ? accent : "#555";
          ctx.globalAlpha = 0.6 - dist * 0.3;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      break;
    }
    case "glitch": {
      const stripeH = H / 10;
      for (let i = 0; i < 10; i++) {
        const y = i * stripeH;
        const shift = (i % 3 === 0) ? (i % 2 === 0 ? 12 : -8) : 0;
        ctx.fillStyle = i % 2 === 0 ? "#111" : "#0d0d0d";
        ctx.fillRect(0, y, W, stripeH);
        if (i % 3 === 0) {
          ctx.fillStyle = accent;
          ctx.globalAlpha = 0.25;
          ctx.fillRect(shift, y + stripeH * 0.15, W * 0.6, stripeH * 0.7);
          ctx.globalAlpha = 1;
        }
        if (i % 4 === 0) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.5;
          ctx.strokeRect(shift, y, W, stripeH);
          ctx.globalAlpha = 1;
        }
      }
      break;
    }
    case "lines": {
      const count = 20;
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const y = t * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = i % 3 === 0 ? accent : "#2a2a2a";
        ctx.lineWidth = i % 3 === 0 ? 1 : 0.5;
        ctx.globalAlpha = i % 3 === 0 ? 0.7 : 0.4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(cx * 0.4, 0);
      ctx.lineTo(cx * 0.4, H);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
      break;
    }
    case "noise": {
      const seed2 = accent.charCodeAt(2) || 42;
      const lcg2 = (n: number) => (n * 22695477 + 1) & 0xffffffff;
      let s2 = seed2;
      const blockSize = 8;
      for (let y = 0; y < H; y += blockSize) {
        for (let x = 0; x < W; x += blockSize) {
          s2 = lcg2(s2);
          const v = ((s2 >>> 0) % 60) + 10;
          ctx.fillStyle = `rgb(${v},${v},${v})`;
          ctx.fillRect(x, y, blockSize, blockSize);
        }
      }
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = accent;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(cx, cy) * 1.2);
      grd.addColorStop(0, accent);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      break;
    }
  }

  // Subtle inner border
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  ctx.strokeRect(1, 1, W - 2, H - 2);

  const tex = new THREE.CanvasTexture(el);
  tex.needsUpdate = true;
  return tex;
}

// --- Plane component ---

interface PlaneData {
  position: THREE.Vector3Tuple;
  baseZ: number;
  phaseOffset: number;
  style: ArtStyle;
  accent: string;
}

function Plane({ position, baseZ, phaseOffset, style, accent }: PlaneData) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => buildTexture(style, accent), [style, accent]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4 + phaseOffset) * 0.06;
    meshRef.current.position.z = baseZ + Math.sin(t * 0.28 + phaseOffset * 1.4) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1.38, 0.97]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

// --- Scene ---

function MatrixScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const planes = useMemo<PlaneData[]>(() => {
    const COLS = 5, ROWS = 4;
    const GAP_X = 1.58, GAP_Y = 1.12;
    return Array.from({ length: COLS * ROWS }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const baseZ = ((i % 3) - 1) * 0.45;
      return {
        position: [
          (col - (COLS - 1) / 2) * GAP_X,
          (row - (ROWS - 1) / 2) * GAP_Y,
          baseZ,
        ],
        baseZ,
        phaseOffset: i * 0.55,
        style: ART_STYLES[i % ART_STYLES.length],
        accent: ACCENT_COLORS[i % ACCENT_COLORS.length],
      };
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = -mouse.y * 0.22;
    const targetY = mouse.x * 0.32;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
  });

  return (
    <group ref={groupRef} rotation={[0.18, -0.22, 0]}>
      {planes.map((p, i) => (
        <Plane key={i} {...p} />
      ))}
    </group>
  );
}

// --- Root export ---

export default function ImageMatrix3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <MatrixScene />
    </Canvas>
  );
}
