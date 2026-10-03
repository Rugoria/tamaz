"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { journey } from "@/content/site";
import { wornAt } from "@/lib/journeyTimeline";
import { clamp, ease, lerp, prefersReducedMotion } from "@/lib/motion";
import type { AlignerScene } from "./alignerScene";
import styles from "./HeroAligner.module.css";

type Props = { src: string; width: number; height: number; alt: string; model: string };

const INTRO_MS = 1600;
const LANDING = journey.photos.landing;

/**
 * The hero aligner. It lives in a layer spanning the hero and the aligner section (both inside
 * its parent), starts centered in front of the wordmark, and flies into `#aligner-slot` as the
 * page scrolls: it stays centered on screen while it slides across and shrinks to the slot. Scrolling
 * on, it leaves the slot and glides down to the Journey photo (#journey-photos), fitting over the
 * lower teeth just as that section pins, and fades out into the aligners-worn photo at the Align step.
 * The imageA still shows first; once the 3D model (three.js, loaded lazily) is ready it fades in and,
 * over the flight, turns half a turn clockwise around its vertical axis, like a phone spun on a table:
 * front teeth toward you at the start, back ends at the slot. On the way to the teeth it keeps turning
 * clockwise until the front faces you again, seen nearly level, as worn. Without the model the still
 * (in the slot's pose, which cannot fit the teeth) fades out on the way down.
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
    const photos = layer?.querySelector<HTMLElement>("#journey-photos");
    const scroller = layer?.querySelector<HTMLElement>("#journey-scroll");
    const sticky = scroller?.firstElementChild as HTMLElement | null | undefined;
    if (!st || !el || !sh || !layer || !hero) return;

    const reduced = prefersReducedMotion();
    const s = { raf: 0, visible: true, q: 0, r: 0 };
    let pinTop = 0;
    const measure = () => {
      if (sticky) pinTop = parseFloat(getComputedStyle(sticky).top) || 0;
    };
    measure();
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
      let r = 0;
      let worn = 0;
      if (slot && !reduced) {
        const vh = window.innerHeight;
        const sr = slot.getBoundingClientRect();
        const sx = sr.left - lr.left + sr.width / 2;
        const sy = sr.top - lr.top + sr.height / 2;
        const travel = sy - (hr.top - lr.top) - vh / 2;
        q = travel > 0 ? clamp(-hr.top / travel) : 1;
        const e = ease(q);
        x = lerp(hx, sx, e);
        y = lerp(hy, sy, q); // linear, so it holds the middle of the screen while it travels
        sc = lerp(1, sr.width / w, e);

        if (photos && scroller && sticky) {
          // From the slot (centered on screen) to the lower teeth, reached as the Journey pins.
          const cr = scroller.getBoundingClientRect();
          const kr = sticky.getBoundingClientRect();
          const pr = photos.getBoundingClientRect();
          const slotCy = sr.top + sr.height / 2;
          const span = cr.top - slotCy + vh / 2;
          r = span > 0 ? clamp((vh / 2 - slotCy) / span) : 1;
          // The photo's on-screen spot once pinned (it is still on its way up until then).
          const top = pr.top - kr.top + Math.min(kr.top, pinTop);
          const p = clamp(-cr.top / (cr.height - vh));
          worn = ease(wornAt(p));
          const jx = pr.left - lr.left + (pr.width * LANDING.x) / 100;
          const jy = top - lr.top + (pr.height * LANDING.y) / 100;
          const tsc = (pr.width * LANDING.width) / 100 / w;
          if (r > 0) {
            const g = ease(r);
            // Start from where the landing left it: the middle of the screen, over the slot.
            x = lerp(sx, jx, g);
            y = lerp(vh / 2 - lr.top, jy, g);
            sc = lerp(sr.width / w, tsc, g);
          }
        }
      }
      st.style.transform = `translate3d(${(x - (w * sc) / 2).toFixed(1)}px,${(y - (h * sc) / 2).toFixed(1)}px,0) scale(${sc.toFixed(4)})`;

      // The float fades out over the flight, so it lands still.
      const lift = reduced ? 0 : Math.sin(t * 0.9) * 12 * (1 - ease(q));
      const ty = lift + (1 - intro) * 180;
      el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0) scale(${(0.75 + intro * 0.25).toFixed(3)})`;
      // On the teeth it settles to a subtler, clear look and fades out into the aligners-worn photo. Without the
      // 3D model, the still (in the slot's pose) fades out on the way down.
      const fade = scene ? lerp(1, 0.7, ease(r)) * (1 - worn) : 1 - clamp(r / 0.4);
      el.style.opacity = (intro * fade).toFixed(3);
      s.q = q;
      s.r = r;
      scene?.render(ease(q), ease(r));

      const k = (1 - (lift + 12) / 48) * intro * (1 - clamp(r / 0.3));
      sh.style.transform = `scale(${Math.max(k, 0.01).toFixed(3)})`;
      sh.style.opacity = k.toFixed(3);
    };

    const frame = (now: number) => {
      write(now);
      s.raf = s.visible ? requestAnimationFrame(frame) : 0;
    };

    const onResize = () => {
      measure();
      write(performance.now());
    };
    window.addEventListener("resize", onResize);

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
          sc.render(ease(s.q), ease(s.r));
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
