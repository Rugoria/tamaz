import { whatsapp } from "@/content/site";
import { LogoMark } from "./Logo";
import styles from "./WhatsAppButton.module.css";

/** Floating button, bottom right: the tamaz tooth, opening a WhatsApp chat with the practice. */
export function WhatsAppButton() {
  return (
    <a className={styles.fab} href={`https://wa.me/${whatsapp.number}`} target="_blank" rel="noopener noreferrer" aria-label={whatsapp.label} title={whatsapp.label}>
      <LogoMark className={styles.mark} />
    </a>
  );
}
