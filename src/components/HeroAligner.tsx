"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./HeroAligner.module.css";

/** Still aligner render with a slow float and a pointer-driven 3D tilt (written to CSS vars, not state). */
export function HeroAligner({ src, alt }: { src: string; alt: string }) {
  const stage = useRef<HTMLDivElement>(null);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el || e.pointerType === "touch" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", (x * 14).toFixed(2) + "deg");
    el.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
  };
  const reset = () => {
    stage.current?.style.setProperty("--ry", "0deg");
    stage.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <div ref={stage} className={styles.stage} onPointerMove={tilt} onPointerLeave={reset}>
      <div className={styles.float}>
        <Image src={`/${src}`} alt={alt} width={1000} height={644} priority sizes="(max-width: 960px) 92vw, 600px" />
      </div>
      <span className={styles.shadow} aria-hidden="true" />
    </div>
  );
}
