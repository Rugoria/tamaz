"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";
import styles from "./CompareSlider.module.css";

type Props = { before: ReactNode; after: ReactNode; label: string };

/** Before/after comparison driven by a native range input. Wiggles once when first in view. */
export function CompareSlider({ before, after, label }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const setPos = (v: number) => root.current?.style.setProperty("--pos", v + "%");

  useEffect(() => {
    const el = root.current, range = input.current;
    if (!el || !range || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const run = (now: number) => {
            const p = clamp((now - t0) / 1800);
            const v = 50 + Math.sin(p * Math.PI * 2) * 28 * (1 - p);
            el.style.setProperty("--pos", v + "%");
            range.value = String(v);
            if (p < 1) raf = requestAnimationFrame(run);
          };
          raf = requestAnimationFrame(run);
        }),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className={styles.ba}>
      <div className={styles.before}>{before}</div>
      <div className={styles.after}>{after}</div>
      <span className={`${styles.lab} ${styles.l}`}>Before</span>
      <span className={`${styles.lab} ${styles.r}`}>After</span>
      <span className={styles.handle} />
      <input
        ref={input}
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        aria-label={label}
        onInput={(e) => setPos(Number(e.currentTarget.value))}
      />
    </div>
  );
}
