import { AlignerAbout } from "@/components/AlignerAbout";
import { Consultation } from "@/components/Consultation";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HeroAligner } from "@/components/HeroAligner";
import { Journey } from "@/components/Journey";
import { Locations } from "@/components/Locations";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { RevealObserver } from "@/components/RevealObserver";
import { Reviews } from "@/components/Reviews";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SmileGuide } from "@/components/SmileGuide";
import { Team } from "@/components/Team";
import { hero } from "@/content/site";
import styles from "./page.module.css";

/** Section order follows the approved website layout (1–11). */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top">
        {/* 1. Hero: 3D aligner display. On scroll the aligner flies into the aligner section beside it,
            then on down onto the lower teeth in the Journey photo. */}
        <div className={styles.flight}>
          <Hero />
          <AlignerAbout />
          {/* 3. Scroll to see the smile (moved up, right after the aligner section) */}
          <Journey />
          <HeroAligner src={hero.aligner.image} width={hero.aligner.width} height={hero.aligner.height} alt={hero.aligner.alt} model={hero.aligner.model} />
        </div>
        {/* 2. Before & after */}
        <Results />
        {/* 4. Process */}
        <Process />
        {/* 6. Clinic, patients and doctors */}
        <Team />
        {/* 7. Reviews & testimonials */}
        <Reviews />
        {/* 8. FAQs, studios & map */}
        <section id="visit" style={{ paddingTop: 0 }}>
          <div className={`wrap ${styles.two}`}>
            <Faq />
            <Locations />
          </div>
        </section>
        {/* 9. Tips & video tutorials */}
        <SmileGuide />
        {/* 10. Book your session */}
        <Consultation />
      </main>
      {/* 11. Bottom bar */}
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
