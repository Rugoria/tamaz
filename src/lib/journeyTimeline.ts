import { journey } from "@/content/site";
import { clamp } from "./motion";

const [, ALIGN, RETAIN] = journey.stages;

/** Where scrolling stops in the Journey: one step per scroll, at 0%, 40% and 100% (Scan, Align, Retain). */
export const JOURNEY_STOPS = [0, 0.4, 1] as const;
/** How much of the scroll a step's photo takes to fade in, so it is fully in by the step's stop. */
const FADE = 0.2;

/** Treatment progress 0..1 for Journey scroll progress p: teeth move during the Align step (see content/site.ts). */
export const alignAt = (p: number) => clamp((p - ALIGN.start) / (ALIGN.end - ALIGN.start));
/** Each step's photo fades in over the first part of its step and stays to the end. */
const fadeIn = (p: number, s: { start: number }) => clamp((p - s.start) / FADE);
/** The aligners-worn photo (and the 3D aligner fading out under it), at the start of Align. */
export const wornAt = (p: number) => fadeIn(p, ALIGN);
/** The straight-smile end photo, at the start of Retain. */
export const retainAt = (p: number) => fadeIn(p, RETAIN);
