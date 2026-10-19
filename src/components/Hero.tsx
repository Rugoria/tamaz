import { brand, hero } from "@/content/site";
import { LogoTagline, LogoWord } from "./Logo";
import styles from "./Hero.module.css";

/** The aligner shown in front of the wordmark is HeroAligner, rendered by the page in a layer that also spans AlignerAbout. */
export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.title}>
        <h1 className={styles.brand}>
          <LogoWord label={brand.name} />
        </h1>
        <p className={styles.tagline}>
          <LogoTagline label={hero.tagline} />
        </p>
      </div>
    </section>
  );
}
