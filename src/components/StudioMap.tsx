"use client";

import { useState, type ReactNode } from "react";
import { isPlaceholder } from "@/lib/placeholder";
import styles from "./Locations.module.css";

type Props = {
  studios: { name: string; address: string }[];
  /** Shown instead of the map while no studio has a real address yet. */
  fallback: ReactNode;
};

/**
 * Google Maps embed that only loads after the visitor asks for it, so the page
 * stays fast and no Google requests happen before consent. Needs no API key.
 */
export function StudioMap({ studios, fallback }: Props) {
  const real = studios.filter((s) => !isPlaceholder(s.address));
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  if (real.length === 0) return <>{fallback}</>;
  const studio = real[Math.min(active, real.length - 1)];
  const src = `https://www.google.com/maps?q=${encodeURIComponent(`${studio.name}, ${studio.address}`)}&output=embed`;

  return (
    <div className={styles.mapWrap}>
      {real.length > 1 && (
        <div className={styles.mapTabs} role="group" aria-label="Show studio on map">
          {real.map((s, i) => (
            <button key={s.name} type="button" className="chipbtn" aria-pressed={i === active} onClick={() => setActive(i)}>
              {s.name}
            </button>
          ))}
        </div>
      )}
      <div className={styles.map}>
        {loaded ? (
          <iframe src={src} title={`Map of ${studio.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <button type="button" className={styles.mapLoad} onClick={() => setLoaded(true)}>
            <b>Show map</b>
            <small>Loads Google Maps</small>
          </button>
        )}
      </div>
    </div>
  );
}
