import { smileGuide } from "@/content/site";
import { SectionHead } from "./SectionHead";
import { Copy } from "./Tbd";
import { VideoSlot } from "./video-slot/VideoSlot";
import styles from "./SmileGuide.module.css";

export function SmileGuide() {
  return (
    <section id="resources" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={smileGuide.eyebrow} title={smileGuide.title} />
        <div className={styles.posts} data-stagger>
          {smileGuide.tips.map((t, i) => (
            <article key={i} className={`${styles.post} reveal`}>
              <VideoSlot src={t.video} poster={t.poster} title={t.title} label={`Tutorial ${i + 1}`} size="1920 × 1080" />
              <span className={styles.kicker}>
                <Copy text={t.kicker} />
              </span>
              <h3>
                <Copy text={t.title} />
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
