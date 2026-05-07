import { Suspense, useMemo, type ReactElement } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";
import bg1 from "@/assets/hero-bg-1.jpg";
import bg2 from "@/assets/hero-bg-2.jpg";
import bg3 from "@/assets/hero-bg-3.jpg";
import type { WorkModelKey } from "@/data/igniaWorks";

const studios = [bg1, bg2, bg3];

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
  titulo?: string;
  material?: string;
  viewAngle?: number;
  photoSrc?: string;
  model?: WorkModelKey;
}

type ModelKind = WorkModelKey;

const normalizeTitle = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const titleModels: Record<string, ModelKind> = {
  "lirio en vuelo": "hero-flight",
  "lily in flight": "hero-flight",
  ofrenda: "hero-offering",
  offering: "hero-offering",
  "torsion i": "hero-torsion",
  confluencia: "figure-curvy",
  confluence: "figure-curvy",
  "pliegue iii": "marble-fold",
  "fold iii": "marble-fold",
  vertigo: "corten-ribbon",
  raiz: "wood-root",
  root: "wood-root",
  origen: "blue-ceramic",
  origin: "blue-ceramic",
  eco: "slender-figure",
  echo: "slender-figure",
  quietud: "white-loop",
  stillness: "white-loop",
  "luz interior": "amber-glass",
  "inner light": "amber-glass",
  caida: "bronze-fall",
  fall: "bronze-fall",
  umbral: "black-figure",
  threshold: "black-figure",
  vertice: "geometric",
  vertex: "geometric",
  resto: "wood-root",
  remnant: "wood-root",
  arco: "white-ring",
  arch: "white-ring",
  memoria: "marble-fold",
  memory: "marble-fold",
  nexo: "hero-offering",
  nexus: "hero-offering",
  latido: "black-figure",
  heartbeat: "black-figure",
  orbita: "hero-torsion",
  orbit: "hero-torsion",
  mineral: "geometric",
  respiro: "white-loop",
  breath: "white-loop",
};

const resolveModel = (titulo: string | undefined, obraIndex: number): ModelKind => {
  const normalized = normalizeTitle(titulo);
  if (normalized in titleModels) return titleModels[normalized];
  const fallback: ModelKind[] = [
    "hero-flight",
    "hero-offering",
    "hero-torsion",
    "figure-curvy",
    "marble-fold",
    "corten-ribbon",
    "wood-root",
    "blue-ceramic",
    "slender-figure",
    "white-loop",
    "amber-glass",
    "geometric",
  ];
  return fallback[((obraIndex % fallback.length) + fallback.length) % fallback.length];
};

const StudioMaterial = ({ kind, side = THREE.FrontSide }: { kind: ModelKind; side?: THREE.Side }) => {
  const material = (() => {
    if (kind === "marble-fold" || kind === "hero-torsion" || kind === "white-loop" || kind === "white-ring") {
      return { color: "#f1ece2", metalness: 0.03, roughness: 0.38, transmission: 0.12, clearcoat: 0.28, envMapIntensity: 1.05 };
    }
    if (kind === "wood-root") return { color: "#7a4a28", metalness: 0.02, roughness: 0.62, transmission: 0, clearcoat: 0.18, envMapIntensity: 0.75 };
    if (kind === "blue-ceramic") return { color: "#063fb8", metalness: 0.02, roughness: 0.18, transmission: 0, clearcoat: 0.9, envMapIntensity: 1.45 };
    if (kind === "corten-ribbon") return { color: "#b34a1c", metalness: 0.82, roughness: 0.22, transmission: 0, clearcoat: 0.5, envMapIntensity: 1.45 };
    if (kind === "amber-glass") return { color: "#f47a14", metalness: 0.02, roughness: 0.06, transmission: 0.58, clearcoat: 0.85, envMapIntensity: 1.8 };
    if (kind === "hero-offering") return { color: "#9a6a32", metalness: 1, roughness: 0.13, transmission: 0, clearcoat: 0.65, envMapIntensity: 1.75 };
    return { color: "#3b2414", metalness: 0.92, roughness: 0.26, transmission: 0, clearcoat: 0.48, envMapIntensity: 1.35 };
  })();

  return (
    <meshPhysicalMaterial
      color={material.color}
      metalness={material.metalness}
      roughness={material.roughness}
      transmission={material.transmission}
      thickness={1.1}
      clearcoat={material.clearcoat}
      clearcoatRoughness={0.2}
      envMapIntensity={material.envMapIntensity}
      side={side}
    />
  );
};

