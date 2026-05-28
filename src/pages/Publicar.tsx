import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import { useAuth } from "@/auth/AuthContext";
import { Upload, X, Image as ImageIcon, Video, Clock, Check } from "lucide-react";

type ThreeDChoice = "ahora" | "tarde" | null;

type Draft = {
  titulo: string;
  anyo: string;
  tecnica: string;
  materiales: string;
  alto: string;
  ancho: string;
  fondo: string;
  peso: string;
  tipo: "unica" | "limitada" | "prueba";
  numeracion: string;
  descripcion: string;
  imagenes: string[]; // dataURLs
  precio: string;
  disponibilidad: "venta" | "visible" | "consultar";
  threeD: ThreeDChoice;
  videoNombre?: string;
};

const STEPS = ["La obra", "Imágenes", "Precio", "Vista 3D"];

const TECNICAS = [
  "Talla directa", "Modelado en arcilla", "Fundición en bronce",
  "Construcción en acero", "Escultura en resina", "Madera tallada",
  "Piedra labrada", "Técnica mixta", "Otra",
];

export default function Publicar() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.name !== "Cristina Iglesias") {
      login({ name: "Cristina Iglesias", email: "cristina@ignia.gallery", role: "escultor" });
    }
  }, [user, login]);

  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>({
    titulo: "", anyo: "", tecnica: "", materiales: "",
    alto: "", ancho: "", fondo: "", peso: "",
    tipo: "unica", numeracion: "",
    descripcion: "", imagenes: [], precio: "",
    disponibilidad: "venta", threeD: null,
  });
  const [done, setDone] = useState(false);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  if (done) return <Confirmation draft={draft} onAnother={() => { setDone(false); setStep(1); setDraft({ ...draft, titulo: "", imagenes: [], precio: "", threeD: null }); }} />;

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden sm:inline-flex items-center gap-2 font-body text-[12px] text-ink">
              <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-medium">
                {user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </span>
              {user.name}
            </span>
          )}
          <Link to="/dashboard" className="font-body text-[13px] text-gray hover:text-ink">Cancelar</Link>
        </div>
      </header>

      <section className="max-w-[880px] mx-auto px-6 py-10 md:py-14">
        <div className="eyebrow mb-2">Publicar obra</div>
        <h1 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-8 leading-tight">Nueva escultura</h1>

        <Pills step={step} onJump={setStep} />

        <div className="mt-10">
          {step === 1 && <Step1 draft={draft} set={set} />}
          {step === 2 && <Step2 draft={draft} set={set} />}
          {step === 3 && <Step3 draft={draft} set={set} />}
          {step === 4 && <Step4 draft={draft} set={set} />}
        </div>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
          <button onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
            className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed">← Anterior</button>
          {step < 4 ? (
            <button onClick={() => setStep((s) => Math.min(4, s + 1))} className="btn-primary">
              {step === 1 ? "Imágenes →" : step === 2 ? "Precio →" : "Vista 3D →"}
            </button>
          ) : (
            <button onClick={() => setDone(true)} className="btn-primary">Publicar obra</button>
          )}
        </div>
      </section>
    </main>
  );
}

// ============ Pills navigation ============
const Pills = ({ step, onJump }: { step: number; onJump: (n: number) => void }) => (
  <div className="flex flex-wrap items-center gap-2">
    {STEPS.map((label, i) => {
      const n = i + 1;
      const active = n === step;
      const done = n < step;
      return (
        <div key={label} className="flex items-center gap-2">
          <button
            onClick={() => onJump(n)}
            className={`px-4 py-2 font-body text-[11px] uppercase tracking-[0.16em] transition-colors ${
              active ? "bg-ink text-white" : done ? "bg-secondary text-ink" : "text-muted-line hover:text-ink"
            }`}
          >
            {label}
          </button>
          {n < STEPS.length && <span className="text-muted-line">›</span>}
        </div>
      );
    })}
  </div>
);

