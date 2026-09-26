import { reviews } from "@/content/site";
import { SectionHead } from "./SectionHead";
import styles from "./Reviews.module.css";

export function Reviews() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={reviews.eyebrow} title={reviews.title} />
        <div className={styles.reviews} data-stagger>
          {reviews.items.map((r) => (
            <figure key={r.name} className={`${styles.review} reveal`}>
              <div className={styles.stars} role="img" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>{r.quote}</blockquote>
              <figcaption className={styles.who}>
                <span className={styles.av} style={{ background: r.color }} aria-hidden="true">{r.initials}</span>
                <span>
                  {r.name}
                  <small>{r.detail}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
