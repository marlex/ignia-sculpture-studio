import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
}

const bgMap = { studio: 0xf8f8f6, white: 0xffffff, dark: 0x111111 };

export const SculptureViewer = ({ obraIndex, bgMode }: SculptureViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    mesh?: THREE.Mesh;
    geos: THREE.BufferGeometry[];
    mats: THREE.MeshStandardMaterial[];
    rx: number;
    ry: number;
    drag: boolean;
    ox: number;
    oy: number;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
  }>({
    geos: [],
    mats: [],
    rx: 0.12,
    ry: 0,
    drag: false,
    ox: 0,
    oy: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(bgMap.studio, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgMap.studio);

    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.6, 6);

    const geos = [
      new THREE.TorusKnotGeometry(1.15, 0.4, 300, 32, 2, 3),
      new THREE.TorusGeometry(1.05, 0.48, 80, 160),
      new THREE.IcosahedronGeometry(1.25, 5),
    ];
    const mats = [
      new THREE.MeshStandardMaterial({ color: 0x9a7b5a, roughness: 0.18, metalness: 0.82 }),
      new THREE.MeshStandardMaterial({ color: 0xece8e0, roughness: 0.55, metalness: 0.05 }),
      new THREE.MeshStandardMaterial({ color: 0xd8d0c4, roughness: 0.45, metalness: 0.02 }),
    ];

    const mesh = new THREE.Mesh(geos[0], mats[0]);
    mesh.position.set(0, 0.2, 0);
    scene.add(mesh);

    const peana = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.05, 80),
      new THREE.MeshStandardMaterial({ color: 0xe5e1d8, roughness: 0.95, metalness: 0 })
    );
    peana.position.y = -2.0;
    scene.add(peana);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xfffaf0, 1.8);
    key.position.set(5, 8, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xeef2ff, 0.4);
    fill.position.set(-5, 0, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffeedd, 0.35);
    rim.position.set(0, -4, -5);
    scene.add(rim);

    stateRef.current.mesh = mesh;
    stateRef.current.geos = geos;
    stateRef.current.mats = mats;
    stateRef.current.scene = scene;
    stateRef.current.renderer = renderer;

    const onDown = (x: number, y: number) => {
      stateRef.current.drag = true;
      stateRef.current.ox = x;
      stateRef.current.oy = y;
    };
    const onUp = () => { stateRef.current.drag = false; };
    const onMove = (x: number, y: number) => {
      const s = stateRef.current;
      if (!s.drag) return;
      s.ry += (x - s.ox) * 0.011;
      s.rx += (y - s.oy) * 0.007;
      s.rx = Math.max(-0.6, Math.min(0.6, s.rx));
      s.ox = x; s.oy = y;
    };

    const md = (e: MouseEvent) => onDown(e.clientX, e.clientY);
    const mm = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const ts = (e: TouchEvent) => onDown(e.touches[0].clientX, e.touches[0].clientY);
    const tm = (e: TouchEvent) => onMove(e.touches[0].clientX, e.touches[0].clientY);
    const wh = (e: WheelEvent) => {
      camera.position.z = Math.max(3.5, Math.min(10, camera.position.z + e.deltaY * 0.005));
    };
    const rs = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    canvas.addEventListener("mousedown", md);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", mm);
    canvas.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchmove", tm, { passive: true });
    canvas.addEventListener("wheel", wh, { passive: true });
    window.addEventListener("resize", rs);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const s = stateRef.current;
      if (!s.drag) s.ry += 0.0025;
      if (s.mesh) {
        s.mesh.rotation.x = s.rx;
        s.mesh.rotation.y = s.ry;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", mm);
      canvas.removeEventListener("touchstart", ts);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchmove", tm);
      canvas.removeEventListener("wheel", wh);
      window.removeEventListener("resize", rs);
      geos.forEach(g => g.dispose());
      mats.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    if (!s.mesh || !s.geos[obraIndex]) return;
    s.mesh.geometry = s.geos[obraIndex];
    s.mesh.material = s.mats[obraIndex];
    s.rx = 0.12;
    s.ry = 0;
  }, [obraIndex]);

  useEffect(() => {
    const s = stateRef.current;
    if (!s.scene || !s.renderer) return;
    const c = bgMap[bgMode];
    s.scene.background = new THREE.Color(c);
    s.renderer.setClearColor(c, 1);
  }, [bgMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing" />;
};
