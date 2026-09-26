# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing site for **tamaz**, an orthodontics practice. It is a single route (`/`) that ports an approved design. The spec is `tamaz-handoff/PROMPT.md` and the source of truth is `tamaz-handoff/reference/tamaz-reference.html`. Match the reference's layout, copy, colors, motion, and interactions; do not redesign. The brand name is always lowercase "tamaz" and always stands alone (never "tamaz Orthodontics").

Stack: Next.js 16 (App Router, React 19, RSC by default), TypeScript strict, CSS Modules plus one global stylesheet, and zod. There is no Tailwind and no animation library. The import alias `@/*` maps to `src/*`.

## Commands

- `npm run dev`: start the dev server on http://localhost:3000
- `npm run build`: production build. It must pass with no type or lint errors (acceptance criterion).
- `npm run lint`: ESLint (flat config, `next/core-web-vitals` and `next/typescript`)

There is no test suite.

## Architecture

- **Content is data.** All copy, prices, doctors, studios, reviews, FAQs, and articles live in `src/content/site.ts` as typed exports. Components read from it rather than hardcoding text. Strings containing `[bracketed]` text are placeholders: render them through `Copy` (from `src/components/Tbd.tsx`), which wraps each bracketed part in `<Tbd>` (yellow `.tbd` highlight) until real content replaces it.
- **Sections.** `src/app/page.tsx` composes one component per page section, in the order given in the spec. Each component has a sibling `*.module.css`. Most sections are server components. Interactive pieces are split out as client components (for example `Hero` renders the client `HeroSmileCard`, and `Consultation` renders `ConsultationForm`).
- **Global styles.** `src/app/globals.css` holds the design tokens (`--bg`, `--ink`, `--accent`, `--aqua`, `--deep`, and so on, with light and dark mode via `prefers-color-scheme` and `[data-theme="dark"]`) plus shared utility classes: `.wrap`, `.reveal`, `.tbd`, and `.readout`. Fonts come from `next/font` in `layout.tsx` and are exposed as `--display`, `--body`, and `--mono`.
- **The `<Smile />` motion component** (`src/components/smile/`) is the centerpiece and is used by the Hero, Journey, and BandStudio sections.
  - `smileGeometry.ts` holds the pure geometry: tooth `SPEC`, the `CROOK` offsets, the smile-arc formula, the wire path, and `computeFrame`.
  - `Smile.tsx` renders the SVG once. Animation drives it through a `SmileHandle` ref (`smile.current.set(t, bracket, ghost, scanY)`), which mutates SVG attributes directly.
  - Scroll and rAF loops must use this handle, never React state, so animation stays at 60fps. `Journey.tsx` follows the same pattern for its readouts, writing to text refs.
- **Motion helpers.** `src/lib/motion.ts` provides `clamp`, `ease`, `lerp`, `prefersReducedMotion()`, and `useReducedMotion()`. Every animation must respect reduced motion: no looping or scroll animation, and the hero shows the final aligned state.
- **Scroll reveal.** Add `className="reveal"` to an element (and `data-stagger` on a grid for cascading delays). The single `<RevealObserver />` in `page.tsx` hides and reveals only the elements that start below the fold.
- **Images.** `ImageSlot` (`src/components/image-slot/`) is a server component that checks `fs.existsSync(public/<src>)`. If the file exists it renders `next/image` through the client `ImageSlotView`; otherwise it renders a striped placeholder showing the expected path and size. The expected files are listed in `tamaz-handoff/reference/images/IMAGE-LIST.txt` and go in `public/images/`.
- **Consultation form.** `ConsultationForm` (client) posts to `src/app/api/consultation/route.ts`. Both sides use the shared zod schema in `src/lib/consultationSchema.ts`, whose enums (treatments and studios) are derived from `site.ts`. The route currently only logs the request; forwarding it to a real destination is a TODO.
- `<body suppressHydrationWarning>` in `layout.tsx` is intentional. Browser extensions such as Grammarly add attributes to `<body>` and would otherwise trigger hydration errors.

## Acceptance bar (from the spec)

- The page matches the reference at 1440, 1024, 768, and 390px wide, with no horizontal page scroll.
- Light and dark mode are both correct.
- Keyboard access works: visible focus states, `aria-expanded` on the menu toggle, `aria-pressed` on toggles, and `<input type="range">` for the before/after sliders.
- Lighthouse scores are at least 90 for Performance and at least 95 for Accessibility.
