import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";
import bg1 from "@/assets/hero-bg-1.jpg";
import bg2 from "@/assets/hero-bg-2.jpg";
import bg3 from "@/assets/hero-bg-3.jpg";

const studios = [bg1, bg2, bg3];

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
  titulo?: string;
  material?: string;
}

const normalizeTitle = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const titleVariants: Record<string, number> = {
  "lirio en vuelo": 0,
  "lily in flight": 0,
  ofrenda: 1,
  offering: 1,
  "torsion i": 2,
  confluencia: 3,
  confluence: 3,
  "pliegue iii": 4,
  "fold iii": 4,
  vertigo: 5,
  raiz: 6,
  root: 6,
  origen: 7,
  origin: 7,
  eco: 8,
  echo: 8,
  quietud: 9,
  stillness: 9,
  "luz interior": 10,
  "inner light": 10,
  caida: 11,
  fall: 11,
  umbral: 12,
  threshold: 12,
  vertice: 13,
  vertex: 13,
  resto: 14,
  remnant: 14,
  arco: 15,
  arch: 15,
  memoria: 16,
  memory: 16,
  nexo: 17,
  nexus: 17,
  latido: 18,
  heartbeat: 18,
  orbita: 19,
  orbit: 19,
  mineral: 20,
  respiro: 21,
  breath: 21,
};

const resolveVariant = (titulo: string | undefined, obraIndex: number) => {
  const normalized = normalizeTitle(titulo);
  if (normalized in titleVariants) return titleVariants[normalized];
  return ((obraIndex % 24) + 24) % 24;
};

// "Lirio en vuelo" — elegant elongated bronze drop / flame form
function BronzeFlight() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80;
    const y = t * 3.6 - 1.8;
    // Smooth tear-drop / flame profile
    const base = Math.sin(Math.pow(t, 0.85) * Math.PI);
    const taper = 1 - Math.pow(Math.abs(t - 0.35) * 1.2, 1.6);
    const r = Math.max(0.02, 0.55 * base * Math.max(0.15, taper));
    points.push(new THREE.Vector2(r, y));
  }
  return (
    <mesh ref={ref} castShadow receiveShadow position={[0, 0.05, 0]}>
      <latheGeometry args={[points, 160]} />
      <meshPhysicalMaterial
        color="#6b3a17"
        metalness={1}
        roughness={0.28}
        clearcoat={0.4}
        clearcoatRoughness={0.35}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

// "Ofrenda" — polished bronze möbius-like ribbon (parametric)
function BronzeOffering() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.28;
  });
  const geom = (() => {
    const g = new ParametricGeometry(
      (u, v, target) => {
        const U = u * Math.PI * 2;
        const V = (v - 0.5) * 0.55;
        const a = 1.1 + V * Math.cos(U / 2);
        const x = a * Math.cos(U);
        const y = V * Math.sin(U / 2) * 1.4;
        const z = a * Math.sin(U);
        target.set(x, y, z);
      },
      180,
      24
    );
    g.computeVertexNormals();
    return g;
  })();
  return (
    <mesh ref={ref} castShadow receiveShadow geometry={geom} scale={1.05}>
      <meshPhysicalMaterial
        color="#9a6a32"
        metalness={1}
        roughness={0.14}
        clearcoat={0.6}
        clearcoatRoughness={0.18}
        envMapIntensity={1.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// "Torsión I" — alabaster smooth torsion (high-segment twisted lathe with displacement)
function AlabasterTorsion() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });
  // Twisted, tapered organic column built from a tube along a curved spine
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -1.6, 0),
    new THREE.Vector3(0.18, -0.8, 0.05),
    new THREE.Vector3(-0.12, 0, -0.05),
    new THREE.Vector3(0.1, 0.8, 0.04),
    new THREE.Vector3(0, 1.7, 0),
  ]);
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <tubeGeometry args={[curve, 220, 0.5, 48, false]} />
      <meshPhysicalMaterial
        color="#f1ece2"
        metalness={0.04}
        roughness={0.42}
        transmission={0.18}
        thickness={1.2}
        clearcoat={0.25}
        envMapIntensity={0.9}
      />
    </mesh>
  );
}

const Sculpture = ({ idx }: { idx: number }) => {
  if (idx === 0) return <BronzeFlight />;
  if (idx === 1) return <BronzeOffering />;
  return <AlabasterTorsion />;
};

export const SculptureViewer = ({ obraIndex, bgMode }: SculptureViewerProps) => {
  const bg =
    bgMode === "white"
      ? { background: "#ffffff" }
      : bgMode === "dark"
      ? { background: "#0d0d0d" }
      : {
          backgroundImage: `url(${studios[obraIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  return (
    <div className="absolute inset-0" style={bg}>
      <Canvas shadows camera={{ position: [0, 0.4, 5.2], fov: 32 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={bgMode === "dark" ? 0.25 : 0.6} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={bgMode === "dark" ? 1.6 : 1.1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 2, -3]} intensity={0.4} />
          <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25}>
            <Sculpture idx={obraIndex} />
          </Float>
          <ContactShadows position={[0, -1.65, 0]} opacity={bgMode === "dark" ? 0.7 : 0.45} scale={6} blur={2.4} far={4} />
          <Environment preset={bgMode === "dark" ? "night" : "studio"} />
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={3.5}
            maxDistance={8}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
