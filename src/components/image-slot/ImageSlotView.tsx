"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import styles from "./ImageSlot.module.css";

type Props = {
  src: string;
  exists: boolean;
  label: string;
  size?: string;
  alt: string;
  aspect?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function ImageSlotView({ src, exists, label, size, alt, aspect, sizes, className, priority }: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const showImage = exists && status !== "error";
  const style = aspect ? ({ "--ar": aspect } as CSSProperties) : undefined;

  return (
    <figure
      className={[styles.ph, status === "loaded" && styles.loaded, className].filter(Boolean).join(" ")}
      style={style}
      role="img"
      aria-label={alt || label}
    >
      <span className={styles.inner}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="9" cy="10" r="2" />
          <path d="M21 16l-5-5-8 9" />
        </svg>
        <b>{label}</b>
        <small>
          {src}
          {size ? ` · ${size}` : ""}
        </small>
      </span>
      {showImage && (
        <Image
          src={`/${src}`}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 900px) 100vw, 33vw"}
          priority={priority}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </figure>
  );
}
