import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Copy } from "@/components/Tbd";
import { getLocale, getSiteContent } from "@/content/server";
import { fill, localize } from "@/lib/i18n";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { aboutPage, brand } = await getSiteContent();
  return { title: `${aboutPage.metaTitle} · ${brand.name}` };
}

/** The aligner section's copy in full; on phones the home page shows a short version and links here. */
export default async function About() {
  const locale = await getLocale();
  const { aboutPage, alignerAbout, brand, hero, journey, ui } = await getSiteContent();
  const { image, width, height, alt } = hero.aligner;
  const points = [
    ...alignerAbout.points,
    { title: fill(ui.onAverage, { average: journey.appliances.aligners.average }), body: alignerAbout.durationBody },
  ];
  return (
    <>
      <header className={styles.bar}>
        <div className="wrap">
          <Link className="logo" href={localize(locale, "/")} aria-label={fill(ui.home, { brand: brand.name })}>
            <Logo />
          </Link>
          <Link className={styles.back} href={localize(locale, aboutPage.back.href)}>
            <span className="arr-back" aria-hidden="true">←</span> {aboutPage.back.label}
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
              <Link className="btn btn-primary" href={localize(locale, `/${alignerAbout.cta.href}`)}>
                {alignerAbout.cta.label} <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
