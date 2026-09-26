import { promo } from "@/content/site";
import { Copy } from "./Tbd";
import styles from "./PromoBar.module.css";

export function PromoBar() {
  return (
    <div className={styles.promo}>
      <Copy text={promo.offer} /> {promo.text} <Copy text={promo.date} />.{" "}
      <a href={promo.cta.href}>{promo.cta.label}</a>
    </div>
  );
}
