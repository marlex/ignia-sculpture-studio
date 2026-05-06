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

const Sculpture = ({ variant, material }: { variant: number; material?: string }) => {
  const family = variant < 3 ? variant : 3 + ((variant - 3) % 9);
  const profile = variant % 5;
  const normalizedMaterial = normalizeTitle(material);
  const isLight = normalizedMaterial.includes("alabastro") || normalizedMaterial.includes("alabaster") || normalizedMaterial.includes("marmol") || normalizedMaterial.includes("marble");
  const isGlass = normalizedMaterial.includes("vidrio") || normalizedMaterial.includes("glass");
  const isWood = normalizedMaterial.includes("madera") || normalizedMaterial.includes("wood");
  const baseColor = isGlass ? "#dfe9e6" : isLight ? "#f1ece2" : isWood ? "#7a4a28" : family % 3 === 1 ? "#9a6a32" : "#6b3a17";
  const metalness = isLight || isGlass || isWood ? 0.04 : 1;
  const roughness = isGlass ? 0.08 : isLight ? 0.42 : isWood ? 0.58 : family % 3 === 1 ? 0.14 : 0.28;
  const commonMaterial = (
    <meshPhysicalMaterial
      color={baseColor}
      metalness={metalness}
      roughness={roughness}
      transmission={isGlass ? 0.5 : isLight ? 0.14 : 0}
      thickness={isGlass || isLight ? 1.2 : 0.1}
      clearcoat={isGlass ? 0.75 : isLight ? 0.25 : 0.45}
      envMapIntensity={isGlass ? 1.5 : 1.1}
      side={family === 1 ? THREE.DoubleSide : THREE.FrontSide}
    />
  );
  const wrap = (node: JSX.Element) => (
    <group
      scale={[0.9 + profile * 0.045, 0.94 + ((variant + 2) % 4) * 0.055, 0.9 + ((variant + 4) % 5) * 0.035]}
      rotation={[profile * 0.035, variant * 0.17, -profile * 0.025]}
    >
      {node}
    </group>
  );

  if (family === 0) return wrap(<BronzeFlight />);
  if (family === 1) return wrap(<BronzeOffering />);
  if (family === 2) return wrap(<AlabasterTorsion />);
  if (family === 3) {
    return wrap(<mesh castShadow receiveShadow rotation={[0.28, 0.25, -0.15]}><torusKnotGeometry args={[0.82, 0.19, 180, 22, 2, 3]} />{commonMaterial}</mesh>);
  }
  if (family === 4) {
    return wrap(<mesh castShadow receiveShadow scale={[1.25, 1.65, 0.28]} rotation={[0.1, 0.35, 0.08]}><boxGeometry args={[1, 1, 1, 12, 18, 6]} />{commonMaterial}</mesh>);
  }
  if (family === 5) {
    return wrap(<mesh castShadow receiveShadow rotation={[0.15, 0.25, -0.08]}><coneGeometry args={[0.62, 3.1, 7, 16]} />{commonMaterial}</mesh>);
  }
  if (family === 6) {
    return <mesh castShadow receiveShadow rotation={[0.05, 0.2, 0.16]}><cylinderGeometry args={[0.28, 0.72, 2.9, 9, 12]} />{commonMaterial}</mesh>;
  }
  if (family === 7) {
    return <mesh castShadow receiveShadow scale={[0.9, 1.38, 0.9]}><sphereGeometry args={[0.98, 64, 32]} />{commonMaterial}</mesh>;
  }
  if (family === 8) {
    return <mesh castShadow receiveShadow rotation={[0.2, 0.35, 0]}><torusGeometry args={[0.82, 0.14, 24, 150]} />{commonMaterial}</mesh>;
  }
  if (family === 9) {
    return <mesh castShadow receiveShadow scale={[0.72, 1.45, 0.5]} rotation={[0.08, 0.45, 0.05]}><octahedronGeometry args={[1.25, 3]} />{commonMaterial}</mesh>;
  }
  if (family === 10) {
    return <mesh castShadow receiveShadow scale={[0.62, 1.75, 0.62]} rotation={[0.12, 0.25, 0]}><icosahedronGeometry args={[1.08, 4]} />{commonMaterial}</mesh>;
  }
  return <mesh castShadow receiveShadow rotation={[0.18, 0.3, -0.12]}><dodecahedronGeometry args={[1.1, 2]} />{commonMaterial}</mesh>;
};

export const SculptureViewer = ({ obraIndex, bgMode, titulo, material }: SculptureViewerProps) => {
  const variant = useMemo(() => resolveVariant(titulo, obraIndex), [titulo, obraIndex]);
  const studioIndex = ((variant % studios.length) + studios.length) % studios.length;
  const bg =
    bgMode === "white"
      ? { background: "#ffffff" }
      : bgMode === "dark"
      ? { background: "#0d0d0d" }
      : {
          backgroundImage: `url(${studios[studioIndex]})`,
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
            <Sculpture variant={variant} material={material} />
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
