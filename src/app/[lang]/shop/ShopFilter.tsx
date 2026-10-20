"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./page.module.css";

type Props = { label: string; categories: { id: string; label: string }[]; children: ReactNode };

/**
 * The category tabs and the part of the shop they filter. Sections and cards inside mark their categories with
 * `data-cats` ("aligners", "accessories", …); the page's CSS hides whatever is not in the picked category, so
 * the content itself stays server-rendered. A link to /shop#retainers (or any category id) opens on that tab.
 */
export function ShopFilter({ label, categories, children }: Props) {
  const [active, setActive] = useState("all");

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (categories.some((c) => c.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [categories]);

  return (
    <>
      <div className="wrap">
        <div className={styles.tabs} role="group" aria-label={label}>
          {categories.map((c) => (
            <button key={c.id} type="button" className="chipbtn" aria-pressed={c.id === active} aria-controls="shop-catalog" onClick={() => setActive(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div id="shop-catalog" className={styles.catalog} data-filter={active}>
        {children}
      </div>
    </>
  );
}
