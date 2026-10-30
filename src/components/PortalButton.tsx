import { getSiteContent } from "@/content/server";
import styles from "./PortalButton.module.css";

/** Floating button, bottom left: a stethoscope and "Doctor Portal", opening the tamaz portal for dentists. */
export async function PortalButton() {
  const { portal } = await getSiteContent();
  return (
    <a className={styles.fab} href={portal.url} target="_blank" rel="noopener noreferrer">
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3H4a1 1 0 0 0-1 1v5a5 5 0 0 0 10 0V4a1 1 0 0 0-1-1h-1" />
          <path d="M8 14v1.5a5.5 5.5 0 0 0 11 0V13" />
          <circle cx="19" cy="11" r="2" />
        </svg>
      </span>
      <span className={styles.label}>{portal.label}</span>
    </a>
  );
}
