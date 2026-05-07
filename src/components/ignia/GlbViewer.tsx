import { useState } from "react";
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

export function GlbViewer({
  url,
  alt = "Escultura 3D",
  className = "",
  poster,
  minHeight = "500px",
}: {
  url: string;
  alt?: string;
  className?: string;
  poster?: string;
  minHeight?: string;
}) {
  return (
    <div className={`relative w-full h-full ${className}`} style={{ background: "#f5f5f0" }}>
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
        ar=""
        ar-modes="webxr scene-viewer quick-look"
        poster={poster}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          minHeight,
          backgroundColor: "#f5f5f0",
          ["--poster-color" as never]: "transparent",
        }}
      >
        <div slot="progress-bar" style={{ display: "none" }} />
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
      </model-viewer>
    </div>
  );
}
