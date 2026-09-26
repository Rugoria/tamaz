import type { ReactNode } from "react";

/** Highlights content that still needs to be written (yellow + dashed underline). */
export function Tbd({ children }: { children: ReactNode }) {
  return <span className="tbd">{children}</span>;
}

/**
 * Renders a copy string from content/site.ts, wrapping every [bracketed]
 * placeholder in <Tbd>. Once the brackets are replaced, the highlight goes away.
 */
export function Copy({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 ? <Tbd key={i}>{part}</Tbd> : part || null));
}

