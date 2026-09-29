import { publicFileExists } from "@/lib/publicFile";
import { ImageSlotView } from "./ImageSlotView";

type ImageSlotProps = {
  /** Path relative to public/, e.g. "images/doctor-1.jpg". */
  src: string;
  label: string;
  size?: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4/5". Defaults to 4/3. */
  aspect?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Image with a designed placeholder. If the file exists in public/, it renders
 * next/image over the placeholder; otherwise the striped placeholder shows the
 * expected file path and size.
 */
export function ImageSlot({ src, ...rest }: ImageSlotProps) {
  return <ImageSlotView src={src} exists={publicFileExists(src)} {...rest} />;
}
