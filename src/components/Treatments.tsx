import type { ReactNode } from "react";
import { treatments, type Treatment } from "@/content/site";
import { SectionHead } from "./SectionHead";
import styles from "./Treatments.module.css";

const ICONS: Record<Treatment["icon"], ReactNode> = {
  metal: (
    <>
      <rect x="9" y="10" width="18" height="16" rx="3.5" fill="#A9B4C0" />
      <rect x="9" y="16.6" width="18" height="2.8" fill="#6E7A88" />
      <path d="M2 18 Q18 14 34 18" stroke="#8B97A5" strokeWidth="2" fill="none" />
      <rect x="7" y="8" width="22" height="20" rx="8" fill="none" stroke="var(--accent)" strokeWidth="2.6" />
    </>
  ),
  ceramic: (
    <>
      <rect x="9" y="10" width="18" height="16" rx="3.5" fill="#F4EFE6" stroke="#D8CFBE" />
      <rect x="9" y="16.6" width="18" height="2.8" fill="#E1D8C8" />
      <path d="M2 18 Q18 14 34 18" stroke="#E9EEF2" strokeWidth="2" fill="none" />
      <rect x="7" y="8" width="22" height="20" rx="8" fill="none" stroke="#D5DCE3" strokeWidth="2.6" />
    </>
  ),
  aligners: (
    <>
      <path d="M5 12 Q18 6 31 12 L30 22 Q18 30 6 22 Z" fill="none" stroke="var(--aqua)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M9 13 v7 M14 11 v9.5 M18 10.5 v10 M22 11 v9.5 M27 13 v7" stroke="var(--aqua)" strokeWidth="1.4" opacity=".5" />
    </>
  ),
  selfLigating: (
    <>
      <rect x="9" y="10" width="18" height="16" rx="3.5" fill="#A9B4C0" />
      <path d="M11 13 h14 v3 h-14z" fill="#6E7A88" />
      <path d="M2 18 Q18 14 34 18" stroke="#8B97A5" strokeWidth="2" fill="none" />
      <path d="M11 20 h14" stroke="#EEF2F6" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  phase1: (
    <>
      <circle cx="18" cy="14" r="7" fill="none" stroke="var(--accent)" strokeWidth="2.4" />
      <path d="M8 31 q10 -12 20 0" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M15 15.5 q3 2.5 6 0" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  retainers: (
    <>
      <path d="M9 12 Q18 7 27 12 v4 Q18 20 9 16 z" fill="none" stroke="var(--aqua)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M9 24 Q18 20 27 24 v2 Q18 30 9 26z" fill="none" stroke="var(--aqua)" strokeWidth="2.2" strokeLinejoin="round" />
    </>
  ),
};

export function Treatments() {
  return (
    <section id="treatments">
      <div className="wrap">
        <SectionHead eyebrow={treatments.eyebrow} title={treatments.title} lede={treatments.lede} />
        <div className={styles.grid} data-stagger>
          {treatments.items.map((t) => (
            <article key={t.title} className={`${styles.treat} reveal`}>
              <div className={styles.ic}>
                <svg viewBox="0 0 36 36" aria-hidden="true">{ICONS[t.icon]}</svg>
              </div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <div className={styles.meta}>
                <span className="tag">{t.duration}</span>
                <span className="tag">{t.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
