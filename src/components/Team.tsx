import { gallery, team } from "@/content/site";
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

        <div className={`${styles.sub} reveal`}>
          <span className="eyebrow">{gallery.eyebrow}</span>
          <h3>{gallery.title}</h3>
        </div>
        <div className={`${styles.mosaic} reveal`}>
          {gallery.images.map((img, i) => (
            <ImageSlot
              key={img.src}
              {...img}
              className={i === 0 ? `${styles.tile} ${styles.big}` : styles.tile}
              sizes={i === 0 ? "(max-width: 760px) 100vw, 600px" : "(max-width: 760px) 50vw, 300px"}
            />
          ))}
        </div>

        <div className={`${styles.sub} reveal`}>
          <h3>{gallery.patientsTitle}</h3>
          <p>{gallery.patientsLede}</p>
        </div>
        <div className={styles.patients} data-stagger>
          {gallery.patients.map((img) => (
            <ImageSlot key={img.src} {...img} className="reveal" aspect="1/1" sizes="(max-width: 760px) 50vw, 290px" />
          ))}
        </div>
      </div>
    </section>
  );
}
