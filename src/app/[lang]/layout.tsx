import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import { SchemePicker } from "@/components/SchemePicker";
import { getLocale, getSiteContent } from "@/content/server";
import { dirOf, LOCALES, OG_LOCALES } from "@/lib/i18n";
import { MODE_KEY, SCHEME_KEY, SCHEMES, schemeAttr, showSchemePicker, siteScheme } from "@/lib/schemes";
import "../globals.css";
import "../color-schemes.css";

const display = Bricolage_Grotesque({
  variable: "--display",
  subsets: ["latin"],
  axes: ["opsz"],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const body = Figtree({
  variable: "--body",
  subsets: ["latin"],
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

/* Arabic pages only (globals.css switches the text fonts to it under lang="ar"); not preloaded elsewhere. */
const arabic = IBM_Plex_Sans_Arabic({
  variable: "--arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
  adjustFontFallback: false,
});

const mono = JetBrains_Mono({
  variable: "--mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  adjustFontFallback: false,
});

/** One copy of the site per language: /en, /es, /fr, /ar. Any other first segment is a 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { brand } = await getSiteContent();
  return {
    title: brand.name,
    description: brand.description,
    alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])) },
    openGraph: {
      title: brand.name,
      description: brand.description,
      siteName: brand.name,
      type: "website",
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Colors never follow the browser or OS setting.
  colorScheme: "only light",
  themeColor: "#F3F7FC", // Clinical Blue --bg
};

// Review builds only: restore the palette chosen in the picker before first paint.
const restoreScheme = `try{var r=document.documentElement,s=localStorage.getItem(${JSON.stringify(SCHEME_KEY)}),m=localStorage.getItem(${JSON.stringify(MODE_KEY)});if(${JSON.stringify(SCHEMES.map((x) => x.id))}.indexOf(s)>-1){s==="elastic"?r.removeAttribute("data-scheme"):r.setAttribute("data-scheme",s)}if(m==="light"||m==="dark")r.setAttribute("data-theme",m)}catch(e){}`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const scheme = siteScheme();
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${display.variable} ${body.variable} ${mono.variable} ${arabic.variable}`}
      data-scheme={schemeAttr(scheme)}
      suppressHydrationWarning={showSchemePicker}
    >
      {showSchemePicker && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: restoreScheme }} />
        </head>
      )}
      <body suppressHydrationWarning>
        {children}
        {showSchemePicker && <SchemePicker initialScheme={scheme} />}
      </body>
    </html>
  );
}
