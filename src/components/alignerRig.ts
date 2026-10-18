import {
  DoubleSide,
  Group,
  LatheGeometry,
  type Material,
  Mesh,
  MeshBasicMaterial,
  type PerspectiveCamera,
  type Texture,
  Vector2,
} from "three";

/* Shared by the aligner scene and the case scene, so the case in the slot and the aligner over it are
   seen through the same camera and line up exactly when the aligner sits in the case. */

/* Camera and starting turn matched to the imageA render: looking down at the aligner on a
   "table", turned so the open back ends point up and to the right. */
export const ELEVATION = (35 * Math.PI) / 180;
export const FOV = 30;
export const START_YAW = (-35 * Math.PI) / 180;
/* Framing (meters; the model is about 5.5 x 5 cm, 1 cm tall) at the start and after the half turn, when
   the wide back ends are nearest the camera and need more room. Blended along the turn. At the end
   (the slot) the camera aims a little lower, so the case under the aligner sits in the slot too. */
export const FRAME_START = { distance: 0.086, x: 0.005, y: 0.002, z: 0 };
export const FRAME_END = { distance: 0.105, x: -0.004, y: -0.008, z: 0.004 };
/* On the lower teeth: front teeth toward the camera (a full turn from imageA's pose, still
   clockwise), seen from a little above so the arch curves up at the back like the smile. */
export const JAW_ELEVATION = (12 * Math.PI) / 180;
export const JAW_YAW = -2 * Math.PI;
/* A long lens from further back flattens the perspective, so the front teeth are not oversized
   against the back ones and each tooth lines up with the photo's. `widen` stretches the arch
   sideways to the photo's broader smile and `squash` lowers it to the height of its teeth. */
export const JAW_FOV = 12;
export const FRAME_JAW = { distance: 0.2, x: 0, y: 0.002, z: 0.004, widen: 1.16, squash: 0.85 };
export const NEAR = 0.001;
export const FAR = 2;

/** Places the camera for a turn (0..1) and jaw blend (0..1); returns the vertical field of view. */
export function aim(camera: PerspectiveCamera, turn: number, jaw: number) {
  const mix = (a: number, b: number, t = turn) => a + (b - a) * t;
  const pick = (k: "distance" | "x" | "y" | "z") => mix(mix(FRAME_START[k], FRAME_END[k]), FRAME_JAW[k], jaw);
  const d = pick("distance");
  const z = pick("z");
  const el = mix(ELEVATION, JAW_ELEVATION, jaw);
  camera.position.set(0, Math.sin(el) * d, Math.cos(el) * d + z);
  camera.lookAt(pick("x"), pick("y"), z);
  camera.updateMatrixWorld();
  return mix(FOV, JAW_FOV, jaw);
}

export type Box = { w: number; h: number };
export type View = { x: number; y: number; w: number; h: number };

/**
 * Sets a perspective projection that shows `base` (a box, in px) with the given vertical field of view,
 * drawn into `view`: a rectangle in the same px, relative to the base's top left, that may be larger
 * than the base or offset from it. The depth mapping depends only on NEAR and FAR, so two cameras with
 * the same position share a depth buffer whatever their views.
 */
export function setFrustum(camera: PerspectiveCamera, fov: number, base: Box, view: View) {
  const top = NEAR * Math.tan(((fov / 2) * Math.PI) / 180);
  const unit = (2 * top) / Math.max(1, base.h);
  const left = (-base.w / 2 + view.x) * unit;
  const t = top - view.y * unit;
  camera.near = NEAR;
  camera.far = FAR;
  camera.projectionMatrix.makePerspective(left, left + view.w * unit, t, t - view.h * unit, NEAR, FAR);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}

/* The case, after the round clamshell retainer case: a shell in the scheme accent, a white tray inside and a mirror
   in the lid, hinged at the back (-Z). Meters; the aligner (5.5 x 5 cm across its back ends) fits inside. */
export const CASE = { outer: 0.0425, inner: 0.039, height: 0.013, floor: 0.003, lid: 0.011 };
/** The aligner, at rest 4 mm over the rim, drops this far to sit on the tray floor. */
export const SEAT_DROP = CASE.height - CASE.floor + 0.004;
/** And rises this far over its resting height to come out of the case. */
export const RISE = 0.014;
/** Where the base of the case sits, under the aligner. */
export const CASE_Y = -SEAT_DROP - CASE.floor;

const lathe = (pts: [number, number][]) => new LatheGeometry(pts.map(([r, y]) => new Vector2(r, y)), 96);

const { outer: RO, inner: RI, height: H, floor: F } = CASE;
/** The outside of the base and its rim. */
export const baseShell = () =>
  lathe([
    [0, 0],
    [RO - 0.006, 0],
    [RO - 0.0025, 0.0007],
    [RO - 0.0007, 0.0025],
    [RO, 0.006],
    [RO, H - 0.001],
    [RO - 0.0005, H],
    [RI + 0.0005, H],
    [RI, H - 0.0006],
  ]);
/** The tray: inner wall and floor. */
export const baseTray = () =>
  lathe([
    [RI, H - 0.0006],
    [RI, F + 0.002],
    [RI - 0.002, F],
    [0, F],
  ]);
/** The lid, as a closed shell around its center: inner face, edge and domed top. */
export const lidShell = () =>
  lathe([
    [0, 0.0015],
    [RI, 0.0015],
    [RI, 0],
    [RO, 0],
    [RO, 0.004],
    [RO - 0.002, 0.008],
    [RO - 0.008, CASE.lid - 0.0005],
    [0, CASE.lid],
  ]);

/** A depth-only copy of the base: hides whatever of the aligner is inside the tray, behind its wall. */
export function caseOccluder() {
  const mat = new MeshBasicMaterial({ colorWrite: false, side: DoubleSide });
  const group = new Group();
  group.add(new Mesh(baseShell(), mat), new Mesh(baseTray(), mat));
  group.position.y = CASE_Y;
  return { group, dispose: () => disposeTree(group) };
}

export function disposeTree(root: Group) {
  root.traverse((o) => {
    const m = o as Mesh;
    if (!m.isMesh) return;
    m.geometry.dispose();
    const mats = (Array.isArray(m.material) ? m.material : [m.material]) as Material[];
    for (const mat of mats) {
      for (const v of Object.values(mat)) if (v && typeof v === "object" && "isTexture" in v) (v as Texture).dispose();
      mat.dispose();
    }
  });
}
