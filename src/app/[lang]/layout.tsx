import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { SchemePicker } from "@/components/SchemePicker";
import { brand } from "@/content/site";
import { MODE_KEY, SCHEME_KEY, SCHEMES, schemeAttr, showSchemePicker, siteScheme } from "@/lib/schemes";
import "./globals.css";
import "./color-schemes.css";

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

const mono = JetBrains_Mono({
  variable: "--mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: brand.name,
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    siteName: brand.name,
    type: "website",
    locale: "en_US",
  },
};

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  const scheme = siteScheme();
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
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
