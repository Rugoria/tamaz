import { AlignerAbout } from "@/components/AlignerAbout";
import { Clinics } from "@/components/Clinics";
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
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { preload } from "react-dom";
import { getLocale, getSiteContent } from "@/content/server";
import styles from "./page.module.css";

/** Section order follows the approved website layout (1–11). */
export default async function Home() {
  const locale = await getLocale();
  const { brand, hero, journey, nav, ui } = await getSiteContent();
  // Start the 3D aligner's download with the page (HeroAligner fetches the same file once it runs). Skipped under
  // reduced motion, where the model is never shown.
  preload(`/${hero.aligner.model}`, { as: "fetch", crossOrigin: "anonymous", media: "(prefers-reduced-motion: no-preference)" });
  return (
    <>
      <SiteNav locale={locale} brand={brand.name} nav={nav} ui={ui} />
      <main id="top">
        {/* 1. Hero: 3D aligner display. On scroll the aligner flies into the aligner section beside it,
            then on down onto the lower teeth in the Journey photo. */}
        <div className={styles.flight}>
          <Hero />
          <AlignerAbout />
          {/* 3. Scroll to see the smile (moved up, right after the aligner section) */}
          <Journey journey={journey} ui={ui} />
          <HeroAligner src={hero.aligner.image} width={hero.aligner.width} height={hero.aligner.height} alt={hero.aligner.alt} model={hero.aligner.model} />
        </div>
        {/* 2. Before & after */}
        <Results />
        {/* 4. Process */}
        <Process />
        {/* For clinics (B2B): dentists and orthodontists offering tamaz aligners */}
        <Clinics />
        {/* 7. Reviews */}
        <Reviews />
        {/* 8. FAQs, studios & map */}
        <section id="visit" style={{ paddingTop: 0 }}>
          <div className={`wrap ${styles.two}`}>
            <Faq />
            <Locations />
          </div>
        </section>
        {/* 10. Book your session */}
        <Consultation />
      </main>
      {/* 11. Bottom bar */}
      <SiteFooter />
      <WhatsAppButton />
      <RevealObserver />
    </>
  );
}
