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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type AlignerScene = {
  /** turn: 0 = imageA pose, 1 = half a turn clockwise from there (seen from above). */
  render(turn: number): void;
  dispose(): void;
};

/* Camera and starting turn matched to the imageA render: looking down at the aligner on a
   "table", turned so the open back ends point up and to the right. */
const ELEVATION = (35 * Math.PI) / 180;
const FOV = 30;
const START_YAW = (-35 * Math.PI) / 180;
/* Framing (meters; the model is about 5.5 x 5 cm) at the start and after the half turn, when the
   wide back ends are nearest the camera and need more room. Blended along the turn. */
const FRAME_START = { distance: 0.086, x: 0.005, z: 0 };
const FRAME_END = { distance: 0.105, x: -0.004, z: 0.004 };

/**
 * Renders the 3D aligner (glTF, meters, Y up, front teeth toward +Z) into a transparent canvas
 * that fills `box`. Loaded lazily by HeroAligner so three.js stays out of the initial bundle.
 */
export async function createAlignerScene(canvas: HTMLCanvasElement, box: HTMLElement, url: string): Promise<AlignerScene> {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const camera = new PerspectiveCamera(FOV, 1, 0.001, 2);
  const frame = (turn: number) => {
    const mix = (a: number, b: number) => a + (b - a) * turn;
    const d = mix(FRAME_START.distance, FRAME_END.distance);
    const z = mix(FRAME_START.z, FRAME_END.z);
    camera.position.set(0, Math.sin(ELEVATION) * d, Math.cos(ELEVATION) * d + z);
    camera.lookAt(mix(FRAME_START.x, FRAME_END.x), 0.002, z);
  };

  const gltf = await new GLTFLoader().loadAsync(url);
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
    const w = Math.max(1, box.clientWidth);
    const h = Math.max(1, box.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(box);

  return {
    render(turn) {
      turntable.rotation.y = START_YAW - Math.PI * turn; // negative = clockwise seen from above
      frame(turn);
      renderer.render(scene, camera);
    },
    dispose() {
      ro.disconnect();
      gltf.scene.traverse((o) => (o as Mesh).geometry?.dispose());
      plastic.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
