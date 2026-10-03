"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clamp, ease, lerp, prefersReducedMotion } from "@/lib/motion";
import type { AlignerScene } from "./alignerScene";
import styles from "./HeroAligner.module.css";

type Props = { src: string; width: number; height: number; alt: string; model: string };

const INTRO_MS = 1600;

/**
 * The hero aligner. It lives in a layer spanning the hero and the aligner section (both inside
 * its parent), starts centered in front of the wordmark, and flies into `#aligner-slot` as the
 * page scrolls: it stays centered on screen while it slides across and shrinks to the slot, then
 * scrolls with the section. The imageA still shows first; once the 3D model (three.js, loaded
 * lazily) is ready it fades in and, over the flight, turns half a turn clockwise around its vertical
 * axis, like a phone spun on a table: front teeth toward you at the start, back ends at the landing.
 * - intro: rises from below and fades in;
 * - idle: a slow float, which settles to a stop as it lands.
 * A rAF loop writes transforms straight to the DOM (no React state) and runs only while the layer is
 * on screen. Reduced motion: no 3D model; the still stays in the hero (the aligner section shows its own still).
 */
export function HeroAligner({ src, width, height, alt, model }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const obj = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const st = stage.current;
    const el = obj.current;
    const sh = shadow.current;
    const layer = st?.parentElement;
    const hero = layer?.querySelector<HTMLElement>("#hero");
    const slot = layer?.querySelector<HTMLElement>("#aligner-slot");
    if (!st || !el || !sh || !layer || !hero) return;

    const reduced = prefersReducedMotion();
    const s = { raf: 0, visible: true, q: 0 };
    let scene: AlignerScene | null = null;
    let disposed = false;
    const start = performance.now();

    const write = (now: number) => {
      const t = (now - start) / 1000;
      const intro = reduced ? 1 : ease(clamp((now - start) / INTRO_MS));
      const lr = layer.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      const w = st.offsetWidth;
      const h = st.offsetHeight;

      // Start: hero center. End: slot center, reached when the slot is centered on screen.
      const hx = hr.left - lr.left + hr.width / 2;
      const hy = hr.top - lr.top + hr.height / 2;
      let x = hx;
      let y = hy;
      let sc = 1;
      let q = 0;
      if (slot && !reduced) {
        const sr = slot.getBoundingClientRect();
        const sx = sr.left - lr.left + sr.width / 2;
        const sy = sr.top - lr.top + sr.height / 2;
        const travel = sy - (hr.top - lr.top) - window.innerHeight / 2;
        q = travel > 0 ? clamp(-hr.top / travel) : 1;
        const e = ease(q);
        x = lerp(hx, sx, e);
        y = lerp(hy, sy, q); // linear, so it holds the middle of the screen while it travels
        sc = lerp(1, sr.width / w, e);
      }
      st.style.transform = `translate3d(${(x - (w * sc) / 2).toFixed(1)}px,${(y - (h * sc) / 2).toFixed(1)}px,0) scale(${sc.toFixed(4)})`;

      // The float fades out over the flight, so it lands still.
      const lift = reduced ? 0 : Math.sin(t * 0.9) * 12 * (1 - ease(q));
      const ty = lift + (1 - intro) * 180;
      el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0) scale(${(0.75 + intro * 0.25).toFixed(3)})`;
      el.style.opacity = intro.toFixed(3);
      s.q = q;
      scene?.render(ease(q));

      const k = (1 - (lift + 12) / 48) * intro;
      sh.style.transform = `scale(${Math.max(k, 0.01).toFixed(3)})`;
      sh.style.opacity = k.toFixed(3);
    };

    const frame = (now: number) => {
      write(now);
      s.raf = s.visible ? requestAnimationFrame(frame) : 0;
    };

    const onResize = () => write(performance.now());
    if (reduced) window.addEventListener("resize", onResize);

    // Run the loop only while the layer is on screen (and never under reduced motion).
    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting && !reduced;
      if (s.visible && !s.raf) s.raf = requestAnimationFrame(frame);
    });
    io.observe(layer);
    write(start);

    // Swap the still for the 3D model once it has loaded (skipped under reduced motion).
    const cv = canvas.current;
    if (!reduced && cv) {
      import("./alignerScene")
        .then(({ createAlignerScene }) => createAlignerScene(cv, el, `/${model}`))
        .then((sc) => {
          if (disposed) return sc.dispose();
          scene = sc;
          sc.render(ease(s.q));
          st.classList.add(styles.ready);
        })
        .catch(() => {}); // keep the still if WebGL or the model is unavailable
    }

    return () => {
      disposed = true;
      scene?.dispose();
      io.disconnect();
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", onResize);
    };
  }, [model]);

  return (
    <div ref={stage} className={styles.stage}>
      <div ref={obj} className={styles.object}>
        <Image className={styles.still} src={`/${src}`} alt={alt} width={width} height={height} priority draggable={false} sizes="(max-width: 700px) 94vw, 860px" />
        <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
      </div>
      <span ref={shadow} className={styles.shadow} aria-hidden="true" />
    </div>
  );
}
