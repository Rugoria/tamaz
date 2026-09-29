/** True if a copy string still contains a [bracketed] placeholder. */
export const isPlaceholder = (s: string) => /\[[^\]]+\]/.test(s);
