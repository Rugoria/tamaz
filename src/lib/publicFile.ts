import fs from "node:fs";
import path from "node:path";

/** True if `src` (relative to public/, e.g. "images/doctor-1.jpg") exists. Server only. */
export function publicFileExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
