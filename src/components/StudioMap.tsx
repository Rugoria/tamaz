"use client";

import { useState, type ReactNode } from "react";
import type { SiteContent, Studio } from "@/content/site";
import { fill } from "@/lib/i18n";
import { isPlaceholder } from "@/lib/placeholder";
import styles from "./Locations.module.css";

type Props = {
  studios: Studio[];
  /** Shown instead of the map while no studio has coordinates or a real address yet. */
  fallback: ReactNode;
  ui: SiteContent["ui"]["map"];
};

/** Embed API key (public by design: restrict it to the site's domains in Google Cloud). */
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

/** The studio's pin: its coordinates if set, else its name and address. */
const query = (s: Studio) => (s.coords ? `${s.coords.lat},${s.coords.lng}` : `${s.name}, ${s.address}`);

const embedUrl = (s: Studio) =>
  KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${KEY}&q=${encodeURIComponent(query(s))}&zoom=16`
    : `https://www.google.com/maps?q=${encodeURIComponent(query(s))}&z=16&output=embed`;

/** Google Maps embed of the studios, loaded lazily when it nears the viewport. */
export function StudioMap({ studios, fallback, ui }: Props) {
  const mapped = studios.filter((s) => s.coords || !isPlaceholder(s.address));
  const [active, setActive] = useState(0);

  if (mapped.length === 0) return <>{fallback}</>;
  const studio = mapped[Math.min(active, mapped.length - 1)];

  return (
    <div className={styles.mapWrap}>
      {mapped.length > 1 && (
        <div className={styles.mapTabs} role="group" aria-label={ui.tabs}>
          {mapped.map((s, i) => (
            <button key={s.name} type="button" className="chipbtn" aria-pressed={i === active} onClick={() => setActive(i)}>
              {s.name}
            </button>
          ))}
        </div>
      )}
      <div className={styles.map}>
        <iframe
          key={query(studio)}
          src={embedUrl(studio)}
          title={fill(ui.title, { name: isPlaceholder(studio.name) ? "tamaz" : studio.name })}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
