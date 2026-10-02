import styles from "./Hero.module.css";

/** The aligner shown in front of the wordmark is HeroAligner, rendered by the page in a layer that also spans AlignerAbout. */
export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <h1 className={styles.brand}>tamaz</h1>
    </section>
  );
}
