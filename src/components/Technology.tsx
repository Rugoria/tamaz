import { technology } from "@/content/site";
import styles from "./Technology.module.css";

const SCAN = "#53CFC5";

/** Molar crown silhouette: superellipse body + cusps + two roots. */
function inside(x: number, y: number) {
  const nx = (x - 200) / 120, ny = (y - 150) / 105;
  if (ny < -0.55) {
    const cusp = Math.abs(Math.sin(((x - 80) / 240) * Math.PI * 2));
    return Math.abs(nx) < 1 && ny > -0.55 - cusp * 0.4;
  }
  if (ny > 0.55) {
    const root = Math.abs(nx + (nx < 0 ? 0.5 : -0.5));
    return root < 0.28 - (ny - 0.55) * 0.28 && ny < 1.4;
  }
  return Math.pow(Math.abs(nx), 4) + Math.pow(Math.abs(ny * 0.9), 4) < 1;
}

const POINTS = (() => {
  const pts: { x: number; y: number; delay: string }[] = [];
  for (let y = 20; y <= 300; y += 9) {
    for (let x = 60; x <= 340; x += 9) {
      const jx = x + ((y / 9) % 2 ? 4.5 : 0);
      if (inside(jx, y)) pts.push({ x: jx, y, delay: (((y - 20) / 300) * 3.24).toFixed(2) + "s" });
    }
  }
  return pts;
})();

export function Technology() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className={`wrap ${styles.tech}`}>
        <div className={`${styles.scanCard} reveal`} role="img" aria-label={technology.scanLabel}>
          <svg viewBox="0 0 400 370" aria-hidden="true">
            <defs>
              <linearGradient id="beamG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={SCAN} stopOpacity="0" />
                <stop offset="1" stopColor={SCAN} stopOpacity=".35" />
              </linearGradient>
            </defs>
            <g>
              {POINTS.map((p, i) => (
                <circle key={i} className={styles.dot} cx={p.x} cy={p.y} r="1.6" style={{ animationDelay: p.delay }} />
              ))}
            </g>
            <g className={styles.beam}>
              <rect x="30" y="-30" width="340" height="34" fill="url(#beamG)" />
              <rect x="30" y="3" width="340" height="2" fill={SCAN} />
            </g>
            <text x="30" y="16" fill="#94A6B5" fontFamily="JetBrains Mono, monospace" fontSize="12">
              {`UR6 · ${POINTS.length * 48} pts`}
            </text>
          </svg>
          <div className={styles.meta}>
            {technology.stats.map((s) => (
              <div key={s.label}>
                {s.label}
                <b>{s.value}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal">
          <span className="eyebrow">{technology.eyebrow}</span>
          <h2 style={{ marginTop: 14, marginBottom: 28 }}>{technology.title}</h2>
          {technology.features.map((f) => (
            <div key={f.kicker} className={styles.feat}>
              <span className={styles.k}>{f.kicker}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
