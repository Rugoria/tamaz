"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp, ease, prefersReducedMotion } from "@/lib/motion";
import styles from "./HeroAligner.module.css";

type Props = { src: string; width: number; height: number; alt: string; hint: string };

/* The render is a flat image, so dragged rotation is capped before it turns edge-on. */
const MAX_Y = 55;
const MAX_X = 45;
const KEY_STEP = 8;
const INTRO_MS = 1600;

/**
 * Floating aligner that moves in all three axes:
 * - intro: flies up from below, turning into place;
 * - scroll: as the hero scrolls away it tilts back, spins, rolls, scales up and lags behind (parallax);
 * - drag (mouse or touch) or arrow keys: turns it, with momentum, then it springs back to rest;
 * - idle: a slow float and sway.
 * A rAF loop writes the transform straight to the DOM (no React state) and runs only while the hero
 * is on screen. Reduced motion: only the direct drag/keys response, nothing animates on its own.
 */
export function HeroAligner({ src, width, height, alt, hint }: Props) {
  const obj = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = obj.current;
    const sh = shadow.current;
    const hero = el?.closest("section");
    if (!el || !sh || !hero) return;

    const reduced = prefersReducedMotion();
    const s = { rx: 0, ry: 0, vx: 0, vy: 0, drag: false, px: 0, py: 0, raf: 0, visible: true };
    const start = performance.now();

    const write = (now: number) => {
      const t = (now - start) / 1000;
      const intro = reduced ? 1 : ease(clamp((now - start) / INTRO_MS));
      const r = hero.getBoundingClientRect();
      const p = reduced ? 0 : clamp(-r.top / r.height);

      const swayY = reduced ? 0 : Math.sin(t * 0.55) * 9;
      const swayX = reduced ? 0 : Math.sin(t * 0.4 + 1) * 4;
      const lift = reduced ? 0 : Math.sin(t * 0.9) * 12;

      const rx = s.rx + swayX + p * 38 + (1 - intro) * 50;
      const ry = s.ry + swayY - p * 42 + (1 - intro) * -35;
      const rz = s.ry * 0.12 + p * 16 + (1 - intro) * 10;
      const ty = lift + p * r.height * 0.35 + (1 - intro) * 180;
      const sc = (0.75 + intro * 0.25) * (1 + p * 0.3);

      el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      el.style.opacity = (intro * (1 - p * 0.6)).toFixed(3);
      const k = (1 - (lift + 12) / 48) * intro * (1 - p);
      sh.style.transform = `scale(${Math.max(k, 0.01).toFixed(3)})`;
      sh.style.opacity = k.toFixed(3);
    };

    const frame = (now: number) => {
      if (!s.drag) {
        s.ry += s.vy;
        s.rx += s.vx;
        s.vy *= 0.92;
        s.vx *= 0.92;
        s.ry += -s.ry * 0.025;
        s.rx += -s.rx * 0.025;
      }
      s.ry = clamp(s.ry, -MAX_Y, MAX_Y);
      s.rx = clamp(s.rx, -MAX_X, MAX_X);
      write(now);
      s.raf = s.visible ? requestAnimationFrame(frame) : 0;
    };

    const onDown = (e: PointerEvent) => {
      s.drag = true;
      s.px = e.clientX;
      s.py = e.clientY;
      s.vx = s.vy = 0;
      el.setPointerCapture(e.pointerId);
      el.classList.add(styles.grabbing);
    };
    const onMove = (e: PointerEvent) => {
      if (!s.drag) return;
      const dy = (e.clientX - s.px) * 0.35;
      const dx = -(e.clientY - s.py) * 0.3;
      s.px = e.clientX;
      s.py = e.clientY;
      s.ry = clamp(s.ry + dy, -MAX_Y, MAX_Y);
      s.rx = clamp(s.rx + dx, -MAX_X, MAX_X);
      s.vy = dy;
      s.vx = dx;
      if (reduced) write(performance.now());
    };
    const onUp = () => {
      s.drag = false;
      el.classList.remove(styles.grabbing);
      if (reduced) s.vx = s.vy = 0;
    };
    const onKey = (e: KeyboardEvent) => {
      const turn: Record<string, [number, number]> = {
        ArrowLeft: [0, -KEY_STEP],
        ArrowRight: [0, KEY_STEP],
        ArrowUp: [KEY_STEP, 0],
        ArrowDown: [-KEY_STEP, 0],
      };
      const d = turn[e.key];
      if (!d) return;
      e.preventDefault();
      s.rx = clamp(s.rx + d[0], -MAX_X, MAX_X);
      s.ry = clamp(s.ry + d[1], -MAX_Y, MAX_Y);
      if (reduced) write(performance.now());
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("keydown", onKey);

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
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={styles.stage}>
      <div ref={obj} className={styles.object} tabIndex={0} role="img" aria-label={`${alt}. ${hint}.`} title={hint}>
        <Image src={`/${src}`} alt="" width={width} height={height} priority draggable={false} sizes="(max-width: 700px) 94vw, 860px" />
      </div>
      <span ref={shadow} className={styles.shadow} aria-hidden="true" />
    </div>
  );
}