// ============ Step 1 ============
const Step1 = ({ draft, set }: { draft: Draft; set: any }) => (
  <div className="space-y-6">
    <h2 className="font-display font-bold text-[24px] text-ink">La obra</h2>

    <Field label="Título">
      <Input value={draft.titulo} onChange={(v) => set("titulo", v)} placeholder="Ej. Forma en reposo II" />
    </Field>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Año de creación">
        <Input type="number" value={draft.anyo} onChange={(v) => set("anyo", v)} placeholder="2025" />
      </Field>
      <Field label="Técnica">
        <Select value={draft.tecnica} onChange={(v) => set("tecnica", v)} options={TECNICAS} />
      </Field>
    </div>

    <Field label="Materiales">
      <Input value={draft.materiales} onChange={(v) => set("materiales", v)} placeholder="Ej. Bronce patinado, base de mármol negro" />
    </Field>

    <Field label="Dimensiones (cm)">
      <div className="grid grid-cols-3 gap-3">
        <Input value={draft.alto} onChange={(v) => set("alto", v)} placeholder="Alto" type="number" />
        <Input value={draft.ancho} onChange={(v) => set("ancho", v)} placeholder="Ancho" type="number" />
        <Input value={draft.fondo} onChange={(v) => set("fondo", v)} placeholder="Fondo" type="number" />
      </div>
    </Field>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Peso en kg (opcional)">
        <Input value={draft.peso} onChange={(v) => set("peso", v)} placeholder="kg" type="number" />
      </Field>
      <Field label="Tipo de obra">
        <Select value={draft.tipo} onChange={(v) => set("tipo", v)}
          options={[["unica", "Obra única"], ["limitada", "Edición limitada"], ["prueba", "Prueba de artista"]]} />
      </Field>
    </div>

    {(draft.tipo === "limitada" || draft.tipo === "prueba") && (
      <Field label="Numeración">
        <Input value={draft.numeracion} onChange={(v) => set("numeracion", v)} placeholder="Ej. 3 / 10" />
      </Field>
    )}

    <Field label="Descripción y significado">
      <div className="relative">
        <textarea
          rows={6}
          maxLength={800}
          value={draft.descripcion}
          onChange={(e) => set("descripcion", e.target.value)}
          className="w-full bg-transparent border border-border focus:border-ink outline-none p-3 font-body text-[15px] text-ink resize-none"
        />
        <div className="text-right font-body text-[11px] text-muted-line mt-1">{draft.descripcion.length} / 800</div>
      </div>
    </Field>
  </div>
);

