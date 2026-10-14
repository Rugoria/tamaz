import {
  ACESFilmicToneMapping,
  DoubleSide,
  Group,
  type Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import { aim, caseOccluder, FOV, JAW_YAW, setFrustum, START_YAW, FRAME_JAW } from "./alignerRig";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type AlignerScene = {
  /**
   * turn: 0 = imageA pose, 1 = half a turn clockwise from there (seen from above).
   * jaw: 0 = that landing pose, 1 = turned on round to face the camera and seen nearly level, as
   * when worn on the lower teeth in the Journey photo.
   * lift: how far (meters) the aligner is raised over its resting height: below 0 it sinks into the case.
   * tray: while the aligner is over the case, the slot's screen rect (the case is drawn through the slot's
   * camera): the case's wall then hides the part of the aligner inside the tray.
   */
  render(turn: number, jaw?: number, lift?: number, tray?: DOMRect | null): void;
  dispose(): void;
};

/**
 * Renders the 3D aligner (glTF, meters, Y up, front teeth toward +Z) into a transparent canvas
 * that fills `box`. Loaded lazily by HeroAligner so three.js stays out of the initial bundle. `model` is the
 * .glb file's bytes (meshopt-compressed), fetched by the caller in parallel with this module.
 */
export async function createAlignerScene(canvas: HTMLCanvasElement, box: HTMLElement, model: Promise<ArrayBuffer>): Promise<AlignerScene> {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const camera = new PerspectiveCamera();
  // The canvas reaches above its box (room for the aligner to rise out of the case); the box is the frame.
  const view = () => ({ x: canvas.offsetLeft, y: canvas.offsetTop, w: canvas.offsetWidth, h: canvas.offsetHeight });
  const frame = (turn: number, jaw: number) => {
    const mix = (a: number, b: number) => a + (b - a) * jaw;
    const fov = aim(camera, turn, jaw);
    setFrustum(camera, fov, { w: box.clientWidth, h: box.clientHeight }, view());
    turntable.scale.set(mix(1, FRAME_JAW.widen), mix(1, FRAME_JAW.squash), 1);
  };

  // The case's base, drawn depth-only first through the slot's camera (see render's `tray`).
  const occluder = caseOccluder();
  const trayScene = new Scene();
  trayScene.add(occluder.group);
  const trayCamera = new PerspectiveCamera();
  aim(trayCamera, 1, 0);
  renderer.autoClear = false;

  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(await model, "");
  // Transmission needs something opaque behind it in the same scene; on a transparent canvas over
  // the page it renders dark. A plain see-through glossy plastic shows the page through instead.
  const plastic = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.05,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.5,
    envMapIntensity: 1.8,
    side: DoubleSide,
    depthWrite: false,
  });
  gltf.scene.traverse((o) => {
    const m = o as Mesh;
    if (m.isMesh) m.material = plastic;
  });
  const turntable = new Group();
  turntable.add(gltf.scene);
  scene.add(turntable);

  const resize = () => {
    renderer.setSize(Math.max(1, canvas.offsetWidth), Math.max(1, canvas.offsetHeight), false);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(box);

  return {
    render(turn, jaw = 0, lift = 0, tray = null) {
      const landed = START_YAW - Math.PI * turn; // negative = clockwise seen from above
      turntable.rotation.y = landed + (JAW_YAW - landed) * jaw;
      turntable.position.y = lift;
      frame(turn, jaw);
      renderer.clear();
      if (tray) {
        // The slot's camera, drawn into this canvas: where the slot is relative to the canvas on screen.
        const c = canvas.getBoundingClientRect();
        setFrustum(trayCamera, FOV, { w: tray.width, h: tray.height }, { x: c.left - tray.left, y: c.top - tray.top, w: c.width, h: c.height });
        renderer.render(trayScene, trayCamera);
      }
      renderer.render(scene, camera);
    },
    dispose() {
      ro.disconnect();
      gltf.scene.traverse((o) => (o as Mesh).geometry?.dispose());
      plastic.dispose();
      occluder.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
