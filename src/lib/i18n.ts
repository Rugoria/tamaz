/**
 * The site's languages. Safe to import anywhere (no content in it). English is the default; a visitor without a
 * saved choice gets the language their browser or system asks for (see src/proxy.ts), English when none match.
 */
export const LOCALES = ["en", "es", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** The language picked in the switcher; it wins over the browser's language on later visits. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Each language in its own name, for the switcher. */
export const LOCALE_NAMES: Record<Locale, string> = { en: "English", es: "Español", fr: "Français", ar: "العربية" };

/** Open Graph locale per language. */
export const OG_LOCALES: Record<Locale, string> = { en: "en_US", es: "es_ES", fr: "fr_FR", ar: "ar_AR" };

export const isLocale = (value: string | undefined | null): value is Locale => LOCALES.includes(value as Locale);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** A site path in the given language: "/about" → "/fr/about", "/#consult" → "/fr#consult". Hashes and URLs pass through. */
export function localize(locale: Locale, href: string) {
  if (!href.startsWith("/")) return href;
  const rest = href === "/" ? "" : href.startsWith("/#") ? href.slice(1) : href;
  return `/${locale}${rest}`;
}

/** Fills `{key}` parts of a template. */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));

/**
 * Picks the best supported language from an Accept-Language header ("fr-CA,fr;q=0.9,en;q=0.8"): the highest
 * weighted language whose primary tag (fr-CA → fr) is supported, else the default.
 */
export function matchLocale(header: string | null | undefined): Locale {
  if (!header) return DEFAULT_LOCALE;
  const ranked = header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.trim().toLowerCase().split("-")[0], q: q ? Number(q.slice(2)) || 0 : 1, i };
    })
    .filter((x) => x.lang && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  return ranked.map((x) => x.lang).find(isLocale) ?? DEFAULT_LOCALE;
}
