"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { DEFAULT_SCHEME, MODE_KEY, SCHEME_KEY, SCHEMES, isSchemeId, schemeAttr, type SchemeId, type ThemeMode } from "@/lib/schemes";
import styles from "./SchemePicker.module.css";

const MODES: { id: ThemeMode; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

const store = {
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};

// The <html> attributes are the source of truth (set on the server and by the
// pre-paint script in layout.tsx), so the picker just subscribes to them.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-scheme", "data-theme"] });
  return () => mo.disconnect();
}
const readAttrs = () => {
  const d = document.documentElement.dataset;
  return `${d.scheme ?? DEFAULT_SCHEME}|${d.theme === "dark" ? "dark" : "light"}`;
};

function applyScheme(id: SchemeId) {
  const attr = schemeAttr(id);
  if (attr) document.documentElement.setAttribute("data-scheme", attr);
  else document.documentElement.removeAttribute("data-scheme");
  store.set(SCHEME_KEY, id);
}

function applyMode(m: ThemeMode) {
  if (m === "light") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", m);
  store.set(MODE_KEY, m);
}

/** Floating palette switcher for client review. Rendered only when NEXT_PUBLIC_SHOW_SCHEME_PICKER=true. */
export function SchemePicker({ initialScheme }: { initialScheme: SchemeId }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const [rawScheme, rawMode] = useSyncExternalStore(subscribe, readAttrs, () => `${initialScheme}|light`).split("|");
  const scheme = SCHEMES.find((s) => s.id === (isSchemeId(rawScheme) ? rawScheme : DEFAULT_SCHEME)) ?? SCHEMES[0];
  const mode = rawMode as ThemeMode;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      btn.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dots = (sw: readonly string[]) => (
    <span className={styles.dots} aria-hidden="true">
      {sw.map((c) => (
        <i key={c} style={{ background: c }} />
      ))}
    </span>
  );

  return (
    <div className={styles.schemer}>
      <div className={styles.panel} id={panelId} hidden={!open} role="dialog" aria-label="Color scheme">
        <h4>
          Color scheme <small>{SCHEMES.length} palettes</small>
        </h4>
        <div className={styles.seg} role="group" aria-label="Light or dark">
          {MODES.map((m) => (
            <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => applyMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        {SCHEMES.map((s) => (
          <button key={s.id} type="button" className={styles.opt} aria-pressed={scheme.id === s.id} onClick={() => applyScheme(s.id)}>
            {dots(s.sw)}
            <b>{s.name}</b>
            <span>{s.mood}</span>
          </button>
        ))}
      </div>
      <button
        ref={btn}
        type="button"
        className={styles.btn}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        {dots(scheme.sw)}
        <span>{scheme.name}</span>
      </button>
    </div>
  );
}
