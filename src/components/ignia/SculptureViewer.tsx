import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  AccumulativeShadows,
  RandomizedLight,
  MeshTransmissionMaterial,
  Center,
  PerspectiveCamera,
} from "@react-three/drei";
import { EffectComposer, SSAO, Bloom, Vignette, SMAA, BrightnessContrast, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
}

/* ========== high-detail procedural geometries ========== */

// 01 — Lirio en vuelo: lathe profile + tall organic petals
const Lirio = () => {
  const profile = Array.from({ length: 120 }, (_, i) => {
    const t = i / 119;
    const r =
      0.18 +
      Math.sin(t * Math.PI) * 0.55 +
      Math.sin(t * Math.PI * 3) * 0.06 +
      Math.sin(t * Math.PI * 9) * 0.012;
    const y = t * 2.4 - 1.2;
    return new THREE.Vector2(Math.max(0.04, r * (1 - t * 0.45)), y);
  });
  const lathe = new THREE.LatheGeometry(profile, 192);
  lathe.computeVertexNormals();

  return (
    <group>
      <mesh castShadow receiveShadow geometry={lathe}>
        <meshPhysicalMaterial
          color="#f1ede5"
          roughness={0.42}
          metalness={0}
          clearcoat={0.25}
          clearcoatRoughness={0.65}
          sheen={0.4}
          sheenColor="#fff"
          sheenRoughness={0.6}
        />
      </mesh>
      {[0, 1, 2].map(i => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={i}
            castShadow
            receiveShadow
            position={[Math.cos(a) * 0.32, 0.65, Math.sin(a) * 0.32]}
            rotation={[Math.PI * 0.18, a, Math.PI * 0.28]}
            scale={[0.42, 1.25, 0.1]}
          >
            <sphereGeometry args={[0.6, 96, 96]} />
            <meshPhysicalMaterial
              color="#ece8df"
              roughness={0.38}
              clearcoat={0.3}
              clearcoatRoughness={0.55}
              sheen={0.4}
              sheenColor="#fff"
            />
          </mesh>
        );
      })}
    </group>
  );
};

// 02 — Ofrenda: bronze vessel, hand-polished
const Ofrenda = () => (
  <group>
    <mesh castShadow receiveShadow position={[0, -0.92, 0]}>
      <cylinderGeometry args={[0.55, 0.7, 0.32, 96]} />
      <meshPhysicalMaterial color="#221712" roughness={0.7} metalness={0.4} />
    </mesh>
    <mesh castShadow position={[0, -0.5, 0]}>
      <cylinderGeometry args={[0.13, 0.2, 0.5, 64]} />
      <meshPhysicalMaterial color="#7a5a2c" roughness={0.28} metalness={1} clearcoat={0.4} />
    </mesh>
    <mesh castShadow receiveShadow position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.88, 0.34, 128, 256]} />
      <meshPhysicalMaterial
        color="#a87a3e"
        roughness={0.18}
        metalness={1}
        clearcoat={0.7}
        clearcoatRoughness={0.12}
      />
    </mesh>
    <mesh castShadow position={[0, 0.62, 0]}>
      <sphereGeometry args={[0.24, 96, 96]} />
      <meshPhysicalMaterial color="#caa066" roughness={0.12} metalness={1} clearcoat={0.85} />
    </mesh>
  </group>
);

// 03 — Torsión I: alabastro translúcido
const Torsion = () => (
  <mesh castShadow receiveShadow rotation={[0.18, 0, 0.28]}>
    <torusKnotGeometry args={[0.78, 0.27, 512, 96, 2, 3]} />
    <MeshTransmissionMaterial
      color="#f8f5ee"
      thickness={0.55}
      roughness={0.2}
      transmission={0.55}
      ior={1.46}
      chromaticAberration={0.015}
      backside
      backsideThickness={0.28}
      attenuationDistance={2.2}
      attenuationColor="#e8e0cf"
      anisotropy={0.2}
    />
  </mesh>
);

/* ========== scene ========== */

const Sculpture = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.18;
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

/* ========== viewer ========== */

export const SculptureViewer = ({ obraIndex, bgMode }: SculptureViewerProps) => {
  const bgColor =
    bgMode === "white" ? "#ffffff" : bgMode === "dark" ? "#0b0b0b" : "#e8e2d4";

  const envPreset =
    bgMode === "dark" ? "night" : bgMode === "white" ? "studio" : "apartment";

  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          bgMode === "studio"
            ? "radial-gradient(ellipse 70% 60% at 50% 35%, #efe9db 0%, #d7cfbd 55%, #ada392 100%)"
            : bgColor,
      }}
    >
      <Canvas
        key={`${obraIndex}-${bgMode}`}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: bgMode === "dark" ? 0.95 : 1.05,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.3, 4.4]} fov={32} />
        <color attach="background" args={[bgColor]} />

        <ambientLight intensity={bgMode === "dark" ? 0.12 : 0.25} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={bgMode === "dark" ? 1.6 : 1.25}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0004}
          shadow-normalBias={0.02}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#cfd8e6" />
        <pointLight position={[0, -2, 3]} intensity={0.3} color="#fff1dc" />

        <Suspense fallback={null}>
          <Sculpture index={obraIndex} />

          <AccumulativeShadows
            position={[0, -1.36, 0]}
            frames={80}
            alphaTest={0.85}
            scale={8}
            opacity={bgMode === "dark" ? 0.85 : 0.75}
            color={bgMode === "dark" ? "#000" : "#1a1612"}
          >
            <RandomizedLight
              amount={8}
              radius={5}
              ambient={0.5}
              intensity={1}
              position={[5, 6, -2]}
              bias={0.001}
            />
          </AccumulativeShadows>

          <ContactShadows
            position={[0, -1.355, 0]}
            opacity={0.35}
            scale={5}
            blur={1.6}
            far={2}
            resolution={1024}
            color="#000"
          />

          <Environment preset={envPreset as "studio" | "night" | "apartment"} background={false} />

          <EffectComposer multisampling={0} enableNormalPass>
            <SSAO
              blendFunction={BlendFunction.MULTIPLY}
              samples={24}
              radius={0.08}
              intensity={22}
              luminanceInfluence={0.6}
              worldDistanceThreshold={1}
              worldDistanceFalloff={1}
              worldProximityThreshold={1}
              worldProximityFalloff={1}
            />
            <Bloom
              intensity={bgMode === "dark" ? 0.45 : 0.18}
              luminanceThreshold={0.85}
              luminanceSmoothing={0.2}
              mipmapBlur
            />
            <HueSaturation saturation={-0.05} hue={0} />
            <BrightnessContrast brightness={0} contrast={0.06} />
            <Vignette eskil={false} offset={0.25} darkness={bgMode === "dark" ? 0.7 : 0.45} />
            <SMAA />
          </EffectComposer>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={2.8}
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
