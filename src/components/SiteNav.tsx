"use client";

import { useEffect, useState } from "react";
import { brand, nav } from "@/content/site";
import { LogoMark } from "./Logo";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className="wrap">
        <a className="logo" href="#top" aria-label={`${brand.name} home`}>
          <LogoMark />
          {brand.name}
        </a>
        <ul id="menu" className={open ? styles.open : undefined} onClick={(e) => (e.target as HTMLElement).tagName === "A" && setOpen(false)}>
          {nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="btn btn-primary" href={nav.cta.href}>
          {nav.cta.label}
        </a>
        <button type="button" className={styles.menuBtn} aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
          Menu
        </button>
      </div>
    </header>
  );
}
