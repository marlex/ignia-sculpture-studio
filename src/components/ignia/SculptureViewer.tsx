import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  MeshTransmissionMaterial,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
}

/* ---------- procedural sculpture geometries ---------- */

// 01 — Lirio en vuelo (mármol de Carrara): tres pétalos torsionados que se elevan
const LirioGeometry = () => {
  const geom = new THREE.LatheGeometry(
    Array.from({ length: 60 }, (_, i) => {
      const t = i / 59;
      const r = 0.18 + Math.sin(t * Math.PI) * 0.55 + Math.sin(t * Math.PI * 3) * 0.08;
      const y = t * 2.4 - 1.2;
      return new THREE.Vector2(Math.max(0.05, r * (1 - t * 0.4)), y);
    }),
    96
  );
  geom.computeVertexNormals();
  return <primitive object={geom} attach="geometry" />;
};

const Lirio = () => (
  <group>
    <mesh castShadow receiveShadow>
      <LirioGeometry />
      <meshPhysicalMaterial
        color="#f4f1ec"
        roughness={0.32}
        metalness={0}
        clearcoat={0.4}
        clearcoatRoughness={0.5}
        sheen={0.3}
        sheenColor="#fff"
      />
    </mesh>
    {[0, 1, 2].map(i => {
      const a = (i / 3) * Math.PI * 2;
      return (
        <mesh
          key={i}
          castShadow
          position={[Math.cos(a) * 0.35, 0.6, Math.sin(a) * 0.35]}
          rotation={[Math.PI * 0.15, a, Math.PI * 0.25]}
          scale={[0.45, 1.1, 0.12]}
        >
          <sphereGeometry args={[0.6, 48, 48]} />
          <meshPhysicalMaterial
            color="#efece6"
            roughness={0.28}
            clearcoat={0.5}
            clearcoatRoughness={0.4}
          />
        </mesh>
      );
    })}
  </group>
);

// 02 — Ofrenda (bronce pulido): cuenco/torus elevado sobre base
const Ofrenda = () => (
  <group>
    <mesh castShadow receiveShadow position={[0, -0.9, 0]}>
      <cylinderGeometry args={[0.55, 0.7, 0.35, 64]} />
      <meshPhysicalMaterial color="#3a2a1a" roughness={0.55} metalness={0.6} />
    </mesh>
    <mesh castShadow position={[0, -0.5, 0]}>
      <cylinderGeometry args={[0.12, 0.18, 0.5, 32]} />
      <meshStandardMaterial color="#8a6a3a" roughness={0.35} metalness={0.95} />
    </mesh>
    <mesh castShadow receiveShadow position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.85, 0.32, 64, 128]} />
      <meshPhysicalMaterial
        color="#b5874a"
        roughness={0.2}
        metalness={1}
        clearcoat={0.6}
        clearcoatRoughness={0.15}
      />
    </mesh>
    <mesh castShadow position={[0, 0.55, 0]}>
      <sphereGeometry args={[0.22, 48, 48]} />
      <meshPhysicalMaterial color="#d9a25c" roughness={0.15} metalness={1} clearcoat={0.8} />
    </mesh>
  </group>
);

// 03 — Torsión I (alabastro blanco): nudo torsionado translúcido
const Torsion = () => (
  <mesh castShadow receiveShadow rotation={[0.2, 0, 0.3]}>
    <torusKnotGeometry args={[0.75, 0.26, 256, 48, 2, 3]} />
    <MeshTransmissionMaterial
      color="#f7f4ee"
      thickness={0.6}
      roughness={0.18}
      transmission={0.6}
      ior={1.45}
      chromaticAberration={0.02}
      backside
      backsideThickness={0.3}
      attenuationDistance={2}
      attenuationColor="#ece5d6"
    />
  </mesh>
);

/* ---------- scene wrapper with idle auto-rotation ---------- */

const Sculpture = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.25;
  });
  return (
    <group ref={ref}>
      <Center disableY>
        {index === 0 && <Lirio />}
        {index === 1 && <Ofrenda />}
        {index === 2 && <Torsion />}
      </Center>
    </group>
  );
};

/* ---------- main viewer ---------- */

export const SculptureViewer = ({ obraIndex, bgMode }: SculptureViewerProps) => {
  const bgStyle =
    bgMode === "white"
      ? { background: "#ffffff" }
      : bgMode === "dark"
      ? { background: "#0d0d0d" }
      : {
          background:
            "radial-gradient(ellipse at 50% 35%, #eeeae2 0%, #d9d2c4 55%, #b8ad99 100%)",
        };

  const envPreset = bgMode === "dark" ? "night" : "studio";

  return (
    <div className="absolute inset-0" style={bgStyle}>
      <Canvas
        key={`${obraIndex}-${bgMode}`}
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 4.2], fov: 35 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={[bgMode === "dark" ? "#0d0d0d" : bgMode === "white" ? "#ffffff" : "#e6e0d3"]} />

        <ambientLight intensity={bgMode === "dark" ? 0.15 : 0.35} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={bgMode === "dark" ? 1.4 : 1.1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#cfd8e6" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35} floatingRange={[-0.05, 0.05]}>
            <Sculpture index={obraIndex} />
          </Float>

          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={bgMode === "dark" ? 0.6 : 0.45}
            scale={6}
            blur={2.4}
            far={3}
            resolution={1024}
            color={bgMode === "dark" ? "#000" : "#1a1a1a"}
          />

          <Environment preset={envPreset as "studio" | "night"} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={2.6}
          maxDistance={6}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
          rotateSpeed={0.7}
          zoomSpeed={0.6}
        />
      </Canvas>
    </div>
  );
};
