import { packages } from "@/content/site";
import { Copy } from "./Tbd";
import styles from "./PaymentPackages.module.css";

export function PaymentPackages() {
  return (
    <section id="packages" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{packages.eyebrow}</span>
          <h2>{packages.title}</h2>
          <p className="lede">
            <Copy text={packages.lede} />
          </p>
        </div>
        <div className={styles.grid} data-stagger>
          {packages.items.map((p, i) => (
            <article key={i} className={`${styles.card} ${p.featured ? styles.featured : ""} reveal`}>
              {p.featured && <span className={styles.badge}>{packages.featuredLabel}</span>}
              <h3>
                <Copy text={p.name} />
              </h3>
              <div className={styles.price}>
                <Copy text={p.price} />
              </div>
              <div className={styles.monthly}>
                <Copy text={p.monthly} />
              </div>
              <ul className={styles.includes}>
                {p.includes.map((inc, j) => (
                  <li key={j}>
                    <Copy text={inc} />
                  </li>
                ))}
              </ul>
              <a className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`} href={packages.cta.href}>
                {packages.cta.label} <span className="arr">→</span>
              </a>
            </article>
          ))}
        </div>
        <p className={`${styles.more} reveal`}>
          <a href={packages.calculatorLink.href}>{packages.calculatorLink.label} ↓</a>
        </p>
      </div>
    </section>
  );
}
