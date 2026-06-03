import { useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";

const SLUGS: Record<string, string> = {
  "terminos": "/legal/terminos.html",
  "privacidad": "/legal/privacidad.html",
  "envios-y-devoluciones": "/legal/envios-y-devoluciones.html",
};

export default function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const src = slug ? SLUGS[slug] : undefined;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const resize = () => {
      const doc = iframeRef.current?.contentDocument;
      if (doc) {
        const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
        setHeight(h);
      }
    };
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.addEventListener("load", resize);
    const interval = setInterval(resize, 500);
    window.addEventListener("resize", resize);
    return () => {
      iframe.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
      clearInterval(interval);
    };
  }, [src]);

  if (!src) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <iframe
          ref={iframeRef}
          src={src}
          title="Legal"
          style={{ width: "100%", border: "none", display: "block", height }}
        />
      </main>
      <Footer />
    </div>
  );
}
