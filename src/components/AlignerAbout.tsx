import Image from "next/image";
import { alignerAbout, hero, journey } from "@/content/site";
import { Copy } from "./Tbd";
import styles from "./AlignerAbout.module.css";

/**
 * Aligner on the left, product copy on the right. The left column is an empty landing slot:
 * the hero aligner (HeroAligner) flies into `#aligner-slot` as the page scrolls.
 */
export function AlignerAbout() {
  const { image, width, height } = hero.aligner;
  const points = [
    ...alignerAbout.points,
    { title: `${journey.appliances.aligners.average} on average`, body: alignerAbout.durationBody },
  ];
  return (
    <section id="aligners">
      <div className={`wrap ${styles.grid}`}>
        <div id="aligner-slot" className={styles.slot}>
          {/* Only shown under reduced motion, when the hero aligner stays in the hero. */}
          <Image className={styles.still} src={`/${image}`} alt="" width={width} height={height} sizes="(max-width: 900px) 92vw, 560px" />
        </div>
        <div className={`${styles.copy} reveal`}>
          <span className="eyebrow">{alignerAbout.eyebrow}</span>
          <h2>{alignerAbout.title}</h2>
          <p className="lede">
            <Copy text={alignerAbout.lede} />
          </p>
          <ul className={styles.points}>
            {points.map((p) => (
              <li key={p.title}>
                <b>
                  <Copy text={p.title} />
                </b>
                <span>
                  <Copy text={p.body} />
                </span>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary" href={alignerAbout.cta.href}>
            {alignerAbout.cta.label} <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
