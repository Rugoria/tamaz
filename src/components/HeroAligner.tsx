"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp, ease, prefersReducedMotion } from "@/lib/motion";
import styles from "./HeroAligner.module.css";

type Props = { src: string; width: number; height: number; alt: string };

/* Tilt limit for the scroll push; the render is flat, so it never turns edge-on. */
const MAX_X = 22;
const INTRO_MS = 1600;

/**
 * Floating aligner in front of the wordmark, moved only by scrolling. It only ever tips forward
 * and back (rotateX); it never swings or rolls left and right.
 * - intro: rises from below, tipping into place;
 * - scroll position: as the hero scrolls away it tips back, scales up and lags behind;
 * - scroll speed: every scroll tips it forward or back by a varying amount, then it springs back;
 * - idle: a slow float and a gentle rock.
 * A rAF loop writes the transform straight to the DOM (no React state) and runs only while the hero
 * is on screen. Reduced motion: it stays still in its resting pose.
 */
export function HeroAligner({ src, width, height, alt }: Props) {
  const obj = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = obj.current;
    const sh = shadow.current;
    const hero = el?.closest("section");
    if (!el || !sh || !hero) return;

    const reduced = prefersReducedMotion();
    const s = { rx: 0, vx: 0, lastY: window.scrollY, raf: 0, visible: true };
    const start = performance.now();

    const write = (now: number) => {
      const t = (now - start) / 1000;
      const intro = reduced ? 1 : ease(clamp((now - start) / INTRO_MS));
      const r = hero.getBoundingClientRect();
      const p = reduced ? 0 : clamp(-r.top / r.height);

      const swayX = reduced ? 0 : Math.sin(t * 0.4 + 1) * 2;
      const lift = reduced ? 0 : Math.sin(t * 0.9) * 12;

      const rx = s.rx + swayX + p * 19 + (1 - intro) * 25;
      const ty = lift + p * r.height * 0.35 + (1 - intro) * 180;
      const sc = (0.75 + intro * 0.25) * (1 + p * 0.3);

      el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0) rotateX(${rx.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      el.style.opacity = (intro * (1 - p * 0.6)).toFixed(3);
      const k = (1 - (lift + 12) / 48) * intro * (1 - p);
      sh.style.transform = `scale(${Math.max(k, 0.01).toFixed(3)})`;
      sh.style.opacity = k.toFixed(3);
    };

    const frame = (now: number) => {
      s.rx += s.vx;
      s.vx *= 0.9;
      s.rx += -s.rx * 0.04;
      s.rx = clamp(s.rx, -MAX_X, MAX_X);
      write(now);
      s.raf = s.visible ? requestAnimationFrame(frame) : 0;
    };

    // Each scroll tips the aligner forward or back; the amount and direction drift with every push.
    const onScroll = () => {
      const d = clamp(window.scrollY - s.lastY, -80, 80);
      s.lastY = window.scrollY;
      const a = (performance.now() - start) / 700 + s.lastY / 90;
      s.vx += Math.sin(a * 1.3) * d * 0.03;
    };

    if (!reduced) window.addEventListener("scroll", onScroll, { passive: true });

    // Run the loop only while the hero is on screen (and never under reduced motion).
    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting && !reduced;
      if (s.visible && !s.raf) s.raf = requestAnimationFrame(frame);
    });
    io.observe(hero);
    write(start);

    return () => {
      io.disconnect();
      cancelAnimationFrame(s.raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.stage}>
      <div ref={obj} className={styles.object}>
        <Image src={`/${src}`} alt={alt} width={width} height={height} priority draggable={false} sizes="(max-width: 700px) 94vw, 860px" />
      </div>
      <span ref={shadow} className={styles.shadow} aria-hidden="true" />
    </div>
  );
}
