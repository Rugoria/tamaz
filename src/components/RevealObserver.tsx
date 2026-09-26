"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Fades/slides `.reveal` elements in once as they enter the viewport.
 * Only elements that start below the fold are hidden, so nothing above the fold flashes.
 * Children of a `[data-stagger]` grid get a small cascading delay.
 */
export function RevealObserver() {
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("pending");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((n, i) => {
      if (n.getBoundingClientRect().top > window.innerHeight) {
        n.classList.add("pending");
        n.style.transitionDelay = (n.closest("[data-stagger]") ? (i % 3) * 90 : 0) + "ms";
        io.observe(n);
      }
    });
    return () => io.disconnect();
  }, []);
  return null;
}
