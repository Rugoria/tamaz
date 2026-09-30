import { smileReveal } from "@/content/site";
import { CompareSlider } from "./CompareSlider";
import { ImageSlot } from "./image-slot/ImageSlot";
import { Copy } from "./Tbd";
import styles from "./SmileReveal.module.css";

const SIZES = "(max-width: 800px) 100vw, 760px";

export function SmileReveal() {
  return (
    <section id="before-after" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className={`sec-head ${styles.head} reveal`}>
          <span className="eyebrow">{smileReveal.eyebrow}</span>
          <h2>{smileReveal.title}</h2>
          <p className="lede">
            <Copy text={smileReveal.lede} />
          </p>
        </div>
        <div className={`${styles.frame} reveal`}>
          <CompareSlider
            motion="scroll"
            aspect={smileReveal.aspect}
            label={smileReveal.label}
            before={<ImageSlot className={styles.layer} {...smileReveal.before} sizes={SIZES} />}
            after={<ImageSlot className={styles.layer} {...smileReveal.after} sizes={SIZES} />}
          />
        </div>
      </div>
    </section>
  );
}
