/**
 * Pure geometry for the animated smile (ported 1:1 from the reference renderer).
 * viewBox is 560 × 250; the midline sits at x = 280.
 */

export type ToothKind = "inc" | "can" | "pre" | "mol";

/** Upper teeth from the midline outwards (mirrored to make 12). */
export const SPEC: { w: number; h: number; k: ToothKind }[] = [
  { w: 48, h: 76, k: "inc" },
  { w: 38, h: 66, k: "inc" },
  { w: 36, h: 72, k: "can" },
  { w: 32, h: 60, k: "pre" },
  { w: 29, h: 55, k: "pre" },
  { w: 26, h: 50, k: "mol" },
];

/** Crowded offsets per tooth, left → right. */
export const CROOK = [
  { dx: 3, dy: 4, r: -5 }, { dx: -4, dy: -3, r: 7 }, { dx: 7, dy: 9, r: -12 }, { dx: -6, dy: -7, r: 10 },
  { dx: 9, dy: 6, r: -16 }, { dx: -7, dy: 3, r: 9 }, { dx: 6, dy: -2, r: -8 }, { dx: -8, dy: 8, r: 14 },
  { dx: 5, dy: -6, r: -9 }, { dx: -9, dy: 10, r: 11 }, { dx: 4, dy: -4, r: -6 }, { dx: -3, dy: 5, r: 4 },
];

export const MOUTH_PATH = "M24 118 C110 22 450 22 536 118 C450 238 110 238 24 118 Z";

const LOWER_WIDTHS = [22, 25, 28, 30, 26, 24, 24, 26, 30, 28, 25, 22];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function toothPath(k: ToothKind, w: number, h: number) {
  if (k === "can") return `M0 0 L0 ${h - 18} Q${w * 0.18} ${h - 3} ${w / 2} ${h} Q${w * 0.82} ${h - 3} ${w} ${h - 18} L${w} 0 Z`;
  if (k === "pre") return `M0 0 L0 ${h - 13} Q${w * 0.12} ${h} ${w / 2} ${h} Q${w * 0.88} ${h} ${w} ${h - 13} L${w} 0 Z`;
  const r = k === "mol" ? 9 : Math.min(10, w * 0.24);
  return `M0 0 L0 ${h - r} Q0 ${h} ${r} ${h} L${w - r} ${h} Q${w} ${h} ${w} ${h - r} L${w} 0 Z`;
}

/** Catmull-Rom spline through points, as cubic Béziers. */
export function crPath(p: [number, number][]) {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

export type Tooth = {
  w: number;
  h: number;
  k: ToothKind;
  /** 0 = central incisor … 5 = molar; drives the per-tooth stagger. */
  rank: number;
  x0: number;
  top: number;
  c: (typeof CROOK)[number];
  path: string;
  /** Bracket geometry, in tooth-local coordinates. */
  bracket: { x: number; y: number; w: number; h: number };
};

function layout(): Tooth[] {
  const T: Omit<Tooth, "top" | "c" | "path" | "bracket">[] = [];
  let x = 280 - 1.5;
  SPEC.forEach((s, i) => { x -= s.w; T.push({ ...s, rank: i, x0: x }); x -= 3; });
  x = 280 + 1.5;
  SPEC.forEach((s, i) => { T.push({ ...s, rank: i, x0: x }); x += s.w + 3; });
  T.sort((a, b) => a.x0 - b.x0);
  return T.map((t, i) => {
    const d = t.x0 + t.w / 2 - 280;
    const s = Math.max(0.64, t.w / 48);
    return {
      ...t,
      top: 86 + 0.00028 * d * d, // smile arc
      c: CROOK[i],
      path: toothPath(t.k, t.w, t.h),
      bracket: { x: t.w / 2, y: t.h * 0.55, w: 16 * s, h: 13 * s },
    };
  });
}

export const TEETH = layout();

export const LOWER_TEETH = LOWER_WIDTHS.map((w, i) => {
  const dx = Math.abs(i - 5.5) * 30;
  return { x: 280 + (i - 5.5) * 30 - w / 2, y: 176 - dx * dx * 0.0006, w };
});

/** Gum with a scalloped edge that follows each tooth. */
export const GUM_PATH = (() => {
  const T = TEETH;
  let gd = `M0 0 L560 0 L560 ${T[11].top + 18}`;
  for (let i = T.length - 1; i >= 0; i--) {
    const t = T[i];
    gd += ` L${t.x0 + t.w + 1.5} ${t.top + 15} Q${t.x0 + t.w / 2} ${t.top - 7} ${t.x0 - 1.5} ${t.top + 15}`;
  }
  return gd + ` L0 ${T[0].top + 18} Z`;
})();

export type SmileFrame = {
  toothTransforms: string[];
  bracketOpacity: number;
  wirePath: string;
  wireOffset: string;
  bandsOpacity: number;
  ghostOpacity: number;
  scanTransform: string | null;
};

/** Everything that changes per frame, for t (0 crowded → 1 aligned) and bracket (0 → 1). */
export function computeFrame(t: number, b: number, ghost = 0, scanY = -1): SmileFrame {
  const pts: [number, number][] = [];
  const toothTransforms = TEETH.map((tt) => {
    const e = ease(clamp((t - tt.rank * 0.045) / (1 - 0.225)));
    const k = 1 - e, c = tt.c, rot = c.r * k, tx = tt.x0 + c.dx * k, ty = tt.top + c.dy * k;
    const th = (rot * Math.PI) / 180;
    pts.push([tx + tt.w / 2 + 0.05 * tt.h * Math.sin(th), ty + 0.6 * tt.h - 0.05 * tt.h * Math.cos(th)]);
    return `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) rotate(${rot.toFixed(2)} ${tt.w / 2} ${(tt.h * 0.6).toFixed(1)})`;
  });
  const a = pts[0], z = pts[pts.length - 1];
  pts.unshift([a[0] - 16, a[1] - 3]);
  pts.push([z[0] + 16, z[1] - 3]);
  return {
    toothTransforms,
    bracketOpacity: clamp(b * 1.6),
    wirePath: crPath(pts),
    wireOffset: (1 - clamp((b - 0.25) / 0.75)).toFixed(3),
    bandsOpacity: clamp((b - 0.55) / 0.45),
    ghostOpacity: ghost,
    scanTransform: scanY < 0 ? null : `translate(0 ${20 + scanY * 215})`,
  };
}
