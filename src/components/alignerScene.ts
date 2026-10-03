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
  /**
   * turn: 0 = imageA pose, 1 = half a turn clockwise from there (seen from above).
   * jaw: 0 = that landing pose, 1 = turned on round to face the camera and seen nearly level, as
   * when worn on the lower teeth in the Journey photo.
   */
  render(turn: number, jaw?: number): void;
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
/* On the lower teeth: front teeth toward the camera (a full turn from imageA's pose, still
   clockwise), seen from a little above so the arch curves up at the back like the smile. */
const JAW_ELEVATION = (12 * Math.PI) / 180;
const JAW_YAW = -2 * Math.PI;
/* A long lens from further back flattens the perspective, so the front teeth are not oversized
   against the back ones and each tooth lines up with the photo's. `widen` stretches the arch
   sideways to the photo's broader smile and `squash` lowers it to the height of its teeth. */
const JAW_FOV = 12;
const FRAME_JAW = { distance: 0.2, x: 0, z: 0.004, widen: 1.16, squash: 0.85 };

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
  const frame = (turn: number, jaw: number) => {
    const mix = (a: number, b: number, t = turn) => a + (b - a) * t;
    const d = mix(mix(FRAME_START.distance, FRAME_END.distance), FRAME_JAW.distance, jaw);
    const z = mix(mix(FRAME_START.z, FRAME_END.z), FRAME_JAW.z, jaw);
    const x = mix(mix(FRAME_START.x, FRAME_END.x), FRAME_JAW.x, jaw);
    const el = mix(ELEVATION, JAW_ELEVATION, jaw);
    camera.fov = mix(FOV, JAW_FOV, jaw);
    camera.updateProjectionMatrix();
    turntable.scale.set(mix(1, FRAME_JAW.widen, jaw), mix(1, FRAME_JAW.squash, jaw), 1);
    camera.position.set(0, Math.sin(el) * d, Math.cos(el) * d + z);
    camera.lookAt(x, 0.002, z);
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
    render(turn, jaw = 0) {
      const landed = START_YAW - Math.PI * turn; // negative = clockwise seen from above
      turntable.rotation.y = landed + (JAW_YAW - landed) * jaw;
      frame(turn, jaw);
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
