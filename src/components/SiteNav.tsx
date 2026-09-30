"use client";

import { useEffect, useState } from "react";
import { brand, nav } from "@/content/site";
import { LogoMark } from "./Logo";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  // Stay hidden until the hero has scrolled completely out of view.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => {
      const past = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
      setShown(past);
      if (!past) setOpen(false);
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header className={`${styles.nav} ${shown ? styles.shown : ""}`}>
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