// ============ Step 2 ============
const Step2 = ({ draft, set }: { draft: Draft; set: any }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = 12 - draft.imagenes.length;
    Array.from(files).slice(0, remaining).forEach((f) => {
      const r = new FileReader();
      r.onload = () => set("imagenes", [...draft.imagenes, r.result as string]);
      r.readAsDataURL(f);
    });
  };

  const remove = (i: number) => set("imagenes", draft.imagenes.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-[24px] text-ink">Imágenes de la obra</h2>
        <p className="font-body text-[14px] text-gray mt-2">La primera imagen será la portada en el catálogo. Sube al menos 3 desde ángulos distintos.</p>
      </div>

      <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line">
        {draft.imagenes.length} imágenes · mínimo 3 recomendadas
      </div>

      {draft.imagenes.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {draft.imagenes.map((src, i) => (
            <div key={i} className="relative aspect-square bg-secondary">
              <img src={src} alt={`obra-${i}`} className="w-full h-full object-cover" />
              <button onClick={() => remove(i)} className="absolute top-1 right-1 bg-white/95 p-1.5 hover:bg-white"><X className="w-3 h-3" /></button>
              {i === 0 && (
                <span className="absolute bottom-0 inset-x-0 bg-ink text-white font-body text-[10px] uppercase tracking-[0.18em] text-center py-1">Portada</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className="border border-dashed border-border hover:border-ink transition-colors cursor-pointer p-10 flex flex-col items-center justify-center text-center"
      >
        <ImageIcon className="w-7 h-7 text-muted-line mb-3" />
        <div className="font-body text-[14px] text-ink">Arrastra aquí o haz clic para seleccionar</div>
        <div className="font-body text-[12px] text-muted-line mt-1">JPG, PNG o WEBP · Mínimo 1500 px · Máx. 20 MB por imagen</div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden"
          onChange={(e) => addFiles(e.target.files)} />
      </div>

      <p className="font-body text-[13px] text-muted-line italic">Consejo: fondo neutro y luz natural lateral revelan mejor la textura y los materiales.</p>
    </div>
  );
};

// ============ Step 3 ============
const Step3 = ({ draft, set }: { draft: Draft; set: any }) => {
  const precioNum = parseFloat(draft.precio.replace(/[^\d.]/g, "")) || 0;
  let nivel = "Emerging", comision = 18;
  if (precioNum >= 15000) { nivel = "Featured"; comision = 12; }
  else if (precioNum >= 3000) { nivel = "Established"; comision = 15; }
  const recibe = Math.round(precioNum * (1 - comision / 100));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-[24px] text-ink">Precio y disponibilidad</h2>
        <p className="font-body text-[14px] text-gray mt-2">El precio lo fijas tú. Ignia aplica una comisión del 12 al 18 % según tu nivel artístico.</p>
      </div>

      <Field label="Precio">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-[15px] text-muted-line">€</span>
          <input
            value={draft.precio}
            onChange={(e) => set("precio", e.target.value)}
            placeholder="0"
            inputMode="decimal"
            className="w-full bg-transparent border border-border focus:border-ink outline-none pl-7 pr-3 py-2.5 font-body text-[15px] text-ink"
          />
        </div>
      </Field>

      {precioNum > 0 && (
        <div className="bg-secondary p-5 animate-fade-in">
          <div className="font-body text-[11px] uppercase tracking-[0.18em] text-muted-line mb-2">Recibirás por esta obra</div>
          <div className="font-display font-bold text-[36px] text-ink leading-none mb-2">€ {recibe.toLocaleString("es-ES")}</div>
          <div className="font-body text-[12px] text-gray">Nivel <span className="text-ink font-medium">{nivel}</span> · comisión {comision} %</div>
        </div>
      )}

      <Field label="Disponibilidad">
        <div className="flex flex-wrap gap-2">
          {[["venta", "A la venta"], ["visible", "Solo visible"], ["consultar", "Consultar precio"]].map(([k, l]) => (
            <button key={k} type="button" onClick={() => set("disponibilidad", k)}
              className={`px-4 py-2.5 font-body text-[13px] border transition-colors ${
                draft.disponibilidad === k ? "bg-ink text-white border-ink" : "border-border text-ink hover:border-ink"
              }`}>{l}</button>
          ))}
        </div>
      </Field>

      <div className="border-l-[3px] border-ink pl-4 py-1">
        <p className="font-body text-[14px] text-ink leading-relaxed">
          <strong className="font-display">Certificado blockchain incluido.</strong> Al publicar, Ignia genera automáticamente un certificado de autenticidad con tus datos, la fecha de registro y tu identidad verificada. Es inmutable y acompaña a la obra para siempre.
        </p>
      </div>
    </div>
  );
};

// ============ Step 4 ============
const Step4 = ({ draft, set }: { draft: Draft; set: any }) => {
  const videoRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-[24px] text-ink">Vista 3D</h2>
        <p className="font-body text-[14px] text-gray mt-2">El visor 3D es el diferencial de Ignia. El coleccionista gira la escultura desde todos los ángulos antes de comprarla. No es obligatoria para publicar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button type="button" onClick={() => set("threeD", "ahora")}
          className={`text-left p-6 transition-colors ${draft.threeD === "ahora" ? "border-2 border-ink" : "border-[1.5px] border-border hover:border-ink"}`}>
          <Video className="w-6 h-6 text-ink mb-3" />
          <div className="font-display font-bold text-[18px] text-ink mb-2">La añado ahora</div>
          <div className="font-body text-[13px] text-gray">Graba 30 segundos rodeando la escultura con el móvil. El modelo 3D estará listo en menos de 30 minutos.</div>
        </button>

        <button type="button" onClick={() => set("threeD", "tarde")}
          className={`text-left p-6 transition-colors ${draft.threeD === "tarde" ? "border-2 border-ink" : "border-[1.5px] border-border hover:border-ink"}`}>
          <Clock className="w-6 h-6 text-ink mb-3" />
          <div className="font-display font-bold text-[18px] text-ink mb-2">La añado más tarde</div>
          <div className="font-body text-[13px] text-gray">La obra se publica y queda pendiente de vista 3D en tu perfil. Puedes añadirla cuando quieras.</div>
        </button>
      </div>

      {draft.threeD === "ahora" && (
        <div className="space-y-4 animate-fade-in">
          <div className="border-l-2 border-border pl-4 py-1">
            <ol className="font-body text-[13px] text-gray space-y-1.5 list-decimal list-inside">
              <li>Coloca la escultura sobre superficie plana con buena iluminación.</li>
              <li>Empieza desde el frente y camina despacio completando un círculo.</li>
              <li>Graba 25-35 segundos sin pausas, móvil a la altura de la obra.</li>
            </ol>
          </div>
          <div
            onClick={() => videoRef.current?.click()}
            className="border border-dashed border-border hover:border-ink transition-colors cursor-pointer p-10 flex flex-col items-center justify-center text-center"
          >
            <Video className="w-7 h-7 text-muted-line mb-3" />
            <div className="font-body text-[14px] text-ink">{draft.videoNombre || "Arrastra el vídeo o haz clic para seleccionar"}</div>
            <div className="font-body text-[12px] text-muted-line mt-1">MP4 o MOV · 25-35 segundos · Máx. 500 MB</div>
            <input ref={videoRef} type="file" accept="video/mp4,video/quicktime" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) set("videoNombre", f.name); }} />
          </div>
        </div>
      )}

      {draft.threeD === "tarde" && (
        <div className="animate-fade-in flex items-start gap-3 p-4 bg-secondary">
          <span className="inline-block px-2 py-1 font-body text-[10px] uppercase tracking-[0.16em] font-medium" style={{ backgroundColor: "#CCFF00", color: "#000" }}>Pendiente</span>
          <p className="font-body text-[13px] text-gray flex-1">Esta obra aparecerá en tu perfil marcada como pendiente de vista 3D. Puedes añadirla desde el listado de tus obras en cualquier momento.</p>
        </div>
      )}
    </div>
  );
};

