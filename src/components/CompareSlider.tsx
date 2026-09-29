"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";
import styles from "./CompareSlider.module.css";

type Props = {
  before: ReactNode;
  after: ReactNode;
  label: string;
  /** "wiggle" nudges the handle once when in view; "scroll" wipes from before to after as the slider scrolls up the screen. */
  motion?: "wiggle" | "scroll";
  /** CSS aspect-ratio. Defaults to 4/3. */
  aspect?: string;
};

/** Before/after comparison driven by a native range input. */
export function CompareSlider({ before, after, label, motion = "wiggle", aspect }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const touched = useRef(false);

  const setPos = (v: number) => root.current?.style.setProperty("--pos", v + "%");

  // Scroll mode: after is hidden (pos 100%) as the slider enters, fully shown by mid-screen.
  // Stops once the visitor drags the handle themselves.
  useEffect(() => {
    const el = root.current, range = input.current;
    if (motion !== "scroll" || !el || !range || prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (touched.current) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const v = 100 - clamp((vh * 0.9 - r.top) / (vh * 0.55)) * 100;
      el.style.setProperty("--pos", v + "%");
      range.value = String(v);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [motion]);

  useEffect(() => {
    const el = root.current, range = input.current;
    if (motion !== "wiggle" || !el || !range || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
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
  }, [motion]);

  return (
    <div ref={root} className={styles.ba} style={aspect ? ({ aspectRatio: aspect } as CSSProperties) : undefined}>
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
        onInput={(e) => {
          touched.current = true;
          setPos(Number(e.currentTarget.value));
        }}
      />
    </div>
  );
}
