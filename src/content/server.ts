import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale, type Locale } from "@/lib/i18n";
import { getContent } from "./index";

/** The current page's language (the `[lang]` route segment). Server Components only. */
export async function getLocale(): Promise<Locale> {
  const l = await lang();
  if (!isLocale(l)) notFound();
  return l;
}

/** The copy for the current page's language. Server Components only. */
export async function getSiteContent() {
  return getContent(await getLocale());
}
