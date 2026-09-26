"use client";

import {
  useCallback,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type Ref,
} from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { GUM_PATH, LOWER_TEETH, MOUTH_PATH, TEETH, computeFrame } from "./smileGeometry";

export type SmileHandle = {
  /** Imperatively move the smile without re-rendering React (use from rAF / scroll loops). */
  set(t: number, bracket: number, ghost?: number, scanY?: number): void;
  readonly t: number;
  readonly bracket: number;
};

export type SmileProps = {
  t: number; // 0 = crowded, 1 = aligned
  bracket: number; // 0..1 brackets/wire/bands visibility (wire draws in via stroke-dashoffset)
  ghost?: number; // 0..1 dashed target-position outlines
  scanY?: number; // -1 hidden, else 0..1 scan-beam position
  bandColors: string[]; // 12 entries, molars ignored
  onBandClick?: (index: number) => void;
  label: string;
  ref?: Ref<SmileHandle>;
};

const SCAN = "#53CFC5";

export function Smile({ t, bracket, ghost = 0, scanY = -1, bandColors, onBandClick, label, ref }: SmileProps) {
  const uid = "s" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // Geometry for the first paint (and SSR). After mount, attributes are driven through refs.
  const [initial] = useState(() => computeFrame(t, bracket, ghost, scanY));

  const toothEls = useRef<(SVGGElement | null)[]>([]);
  const bandGroupEls = useRef<(SVGGElement | null)[]>([]);
  const bracketEls = useRef<(SVGGElement | null)[]>([]);
  const wireEl = useRef<SVGPathElement>(null);
  const wireHiEl = useRef<SVGPathElement>(null);
  const bandsEl = useRef<SVGGElement>(null);
  const ghostEl = useRef<SVGGElement>(null);
  const scanEl = useRef<SVGGElement>(null);
  const current = useRef({ t, bracket });

  const apply = useCallback((t: number, b: number, g = 0, s = -1) => {
    current.current = { t, bracket: b };
    const f = computeFrame(t, b, g, s);
    f.toothTransforms.forEach((tr, i) => {
      toothEls.current[i]?.setAttribute("transform", tr);
      bandGroupEls.current[i]?.setAttribute("transform", tr);
      bracketEls.current[i]?.setAttribute("opacity", String(f.bracketOpacity));
    });
    for (const w of [wireEl.current, wireHiEl.current]) {
      w?.setAttribute("d", f.wirePath);
      w?.setAttribute("stroke-dashoffset", f.wireOffset);
    }
    bandsEl.current?.setAttribute("opacity", String(f.bandsOpacity));
    ghostEl.current?.setAttribute("opacity", String(f.ghostOpacity));
    const scan = scanEl.current;
    if (scan) {
      scan.setAttribute("opacity", f.scanTransform ? "1" : "0");
      if (f.scanTransform) scan.setAttribute("transform", f.scanTransform);
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      set: apply,
      get t() { return current.current.t; },
      get bracket() { return current.current.bracket; },
    }),
    [apply],
  );

  useLayoutEffect(() => {
    apply(t, bracket, ghost, scanY);
  }, [apply, t, bracket, ghost, scanY]);

  const paint = (i: number, el: SVGRectElement) => {
    onBandClick?.(i);
    if (!prefersReducedMotion()) {
      el.animate([{ strokeWidth: 6 }, { strokeWidth: 3.6 }], { duration: 350, easing: "cubic-bezier(.3,1.6,.5,1)" });
    }
  };
  const onBandKey = (i: number) => (e: KeyboardEvent<SVGRectElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      paint(i, e.currentTarget);
    }
  };

  const interactive = !!onBandClick;

  return (
    <svg
      className="smile"
      viewBox="0 0 560 250"
      role={interactive ? "group" : "img"}
      aria-label={label}
    >
      <defs>
        <linearGradient id={`tg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EDE6D8" /><stop offset=".35" stopColor="#FFFFFF" /><stop offset="1" stopColor="#EFE8DA" />
        </linearGradient>
        <linearGradient id={`lt${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6DECF" /><stop offset="1" stopColor="#B9AF9E" />
        </linearGradient>
        <linearGradient id={`mg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1F4F7" /><stop offset=".55" stopColor="#A5B1BE" /><stop offset="1" stopColor="#D3DAE1" />
        </linearGradient>
        <linearGradient id={`gg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--gum-a)" /><stop offset="1" stopColor="var(--gum-b)" />
        </linearGradient>
        <linearGradient id={`sc${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SCAN} stopOpacity="0" /><stop offset="1" stopColor={SCAN} stopOpacity=".55" />
        </linearGradient>
        <clipPath id={`cl${uid}`}><path d={MOUTH_PATH} /></clipPath>
      </defs>

      <g clipPath={`url(#cl${uid})`}>
        <rect x="0" y="0" width="560" height="250" fill="var(--mouth)" />

        {/* lower teeth (static, behind) */}
        <g>
          {LOWER_TEETH.map((l, i) => (
            <rect key={i} x={l.x} y={l.y} width={l.w} height="60" rx="7" fill={`url(#lt${uid})`} />
          ))}
        </g>

        {/* target positions */}
        <g ref={ghostEl} opacity={initial.ghostOpacity}>
          {TEETH.map((tt, i) => (
            <path key={i} d={tt.path} fill="none" stroke={SCAN} strokeWidth="1.6" strokeDasharray="4 3" transform={`translate(${tt.x0} ${tt.top})`} />
          ))}
        </g>

        {/* upper teeth with brackets */}
        <g>
          {TEETH.map((tt, i) => {
            const { x: bx, y: by, w: bw, h: bh } = tt.bracket;
            return (
              <g key={i} ref={(n) => { toothEls.current[i] = n; }} transform={initial.toothTransforms[i]}>
                <path d={tt.path} fill={`url(#tg${uid})`} stroke="#D6CCBA" strokeWidth="1.2" />
                <ellipse cx={tt.w * 0.3} cy={tt.h * 0.42} rx={tt.w * 0.1} ry={tt.h * 0.16} fill="#fff" opacity=".75" />
                <g ref={(n) => { bracketEls.current[i] = n; }} opacity={initial.bracketOpacity}>
                  {tt.k === "mol" ? (
                    <rect x={bx - bw * 0.75} y={by - bh * 0.35} width={bw * 1.5} height={bh * 0.7} rx="2" fill={`url(#mg${uid})`} stroke="#7D8997" strokeWidth=".8" />
                  ) : (
                    <>
                      <rect x={bx - bw / 2} y={by - bh / 2} width={bw} height={bh} rx="2.8" fill={`url(#mg${uid})`} stroke="#7D8997" strokeWidth=".8" />
                      <rect x={bx - bw / 2} y={by - 1.3} width={bw} height="2.6" fill="#6B7785" />
                    </>
                  )}
                </g>
              </g>
            );
          })}
        </g>

        <path d={GUM_PATH} fill={`url(#gg${uid})`} />

        {/* archwire */}
        <g>
          <path ref={wireEl} d={initial.wirePath} fill="none" stroke="#9AA6B3" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={initial.wireOffset} />
          <path ref={wireHiEl} d={initial.wirePath} fill="none" stroke="#F4F7FA" strokeWidth="1" strokeLinecap="round" opacity=".8" pathLength={1} strokeDasharray="1" strokeDashoffset={initial.wireOffset} />
        </g>

        {/* elastic bands */}
        <g ref={bandsEl} opacity={initial.bandsOpacity}>
          {TEETH.map((tt, i) => {
            const { x: bx, y: by, w: bw, h: bh } = tt.bracket;
            return (
              <g key={i} ref={(n) => { bandGroupEls.current[i] = n; }} transform={initial.toothTransforms[i]}>
                {tt.k !== "mol" && (
                  <rect
                    x={bx - bw / 2 - 3}
                    y={by - bh / 2 - 3}
                    width={bw + 6}
                    height={bh + 6}
                    rx={(bh + 6) * 0.42}
                    fill="none"
                    strokeWidth="3.6"
                    stroke={bandColors[i]}
                    style={interactive ? { cursor: "pointer" } : undefined}
                    {...(interactive && {
                      role: "button",
                      tabIndex: 0,
                      "aria-label": `Paint band on tooth ${i + 1}`,
                      onClick: (e) => paint(i, e.currentTarget),
                      onKeyDown: onBandKey(i),
                    })}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* scan beam */}
        <g ref={scanEl} opacity={initial.scanTransform ? 1 : 0} transform={initial.scanTransform ?? undefined}>
          <rect x="0" y="-40" width="560" height="40" fill={`url(#sc${uid})`} />
          <rect x="0" y="-1.5" width="560" height="3" fill={SCAN} />
        </g>
      </g>
      <path d={MOUTH_PATH} fill="none" stroke="var(--line)" strokeWidth="2" />
    </svg>
  );
}
