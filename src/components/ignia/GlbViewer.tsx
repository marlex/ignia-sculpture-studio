import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import "@google/model-viewer/dist/model-viewer.min.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean | "";
          "auto-rotate-delay"?: string | number;
          "rotation-per-second"?: string;
          "camera-controls"?: boolean | "";
          "shadow-intensity"?: string | number;
          "shadow-softness"?: string | number;
          "environment-image"?: string;
          "tone-mapping"?: string;
          exposure?: string | number;
          ar?: boolean | "";
          "ar-modes"?: string;
          poster?: string;
        },
        HTMLElement
      >;
    }
  }
}

function ModelViewerContent({
  url,
  alt,
  poster,
  minHeight,
  showAr = true,
  bgColor = "#f5f5f0",
}: {
  url: string;
  alt: string;
  poster?: string;
  minHeight: string;
  showAr?: boolean;
  bgColor?: string;
}) {
  return (
    <model-viewer
      src={url}
      alt={alt}
      camera-controls=""
      auto-rotate=""
      auto-rotate-delay={1500}
      rotation-per-second="15deg"
      shadow-intensity="2"
      shadow-softness="1"
      environment-image="legacy"
      exposure="0.8"
      tone-mapping="commerce"
      {...(showAr ? { ar: "" as const, "ar-modes": "webxr scene-viewer quick-look" } : {})}
      poster={poster}
      style={{
        width: "100%",
        height: "100%",
        minHeight,
        backgroundColor: bgColor,
        ["--poster-color" as never]: "transparent",
      }}
    >
      <div slot="progress-bar" style={{ display: "none" }} />
      {showAr && (
        <button
          slot="ar-button"
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            background: "black",
            color: "white",
            fontFamily: "Manrope, sans-serif",
            fontSize: "11px",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Ver en tu espacio
        </button>
      )}
    </model-viewer>
  );
}

export function GlbViewer({
  url,
  alt = "Escultura 3D",
  className = "",
  poster,
  minHeight = "500px",
  enableFullscreen = true,
  bgColor = "#f5f5f0",
  onClose,
}: {
  url: string;
  alt?: string;
  className?: string;
  poster?: string;
  minHeight?: string;
  enableFullscreen?: boolean;
  bgColor?: string;
  onClose?: () => void;
}) {
  const [fs, setFs] = useState(false);

  return (
    <>
      <div className={`relative w-full h-full ${className}`} style={{ background: bgColor }}>
        <ModelViewerContent url={url} alt={alt} poster={poster} minHeight={minHeight} bgColor={bgColor} />
        {onClose ? (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Cerrar"
            className="absolute top-3 right-3 z-20 w-11 h-11 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>
        ) : enableFullscreen && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setFs(true); }}
            aria-label="Ampliar 3D"
            className="absolute top-3 right-3 z-20 w-10 h-10 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {fs && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setFs(false)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity"
          >
            <X className="w-7 h-7" />
          </button>
          <div className="w-full h-full">
            <ModelViewerContent url={url} alt={alt} poster={poster} minHeight="100vh" bgColor={bgColor} />
          </div>
        </div>
      )}
    </>
  );
}

