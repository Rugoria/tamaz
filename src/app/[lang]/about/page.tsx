import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Copy } from "@/components/Tbd";
import { aboutPage, alignerAbout, brand, hero, journey } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `${aboutPage.metaTitle} · ${brand.name}`,
};

/** The aligner section's copy in full; on phones the home page shows a short version and links here. */
export default function About() {
  const { image, width, height, alt } = hero.aligner;
  const points = [
    ...alignerAbout.points,
    { title: `${journey.appliances.aligners.average} on average`, body: alignerAbout.durationBody },
  ];
  return (
    <>
      <header className={styles.bar}>
        <div className="wrap">
          <Link className="logo" href="/" aria-label={`${brand.name} home`}>
            <Logo />
          </Link>
          <Link className={styles.back} href={aboutPage.back.href}>
            <span aria-hidden="true">←</span> {aboutPage.back.label}
          </Link>
        </div>
      </header>
      <main>
        <section className={styles.about}>
          <div className={`wrap ${styles.grid}`}>
            <Image className={styles.image} src={`/${image}`} alt={alt} width={width} height={height} priority sizes="(max-width: 900px) 92vw, 520px" />
            <div className={styles.copy}>
              <span className="eyebrow">{alignerAbout.eyebrow}</span>
              <h1>{alignerAbout.title}</h1>
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
              <Link className="btn btn-primary" href={`/${alignerAbout.cta.href}`}>
                {alignerAbout.cta.label} <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
