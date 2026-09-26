import { locations } from "@/content/site";
import { ImageSlot } from "./image-slot/ImageSlot";
import { Copy } from "./Tbd";
import styles from "./Locations.module.css";

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
          </div>
        ))}
      </div>
      <ImageSlot {...locations.map} className={styles.map} aspect="16/9" sizes="(max-width: 900px) 100vw, 580px" />
    </div>
  );
}
