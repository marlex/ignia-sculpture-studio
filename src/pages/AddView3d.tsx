import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import { GlbViewer } from "@/components/ignia/GlbViewer";
import { getObra, updateObra } from "@/data/obrasStore";
import { Camera, Lightbulb, RotateCcw, Image as ImgIcon, Check, AlertTriangle, Mail } from "lucide-react";

const DEMO_GLB = "https://threejs.org/examples/models/gltf/Michelle.glb";

export default function AddView3d() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const obra = getObra(id);

  const [stage, setStage] = useState<"A" | "B" | "C">("A");
  const [photos, setPhotos] = useState<File[]>([]);
  const [simCount, setSimCount] = useState(0);
  const totalCount = photos.length + simCount;
  const [progress, setProgress] = useState(0);
  const [emailNotify, setEmailNotify] = useState(true);
  const [success, setSuccess] = useState(true); // true → exit on C; toggle to false to test fail

  useEffect(() => {
    if (stage !== "B") return;
    setProgress(0);
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setStage("C"); return 100; }
        return p + 5;
      });
    }, 250);
    return () => clearInterval(t);
  }, [stage]);

  const onPickPhotos = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).filter(f => /image\/(jpeg|png)/.test(f.type) && f.size <= 8 * 1024 * 1024);
    setPhotos((prev) => [...prev, ...arr].slice(0, 40));
  };

  const publish3d = () => {
    if (!obra) return;
    updateObra(obra.id, { glbUrl: DEMO_GLB });
    navigate("/dashboard/obras");
  };

  if (!obra) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-gray mb-4">Obra no encontrada.</p>
          <Link to="/dashboard/obras" className="btn-primary">Volver a mis obras</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <Link to="/dashboard/obras" className="font-body text-[13px] text-gray hover:text-ink">Cancelar</Link>
      </header>

      <section className="max-w-[880px] mx-auto px-6 py-10 md:py-14">
        <div className="eyebrow mb-2">Añadir vista 3D</div>
        <h1 className="font-display font-bold text-[clamp(26px,3vw,38px)] tracking-[-0.02em] text-ink mb-2 leading-tight">
          {obra.titulo}
        </h1>
        <p className="font-body text-[14px] text-gray mb-10">Genera la vista 3D de tu escultura a partir de fotografías.</p>

        {/* Stepper */}
        <div className="flex items-center gap-3 mb-10">
          {(["A", "B", "C"] as const).map((s, i) => {
            const labels = { A: "Fotos", B: "Procesado", C: "Resultado" };
            const done = ["A", "B", "C"].indexOf(stage) > i;
            const active = stage === s;
            return (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className={`flex items-center gap-2 ${active || done ? "text-ink" : "text-muted-line"}`}>
                  <div className={`w-7 h-7 flex items-center justify-center border ${active || done ? "border-ink bg-ink text-white" : "border-border"} font-body text-[12px]`}>
                    {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className="font-body text-[12px] uppercase tracking-[0.14em] hidden sm:inline">{labels[s]}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px ${done ? "bg-ink" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        {stage === "A" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display font-bold text-[20px] text-ink mb-4">Sube entre 20 y 40 fotografías</h2>
              <ul className="space-y-2 font-body text-[13px] text-gray mb-6">
                {[
                  { i: Camera, t: "Fotografía la escultura desde todos los ángulos posibles" },
                  { i: RotateCcw, t: "Cubre la parte superior, el ecuador y la base de la pieza" },
                  { i: Lightbulb, t: "Usa luz uniforme sin flash directo ni sombras duras" },
                  { i: ImgIcon, t: "Fondo neutro: pared blanca o tela gris" },
                  { i: RotateCcw, t: "No muevas la escultura, gira tú alrededor" },
                ].map(({ i: Icon, t }, k) => (
                  <li key={k} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 mt-0.5 text-ink shrink-0" /> {t}
                  </li>
                ))}
              </ul>

              <label className="block border border-dashed border-border p-8 text-center cursor-pointer hover:border-ink transition-colors">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  className="hidden"
                  onChange={(e) => onPickPhotos(e.target.files)}
                />
                <div className="font-body text-[14px] text-gray">Click para seleccionar fotos</div>
                <div className="font-body text-[11px] text-muted-line mt-1">JPG o PNG · máx 8 MB por foto</div>
              </label>

              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-6 sm:grid-cols-10 gap-2">
                  {photos.map((f, i) => (
                    <div key={i} className="aspect-square bg-secondary overflow-hidden">
                      <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="font-body text-[13px] text-ink">
                  {totalCount} fotos seleccionadas <span className="text-muted-line">(mínimo 20)</span>
                </div>
                {totalCount < 20 && (
                  <button onClick={() => setSimCount(24)} className="font-body text-[11px] uppercase tracking-[0.14em] text-muted-line hover:text-ink">
                    Simular 24 fotos
                  </button>
                )}
              </div>
            </div>

            <p className="font-body text-[12px] text-muted-line border-l-2 border-border pl-4">
              Estas fotos no son las imágenes de presentación de tu obra. Son exclusivamente para generar la vista 3D y no se mostrarán públicamente en ningún momento.
            </p>
          </div>
        )}

        {stage === "B" && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-[20px] text-ink">Procesando tu vista 3D</h2>
            <p className="font-body text-[14px] text-gray">
              Estamos procesando tus fotografías para generar la vista 3D. Esto puede tardar entre 5 y 15 minutos.
            </p>
            <div className="h-2 bg-secondary overflow-hidden">
              <div className="h-full bg-ink transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
            <div className="font-body text-[12px] text-muted-line uppercase tracking-[0.14em]">{progress}%</div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={emailNotify} onChange={(e) => setEmailNotify(e.target.checked)} />
              <span className="font-body text-[14px] text-ink flex items-center gap-2"><Mail className="w-4 h-4" /> Avisarme por email cuando esté listo</span>
            </label>

            <Link to="/dashboard/obras" className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line hover:text-ink inline-block">
              Cerrar — el procesamiento continúa en segundo plano
            </Link>
          </div>
        )}

        {stage === "C" && success && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-[20px] text-ink flex items-center gap-2">
              <Check className="w-5 h-5" /> Vista 3D lista
            </h2>
            <div className="aspect-square bg-secondary">
              <GlbViewer url={DEMO_GLB} />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={publish3d} className="btn-primary">Publicar vista 3D en mi obra</button>
              <button onClick={() => { setStage("A"); setPhotos([]); setSimCount(0); }} className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line hover:text-ink">
                Repetir con mejores fotos
              </button>
              <button onClick={() => setSuccess(false)} className="ml-auto font-body text-[10px] uppercase tracking-[0.14em] text-muted-line/60 hover:text-muted-line">
                Simular fallo
              </button>
            </div>
          </div>
        )}

        {stage === "C" && !success && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-ink">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="font-display font-bold text-[20px]">No hemos podido generar la vista 3D</h2>
            </div>
            <p className="font-body text-[14px] text-gray">
              Revisa las recomendaciones de fotografía e inténtalo de nuevo.
            </p>
            <button onClick={() => { setStage("A"); setSuccess(true); setPhotos([]); setSimCount(0); }} className="btn-primary">Intentarlo de nuevo</button>
          </div>
        )}

        {stage === "A" && (
          <div className="flex justify-end mt-12 pt-6 border-t border-border">
            <button
              onClick={() => setStage("B")}
              disabled={totalCount < 20}
              className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continuar →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
