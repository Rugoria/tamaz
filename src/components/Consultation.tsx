import { consultation } from "@/content/site";
import { ConsultationForm } from "./ConsultationForm";
import styles from "./Consultation.module.css";

export function Consultation() {
  return (
    <section id="consult" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className={`${styles.consult} reveal`}>
          <div>
            <h2>{consultation.title}</h2>
            <p className="lede" style={{ marginTop: 16 }}>{consultation.lede}</p>
            <ul>
              {consultation.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
