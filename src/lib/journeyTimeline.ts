import { journey } from "@/content/site";
import { clamp } from "./motion";

const [, ALIGN, RETAIN] = journey.stages;

/** Treatment progress 0..1 for Journey scroll progress p: teeth move during the Align step (see content/site.ts). */
export const alignAt = (p: number) => clamp((p - ALIGN.start) / (ALIGN.end - ALIGN.start));
/** Each step's photo fades in over the first part of its step and stays to the end. */
const fadeIn = (p: number, s: { start: number; end: number }) => clamp((p - s.start) / ((s.end - s.start) * 0.5));
/** The aligners-worn photo (and the 3D aligner fading out under it), at the start of Align. */
export const wornAt = (p: number) => fadeIn(p, ALIGN);
/** The straight-smile end photo, at the start of Retain. */
export const retainAt = (p: number) => fadeIn(p, RETAIN);
