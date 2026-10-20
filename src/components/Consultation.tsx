import { getSiteContent } from "@/content/server";
import { consultation as en, locations as enLocations } from "@/content/site";
import { ConsultationForm } from "./ConsultationForm";
import styles from "./Consultation.module.css";

export async function Consultation() {
  const { consultation, locations, ui } = await getSiteContent();
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
          <ConsultationForm
            copy={consultation}
            labels={ui.form}
            // Shown in the page's language, sent as the English values the API checks against.
            treatments={consultation.treatmentOptions.map((label, i) => ({ label, value: en.treatmentOptions[i] }))}
            studios={locations.studios.map((s, i) => ({ label: s.name, value: enLocations.studios[i].name }))}
          />
        </div>
      </div>
    </section>
  );
}
