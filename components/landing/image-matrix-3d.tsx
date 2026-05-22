"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("./image-matrix-3d-scene"),
  { ssr: false, loading: () => <div style={{ height: "60vh" }} /> }
);

export function ImageMatrix3D() {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ height: "60vh", minHeight: 400 }}
    >
      <Scene />
    </section>
  );
}
