import { results } from "@/content/site";
import { CompareSlider } from "./CompareSlider";
import { ImageSlot } from "./image-slot/ImageSlot";
import { SectionHead } from "./SectionHead";
import styles from "./Results.module.css";

const SIZES = "(max-width: 900px) 100vw, 380px";

export function Results() {
  return (
    <section id="results" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={results.eyebrow} title={results.title} lede={results.lede} />
        <div className={styles.grid} data-stagger>
          {results.cases.map((c, i) => (
            <div key={i} className="reveal">
              <CompareSlider
                label={`Compare case ${i + 1} before and after`}
                before={<ImageSlot className={styles.layer} {...c.before} size="1200 × 900" sizes={SIZES} />}
                after={<ImageSlot className={styles.layer} {...c.after} size="1200 × 900" sizes={SIZES} />}
              />
              <div className={styles.cap}>
                <b>{c.title}</b>
                <span>{c.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
