# Build the tamaz orthodontics website in Next.js

You are implementing a finished, approved design. The complete working reference is
`reference/tamaz-reference.html` (a single self-contained HTML/CSS/JS file). Open it in a
browser and read its source before writing any code. Match its layout, copy, colors,
typography, motion and interactions. Do not redesign.

The brand name is **tamaz** — always lowercase, used on its own (never "tamaz Orthodontics").

---

## 1. Stack and setup

- Next.js (latest stable) with the **App Router**, **TypeScript**, React Server Components by default.
- If this repo already has a Next.js app, build inside it and follow its conventions
  (Tailwind vs CSS Modules, folder layout, lint rules). If starting fresh:
  `npx create-next-app@latest` with TypeScript, ESLint, App Router, `src/` dir, and **no Tailwind**
  (port the reference CSS into CSS Modules + one global tokens file; it's already written and tuned).
- No animation library is required. The reference uses plain SVG, CSS keyframes,
  `requestAnimationFrame` and `IntersectionObserver`; port that logic into hooks/components.
  Only add `framer-motion` if it clearly simplifies something, and keep behavior identical.
- Fonts via `next/font/google`: **Bricolage Grotesque** (display, variable opsz/wght),
  **Figtree** (body), **JetBrains Mono** (data/labels). Expose them as CSS variables
  `--display`, `--body`, `--mono`.
- Images via `next/image`, served from `public/images/`.

## 2. Design tokens (put in `src/app/globals.css`)

Copy the `:root` block, the `@media (prefers-color-scheme: dark)` block and the
`:root[data-theme="dark"]` block from the reference verbatim. Key values:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | #F4F7F8 | #0A1520 | page background |
| `--surface` | #FFFFFF | #112131 | cards |
| `--surface-2` | #E9F0F2 | #16293B | tinted panels |
| `--ink` | #0F2438 | #E7EEF2 | text |
| `--muted` | #566879 | #94A6B5 | secondary text |
| `--line` | #D6E0E5 | #223749 | borders |
| `--accent` | #E9543F | #FF6F58 | elastic coral, primary CTA |
| `--aqua` | #2BA8A0 | #53CFC5 | aligner aqua, eyebrows |
| `--deep` | #0F2438 | #07111A | dark bands (marquee, journey, results cards) |

Keep `prefers-reduced-motion` handling: all animations off, hero shows the final aligned state.

## 3. Page structure (single route `/`, split into components)

Create `src/components/` with one component per section, in this order:

1. `PromoBar` — top announcement with `[Current offer]` / `[date]` placeholders.
2. `SiteNav` — sticky, blurred background, border appears after scroll, mobile "Menu" toggle
   (client component). Links: Treatments, Our team, Results, Your journey, Cost, Locations; CTA "Book free consult".
3. `Hero` — headline with the word "millimeter" underlined by a wavy SVG line that animates
   to straight (SMIL `<animate>` or CSS), animated background arcs, trust row, and the
   **animated smile card** (see §4) with Before/After toggle and live readouts
   (Crowding mm, Midline gap mm, Max rotation °), two floating chips.
4. `TreatmentMarquee` — infinite horizontal scroll, pauses on hover, duplicated track.
5. `Treatments` — 6 cards (metal, ceramic, aligners, self-ligating, Phase 1, retainers)
   with icon SVGs, duration + price tags, hover lift.
6. `Team` — 3 doctor cards with portrait image slots and `[placeholder]` text.
7. `Results` — 3 before/after comparison sliders (drag handle; wiggle once when first in view).
8. `Journey` — the scroll-driven 18-month timeline (see §4). Section height ≈ 460vh with a
   sticky 100svh panel.
9. `BandStudio` — elastic band color picker: slots A/B, 10 swatches, patterns
   Solid / Alternate / Split sides / Rainbow, click a single band to paint it.
10. `Technology` — 3D-scan point-cloud animation card + 3 feature rows.
11. `CostCalculator` — treatment segmented control, down-payment slider, months slider,
    insurance checkbox → monthly payment. Insurance logo placeholder strip below.
12. `StudioGallery` — 5-image mosaic.
13. `Reviews` — 3 testimonial cards.
14. `Locations` + `Faq` — 4 studio cards (placeholders), map image slot, `<details>` accordion.
15. `SmileGuide` — 3 article cards with images.
16. `Consultation` — booking form (see §6).
17. `SiteFooter` — 4 columns, social icons, legal links, `[license no.]` placeholder.

Put all copy, prices, doctors, studios, reviews, FAQs and articles in
`src/content/site.ts` as typed data so non-developers can edit them in one place.

## 4. The motion centerpiece: `<Smile />`

Port the `Smile(svg)` function from the reference into a reusable client component
`src/components/smile/Smile.tsx` plus a pure geometry module `smileGeometry.ts`.

Props:
```ts
type SmileProps = {
  t: number;          // 0 = crowded, 1 = aligned
  bracket: number;    // 0..1 brackets/wire/bands visibility (wire draws in via stroke-dashoffset)
  ghost?: number;     // 0..1 dashed target-position outlines
  scanY?: number;     // -1 hidden, else 0..1 scan-beam position
  bandColors: string[]; // 12 entries, molars ignored
  onBandClick?: (index: number) => void;
};
```
Keep exactly: the 12 upper teeth `SPEC` (widths/heights/types), the `CROOK` offsets,
the smile-arc formula `top = 86 + 0.00028 * dx²`, per-tooth stagger by rank, the
scalloped gum path, lower teeth, lens-shaped mouth clip, Catmull-Rom wire through the
bracket centres, and the gradient defs (generate unique ids with `useId()`).

Update the SVG by setting attributes in a `useLayoutEffect`/ref loop rather than
re-rendering React on every animation frame (60fps scroll must stay smooth).

Usage:
- **Hero**: on mount, animate bracket 0→1 then t 0→1 over ~4.2s (easeInOutCubic).
  Before/After buttons animate back and forth. Readouts derive from t.
- **Journey**: progress `p` = scroll through the section. Stage ranges:
  Scan 0–.12 (scan beam sweeps), Plan .12–.22 (ghost fades in), Bond .22–.32 (brackets on),
  Align .32–.80 (t 0→1), Detail .80–.90, Retain .90–1 (brackets off).
  Show month label, stage name, progress bar, crowding, visits, % complete, and highlight the
  active stage in the ordered list. Throttle with `requestAnimationFrame`.
- **BandStudio**: static aligned smile, interactive bands.

## 5. Image slots with placeholders

Create `<ImageSlot src label size alt aspect />`:
- Renders a striped, dashed-border placeholder with a shimmer, an image icon, the label,
  and `src · size` text.
- If the file exists in `public/images/`, render `next/image` (fill, `object-fit: cover`)
  with a fade/scale-in, and hide the placeholder. Use `onError` to fall back to the placeholder.

Required files are listed in `reference/images/IMAGE-LIST.txt` (doctor-1..3, case-1..3
before/after, studio-1..5, map, blog-1..3). Create `public/images/` with a README listing them.

Text placeholders: wrap them in a `<Tbd>` component that renders the yellow highlight with dashed underline
(`.tbd` style in the reference), so remaining content is easy to spot.

## 6. Consultation form

- Client component with validation (first name + phone required, inline error text, focus first invalid field).
- Submit to a Next.js **Route Handler** `src/app/api/consultation/route.ts` that validates with
  `zod`, then (for now) logs the request and returns `{ ok: true }`. Leave a clear TODO for the
  real destination (email/CRM). Show a success message in the form on `ok`.
- Studio dropdown options come from `site.ts`.

## 7. Quality bar / acceptance criteria

- `npm run build` passes with no type or lint errors.
- Visually matches the reference at 1440px, 1024px, 768px and 390px widths; no horizontal scroll on the page body.
- Light and dark mode both correct (follow `prefers-color-scheme`).
- `prefers-reduced-motion`: no looping/scroll animations; hero shows the aligned state.
- Keyboard: visible focus states, menu toggle has `aria-expanded`, before/after sliders are
  `<input type="range">` with labels, toggles use `aria-pressed`.
- Scroll-reveal: elements below the fold fade/slide in once; nothing above the fold starts hidden.
- Metadata in `app/layout.tsx`: title "tamaz", description, Open Graph, `lang="en"`.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on the home page.

## 8. Deliverables

- The working Next.js page at `/`.
- `src/content/site.ts` holding all editable content.
- A short `README.md` section: how to run, where to put images, where to edit content,
  and a checklist of every remaining `[placeholder]`.

Work section by section, run the dev server, and compare each section against the reference
HTML in the browser before moving on.

## 9. Color schemes

`color-schemes.css` defines 10 palettes (each with light + dark) using the same 12 tokens;
`COLOR-SCHEMES.md` lists every value. Import `color-schemes.css` after `globals.css`.
The active scheme is set with `<html data-scheme="clinical">` etc. (no attribute = Coral & Aqua).

- Add the derived tokens from the reference `:root` (`--accent-text`, `--deep-2`, `--deep-line`,
  `--deep-muted`, `--deep-aqua`) and never hard-code colors in components.
- Pick the production scheme via an env/config value (`SITE_SCHEME`) applied in `app/layout.tsx`.
- Keep the floating "Color scheme" picker from the reference behind a flag
  (`NEXT_PUBLIC_SHOW_SCHEME_PICKER=true`) for client review only; hide it in production.
- The animated smile band colors read `--accent` / `--aqua` at runtime; re-apply them when the scheme or theme changes.
