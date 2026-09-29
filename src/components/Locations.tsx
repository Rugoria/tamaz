import { locations } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";
import { ImageSlot } from "./image-slot/ImageSlot";
import { StudioMap } from "./StudioMap";
import { Copy } from "./Tbd";
import styles from "./Locations.module.css";

const directions = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export function Locations() {
  return (
    <div className="reveal">
      <span className="eyebrow">{locations.eyebrow}</span>
      <h2 style={{ marginTop: 14, marginBottom: 28 }}>{locations.title}</h2>
      <div className={styles.locs}>
        {locations.studios.map((s, i) => (
          <div key={i} className={styles.loc}>
            <span className={styles.open}>{s.hours}</span>
            <b><Copy text={s.name} /></b>
            <span><Copy text={s.address} /></span>
            <span className="mono"><Copy text={s.phone} /></span>
            {!isPlaceholder(s.address) && (
              <a className={styles.dir} href={directions(s.address)} target="_blank" rel="noopener noreferrer">
                Directions ↗
              </a>
            )}
          </div>
        ))}
      </div>
      <StudioMap
        studios={locations.studios}
        fallback={<ImageSlot {...locations.map} className={styles.map} aspect="16/9" sizes="(max-width: 900px) 100vw, 580px" />}
      />
    </div>
  );
}