function HeroFlight({ kind }: { kind: ModelKind }) {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = i / 96;
    const y = t * 3.85 - 1.88;
    const base = Math.sin(Math.pow(t, 0.78) * Math.PI);
    const swell = 0.62 + 0.38 * Math.sin(t * Math.PI * 2.1 + 0.55);
    const r = Math.max(0.025, 0.42 * base * swell * (1 - t * 0.18));
    points.push(new THREE.Vector2(r, y));
  }
  return (
    <group>
      <mesh castShadow receiveShadow rotation={[0, 0.18, 0]}>
        <latheGeometry args={[points, 192]} />
        <StudioMaterial kind={kind} />
      </mesh>
      {[0, 1, 2].map((n) => (
        <mesh key={n} castShadow receiveShadow position={[0, 0.28 + n * 0.06, 0]} rotation={[0.08, n * 2.08, 0.28]} scale={[0.22, 1.62, 0.05]}>
          <sphereGeometry args={[0.92, 48, 24]} />
          <StudioMaterial kind={kind} />
        </mesh>
      ))}
    </group>
  );
}

function BronzeOffering({ kind }: { kind: ModelKind }) {
  const geom = useMemo(() => {
    const g = new ParametricGeometry(
      (u, v, target) => {
        const U = u * Math.PI * 2;
        const V = (v - 0.5) * 0.58;
        const a = 1.06 + V * Math.cos(U / 2);
        target.set(a * Math.cos(U), V * Math.sin(U / 2) * 1.55, a * Math.sin(U));
      },
      220,
      28
    );
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      <mesh castShadow receiveShadow geometry={geom} scale={[1.08, 1.08, 1.08]} rotation={[0.08, 0.15, -0.05]}>
        <StudioMaterial kind={kind} side={THREE.DoubleSide} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.28, 48, 24]} />
        <StudioMaterial kind={kind} />
      </mesh>
    </group>
  );
}

function HeroTorsion({ kind }: { kind: ModelKind }) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, -1.75, 0),
    new THREE.Vector3(0.38, -0.88, 0.2),
    new THREE.Vector3(-0.34, 0, -0.18),
    new THREE.Vector3(0.32, 0.86, 0.16),
    new THREE.Vector3(-0.08, 1.76, 0),
  ]);
  return (
    <group>
      <mesh castShadow receiveShadow rotation={[0, 0.15, 0]}>
        <tubeGeometry args={[curve, 260, 0.36, 56, false]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow scale={[0.42, 1.72, 0.18]} rotation={[0.14, 0.75, -0.22]}>
        <sphereGeometry args={[1, 64, 32]} />
        <StudioMaterial kind={kind} />
      </mesh>
    </group>
  );
}

function FigureCurvy({ kind }: { kind: ModelKind }) {
  return (
    <group position={[0, -0.18, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.44, 0]} scale={[0.48, 0.92, 0.36]} rotation={[0, 0.12, -0.1]}>
        <sphereGeometry args={[1, 64, 32]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.02, 1.42, 0]} scale={[0.33, 0.5, 0.28]}>
        <sphereGeometry args={[1, 48, 24]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.02, 2.12, 0]} scale={[0.17, 0.17, 0.17]}>
        <sphereGeometry args={[1, 48, 24]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.48, 0.58, 0]} rotation={[0, 0, -0.34]}>
        <capsuleGeometry args={[0.075, 1.6, 12, 24]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.52, 0.6, 0]} rotation={[0, 0, 0.28]}>
        <capsuleGeometry args={[0.075, 1.55, 12, 24]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.18, -1.02, 0]} rotation={[0.08, 0, -0.09]}>
        <capsuleGeometry args={[0.12, 1.65, 16, 28]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.24, -1.0, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.12, 1.62, 16, 28]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh receiveShadow position={[0, -1.95, 0]} scale={[1.1, 0.08, 0.65]}>
        <boxGeometry args={[1, 1, 1]} />
        <StudioMaterial kind={kind} />
      </mesh>
    </group>
  );
}

