import { getLocale, getSiteContent } from "@/content/server";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoTagline, LogoWord } from "./Logo";
import styles from "./Hero.module.css";

/** The aligner shown in front of the wordmark is HeroAligner, rendered by the page in a layer that also spans AlignerAbout. */
export async function Hero() {
  const locale = await getLocale();
  const { brand, hero, ui } = await getSiteContent();
  return (
    <section id="hero" className={styles.hero}>
      {/* The nav (with its own language menu) stays hidden until the hero has scrolled away. */}
      <LanguageSwitcher className={styles.lang} locale={locale} label={ui.language} />
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
