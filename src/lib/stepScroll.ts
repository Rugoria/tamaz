import { clamp, ease } from "./motion";

/** After a step, wheel events are ignored this long, so a trackpad's momentum tail does not play a second step. */
const COOLDOWN = 350;
/** How long one step takes to play. */
const STEP_MS = 800;
/** A scroll that settles closer than this to a stop is left alone (mobile toolbars nudge the stops). */
const SNAP_MIN = 24;

/**
 * Fired on window right after each animated scroll frame, so scroll-linked visuals (the hero aligner)
 * can update in the same frame instead of a frame behind, which would make them shake.
 */
export const STEP_SCROLL_EVENT = "stepscroll";
/** Pixels within which the page counts as resting on a stop. */
const EPS = 2;

const KEYS: Record<string, number> = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };

/**
 * Steps the page between fixed stops inside a tall scroll section (`el`): each scroll gesture (wheel,
 * trackpad swipe, touch swipe, arrow/page/space key) plays one step, animating the scroll to the next
 * stop. `stops` are fractions (0..1) of the scroll through the section. Above the first stop and below
 * the last, the page scrolls normally, and scrolling in from outside stops at the first or last stop.
 * Reduced motion: the same steps, but it jumps instead of animating. Returns a cleanup function.
 */
export function stepScroll(el: HTMLElement, stops: readonly number[], reduced: boolean): () => void {
  let animating = false;
  let raf = 0;
  /** Where the page was resting when the current gesture began; steps are counted from here. */
  let restY = window.scrollY;
  let target = restY; // the stop being animated to
  let endedAt = -Infinity; // when the last step finished
  let captured = false; // the current gesture is driving a step, so its remaining events are swallowed
  let touchY = 0;
  let touching = false;
  let idle = 0;

  const points = () => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const len = el.offsetHeight - window.innerHeight;
    return stops.map((p) => Math.round(top + p * len));
  };
  /** The next stop from `y` in direction `dir`, if there is one. */
  const next = (y: number, dir: number) => {
    const s = points();
    return dir > 0 ? s.find((v) => v > y + EPS) : s.reverse().find((v) => v < y - EPS);
  };
  /** Whether a scroll of `dy` from `y` should play a step rather than scroll normally. */
  const steps = (y: number, dy: number) => {
    const s = points();
    const first = s[0];
    const last = s[s.length - 1];
    return dy > 0
      ? (y >= first - EPS && y < last - EPS) || (y < first && y + dy >= first)
      : (y <= last + EPS && y > first + EPS) || (y > last && y + dy <= last);
  };

  const animateTo = (y: number) => {
    cancelAnimationFrame(raf);
    const from = window.scrollY;
    const d = y - from;
    restY = target = y;
    if (Math.abs(d) < 1) {
      animating = false;
      return;
    }
    animating = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = reduced ? 1 : clamp((now - t0) / STEP_MS);
      window.scrollTo({ top: from + d * ease(k), behavior: "instant" });
      window.dispatchEvent(new Event(STEP_SCROLL_EVENT));
      if (k < 1) raf = requestAnimationFrame(tick);
      else {
        animating = false;
        endedAt = performance.now();
      }
    };
    raf = requestAnimationFrame(tick);
  };

  /** Plays the step for a scroll of `dy`, if it lands in the stepped range. Returns whether it did. */
  const tryStep = (dy: number) => {
    if (!dy || !steps(window.scrollY, dy)) return false;
    const target = next(restY, Math.sign(dy));
    if (target === undefined) return false;
    animateTo(target);
    return true;
  };

  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey) return; // pinch zoom
    // Swallow the rest of a step's gesture while it plays and briefly after, then take the next scroll.
    if (animating || (captured && performance.now() - endedAt < COOLDOWN)) {
      e.preventDefault();
      return;
    }
    captured = false;
    restY = window.scrollY;
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
    if (tryStep(dy)) {
      captured = true;
      e.preventDefault();
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touching = true;
    captured = false;
    touchY = e.touches[0].clientY;
    if (!animating) restY = window.scrollY;
  };
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 1) return;
    if (captured) {
      if (e.cancelable) e.preventDefault();
      return;
    }
    const dy = touchY - e.touches[0].clientY;
    if (Math.abs(dy) < 10) {
      if (animating && e.cancelable) e.preventDefault();
      return;
    }
    if (animating) {
      // A swipe during a step queues the next one (or goes back), counted from the stop it is heading to.
      captured = true;
      if (e.cancelable) e.preventDefault();
      const to = next(target, Math.sign(dy));
      if (to !== undefined) animateTo(to);
      return;
    }
    if (tryStep(dy)) {
      captured = true;
      if (e.cancelable) e.preventDefault();
    }
  };
  const onTouchEnd = () => {
    touching = false;
    onScroll();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest("input, textarea, select, [contenteditable]")) return;
    if (e.key === " " && t?.closest("button, a, summary")) return; // Space presses the focused control
    const dir = (KEYS[e.key] ?? 0) * (e.key === " " && e.shiftKey ? -1 : 1);
    if (!dir) return;
    if (animating) {
      e.preventDefault();
      return;
    }
    restY = window.scrollY;
    if (tryStep(dir * window.innerHeight * 0.8)) e.preventDefault();
  };

  // A scroll that ends between stops (scrollbar drag, momentum, find in page) settles on the next stop
  // in the direction it was going, counted from where it started.
  const onScroll = () => {
    if (animating) return;
    clearTimeout(idle);
    idle = window.setTimeout(() => {
      if (animating || touching || performance.now() - endedAt < COOLDOWN) return;
      const y = window.scrollY;
      const s = points();
      const between = y > s[0] + EPS && y < s[s.length - 1] - EPS && !s.some((v) => Math.abs(v - y) <= SNAP_MIN);
      if (!between) {
        restY = y;
        return;
      }
      const target = next(restY, Math.sign(y - restY) || 1);
      if (target !== undefined) animateTo(target);
    }, 150);
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd);
  window.addEventListener("touchcancel", onTouchEnd);
  window.addEventListener("keydown", onKey);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(idle);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("scroll", onScroll);
  };
}
