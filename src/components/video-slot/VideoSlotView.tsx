"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/motion";
import ph from "../image-slot/ImageSlot.module.css";
import styles from "./VideoSlot.module.css";

export type VideoSource = { src: string; type?: string };

type Props = {
  path: string;
  youTubeId: string | null;
  sources: VideoSource[];
  poster?: string;
  title: string;
  label: string;
  size?: string;
  aspect?: string;
  mode?: "ambient" | "player";
  className?: string;
};

const PlayIcon = () => (
  <span className={styles.play} aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" /></svg>
  </span>
);

/** Plays a muted loop only while it is on screen. */
function AmbientVideo({ sources, poster, title }: Pick<Props, "sources" | "poster" | "title">) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      controls={reduced}
      aria-label={title}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}

export function VideoSlotView({ path, youTubeId, sources, poster, title, label, size, aspect, mode = "player", className }: Props) {
  const [started, setStarted] = useState(false);
  const style = aspect ? ({ "--ar": aspect } as CSSProperties) : undefined;
  const cls = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

  if (youTubeId) {
    const thumb = poster ?? `https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`;
    return (
      <div className={cls(styles.frame, className)} style={style}>
        {started ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.facade}
            style={{ backgroundImage: `url(${thumb})` }}
            aria-label={`Play video: ${title}`}
            onClick={() => setStarted(true)}
          >
            <PlayIcon />
          </button>
        )}
      </div>
    );
  }

  if (sources.length === 0) {
    return (
      <figure className={cls(ph.ph, className)} style={style} role="img" aria-label={`${label} (video coming soon)`}>
        <span className={ph.inner}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M10 9.5v5l4.5-2.5z" />
          </svg>
          <b>{label}</b>
          <small>
            {path}
            {size ? ` · ${size}` : ""}
          </small>
        </span>
      </figure>
    );
  }

  return (
    <div className={cls(styles.frame, className)} style={style}>
      {mode === "ambient" ? (
        <AmbientVideo sources={sources} poster={poster} title={title} />
      ) : (
        <video controls playsInline preload={poster ? "none" : "metadata"} poster={poster} aria-label={title}>
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
