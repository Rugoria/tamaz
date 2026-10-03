# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing site for **tamaz**, an orthodontics practice. It is a single route (`/`) that ports an approved design. The spec is `tamaz-handoff/PROMPT.md` and the source of truth is `tamaz-handoff/reference/tamaz-reference.html`. Match the reference's layout, copy, colors, motion, and interactions; do not redesign. The brand name is always lowercase "tamaz" and always stands alone (never "tamaz Orthodontics").

Stack: Next.js 16 (App Router, React 19, RSC by default), TypeScript strict, CSS Modules plus one global stylesheet, zod, and three.js (only for the 3D hero aligner, loaded lazily). There is no Tailwind and no animation library. The import alias `@/*` maps to `src/*`.

## Commands

- `npm run dev`: start the dev server on http://localhost:3000
- `npm run build`: production build. It must pass with no type or lint errors (acceptance criterion).
- `npm run lint`: ESLint (flat config, `next/core-web-vitals` and `next/typescript`)

There is no test suite.

## Architecture

- **Content is data.** All copy, prices, doctors, studios, reviews, FAQs, and articles live in `src/content/site.ts` as typed exports. Components read from it rather than hardcoding text. Strings containing `[bracketed]` text are placeholders: render them through `Copy` (from `src/components/Tbd.tsx`), which wraps each bracketed part in `<Tbd>` (yellow `.tbd` highlight) until real content replaces it.
- **Sections.** `src/app/page.tsx` composes one component per page section, in the order given in the spec. Each component has a sibling `*.module.css`. Most sections are server components. Interactive pieces are split out as client components (for example `Consultation` renders `ConsultationForm`).
- **Global styles.** `src/app/globals.css` holds the design tokens (`--bg`, `--ink`, `--accent`, `--aqua`, `--deep`, and so on, with a dark variant only under `[data-theme="dark"]`; the site never follows the browser or OS color setting, and `:root` declares `color-scheme: only light`) plus shared utility classes: `.wrap`, `.reveal`, `.tbd`, and `.readout`. Fonts come from `next/font` in `layout.tsx` and are exposed as `--display`, `--body`, and `--mono`.
- **Color schemes.** `src/app/color-schemes.css` (a copy of `tamaz-handoff/color-schemes.css`, imported after `globals.css`) defines 10 palettes, each with light and dark, keyed by `<html data-scheme>`. No attribute means Coral & Aqua (the base tokens in `globals.css`). The site palette is **Clinical Blue** (`clinical`): it comes from `SITE_SCHEME` (see `.env.example`) and falls back to `SITE_DEFAULT_SCHEME` (Clinical Blue) when that is unset. The scheme list lives in `src/lib/schemes.ts`. Components must never hard-code colors: use the scheme tokens or the derived `--accent-text`, `--deep-2`, `--deep-line`, `--deep-muted` and `--deep-aqua`. Smile band colors are passed as `var(--…)` strings so they follow the scheme. The floating `SchemePicker` renders only when `NEXT_PUBLIC_SHOW_SCHEME_PICKER=true` (client review builds; set in `.env.local`, rebuild after changing it).
- **Hero and aligner flight.** `Hero` is a full-screen section with only the "tamaz" wordmark. `page.tsx` wraps `Hero`, `AlignerAbout` (aligner slot on the left, product copy on the right), `Journey` and the client `HeroAligner` in one `.flight` box. `HeroAligner` floats the transparent cutout `hero.aligner.image` in front of the wordmark, then on scroll flies it into `#aligner-slot`, shrinking it.  Scrolling on, it leaves the slot and glides down to the Journey photo (`#journey-photos`), fitting over the lower teeth (at `journey.photos.landing`) just as that section pins, and fades out as the aligners-worn photo comes in at the Align step. On the way down the model keeps turning clockwise until its front faces the camera, seen nearly level through a long lens and stretched slightly to the photo's arch (`render(turn, jaw)` and `FRAME_JAW` in `alignerScene.ts`). Journey has no tray images of its own. Without the model (no WebGL, or reduced motion) the still fades out on the way down. The imageA still (`hero.aligner.image`) shows first; once the 3D model `hero.aligner.model` (`public/models/aligner.glb`: meters, Y up, front teeth toward +Z) has loaded, `alignerScene.ts` (three.js, dynamically imported) fades it in over the still. It starts in imageA's pose (turned -35°, camera 35° above; matched by eye against the render) and over the flight turns half a turn clockwise around its vertical axis from there, like a phone spun on a table. The camera framing eases from the imageA framing to a wider one so the model is never cropped. It has no other rotation; it floats, and the float settles as it lands. Under reduced motion the 3D model is never loaded. It is driven by scroll only (no drag). Under reduced motion it stays in the hero, and the slot shows a still copy.
- **The `<Smile />` motion component** (`src/components/smile/`, with `HeroSmileCard`) is no longer rendered.
  - `smileGeometry.ts` holds the pure geometry: tooth `SPEC`, the `CROOK` offsets, the smile-arc formula, the wire path, and `computeFrame`.
  - `Smile.tsx` renders the SVG once. Animation drives it through a `SmileHandle` ref (`smile.current.set(t, bracket, ghost, scanY)`), which mutates SVG attributes directly.
  - Scroll and rAF loops must use this handle, never React state, so animation stays at 60fps. `Journey.tsx` follows the same pattern for its readouts, writing to text refs.
