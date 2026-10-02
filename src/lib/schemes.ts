/**
 * Color schemes defined in app/color-schemes.css (values listed in
 * tamaz-handoff/COLOR-SCHEMES.md). "elastic" is the default and needs no attribute.
 */
export const SCHEMES = [
  { id: "elastic", name: "Coral & Aqua", mood: "Current design. Friendly, energetic, all ages.", sw: ["#E9543F", "#2BA8A0", "#0F2438"] },
  { id: "clinical", name: "Clinical Blue", mood: "Trustworthy and medical. Closest to Diamond Braces.", sw: ["#1D6FE8", "#0E8FB3", "#0B1F3A"] },
  { id: "mint", name: "Mint Fresh", mood: "Clean, hygienic, calm. Good for aligner-led practices.", sw: ["#0A8A5F", "#2F7FB8", "#0D2B24"] },
  { id: "ocean", name: "Ocean Teal", mood: "Premium clinical tech. Closest to Ormco.", sw: ["#0F8B8D", "#B7821A", "#0B2F33"] },
  { id: "rose", name: "Blush & Plum", mood: "Warm and fun. Appeals to teens.", sw: ["#D6336C", "#7B4FB8", "#2A1230"] },
  { id: "sunny", name: "Sunny Kids", mood: "Bright and playful. Pediatric and family focus.", sw: ["#FFB400", "#2F6FE0", "#1B2559"] },
  { id: "lavender", name: "Lavender Calm", mood: "Soft and modern. Reassuring for anxious adults.", sw: ["#6A4CF0", "#138A87", "#1D1846"] },
  { id: "sage", name: "Sage & Clay", mood: "Natural and welcoming. Closest to Team Dental.", sw: ["#C0562F", "#3F7A5C", "#1F2E27"] },
  { id: "champagne", name: "Champagne & Charcoal", mood: "Luxury boutique. Adult and cosmetic focus.", sw: ["#8F6524", "#3E6E6A", "#1C1B19"] },
  { id: "graphite", name: "Graphite & Tangerine", mood: "Bold and urban. Stands out from typical dental sites.", sw: ["#F26B1D", "#2F7EC7", "#17181C"] },
] as const;

export type SchemeId = (typeof SCHEMES)[number]["id"];
export type ThemeMode = "light" | "dark";

/** The base palette in globals.css: it needs no html attribute. */
export const DEFAULT_SCHEME: SchemeId = "elastic";
/** The palette the site uses when SITE_SCHEME is not set. */
export const SITE_DEFAULT_SCHEME: SchemeId = "clinical";
// Renamed when Clinical Blue became the site palette, so picks saved before then are ignored.
export const SCHEME_KEY = "tamaz-scheme-v2";
export const MODE_KEY = "tamaz-mode";

export const isSchemeId = (v: unknown): v is SchemeId => SCHEMES.some((s) => s.id === v);

/** Production scheme from SITE_SCHEME (server only); falls back to Clinical Blue. */
export function siteScheme(): SchemeId {
  const v = process.env.SITE_SCHEME;
  return isSchemeId(v) ? v : SITE_DEFAULT_SCHEME;
}

/** The html attribute for a scheme; the default scheme uses none. */
export const schemeAttr = (id: SchemeId) => (id === DEFAULT_SCHEME ? undefined : id);

export const showSchemePicker = process.env.NEXT_PUBLIC_SHOW_SCHEME_PICKER === "true";
