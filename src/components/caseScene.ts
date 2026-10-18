import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MARK, TAGLINE, WORD } from "./Logo";
import { aim, baseShell, baseTray, CASE, CASE_Y, disposeTree, lidShell, setFrustum } from "./alignerRig";

export type CaseScene = {
  /** lid: opening angle in radians (0 = closed). Renders only when something changed. */
  render(lid: number): void;
  dispose(): void;
};

/** The logo on the lid, as in the artwork ("Final Mono.pdf"): tooth, wordmark and tagline, read once when the case is made. */
function brandTexture(color: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const g = c.getContext("2d");
  if (g) {
    // The stacked lockup's box (Logo.tsx), fitted inside the round lid with a margin.
    const [x, y, w, h] = [3.42, 2.58, 60.15, 61.33];
    const k = 680 / h;
    g.translate(512 - (w * k) / 2, 512 - (h * k) / 2);
    g.scale(k, k);
    g.translate(-x, -y);
    g.strokeStyle = g.fillStyle = color;
    g.lineWidth = 1.51;
    g.lineCap = g.lineJoin = "round";
    g.stroke(new Path2D(MARK));
    g.fill(new Path2D(WORD), "evenodd");
    g.fill(new Path2D(TAGLINE));
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** A soft contact shadow under the case: dark under its base, gone a few millimeters past its edge. */
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(64, 64, 44, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,0,0,0.45)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
  }
  return new CanvasTexture(c);
}

/**
 * Renders the aligner case into a transparent canvas laid over (and reaching beyond) `slot`, through the
 * same camera the aligner has when it sits in the slot. Loaded lazily by HeroAligner with the aligner.
 */
export function createCaseScene(canvas: HTMLCanvasElement, slot: HTMLElement): CaseScene {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  // The shell takes the scheme's accent (Clinical Blue on the site); the logo on it the accent's ink.
  const css = getComputedStyle(document.documentElement);
  const accent = css.getPropertyValue("--accent").trim() || "#1D6FE8";
  const accentInk = css.getPropertyValue("--accent-ink").trim() || "#FFFFFF";
  const shell = new MeshPhysicalMaterial({ color: new Color(accent), roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3, side: DoubleSide });
  const tray = new MeshPhysicalMaterial({ color: 0xeef1f3, roughness: 0.55, side: DoubleSide });
  const mirror = new MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.03, envMapIntensity: 1.2, side: DoubleSide });

  const box = new Group();
  box.position.y = CASE_Y;
  box.add(new Mesh(baseShell(), shell), new Mesh(baseTray(), tray));
  const hinge = new Mesh(new BoxGeometry(0.016, 0.005, 0.004), shell);
  hinge.position.set(0, CASE.height, -CASE.outer - 0.0012);
  box.add(hinge);

  // The lid turns about the hinge at the back; its center sits one radius in front of it.
  const pivot = new Group();
  pivot.position.set(0, CASE.height, -CASE.outer);
  const lid = new Group();
  lid.position.z = CASE.outer;
  lid.add(new Mesh(lidShell(), shell));
  const glass = new Mesh(new CircleGeometry(0.033, 96), mirror);
  glass.rotation.x = Math.PI / 2; // faces down, into the closed case
  glass.position.y = 0.0012;
  const brand = new Mesh(new CircleGeometry(0.03, 64), new MeshBasicMaterial({ map: brandTexture(accentInk), transparent: true, toneMapped: false }));
  brand.rotation.x = -Math.PI / 2; // faces up, reads from the front
  brand.position.y = CASE.lid + 0.0001;
  lid.add(glass, brand);
  pivot.add(lid);
  box.add(pivot);

  // Kept small enough to fade out inside the canvas; larger, the canvas edges cut it into a rectangle.
  const floor = new Mesh(new PlaneGeometry(0.098, 0.098), new MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.0002;
  box.add(floor);
  scene.add(box);

  const camera = new PerspectiveCamera();
  const fov = aim(camera, 1, 0);
  let last = -1;
  const resize = () => {
    const w = Math.max(1, canvas.offsetWidth);
    const h = Math.max(1, canvas.offsetHeight);
    renderer.setSize(w, h, false);
    // The slot is the frame the aligner sees; the canvas reaches beyond it (above for the open lid).
    setFrustum(camera, fov, { w: slot.clientWidth, h: slot.clientHeight }, { x: canvas.offsetLeft, y: canvas.offsetTop, w, h });
    last = -1;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(slot);

  return {
    render(angle) {
      if (Math.abs(angle - last) < 1e-4) return;
      last = angle;
      pivot.rotation.x = -angle;
      renderer.render(scene, camera);
    },
    dispose() {
      ro.disconnect();
      disposeTree(box);
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
