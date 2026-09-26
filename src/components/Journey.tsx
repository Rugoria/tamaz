"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/site";
import { clamp, ease } from "@/lib/motion";
import { Smile, type SmileHandle } from "./smile/Smile";
import styles from "./Journey.module.css";

const BANDS = Array.from({ length: 12 }, (_, i) => (i % 2 ? "#FF6F58" : "#53CFC5"));
const STAGES = journey.stages;

/** Smile state for scroll progress p (0..1). Stage boundaries match content/site.ts. */
function frameAt(p: number) {
  const scanY = p < 0.12 ? p / 0.12 : -1;
  const ghost = p < 0.12 ? 0 : p < 0.22 ? (p - 0.12) / 0.1 : p < 0.8 ? 1 - ((p - 0.32) / 0.48) * 0.7 : p < 0.9 ? 0.3 : 0.3 * (1 - (p - 0.9) / 0.1);
  const bracket = p < 0.22 ? 0 : p < 0.32 ? (p - 0.22) / 0.1 : p < 0.9 ? 1 : 1 - (p - 0.9) / 0.08;
  const t = clamp((p - 0.32) / 0.48);
  return { t, bracket: clamp(bracket), ghost: clamp(ghost), scanY };
}

function monthLabel(p: number) {
  if (p < 0.12) return "Day 1";
  if (p < 0.22) return "Week 1";
  if (p < 0.32) return "Month 01";
  if (p < 0.9) return "Month " + String(Math.max(1, Math.round(1 + clamp((p - 0.32) / 0.58) * 17))).padStart(2, "0");
  return "Month 18+";
}

export function Journey() {
  const scroller = useRef<HTMLDivElement>(null);
  const smile = useRef<SmileHandle>(null);
  const month = useRef<HTMLSpanElement>(null);
  const stageLabel = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLElement>(null);
  const crowd = useRef<HTMLSpanElement>(null);
  const visits = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let lastP = -1, ticking = false, raf = 0;
    const update = () => {
      const el = scroller.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - window.innerHeight));
      if (Math.abs(p - lastP) < 0.0005) return;
      lastP = p;
      let si = STAGES.findIndex((s) => p >= s.start && p < s.end);
      if (si < 0) si = STAGES.length - 1;
      const f = frameAt(p);
      smile.current?.set(f.t, f.bracket, f.ghost, f.scanY);
      if (month.current) month.current.textContent = monthLabel(p);
      if (stageLabel.current) stageLabel.current.textContent = STAGES[si].label;
      if (bar.current) bar.current.style.width = (p * 100).toFixed(1) + "%";
      if (crowd.current) crowd.current.textContent = (5.5 * (1 - ease(f.t))).toFixed(1) + " mm";
      if (visits.current) visits.current.textContent = String(p < 0.22 ? 1 : p < 0.32 ? 2 : 2 + Math.round(clamp((p - 0.32) / 0.58) * 10));
      if (pct.current) pct.current.textContent = Math.round(p * 100) + "%";
      setActive(si);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    const onResize = () => {
      lastP = -1;
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.journey} id="journey" aria-label="Treatment timeline">
      <div className={styles.scroll} ref={scroller}>
        <div className={styles.sticky}>
          <div className="wrap">
            <div>
              <span className="eyebrow">{journey.eyebrow}</span>
              <h2 style={{ marginTop: 14 }}>{journey.title}</h2>
              <p className="lede" style={{ color: "#94A6B5", marginTop: 16 }}>{journey.lede}</p>
              <ol className={styles.stages}>
                {STAGES.map((s, i) => (
                  <li
                    key={s.name}
                    className={i === active ? styles.on : i < active ? styles.done : undefined}
                    aria-current={i === active ? "step" : undefined}
                  >
                    <b>{s.name}</b>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.visual}>
              <div className={styles.month}>
                <span className={styles.big} ref={month}>Day 1</span>
                <span className={styles.lbl} ref={stageLabel}>{STAGES[0].label}</span>
              </div>
              <div className={styles.progress}><i ref={bar} /></div>
              <div className="smile-card">
                <Smile ref={smile} t={0} bracket={0} ghost={0} scanY={0} bandColors={BANDS} label={journey.smileLabel} />
              </div>
              <div className="readouts">
                <div className="readout"><small>Crowding</small><span ref={crowd}>5.5 mm</span></div>
                <div className="readout"><small>Visits so far</small><span ref={visits}>1</span></div>
                <div className="readout"><small>Plan complete</small><span ref={pct}>0%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
