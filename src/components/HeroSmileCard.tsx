"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";
import { clamp, ease, lerp, prefersReducedMotion } from "@/lib/motion";
import { Smile, type SmileHandle } from "./smile/Smile";
import styles from "./HeroSmileCard.module.css";

const HERO_BANDS = ["#E9543F", "#2BA8A0", "#E9543F", "#2BA8A0", "#E9543F", "#2BA8A0", "#2BA8A0", "#E9543F", "#2BA8A0", "#E9543F", "#2BA8A0", "#E9543F"];

export function HeroSmileCard() {
  const smile = useRef<SmileHandle>(null);
  const phase = useRef<HTMLSpanElement>(null);
  const crowd = useRef<HTMLSpanElement>(null);
  const gap = useRef<HTMLSpanElement>(null);
  const rot = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const [target, setTarget] = useState<0 | 1>(1);

  const read = useCallback((t: number) => {
    const e = ease(t);
    if (phase.current) phase.current.textContent = "Month " + Math.round(e * 18);
    if (crowd.current) crowd.current.textContent = (5.5 * (1 - e)).toFixed(1) + " mm";
    if (gap.current) gap.current.textContent = (1.6 * (1 - e)).toFixed(1) + " mm";
    if (rot.current) rot.current.textContent = Math.round(16 * (1 - e)) + "°";
  }, []);

  // Brackets & wire go on first, then the teeth move.
  const animateTo = useCallback(
    (to: 0 | 1, dur: number) => {
      const s = smile.current;
      if (!s) return;
      cancelAnimationFrame(raf.current);
      if (prefersReducedMotion()) {
        s.set(to, 1);
        read(to);
        return;
      }
      const t0 = s.t, b0 = s.bracket, start = performance.now();
      const step = (now: number) => {
        const p = clamp((now - start) / dur);
        const b = lerp(b0, 1, clamp(p * 3));
        const t = lerp(t0, to, clamp((p - (b0 < 1 ? 0.28 : 0)) / (b0 < 1 ? 0.72 : 1)));
        s.set(t, b);
        read(t);
        if (p < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    },
    [read],
  );

  useEffect(() => {
    let timer = 0;
    if (prefersReducedMotion()) animateTo(1, 0);
    else timer = window.setTimeout(() => animateTo(1, 4200), 700);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf.current);
    };
  }, [animateTo]);

  const choose = (to: 0 | 1) => {
    setTarget(to);
    animateTo(to, to === 0 ? 1800 : 2600);
  };

  return (
    <div className="smile-card">
      <div className={styles.top}>
        <span className={styles.pill}>
          <span className={styles.dot} />
          <span ref={phase}>Month 0</span>
        </span>
        <div className={styles.toggle} role="group" aria-label="Show smile">
          <button type="button" aria-pressed={target === 0} onClick={() => choose(0)}>
            Before
          </button>
          <button type="button" aria-pressed={target === 1} onClick={() => choose(1)}>
            After
          </button>
        </div>
      </div>
      <Smile ref={smile} t={0} bracket={0} bandColors={HERO_BANDS} label={hero.smileLabel} />
      <div className="readouts">
        <div className="readout"><small>Crowding</small><span ref={crowd}>5.5 mm</span></div>
        <div className="readout"><small>Midline gap</small><span ref={gap}>1.6 mm</span></div>
        <div className="readout"><small>Max rotation</small><span ref={rot}>16°</span></div>
      </div>
    </div>
  );
}
