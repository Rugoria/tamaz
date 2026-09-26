import { BandStudio } from "@/components/BandStudio";
import { Consultation } from "@/components/Consultation";
import { CostCalculator } from "@/components/CostCalculator";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Locations } from "@/components/Locations";
import { PromoBar } from "@/components/PromoBar";
import { Results } from "@/components/Results";
import { RevealObserver } from "@/components/RevealObserver";
import { Reviews } from "@/components/Reviews";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SmileGuide } from "@/components/SmileGuide";
import { StudioGallery } from "@/components/StudioGallery";
import { Team } from "@/components/Team";
import { Technology } from "@/components/Technology";
import { TreatmentMarquee } from "@/components/TreatmentMarquee";
import { Treatments } from "@/components/Treatments";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <PromoBar />
      <SiteNav />
      <main id="top">
        <Hero />
        <TreatmentMarquee />
        <Treatments />
        <Team />
        <Results />
        <Journey />
        <BandStudio />
        <Technology />
        <CostCalculator />
        <StudioGallery />
        <Reviews />
        <section id="visit" style={{ paddingTop: 0 }}>
          <div className={`wrap ${styles.two}`}>
            <Locations />
            <Faq />
          </div>
        </section>
        <SmileGuide />
        <Consultation />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
