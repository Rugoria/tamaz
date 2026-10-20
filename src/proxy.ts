import { NextResponse, type NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE, matchLocale } from "@/lib/i18n";

/**
 * Sends a page request without a language in its path ("/", "/about") to that page in the visitor's language:
 * the one picked in the language switcher (cookie) if any, else the best match for the browser's languages
 * (Accept-Language, which follows the system language by default), else English.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : matchLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url);
  // The answer depends on the visitor's languages and cookie, so caches must not share it.
  res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const config = {
  // Pages only: not the API, Next.js internals, or files (anything with a dot, such as /images/x.jpg or /icon.svg).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
