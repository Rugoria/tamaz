import { process } from "@/content/site";
import { Copy } from "./Tbd";
import styles from "./Process.module.css";

export function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2>
            <Copy text={process.title} />
          </h2>
          <p className="lede">
            <Copy text={process.lede} />
          </p>
        </div>
        <ol className={styles.steps} data-stagger>
          {process.steps.map((s, i) => (
            <li key={i} className={`${styles.step} reveal`}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3>
                <Copy text={s.title} />
              </h3>
              <p>
                <Copy text={s.body} />
              </p>
              <span className="tag">
                <Copy text={s.time} />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
