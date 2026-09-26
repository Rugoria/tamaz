import { team } from "@/content/site";
import { ImageSlot } from "./image-slot/ImageSlot";
import { SectionHead } from "./SectionHead";
import { Copy } from "./Tbd";
import styles from "./Team.module.css";

export function Team() {
  return (
    <section id="team" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={team.eyebrow} title={team.title} lede={team.lede} />
        <div className={styles.team} data-stagger>
          {team.doctors.map((d, i) => (
            <article key={i} className={`${styles.doc} reveal`}>
              <ImageSlot
                className={styles.portrait}
                src={d.image}
                label="Doctor portrait"
                size="800 × 1000"
                alt={d.alt}
                aspect="4/5"
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px"
              />
              <h3><Copy text={d.name} /></h3>
              <div className={styles.creds}>
                {d.credentials.map((c) => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
              <p><Copy text={d.bio} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
