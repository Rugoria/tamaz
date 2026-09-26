import { faq } from "@/content/site";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <div className="reveal">
      <span className="eyebrow">{faq.eyebrow}</span>
      <h2 style={{ marginTop: 14, marginBottom: 28 }}>{faq.title}</h2>
      <div className={styles.faq}>
        {faq.items.map((f, i) => (
          <details key={f.question} open={i === 0}>
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
