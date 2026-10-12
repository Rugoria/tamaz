"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { journey } from "@/content/site";
import { wornAt } from "@/lib/journeyTimeline";
import { clamp, ease, lerp, prefersReducedMotion } from "@/lib/motion";
import { STEP_SCROLL_EVENT } from "@/lib/stepScroll";
import { RISE, SEAT_DROP } from "./alignerRig";
import type { AlignerScene } from "./alignerScene";
import type { CaseScene } from "./caseScene";
import styles from "./HeroAligner.module.css";

type Props = { src: string; width: number; height: number; alt: string; model: string };

const INTRO_MS = 1600;
const LANDING = journey.photos.landing;
/** Share of the scroll from the slot to the teeth spent at the case (resting in it, then rising out), at most
    HOLD_VH of the screen height, so the case is still well on screen when the aligner leaves it on any screen. */
const HOLD = 0.45;
const HOLD_VH = 0.22;
/** The case lid: open as the aligner comes in, a little wider as it rises out (radians). */
const LID_OPEN = (100 * Math.PI) / 180;
const LID_WIDER = (10 * Math.PI) / 180;

/**
 * The hero aligner. It lives in a layer spanning the hero and the aligner section (both inside
 * its parent), starts centered in front of the wordmark, and flies into `#aligner-slot` as the
 * page scrolls: it stays centered on screen while it slides across and shrinks to the slot, where the
 * aligner case (#aligner-slot canvas[data-case]) opens to take it and it settles into the tray. Scrolling
 * on, it lifts out of the case and glides down to the Journey photo (#journey-photos), fitting over the
 * lower teeth just as that section pins, and fades out into the aligners-worn photo at the Align step.
 * - at the case: it rests in the open case for the first part of the next scroll (HOLD), riding along with the
 *   page, then rises out as the lid opens a little wider; once it has flown off, the lid closes.
 * Nothing shows until the 3D model (three.js, loaded lazily) is ready; then it rises in and,
 * over the flight, turns half a turn clockwise around its vertical axis, like a phone spun on a table:
 * front teeth toward you at the start, back ends at the slot. On the way to the teeth it keeps turning
 * clockwise until the front faces you again, seen nearly level, as worn. Without the model the still
 * (in the slot's pose, which cannot fit the teeth) fades out on the way down.
 * - intro: rises from below and fades in once the model is ready;
 * - idle: a slow float, which settles to a stop as it lands.
 * In flight the stage is fixed to the screen, since the aligner holds its place on screen (mid-screen, then on
 * the pinned photo) while the page scrolls under it; positioned in the page, the browser's threaded scrolling
 * would carry it a frame ahead of each update and make it shake.
 * A rAF loop writes transforms straight to the DOM (no React state) and runs only while the layer is
 * on screen. The imageA still is only a fallback: under reduced motion (no 3D model, the still stays in the
 * hero and the aligner section shows its own still) or when WebGL or the model fails to load.
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
    const caseCanvas = slot?.querySelector<HTMLCanvasElement>("canvas[data-case]");
    if (!st || !el || !sh || !layer || !hero) return;

    const reduced = prefersReducedMotion();
    const s = { raf: 0, visible: true, q: 0, r: 0 };
    let pinTop = 0;
    const measure = () => {
      if (sticky) pinTop = parseFloat(getComputedStyle(sticky).top) || 0;
    };
    measure();
    let scene: AlignerScene | null = null;
    let box: CaseScene | null = null;
    let attached = false;
    let disposed = false;
    const start = performance.now();
    // The intro starts once there is something to show: the model, or the still as a fallback.
    let introStart = reduced ? start : -1;

    const write = (now: number) => {
      const t = (now - start) / 1000;
      const intro = reduced ? 1 : introStart < 0 ? 0 : ease(clamp((now - introStart) / INTRO_MS));
      const lr = layer.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      const w = st.offsetWidth;
      const h = st.offsetHeight;

      // Start: hero center. End: slot center, reached when the slot is centered on screen.
      const hx = hr.left - lr.left + hr.width / 2;
      const hy = hr.top - lr.top + hr.height / 2;
      let sr: DOMRect | null = null;
      let x = hx;
      let y = hy;
      let sc = 1;
      let q = 0;
      let r = 0;
      let u = 0;
      let worn = 0;
      if (slot && !reduced) {
        const vh = window.innerHeight;
        sr = slot.getBoundingClientRect();
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
          // First it rests in the case and rises out (u), riding along with the page; then it flies (r).
          const d = vh / 2 - slotCy;
          const hold = Math.min(span * HOLD, vh * HOLD_VH);
          u = hold > 0 ? clamp(d / hold) : 1;
          r = span > hold ? clamp((d - hold) / (span - hold)) : 1;
          // The photo's on-screen spot once pinned (it is still on its way up until then).
          const top = pr.top - kr.top + Math.min(kr.top, pinTop);
          const p = clamp(-cr.top / (cr.height - vh));
          worn = ease(wornAt(p));
          const jx = pr.left - lr.left + (pr.width * LANDING.x) / 100;
          const jy = top - lr.top + (pr.height * LANDING.y) / 100;
          const tsc = (pr.width * LANDING.width) / 100 / w;
          if (r > 0) {
            const g = ease(r);
            // Start from where it came out of the case, held there on screen while the page scrolls on.
            x = lerp(sx, jx, g);
            y = lerp(vh / 2 - hold - lr.top, jy, g);
            sc = lerp(sr.width / w, tsc, g);
          }
        }
      }
      // x and y are in the layer's coordinates. In flight the stage is fixed to the screen (.fixed), so add the
      // layer's screen offset: the browser then never carries it along with the page between frames.
      // While it sits in the case (landed, not yet flying) it rides along with the page, so it goes back into
      // the layer and scrolls with the case natively instead of trailing it by a frame.
      const sit = !reduced && q >= 1 && r <= 0;
      if (sit !== attached) {
        attached = sit;
        st.classList.toggle(styles.fixed, !sit);
      }
      const ox = reduced || sit ? 0 : lr.left;
      const oy = reduced || sit ? 0 : lr.top;
      st.style.transform = `translate3d(${(x + ox - (w * sc) / 2).toFixed(1)}px,${(y + oy - (h * sc) / 2).toFixed(1)}px,0) scale(${sc.toFixed(4)})`;

      // The float fades out over the flight, so it lands still.
      const lift = reduced ? 0 : Math.sin(t * 0.9) * 12 * (1 - ease(q));
      const ty = lift + (1 - intro) * 180;
      el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0) scale(${(0.75 + intro * 0.25).toFixed(3)})`;
      // On the teeth it settles to a subtler, clear look and fades out into the aligners-worn photo. Without the
      // 3D model, the still (in the slot's pose) fades out on the way down.
      const fade = scene ? lerp(1, 0.7, ease(r)) * (1 - worn) : 1 - clamp(r / 0.4);
      el.style.opacity = (intro * fade).toFixed(3);
      // In the case: it sinks onto the tray as it lands, rises out over the second part of the hold and is
      // back at its own height by halfway to the teeth.
      const seat = ease(clamp((q - 0.9) / 0.1));
      const rise = ease(clamp((u - 0.25) / 0.75));
      const raise = box ? -SEAT_DROP * seat * (1 - rise) + RISE * rise * (1 - ease(clamp(r / 0.5))) : 0;
      // The lid opens as the aligner comes in, a little wider as it comes out, and closes once it has flown.
      const lid = (LID_OPEN * ease(clamp((q - 0.55) / 0.35)) + LID_WIDER * rise) * (1 - ease(clamp((r - 0.15) / 0.45)));
      box?.render(lid);
      s.q = q;
      s.r = r;
      // Near the case, its wall hides the part of the aligner inside the tray.
      scene?.render(ease(q), ease(r), raise, box && sr && q > 0.9 && r < 0.05 ? sr : null);

      const k = (1 - (lift + 12) / 48) * intro * (1 - clamp(r / 0.3)) * (box ? 1 - clamp((q - 0.75) / 0.2) : 1);
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
    // The Journey's stepped scroll moves the page from its own frame loop; follow it in the same frame.
    const onStep = () => write(performance.now());
    window.addEventListener(STEP_SCROLL_EVENT, onStep);

    // Run the loop only while the layer is on screen (and never under reduced motion). Being fixed to the
    // screen, the stage is hidden while the layer is off screen, so it never floats over later sections.
    if (!reduced) st.classList.add(styles.fixed);
    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting && !reduced;
      if (!reduced) st.style.visibility = entry.isIntersecting ? "" : "hidden";
      if (s.visible && !s.raf) s.raf = requestAnimationFrame(frame);
    });
    io.observe(layer);
    write(start);

    // Show the 3D model once it has loaded (skipped under reduced motion); the still only if it fails.
    const cv = canvas.current;
    if (!reduced && cv) {
      import("./alignerScene")
        .then(({ createAlignerScene }) => createAlignerScene(cv, el, `/${model}`))
        .then((sc) => {
          if (disposed) return sc.dispose();
          scene = sc;
          st.classList.add(styles.ready);
          introStart = performance.now();
          write(performance.now());
          // The case in the slot, through the same camera. Without it, the aligner just lands in the slot.
          if (caseCanvas && slot)
            import("./caseScene")
              .then(({ createCaseScene }) => {
                if (disposed) return;
                box = createCaseScene(caseCanvas, slot);
                caseCanvas.dataset.ready = "";
                write(performance.now());
              })
              .catch(() => {});
        })
        .catch(() => {
          // No WebGL or no model: fall back to the still.
          if (disposed) return;
          st.classList.add(styles.fallback);
          introStart = performance.now();
        });
    }

    return () => {
      disposed = true;
      scene?.dispose();
      box?.dispose();
      io.disconnect();
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(STEP_SCROLL_EVENT, onStep);
    };
  }, [model]);

  return (
    <div ref={stage} className={styles.stage}>
      <div ref={obj} className={styles.object}>
        <Image className={styles.still} src={`/${src}`} alt={alt} width={width} height={height} draggable={false} sizes="(max-width: 700px) 94vw, 860px" />
        <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
      </div>
      <span ref={shadow} className={styles.shadow} aria-hidden="true" />
    </div>
  );
}
