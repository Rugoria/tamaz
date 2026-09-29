import { faq } from "@/content/site";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <div className="reveal">
      <span className="eyebrow">{faq.eyebrow}</span>
      <h2 style={{ marginTop: 14, marginBottom: 28 }}>{faq.title}</h2>
      <div className={styles.faq}>
        {faq.groups.map((g, gi) => (
          <div key={g.title} className={styles.group}>
            <h3>{g.title}</h3>
            {g.items.map((f, i) => (
              <details key={f.question} open={gi === 0 && i === 0}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
