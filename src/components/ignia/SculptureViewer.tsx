import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import bg1 from "@/assets/hero-bg-1.jpg";
import bg2 from "@/assets/hero-bg-2.jpg";
import bg3 from "@/assets/hero-bg-3.jpg";

const studios = [bg1, bg2, bg3];

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
}

// Procedural bronze sculpture — twisted vertical form (Lirio en vuelo)
function BronzeFlight() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  // Build a twisted lathe profile
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const y = t * 3.2 - 1.6;
    const r = 0.45 + 0.35 * Math.sin(t * Math.PI) - 0.15 * t;
    points.push(new THREE.Vector2(Math.max(0.05, r), y));
  }
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <latheGeometry args={[points, 96]} />
      <meshStandardMaterial color="#7a4a1f" metalness={1} roughness={0.32} envMapIntensity={1.2} />
    </mesh>
  );
}

// Polished bronze "Ofrenda" — torus knot
function BronzeOffering() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow scale={0.95}>
      <torusKnotGeometry args={[1, 0.32, 220, 32, 2, 3]} />
      <meshStandardMaterial color="#8a5a2b" metalness={1} roughness={0.18} envMapIntensity={1.4} />
    </mesh>
  );
}

// Alabaster "Torsión I" — twisted column
function AlabasterTorsion() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.32;
  });
  // Build a twisted box-ish form via segments
  return (
    <group ref={ref}>
      {Array.from({ length: 28 }).map((_, i) => {
        const t = i / 27;
        const y = t * 3 - 1.5;
        const rot = t * Math.PI * 1.4;
        const s = 0.55 + 0.18 * Math.sin(t * Math.PI);
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[0, rot, 0]} castShadow receiveShadow>
            <boxGeometry args={[s, 3 / 28 + 0.01, s * 0.55]} />
            <meshStandardMaterial color="#efeae0" metalness={0.05} roughness={0.55} />
          </mesh>
        );
      })}
    </group>
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
