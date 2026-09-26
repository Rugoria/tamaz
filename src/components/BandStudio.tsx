"use client";

import { useState } from "react";
import { bandStudio } from "@/content/site";
import { Smile } from "./smile/Smile";
import styles from "./BandStudio.module.css";

type Pattern = "solid" | "alt" | "split" | "rainbow";
type Slot = "a" | "b";

const PATTERNS: { id: Pattern; label: string }[] = [
  { id: "solid", label: "Solid" },
  { id: "alt", label: "Alternate A/B" },
  { id: "split", label: "Split sides" },
  { id: "rainbow", label: "Rainbow" },
];
const RAINBOW = bandStudio.colors.slice(0, 6).map((c) => c.hex);

function applyPattern(pattern: Pattern, a: string, b: string) {
  return Array.from({ length: 12 }, (_, i) => {
    if (pattern === "solid") return a;
    if (pattern === "alt") return i % 2 ? b : a;
    if (pattern === "split") return i < 6 ? a : b;
    return RAINBOW[i % 6];
  });
}

export function BandStudio() {
  const [colors, setColors] = useState({ a: bandStudio.defaults.a, b: bandStudio.defaults.b });
  const [slot, setSlot] = useState<Slot>("a");
  const [pattern, setPattern] = useState<Pattern>("alt");
  const [bands, setBands] = useState(() => applyPattern("alt", bandStudio.defaults.a, bandStudio.defaults.b));

  const pickColor = (hex: string) => {
    const next = { ...colors, [slot]: hex };
    setColors(next);
    setBands(applyPattern(pattern, next.a, next.b));
  };
  const pickPattern = (p: Pattern) => {
    setPattern(p);
    setBands(applyPattern(p, colors.a, colors.b));
  };
  const paintBand = (i: number) => setBands((prev) => prev.map((c, j) => (j === i ? colors[slot] : c)));

  return (
    <section id="bands">
      <div className={`wrap ${styles.builder}`}>
        <div className="smile-card reveal">
          <Smile t={1} bracket={1} bandColors={bands} onBandClick={paintBand} label={bandStudio.smileLabel} />
        </div>
        <div className="reveal">
          <span className="eyebrow">{bandStudio.eyebrow}</span>
          <h2 style={{ marginTop: 14 }}>{bandStudio.title}</h2>
          <p className="lede" style={{ marginTop: 16 }}>{bandStudio.lede}</p>
          <div className={styles.slots}>
            {(["a", "b"] as const).map((s) => (
              <button key={s} type="button" className={styles.slotbtn} aria-pressed={slot === s} onClick={() => setSlot(s)}>
                <span className={styles.slot} style={{ background: colors[s] }} />
                Color {s.toUpperCase()}
              </button>
            ))}
          </div>
          <div className={styles.swatches} role="group" aria-label={`Colors for color ${slot.toUpperCase()}`}>
            {bandStudio.colors.map((c) => (
              <button
                key={c.hex}
                type="button"
                className={styles.sw}
                style={{ background: c.hex }}
                aria-label={c.name}
                aria-pressed={colors[slot] === c.hex}
                onClick={() => pickColor(c.hex)}
              >
                <span className={styles.n} aria-hidden="true">{c.name}</span>
              </button>
            ))}
          </div>
          <div className={styles.pattern} role="group" aria-label="Pattern">
            {PATTERNS.map((p) => (
              <button key={p.id} type="button" className="chipbtn" aria-pressed={pattern === p.id} onClick={() => pickPattern(p.id)}>
                {p.label}
              </button>
            ))}
          </div>
          <p className={styles.hint}>{bandStudio.hint}</p>
        </div>
      </div>
    </section>
  );
}
