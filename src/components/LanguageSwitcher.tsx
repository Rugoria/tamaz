"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { LOCALE_COOKIE, LOCALE_NAMES, LOCALES, type Locale } from "@/lib/i18n";
import styles from "./LanguageSwitcher.module.css";

type Props = { locale: Locale; label: string; className?: string };

/**
 * Language menu: the current language's code on a button, and a list of the site's languages, each in its own
 * name. Picking one opens the same page in that language (keeping the section in view) and saves the choice,
 * so it wins over the browser's language on later visits.
 */
export function LanguageSwitcher({ locale, label, className }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const pathname = usePathname();
  // "/fr/about" → "/about": the page without its language.
  const rest = pathname.replace(/^\/[^/]+/, "");

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      root.current?.querySelector("button")?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (l: Locale) => (e: MouseEvent<HTMLAnchorElement>) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    e.currentTarget.href = `/${l}${rest}${window.location.hash}`;
  };

  return (
    <div ref={root} className={`${styles.switcher} ${className ?? ""}`}>
      <button type="button" className={styles.btn} aria-expanded={open} aria-controls={listId} aria-label={`${label}: ${LOCALE_NAMES[locale]}`} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
        <span>{locale.toUpperCase()}</span>
      </button>
      <ul id={listId} className={styles.list} hidden={!open}>
        {LOCALES.map((l) => (
          <li key={l}>
            <a href={`/${l}${rest}`} lang={l} hrefLang={l} aria-current={l === locale ? "true" : undefined} onClick={pick(l)}>
              {LOCALE_NAMES[l]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
