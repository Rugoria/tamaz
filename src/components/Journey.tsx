"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journey, type Appliance } from "@/content/site";
import { clamp, ease, lerp, prefersReducedMotion } from "@/lib/motion";
import { Copy } from "./Tbd";
import styles from "./Journey.module.css";

const STAGES = journey.stages;
const APPLIANCES = Object.keys(journey.appliances) as Appliance[];

const stageCopy = (i: number, a: Appliance) => (a === "aligners" && STAGES[i].aligners) || STAGES[i];

const [SCAN, ALIGN, RETAIN] = STAGES;
/** Treatment progress 0..1 for scroll progress p: teeth move during the Align step (see content/site.ts). */
const alignAt = (p: number) => clamp((p - ALIGN.start) / (ALIGN.end - ALIGN.start));
/** The end photo fades in over the first part of the Retain step and stays to the end. */
const retainAt = (p: number) => clamp((p - RETAIN.start) / ((RETAIN.end - RETAIN.start) * 0.6));

const PHOTO_SIZES = "(max-width: 960px) 92vw, 640px";
const { aligner: upper, alignerLower: lower } = journey.photos;

function monthLabel(p: number, total: number) {
  if (p < SCAN.end) return "Day 1";
  if (p < ALIGN.end) return "Month " + String(Math.max(1, Math.round(1 + alignAt(p) * (total - 1)))).padStart(2, "0");
  return `Month ${total}+`;
}

export function Journey() {
  const scroller = useRef<HTMLDivElement>(null);
  const startPhoto = useRef<HTMLDivElement>(null);
  const tray = useRef<HTMLDivElement>(null);
  const trayLower = useRef<HTMLDivElement>(null);
  const endPhoto = useRef<HTMLDivElement>(null);
  const month = useRef<HTMLSpanElement>(null);
  const stageLabel = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLElement>(null);
  const crowd = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [appliance, setAppliance] = useState<Appliance>("aligners");
  const applianceRef = useRef(appliance);
  const refresh = useRef(() => {});
  const { months, average } = journey.appliances[appliance];

  useEffect(() => {
    applianceRef.current = appliance;
    refresh.current();
  }, [appliance]);

  useEffect(() => {
    let lastP = -1, ticking = false, raf = 0;
    // Reduced motion: no movement, just the three states (photo, tray on, end photo).
    const reduced = prefersReducedMotion();
    const step = (v: number) => (reduced ? (v < 0.5 ? 0 : 1) : v);
    const update = () => {
      const el = scroller.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - window.innerHeight));
      if (Math.abs(p - lastP) < 0.0005) return;
      lastP = p;
      let si = STAGES.findIndex((s) => p >= s.start && p < s.end);
      if (si < 0) si = STAGES.length - 1;
      const t = alignAt(p);
      const a = ease(step(t));
      const ret = ease(step(retainAt(p)));
      // Align: the upper tray comes down from above and the lower one up from below, each settling
      // onto its teeth, clearly visible while moving, then fading to a subtle clear look once fitted.
      const show = clamp(step(t) / 0.12);
      const settle = clamp((step(t) - 0.8) / 0.2);
      const trayOpacity = (show * lerp(0.8, 0.4, settle) * (1 - ret)).toFixed(3);
      if (tray.current) {
        tray.current.style.transform = `translateY(${lerp(-190, 0, a).toFixed(1)}%) scale(${lerp(1.25, 1, a).toFixed(3)}) rotate(${lerp(-6, 0, a).toFixed(2)}deg)`;
        tray.current.style.opacity = trayOpacity;
      }
      if (trayLower.current) {
        trayLower.current.style.transform = `translateY(${lerp(190, 0, a).toFixed(1)}%) scale(${lerp(1.25, 1, a).toFixed(3)}) rotate(${lerp(6, 0, a).toFixed(2)}deg)`;
        trayLower.current.style.opacity = trayOpacity;
      }
      // Retain: a soft zoom crossfade into the end photo.
      if (startPhoto.current) startPhoto.current.style.transform = `scale(${lerp(1, 1.05, ret).toFixed(3)})`;
      if (endPhoto.current) {
        endPhoto.current.style.opacity = ret.toFixed(3);
        endPhoto.current.style.transform = `scale(${lerp(1.06, 1, ret).toFixed(3)})`;
      }
      const ap = applianceRef.current;
      if (month.current) month.current.textContent = monthLabel(p, journey.appliances[ap].months);
      if (stageLabel.current) stageLabel.current.textContent = stageCopy(si, ap).label;
      if (bar.current) bar.current.style.width = (p * 100).toFixed(1) + "%";
      if (crowd.current) crowd.current.textContent = (5.5 * (1 - ease(t))).toFixed(1) + " mm";
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
    refresh.current = onResize;
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
              <span className="eyebrow">{journey.eyebrow.replace("{months}", String(months))}</span>
              <h2 style={{ marginTop: 14 }}>{journey.title}</h2>
              <p className="lede" style={{ color: "var(--deep-muted)", marginTop: 16 }}>{journey.lede}</p>
              <ol className={styles.stages}>
                {STAGES.map((s, i) => {
                  const c = stageCopy(i, appliance);
                  return (
                    <li
                      key={s.name}
                      className={i === active ? styles.on : i < active ? styles.done : undefined}
                      aria-current={i === active ? "step" : undefined}
                    >
                      <b>{c.name}</b>
                      <p>{c.body}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className={styles.visual}>
              <div className={styles.toggle} role="group" aria-label={journey.toggleLabel}>
                {APPLIANCES.map((a) => (
                  <button key={a} type="button" aria-pressed={appliance === a} onClick={() => setAppliance(a)}>
                    {journey.appliances[a].label}
                  </button>
                ))}
              </div>
              <div className={styles.month}>
                <span className={styles.big} ref={month}>Day 1</span>
                <span className={styles.lbl} ref={stageLabel}>{STAGES[0].label}</span>
              </div>
              <div className={styles.progress}><i ref={bar} /></div>
              <div className={`smile-card ${styles.photos}`}>
                <div className={styles.photo} ref={startPhoto}>
                  <Image src={`/${journey.photos.start.src}`} alt={journey.photos.start.alt} fill sizes={PHOTO_SIZES} />
                </div>
                {[
                  { t: upper, ref: tray },
                  { t: lower, ref: trayLower },
                ].map(({ t, ref }) => (
                  <div
                    key={t.src}
                    className={styles.tray}
                    ref={ref}
                    aria-hidden="true"
                    style={{ left: `${t.fit.left}%`, top: `${t.fit.top}%`, width: `${t.fit.width}%` }}
                  >
                    <Image src={`/${t.src}`} alt="" width={t.width} height={t.height} sizes="(max-width: 960px) 60vw, 420px" />
                  </div>
                ))}
                <div className={styles.photo} ref={endPhoto} style={{ opacity: 0 }}>
                  <Image src={`/${journey.photos.end.src}`} alt={journey.photos.end.alt} fill sizes={PHOTO_SIZES} />
                </div>
              </div>
              <div className="readouts">
                <div className="readout"><small>Crowding</small><span ref={crowd}>5.5 mm</span></div>
                <div className="readout"><small>Average treatment</small><span><Copy text={average} /></span></div>
                <div className="readout"><small>Plan complete</small><span ref={pct}>0%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