// ============ Confirmation ============
const Confirmation = ({ draft, onAnother }: { draft: Draft; onAnother: () => void }) => {
  const has3D = draft.threeD === "ahora";
  const obrasMini = [
    { titulo: "Caída", estado: "Publicada", tiene3D: true },
    { titulo: "Eco", estado: "Publicada", tiene3D: true },
    { titulo: "Umbral", estado: "En revisión editorial", tiene3D: false },
    { titulo: draft.titulo || "Nueva escultura", estado: "En revisión editorial", tiene3D: has3D, nueva: true },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <Link to="/dashboard" className="font-body text-[13px] text-gray hover:text-ink">Salir</Link>
      </header>

      <section className="max-w-[720px] mx-auto px-6 py-16 text-center">
        <div className="w-16 h-16 mx-auto bg-ink rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-3">Tu obra ya está publicada.</h1>
        <p className="font-body text-[15px] text-gray max-w-[520px] mx-auto mb-12">
          {has3D
            ? "El modelo 3D estará procesado en menos de 30 minutos. La ficha está en revisión editorial."
            : "La ficha está en revisión editorial. La vista 3D aparece como pendiente en tu perfil."}
        </p>

        <div className="text-left border-t border-border">
          {obrasMini.map((o, i) => (
            <div key={i} className={`flex items-center justify-between gap-4 py-4 border-b border-border ${o.nueva ? "bg-secondary -mx-4 px-4" : ""}`}>
              <div>
                <div className="font-display font-bold text-[15px] text-ink">{o.titulo}</div>
                <div className="font-body text-[12px] text-muted-line">{o.estado}</div>
              </div>
              {o.tiene3D ? (
                <div className="flex items-center gap-2 font-body text-[12px] text-ink">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Vista 3D lista
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 font-body text-[12px] text-ink">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Vista 3D pendiente
                  </span>
                  <button className="border border-ink text-ink font-body text-[11px] uppercase tracking-[0.14em] px-3 py-1.5 hover:bg-ink hover:text-white transition-colors">Añadir 3D</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 font-body text-[13px]">
          <Link to="/obra/caida" className="text-ink underline underline-offset-4 hover:opacity-60">Ver ficha de la obra</Link>
          <button onClick={onAnother} className="text-ink underline underline-offset-4 hover:opacity-60">Publicar otra obra</button>
          <Link to="/perfil/escultor/cristina-iglesias" className="text-ink underline underline-offset-4 hover:opacity-60">Ir a mi perfil</Link>
        </div>
      </section>
    </main>
  );
};

// ============ Atoms ============
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block font-body text-[12px] uppercase tracking-[0.18em] text-muted-line mb-2">{label}</label>
    {children}
  </div>
);
const Input = ({ value, onChange, placeholder, type }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
  <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type || "text"}
    className="w-full bg-transparent border border-border focus:border-ink outline-none px-3 py-2.5 font-body text-[15px] text-ink" />
);
const Select = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: (string | [string, string])[] }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}
    className="w-full bg-transparent border border-border focus:border-ink outline-none px-3 py-2.5 font-body text-[15px] text-ink appearance-none">
    <option value="">—</option>
    {options.map((o) => {
      const [k, l] = Array.isArray(o) ? o : [o, o];
      return <option key={k} value={k}>{l}</option>;
    })}
  </select>
);
