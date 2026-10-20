import { getSiteContent } from "@/content/server";
import { Copy } from "./Tbd";
import styles from "./Clinics.module.css";

/** For clinics (B2B): how dentists and orthodontists offer tamaz aligners in their own practice. */
export async function Clinics() {
  const { clinics, ui } = await getSiteContent();
  return (
    <section id="clinics" className={styles.clinics} aria-labelledby="clinics-title">
      <div className="wrap">
        <div className={styles.head}>
          <div className={`${styles.intro} reveal`}>
            <span className="eyebrow">{clinics.eyebrow}</span>
            <h2 id="clinics-title">{clinics.title}</h2>
            <p className="lede">
              <Copy text={clinics.lede} />
            </p>
          </div>
          <div className={`${styles.join} reveal`}>
            <ul className={styles.audiences} aria-label={ui.clinicsAudiences}>
              {clinics.audiences.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <a className="btn btn-primary" href={clinics.cta.href}>
              {clinics.cta.label} <span className="arr">→</span>
            </a>
            <small>
              <Copy text={clinics.contact} />
            </small>
          </div>
        </div>

        <ul className={styles.benefits} data-stagger>
          {clinics.benefits.map((b) => (
            <li key={b.title} className="reveal">
              <h3>
                <Copy text={b.title} />
              </h3>
              <p>
                <Copy text={b.body} />
              </p>
            </li>
          ))}
        </ul>

        <ol className={styles.steps} data-stagger aria-label={ui.clinicsSteps}>
          {clinics.steps.map((s, i) => (
            <li key={i} className="reveal">
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <b>{s.title}</b>
              <p>
                <Copy text={s.body} />
              </p>
              <span className={styles.time}>
                <Copy text={s.time} />
              </span>
            </li>
          ))}
        </ol>

        <p className={`${styles.support} reveal`}>
          <Copy text={clinics.support} />
        </p>
      </div>
    </section>
  );
}
