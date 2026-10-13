"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journey, type Appliance } from "@/content/site";
import { alignAt, retainAt, wornAt } from "@/lib/journeyTimeline";
import { clamp, ease, lerp, prefersReducedMotion } from "@/lib/motion";
import { Copy } from "./Tbd";
import styles from "./Journey.module.css";

const STAGES = journey.stages;
const APPLIANCES = Object.keys(journey.appliances) as Appliance[];

const stageCopy = (i: number, a: Appliance) => (a === "aligners" && STAGES[i].aligners) || STAGES[i];


const PHOTO_SIZES = "(max-width: 960px) 92vw, 640px";


export function Journey() {
  const scroller = useRef<HTMLDivElement>(null);
  const startPhoto = useRef<HTMLDivElement>(null);
  const wornPhoto = useRef<HTMLDivElement>(null);
  const endPhoto = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const crowd = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [appliance, setAppliance] = useState<Appliance>("aligners");
  const { months, average } = journey.appliances[appliance];

  useEffect(() => {
    let lastP = -1, ticking = false, raf = 0;
    // Reduced motion: no movement, just the three photos.
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
      const worn = ease(step(wornAt(p)));
      const ret = ease(step(retainAt(p)));
      // Each step crossfades into its photo with a soft zoom: aligners on, then the straight smile.
      if (startPhoto.current) startPhoto.current.style.transform = `scale(${lerp(1, 1.05, worn).toFixed(3)})`;
      if (wornPhoto.current) {
        wornPhoto.current.style.opacity = worn.toFixed(3);
        wornPhoto.current.style.transform = `scale(${(lerp(1.06, 1, worn) * lerp(1, 1.05, ret)).toFixed(3)})`;
      }
      if (endPhoto.current) {
        endPhoto.current.style.opacity = ret.toFixed(3);
        endPhoto.current.style.transform = `scale(${lerp(1.06, 1, ret).toFixed(3)})`;
      }
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
      <div id="journey-scroll" className={styles.scroll} ref={scroller}>
        <div className={styles.sticky}>
          <div className="wrap">
            <div>
              <span className="eyebrow">{journey.eyebrow.replace("{months}", String(months))}</span>
              <h2 style={{ marginTop: 14 }}>{journey.title}</h2>
              <p className="lede" style={{ marginTop: 16 }}>{journey.lede}</p>
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
              <div className={styles.progress}><i ref={bar} /></div>
              {/* HeroAligner flies the 3D aligner down onto the lower teeth here. */}
              <div id="journey-photos" className={`smile-card ${styles.photos}`}>
                <div className={styles.photo} ref={startPhoto}>
                  <Image src={`/${journey.photos.start.src}`} alt={journey.photos.start.alt} fill sizes={PHOTO_SIZES} />
                </div>
                <div className={styles.photo} ref={wornPhoto} style={{ opacity: 0 }}>
                  <Image src={`/${journey.photos.worn.src}`} alt={journey.photos.worn.alt} fill sizes={PHOTO_SIZES} />
                </div>
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
