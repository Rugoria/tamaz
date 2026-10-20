import { getSiteContent } from "@/content/server";
import { fill } from "@/lib/i18n";
import { publicFileExists } from "@/lib/publicFile";
import { CompareSlider } from "./CompareSlider";
import { ImageSlot } from "./image-slot/ImageSlot";
import { SectionHead } from "./SectionHead";
import { VideoSlot } from "./video-slot/VideoSlot";
import styles from "./Results.module.css";

const SIZES = "(max-width: 900px) 100vw, 380px";

export async function Results() {
  const { results, ui } = await getSiteContent();
  return (
    <section id="results">
      <div className="wrap">
        <SectionHead eyebrow={results.eyebrow} title={results.title} lede={results.lede} />
        <div className={styles.grid} data-stagger>
          {results.cases.map((c, i) => (
            <div key={i} className="reveal">
              {c.video && publicFileExists(c.video) ? (
                <VideoSlot
                  src={c.video}
                  poster={c.after.src}
                  title={fill(ui.caseClipTitle, { n: i + 1, title: c.title })}
                  label={fill(ui.caseClip, { n: i + 1 })}
                  aspect="4/3"
                  mode="ambient"
                />
              ) : (
                <CompareSlider
                  label={fill(ui.compare, { n: i + 1 })}
                  beforeLabel={ui.before}
                  afterLabel={ui.after}
                  before={<ImageSlot className={styles.layer} {...c.before} size="1200 × 900" sizes={SIZES} />}
                  after={<ImageSlot className={styles.layer} {...c.after} size="1200 × 900" sizes={SIZES} />}
                />
              )}
              <div className={styles.cap}>
                <b>{c.title}</b>
                <span>{c.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
