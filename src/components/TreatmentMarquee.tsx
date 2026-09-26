import { marquee } from "@/content/site";
import styles from "./TreatmentMarquee.module.css";

export function TreatmentMarquee() {
  // The track is rendered twice so translateX(-50%) loops seamlessly.
  const items = [...marquee, ...marquee];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {items.map((label, i) => (
          <span key={i}>
            {label} <i />
          </span>
        ))}
      </div>
    </div>
  );
}
