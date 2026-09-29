import { hero } from "@/content/site";
import { publicFileExists } from "@/lib/publicFile";
import { HeroAligner } from "./HeroAligner";
import { HeroSmileCard } from "./HeroSmileCard";
import { VideoSlot } from "./video-slot/VideoSlot";
import styles from "./Hero.module.css";

const WAVY = "M2 10 Q 27 -4 52 10 T 102 10 T 152 10 T 198 10";
const STRAIGHT = "M2 10 Q 27 10 52 10 T 102 10 T 152 10 T 198 10";

export function Hero() {
  const hasVideo = hero.aligner.sources.some(publicFileExists);
  const hasImage = publicFileExists(hero.aligner.image);
  return (
    <section className={styles.hero}>
      <svg className={styles.arcs} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-100 720 Q600 -80 1300 720" />
        <path d="M-60 720 Q600 20 1260 720" />
        <path d="M-20 720 Q600 120 1220 720" />
        <path d="M20 720 Q600 220 1180 720" />
        <path d="M60 720 Q600 320 1140 720" />
        <path d="M100 720 Q600 420 1100 720" />
      </svg>
      <div className="wrap">
        <div>
          <span className={`eyebrow ${styles.rise}`}>{hero.eyebrow}</span>
          <h1 className={`${styles.rise} ${styles.d1}`}>
            {hero.headlineBefore}{" "}
            <span className={styles.w}>
              {hero.headlineWord}
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                <path d={WAVY}>
                  <animate
                    attributeName="d"
                    begin="0.9s"
                    dur="1.6s"
                    fill="freeze"
                    calcMode="spline"
                    keySplines=".6 0 .2 1"
                    values={`${WAVY};${STRAIGHT}`}
                  />
                </path>
              </svg>
            </span>{" "}
            {hero.headlineAfter}
          </h1>
          <p className={`lede ${styles.rise} ${styles.d2}`}>{hero.lede}</p>
          <div className={`${styles.cta} ${styles.rise} ${styles.d3}`}>
            <a className="btn btn-primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label} <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
          <div className={`${styles.trust} ${styles.rise} ${styles.d4}`}>
            {hero.trust.map((t) => (
              <div key={t.value}>
                <b>{t.value}</b>
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.rise} ${styles.d2}`} style={{ position: "relative" }}>
          {hasVideo ? (
            <VideoSlot
              src={hero.aligner.sources}
              poster={hero.aligner.image}
              title={hero.aligner.title}
              label="Hero aligner render"
              aspect="6/5"
              mode="ambient"
              className={styles.aligner}
            />
          ) : hasImage ? (
            <HeroAligner src={hero.aligner.image} alt={hero.aligner.alt} />
          ) : (
            <HeroSmileCard />
          )}
          <div className={`${styles.chip} ${styles.c1}`}>
            <b>{hero.chips.duration}</b> {hero.chips.durationLabel}
          </div>
          <div className={`${styles.chip} ${styles.c2}`}>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <circle cx="11" cy="11" r="10" fill="var(--aqua-soft)" />
              <path d="M6.5 11.5l3 3 6-6.5" stroke="var(--aqua)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>{" "}
            {hero.chips.scan}
          </div>
        </div>
      </div>
    </section>
  );
}
