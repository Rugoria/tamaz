import { smileGuide } from "@/content/site";
import { ImageSlot } from "./image-slot/ImageSlot";
import { SectionHead } from "./SectionHead";
import styles from "./SmileGuide.module.css";

export function SmileGuide() {
  return (
    <section id="resources" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={smileGuide.eyebrow} title={smileGuide.title} />
        <div className={styles.posts} data-stagger>
          {smileGuide.articles.map((a) => (
            <a key={a.title} className={`${styles.post} reveal`} href={a.href}>
              <ImageSlot {...a.image} aspect="16/10" sizes="(max-width: 900px) 100vw, 380px" />
              <span className={styles.kicker}>{a.kicker}</span>
              <h3>{a.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