function MarbleFold({ kind }: { kind: ModelKind }) {
  return (
    <group>
      {[0, 1, 2].map((n) => (
        <mesh key={n} castShadow receiveShadow scale={[0.32, 1.74, 0.12]} rotation={[0.18, n * 1.9 + 0.25, n === 1 ? -0.42 : 0.36]} position={[Math.sin(n * 2.1) * 0.16, 0, Math.cos(n * 2.1) * 0.1]}>
          <sphereGeometry args={[1, 64, 32]} />
          <StudioMaterial kind={kind} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh receiveShadow position={[0, -1.72, 0]} scale={[1.05, 0.12, 0.72]}>
        <boxGeometry args={[1, 1, 1]} />
        <StudioMaterial kind={kind} />
      </mesh>
    </group>
  );
}

function Ribbon({ kind }: { kind: ModelKind }) {
  return (
    <mesh castShadow receiveShadow rotation={[0.2, 0.28, -0.18]} scale={[1.05, 1.28, 1.05]}>
      <torusKnotGeometry args={[0.82, 0.16, 230, 26, 2, 3]} />
      <StudioMaterial kind={kind} side={THREE.DoubleSide} />
    </mesh>
  );
}

function WoodRoot({ kind }: { kind: ModelKind }) {
  const branches = [
    [0, 0.1, 0, 0.16, 2.2, 0, 0, 0],
    [-0.42, 0.2, 0.02, 0.12, 1.65, 0, 0, -0.5],
    [0.38, 0.3, -0.04, 0.1, 1.5, 0, 0, 0.46],
    [-0.15, -0.44, 0.16, 0.14, 1.32, 0.8, 0.15, 0.2],
  ];
  return (
    <group position={[0, -0.35, 0]}>
      {branches.map(([x, y, z, r, h, rx, ry, rz], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, y, z]} rotation={[rx, ry, rz]}>
          <capsuleGeometry args={[r, h, 12, 24]} />
          <StudioMaterial kind={kind} />
        </mesh>
      ))}
      {[[-0.22, 1.08, 0], [0.24, 1.0, 0.06], [0, -1.1, 0.1]].map(([x, y, z], i) => (
        <mesh key={`b-${i}`} castShadow receiveShadow position={[x, y, z]} scale={[0.42, 0.5, 0.34]}>
          <sphereGeometry args={[1, 36, 18]} />
          <StudioMaterial kind={kind} />
        </mesh>
      ))}
    </group>
  );
}

function BlueCeramic({ kind }: { kind: ModelKind }) {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= 72; i++) {
    const t = i / 72;
    const y = t * 3 - 1.5;
    const r = 0.18 + Math.sin(t * Math.PI) * (0.42 + 0.16 * Math.sin(t * Math.PI * 2.2));
    points.push(new THREE.Vector2(Math.max(0.08, r), y));
  }
  return (
    <mesh castShadow receiveShadow rotation={[0.08, 0.12, -0.18]} scale={[0.9, 1.05, 0.9]}>
      <latheGeometry args={[points, 128]} />
      <StudioMaterial kind={kind} />
    </mesh>
  );
}

function SlenderFigure({ kind }: { kind: ModelKind }) {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]} scale={[0.21, 1.25, 0.18]} rotation={[0, 0.18, -0.08]}>
        <capsuleGeometry args={[0.42, 1.55, 16, 32]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.78, 0]} scale={[0.18, 0.18, 0.18]}>
        <sphereGeometry args={[1, 42, 20]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.28, 0.35, 0]} rotation={[0, 0, -0.28]}>
        <capsuleGeometry args={[0.055, 1.15, 10, 18]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.18, -0.95, 0]} rotation={[0, 0, 0.06]}>
        <capsuleGeometry args={[0.07, 1.5, 12, 22]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh receiveShadow position={[0, -1.88, 0]} scale={[0.72, 0.08, 0.48]}>
        <boxGeometry args={[1, 1, 1]} />
        <StudioMaterial kind={kind} />
      </mesh>
    </group>
  );
}

