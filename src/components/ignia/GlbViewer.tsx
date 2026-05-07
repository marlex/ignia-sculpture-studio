import { useEffect } from "react";
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
          "camera-controls"?: boolean | "";
          "shadow-intensity"?: string | number;
          "environment-image"?: string;
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
  height = "100%",
}: {
  url: string;
  alt?: string;
  className?: string;
  poster?: string;
  height?: string;
}) {
  useEffect(() => {
    // ensure custom element is registered
  }, []);

  return (
    <div className={`relative w-full h-full bg-transparent ${className}`}>
      {/* model-viewer custom element from @google/model-viewer */}
      <model-viewer
        src={url}
        alt={alt}
        auto-rotate=""
        camera-controls=""
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        ar=""
        ar-modes="webxr scene-viewer quick-look"
        poster={poster}
        style={{ width: "100%", height, background: "transparent" }}
      />
    </div>
  );
}
