import { useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { Seo } from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";

const SLUGS: Record<string, { es: string; en: string }> = {
  "terminos": { es: "/legal/terminos.html", en: "/legal/en/terminos.html" },
  "privacidad": { es: "/legal/privacidad.html", en: "/legal/en/privacidad.html" },
  "envios-y-devoluciones": { es: "/legal/envios-y-devoluciones.html", en: "/legal/en/envios-y-devoluciones.html" },
  "cookies": { es: "/legal/cookies.html", en: "/legal/en/cookies.html" },
  "accesibilidad": { es: "/legal/accesibilidad.html", en: "/legal/en/accesibilidad.html" },
};

const LEGAL_SEO: Record<string, { title: string; description: string }> = {
  "terminos": {
    title: "Terms & Conditions | Ignia Gallery",
    description: "The terms that govern the use of Ignia Gallery, the sale of sculptures, artist plans and the responsibilities of buyers and sellers.",
  },
  "privacidad": {
    title: "Privacy Policy | Ignia Gallery",
    description: "How Ignia Gallery collects, uses and protects personal data of visitors, artists and buyers under the GDPR.",
  },
  "envios-y-devoluciones": {
    title: "Shipping & Returns Policy | Ignia Gallery",
    description: "How sculptures purchased on Ignia are packed, insured and shipped worldwide, and how returns and the 14-day withdrawal period work.",
  },
  "cookies": {
    title: "Cookie Policy | Ignia Gallery",
    description: "Which cookies Ignia Gallery uses, what they are for and how you can manage or withdraw your consent at any time.",
  },
  "accesibilidad": {
    title: "Accessibility Statement | Ignia Gallery",
    description: "Our commitment to making Ignia Gallery usable by everyone, the standards we follow and how to report an accessibility barrier.",
  },
};


export default function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const lang = useLang();
  const src = slug ? SLUGS[slug]?.[lang] : undefined;
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
