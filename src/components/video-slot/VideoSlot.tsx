import { publicFileExists } from "@/lib/publicFile";
import { VideoSlotView, type VideoSource } from "./VideoSlotView";

type VideoSlotProps = {
  /**
   * A YouTube URL, or one or more paths relative to public/ (e.g. "videos/tip-1.mp4").
   * With several paths the browser plays the first one it supports.
   */
  src: string | string[];
  /** Accessible name for the video. */
  title: string;
  /** Placeholder label shown while the file is missing. */
  label: string;
  size?: string;
  /** Poster image relative to public/. Ignored if the file does not exist. */
  poster?: string;
  /** CSS aspect-ratio, e.g. "4/3". Defaults to 16/9. */
  aspect?: string;
  /** "ambient" = muted loop that plays while in view; "player" = click to play with controls. */
  mode?: "ambient" | "player";
  className?: string;
};

const TYPES: Record<string, string> = { mp4: "video/mp4", webm: "video/webm", mov: "video/quicktime" };

function youTubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/**
 * Video with a designed placeholder, mirroring ImageSlot. Local files render a
 * <video> once they exist in public/; YouTube links render a click-to-load facade.
 */
export function VideoSlot({ src, poster, ...rest }: VideoSlotProps) {
  const list = Array.isArray(src) ? src : [src];
  const yt = list.length === 1 ? youTubeId(list[0]) : null;
  const sources: VideoSource[] = yt
    ? []
    : list.filter(publicFileExists).map((s) => ({ src: `/${s}`, type: TYPES[s.split(".").pop() ?? ""] }));

  return (
    <VideoSlotView
      {...rest}
      path={list.join(" or ")}
      youTubeId={yt}
      sources={sources}
      poster={poster && publicFileExists(poster) ? `/${poster}` : undefined}
    />
  );
}
