import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center, Bounds } from "@react-three/drei";
import { Loader2 } from "lucide-react";

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return (
    <Bounds fit clip observe margin={1.2}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </Bounds>
  );
}

export function GlbViewer({ url, className = "" }: { url: string; className?: string }) {
  const [interacted, setInteracted] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white/80 pointer-events-none">
          <Loader2 className="w-7 h-7 animate-spin" />
          <span className="mt-3 font-body text-[11px] uppercase tracking-[0.18em] text-white/60">
            Cargando vista 3D
          </span>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        onPointerDown={() => setInteracted(true)}
        onWheel={() => setInteracted(true)}
        onCreated={() => setLoading(false)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <Suspense fallback={null}>
          <Model url={url} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom
          enablePan={false}
          autoRotate={!interacted}
          autoRotateSpeed={1.2}
          minDistance={1.5}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}

// Preload demo URLs
useGLTF.preload("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf");
useGLTF.preload("https://threejs.org/examples/models/gltf/Michelle.glb");
