import type { Locale } from "@/lib/i18n";
import { content, type SiteContent } from "./site";
import { ar } from "./locales/ar";
import { es } from "./locales/es";
import { fr } from "./locales/fr";

/** A translation: the same shape as the English copy, every part optional (missing text falls back to English). */
export type Translation = DeepPartial<SiteContent>;
type DeepPartial<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

const translations: Record<Exclude<Locale, "en">, Translation> = { es, fr, ar };

/** Lays `over` onto `base`: objects key by key, arrays item by item; anything `over` leaves out stays as in `base`. */
function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    const items = over as unknown[];
    return base.map((b, i) => merge(b, items[i])) as T;
  }
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge(out[k], v);
    return out as T;
  }
  return over as T;
}

const cache = new Map<Locale, SiteContent>();

/** All of the site's copy in the given language. */
export function getContent(locale: Locale): SiteContent {
  let c = cache.get(locale);
  if (!c) {
    c = locale === "en" ? content : merge(content, translations[locale]);
    cache.set(locale, c);
  }
  return c;
}