- **Motion helpers.** `src/lib/motion.ts` provides `clamp`, `ease`, `lerp`, `prefersReducedMotion()`, and `useReducedMotion()`. Every animation must respect reduced motion: no looping or scroll animation, and the hero shows the final aligned state.
- **Scroll reveal.** Add `className="reveal"` to an element (and `data-stagger` on a grid for cascading delays). The single `<RevealObserver />` in `page.tsx` hides and reveals only the elements that start below the fold.
- **Images.** `ImageSlot` (`src/components/image-slot/`) is a server component that checks `fs.existsSync(public/<src>)`. If the file exists it renders `next/image` through the client `ImageSlotView`; otherwise it renders a striped placeholder showing the expected path and size. The expected files are listed in `tamaz-handoff/reference/images/IMAGE-LIST.txt` and go in `public/images/`.
- **Videos.** `VideoSlot` (`src/components/video-slot/`) mirrors `ImageSlot`: it takes a YouTube URL (rendered as a click-to-load facade) or one or more paths under `public/`, and shows a striped placeholder until the file exists. Use `mode="ambient"` for muted loops that play only while in view (paused under reduced motion). A result case with a `video` file shows the clip instead of the slider. `publicFileExists` (`src/lib/publicFile.ts`) is the shared server-side check.
- **Journey.** A real-teeth animation, about three scrolls long (`.scroll` is 200vh), one photo per step: `journey.photos.start` with the hero's 3D aligner on the lower teeth (Scan), `worn` with aligners on both arches (Align), then `end`, the straight smile (Retain). Each photo crossfades in at the start of its step (opacity written through a ref). `journey-start.jpg` and `journey-straight.jpg` are the same crop of `imageB.png` and `imagec.png` in the project root. The shared step timing (`alignAt`, `wornAt`, `retainAt`) lives in `src/lib/journeyTimeline.ts`. The Clear aligners / Braces toggle swaps stage copy (`stage.aligners`) and the average months from `journey.appliances`.
- **Map.** `StudioMap` (client) shows the static map slot until a studio has a real (unbracketed) address, then offers a click-to-load Google Maps embed (no API key). `isPlaceholder` lives in `src/lib/placeholder.ts`.
- **Consultation form.** `ConsultationForm` (client) posts to `src/app/api/consultation/route.ts`. Both sides use the shared zod schema in `src/lib/consultationSchema.ts`, whose enums (treatments and studios) are derived from `site.ts`. The route currently only logs the request; forwarding it to a real destination is a TODO.
- `<body suppressHydrationWarning>` in `layout.tsx` is intentional. Browser extensions such as Grammarly add attributes to `<body>` and would otherwise trigger hydration errors.

## Acceptance bar (from the spec)

- The page matches the reference at 1440, 1024, 768, and 390px wide, with no horizontal page scroll.
- Colors stay the same whatever the browser or OS color setting is. The forced dark theme (`data-theme="dark"`, review picker only) is still correct.
- Keyboard access works: visible focus states, `aria-expanded` on the menu toggle, `aria-pressed` on toggles, and `<input type="range">` for the before/after sliders.
- Lighthouse scores are at least 90 for Performance and at least 95 for Accessibility.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
