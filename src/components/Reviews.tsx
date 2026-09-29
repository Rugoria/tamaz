import { reviews, testimonials } from "@/content/site";
import { SectionHead } from "./SectionHead";
import { Copy } from "./Tbd";
import { VideoSlot } from "./video-slot/VideoSlot";
import styles from "./Reviews.module.css";

const GoogleG = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.g}>
    <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8z" />
    <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.8 14a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 9.9L5.8 14z" />
    <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
  </svg>
);

export function Reviews() {
  const g = reviews.google;
  return (
    <section id="reviews" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className={styles.head}>
          <SectionHead eyebrow={reviews.eyebrow} title={reviews.title} />
          <div className={`${styles.summary} reveal`}>
            <GoogleG />
            <div>
              <b>{g.rating}</b> <span className={styles.stars} aria-hidden="true">★★★★★</span>
              <small>
                <Copy text={g.count} />
              </small>
              {g.url && (
                <a href={g.url} target="_blank" rel="noopener noreferrer">
                  {g.linkLabel} ↗
                </a>
              )}
            </div>
          </div>
        </div>
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

        <div className={`${styles.sub} reveal`}>
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h3>{testimonials.title}</h3>
        </div>
        <div className={styles.reviews} data-stagger>
          {testimonials.items.map((t, i) => (
            <figure key={i} className={`${styles.testimonial} reveal`}>
              <VideoSlot
                src={t.video}
                poster={t.poster}
                title={`Video testimonial ${i + 1}`}
                label={`Testimonial ${i + 1}`}
                size="1080 × 1350"
                aspect="4/5"
              />
              <blockquote>
                <Copy text={t.quote} />
              </blockquote>
              <figcaption>
                <b><Copy text={t.name} /></b> · <Copy text={t.detail} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