function WhiteLoop({ kind }: { kind: ModelKind }) {
  return (
    <group>
      <mesh castShadow receiveShadow scale={[0.92, 1.12, 0.92]} rotation={[0.22, 0.28, 0.05]}>
        <torusKnotGeometry args={[0.7, 0.18, 210, 28, 1, 2]} />
        <StudioMaterial kind={kind} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.34, -0.28, 0]} scale={[0.42, 1.08, 0.18]} rotation={[0.12, 0.55, -0.36]}>
        <sphereGeometry args={[1, 48, 24]} />
        <StudioMaterial kind={kind} />
      </mesh>
    </group>
  );
}

function BronzeFall({ kind }: { kind: ModelKind }) {
  return (
    <group rotation={[0, 0, Math.PI]} position={[0, 0.16, 0]}>
      <FigureCurvy kind={kind} />
    </group>
  );
}

function Geometric({ kind }: { kind: ModelKind }) {
  return (
    <mesh castShadow receiveShadow scale={[0.72, 1.45, 0.55]} rotation={[0.16, 0.4, 0.12]}>
      <octahedronGeometry args={[1.22, 3]} />
      <StudioMaterial kind={kind} />
    </mesh>
  );
}

const Sculpture = ({ kind, viewAngle = 0 }: { kind: ModelKind; viewAngle?: number }) => {
  const node: ReactElement = (() => {
    if (kind === "hero-flight") return <HeroFlight kind={kind} />;
    if (kind === "hero-offering") return <BronzeOffering kind={kind} />;
    if (kind === "hero-torsion") return <HeroTorsion kind={kind} />;
    if (kind === "figure-curvy") return <FigureCurvy kind={kind} />;
    if (kind === "marble-fold") return <MarbleFold kind={kind} />;
    if (kind === "corten-ribbon" || kind === "amber-glass" || kind === "white-ring") return <Ribbon kind={kind} />;
    if (kind === "wood-root") return <WoodRoot kind={kind} />;
    if (kind === "blue-ceramic") return <BlueCeramic kind={kind} />;
    if (kind === "slender-figure" || kind === "black-figure") return <SlenderFigure kind={kind} />;
    if (kind === "white-loop") return <WhiteLoop kind={kind} />;
    if (kind === "bronze-fall") return <BronzeFall kind={kind} />;
    return <Geometric kind={kind} />;
  })();

  return (
    <group rotation={[0, viewAngle, 0]} scale={kind.startsWith("hero") ? 1.05 : 1}>
      {node}
    </group>
  );
};

export const SculptureViewer = ({ obraIndex, bgMode, titulo, material, viewAngle = 0, photoSrc, model }: SculptureViewerProps) => {
  const kind = useMemo(() => model ?? resolveModel(titulo, obraIndex), [model, titulo, obraIndex]);
  const studioIndex = ((obraIndex % studios.length) + studios.length) % studios.length;
  const studioBg = photoSrc ?? studios[studioIndex];
  const bg =
    bgMode === "white"
      ? { background: "#ffffff" }
      : bgMode === "dark"
      ? { background: "#0d0d0d" }
      : {
          backgroundImage: `url(${studioBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  return (
    <div className="absolute inset-0" style={bg}>
      <Canvas shadows camera={{ position: [0, 0.32, 5.2], fov: 31 }} dpr={[1, 1.6]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={bgMode === "dark" ? 0.28 : 0.58} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={bgMode === "dark" ? 1.75 : 1.22}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 2, -3]} intensity={0.46} />
          <spotLight position={[0, 5, 2]} angle={0.32} penumbra={0.8} intensity={0.55} castShadow />
          <Float speed={1.05} rotationIntensity={0.04} floatIntensity={0.22}>
            <Sculpture kind={kind} viewAngle={viewAngle} />
          </Float>
          <ContactShadows position={[0, -1.88, 0]} opacity={bgMode === "dark" ? 0.76 : 0.48} scale={6.5} blur={2.6} far={4.5} />
          <Environment preset={bgMode === "dark" ? "night" : "studio"} />
          <OrbitControls
            enablePan={false}
            enableZoom
            autoRotate
            autoRotateSpeed={0.28}
            minDistance={3.4}
            maxDistance={8}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 1.75}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
