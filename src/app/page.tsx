import { Consultation } from "@/components/Consultation";
import { CostCalculator } from "@/components/CostCalculator";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Locations } from "@/components/Locations";
import { PaymentPackages } from "@/components/PaymentPackages";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { RevealObserver } from "@/components/RevealObserver";
import { Reviews } from "@/components/Reviews";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SmileGuide } from "@/components/SmileGuide";
import { SmileReveal } from "@/components/SmileReveal";
import { Team } from "@/components/Team";
import styles from "./page.module.css";

/** Section order follows the approved website layout (1–11). */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top">
        {/* 1. Hero: 3D aligner display */}
        <Hero />
        {/* 2. Before & after */}
        <SmileReveal />
        <Results />
        {/* 3. Scroll to see the smile */}
        <Journey />
        {/* 4. Process */}
        <Process />
        {/* 5. Payment packages */}
        <PaymentPackages />
        <CostCalculator />
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
