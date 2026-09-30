import { hero } from "@/content/site";
import { HeroAligner } from "./HeroAligner";
import styles from "./Hero.module.css";

export function Hero() {
  const { image, width, height, alt } = hero.aligner;
  return (
    <section id="hero" className={styles.hero}>
      <h1 className={styles.brand}>tamaz</h1>
      <HeroAligner src={image} width={width} height={height} alt={alt} />
    </section>
  );
}
