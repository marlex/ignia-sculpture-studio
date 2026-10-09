import type { Lang } from "@/i18n/LanguageContext";

const HUMAN_HEIGHT_CM = 170;

type Props = {
  heightCm: number;
  widthCm: number;
  depthCm?: number;
  weightKg?: number;
  lang: Lang;
};

// A line drawing of the work's silhouette next to a 170cm human figure,
// both to the same scale, with the real dimensions and weight printed
// below. Only rendered when a work has real measurements — see
// PerfilEscultor.tsx, which skips this entirely otherwise rather than
// guess at a scale.
export const ScaleDrawing = ({ heightCm, widthCm, depthCm, weightKg, lang }: Props) => {
  const maxH = Math.max(HUMAN_HEIGHT_CM, heightCm);
  const padding = 20;
  const viewH = maxH + padding * 2;
  const viewW = 180;
  const groundY = viewH - padding;

  const humanX = 40;
  const humanTop = groundY - HUMAN_HEIGHT_CM;
  const headR = 7;

  const workW = Math.max(widthCm, 10);
  const workX = 120;
  const workTop = groundY - heightCm;

  const t = lang === "es"
    ? { human: "1,70 m", dims: `${heightCm} × ${widthCm}${depthCm ? ` × ${depthCm}` : ""} cm`, weight: weightKg ? `${weightKg} kg` : null }
    : { human: "5'7\"", dims: `${heightCm} × ${widthCm}${depthCm ? ` × ${depthCm}` : ""} cm`, weight: weightKg ? `${weightKg} kg` : null };

  return (
    <div>
      <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-auto" style={{ maxHeight: 420 }}>
        <line x1={0} y1={groundY} x2={viewW} y2={groundY} stroke="#d4d4d4" strokeWidth={0.5} />

        {/* human figure */}
        <g stroke="#9a9a9a" strokeWidth={1.2} fill="none" strokeLinecap="round">
          <circle cx={humanX} cy={humanTop + headR} r={headR} />
          <line x1={humanX} y1={humanTop + headR * 2} x2={humanX} y2={groundY - HUMAN_HEIGHT_CM * 0.42} />
          <line x1={humanX} y1={humanTop + headR * 2 + 6} x2={humanX - 11} y2={humanTop + headR * 2 + 26} />
          <line x1={humanX} y1={humanTop + headR * 2 + 6} x2={humanX + 11} y2={humanTop + headR * 2 + 26} />
          <line x1={humanX} y1={groundY - HUMAN_HEIGHT_CM * 0.42} x2={humanX - 9} y2={groundY} />
          <line x1={humanX} y1={groundY - HUMAN_HEIGHT_CM * 0.42} x2={humanX + 9} y2={groundY} />
        </g>
        <text x={humanX} y={groundY + 14} textAnchor="middle" fontSize={7} fill="#9a9a9a" fontFamily="Manrope, sans-serif">{t.human}</text>

        {/* work silhouette, as a simple rounded block to the real height/width */}
        <rect
          x={workX - workW / 2}
          y={workTop}
          width={workW}
          height={heightCm}
          rx={Math.min(6, workW / 4)}
          fill="#f0efec"
          stroke="#121212"
          strokeWidth={1}
        />
      </svg>
      <div className="font-body text-[13px] text-ink mt-3" style={{ fontWeight: 500 }}>
        {t.dims}
        {t.weight && <> · {t.weight}</>}
      </div>
    </div>
  );
};
