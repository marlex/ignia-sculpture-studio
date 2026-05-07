import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Logo } from "@/components/ignia/Logo";
import { useAuth } from "@/auth/AuthContext";
import { useLang } from "@/i18n/LanguageContext";
import { ObraDraft, Obra, newCertId, sha256, saveObra } from "@/data/obrasStore";
import { Check, Upload, X, ChevronDown, Loader2, ShieldCheck, QrCode } from "lucide-react";

const empty: ObraDraft = {
  titulo: "", artista: "", anyo: "", tecnica: "",
  alto: "", ancho: "", profundo: "", peso: "",
  edicion: "unica", ejemplares: "", precio: "", descripcion: "",
  fotosAdicionales: [],
};

export default function Publicar() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const lang = useLang();

  // Demo: force the showcased artist identity
  useEffect(() => {
    if (!user || user.name !== "Cristina Iglesias") {
      login({ name: "Cristina Iglesias", email: "cristina@ignia.gallery", role: "escultor" });
    }
  }, [user, login]);

  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<ObraDraft>({ ...empty, artista: "Cristina Iglesias" });
  const [confirmed, setConfirmed] = useState(false);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  const certIdRef = useRef<string>(newCertId());
  const [hash, setHash] = useState("");

  useEffect(() => {
    sha256(JSON.stringify({ ...draft, certId: certIdRef.current })).then(setHash);
  }, [draft, step]);

  const t = lang === "es" ? COPY_ES : COPY_EN;

  const set = <K extends keyof ObraDraft>(k: K, v: ObraDraft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  // Demo flow: steps can advance without strict validation
  const step1Valid = true;
  const step2Valid = true;

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleFile = (file: File, onData: (s: string) => void) => {
    const r = new FileReader();
    r.onload = () => onData(r.result as string);
    r.readAsDataURL(file);
  };

  const publish = () => {
    const obra: Obra = {
      ...draft,
      id: certIdRef.current.toLowerCase(),
      certificadoId: certIdRef.current,
      hash,
      fechaPublicacion: new Date().toISOString(),
      ownerEmail: user?.email || "demo@ignia.gallery",
      estado: "Publicada",
      visitas: 0,
      favoritos: 0,
    };
    saveObra(obra);
    setPublishedId(obra.id);
  };

  if (publishedId) return <SuccessScreen t={t} certId={certIdRef.current} obraId={publishedId} onAnother={() => {
    setPublishedId(null); setDraft({ ...empty, artista: user?.name || "" }); setStep(1); certIdRef.current = newCertId();
  }} />;

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
          <Link to="/dashboard" className="font-body text-[13px] text-gray hover:text-ink">{t.cancel}</Link>
        </div>
      </header>

      <section className="max-w-[880px] mx-auto px-6 py-10 md:py-14">
        <div className="eyebrow mb-2">{t.publishEyebrow}</div>
        <h1 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-8 leading-tight">{t.publishTitle}</h1>

        <Stepper step={step} labels={t.steps} />

        <div className="mt-10">
          {step === 1 && <Step1 t={t} draft={draft} set={set} />}
          {step === 2 && <Step2 t={t} draft={draft} set={set} handleFile={handleFile} />}
          {step === 3 && <Step3 t={t} draft={draft} certId={certIdRef.current} hash={hash} confirmed={confirmed} setConfirmed={setConfirmed} />}
          {step === 4 && <Step4 t={t} draft={draft} certId={certIdRef.current} onEdit={() => setStep(1)} />}
        </div>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
          <button onClick={prev} disabled={step === 1} className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed">{t.back}</button>
          {step < 4 ? (
            <button
              onClick={next}
              disabled={(step === 1 && !step1Valid) || (step === 2 && !step2Valid) || (step === 3 && !confirmed)}
              className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t.next}
            </button>
          ) : (
            <button onClick={publish} className="btn-primary">{t.publishBtn}</button>
          )}
        </div>
      </section>
    </main>
  );
}

const Stepper = ({ step, labels }: { step: number; labels: string[] }) => (
  <div className="flex items-center gap-3">
    {labels.map((l, i) => {
      const n = i + 1;
      const done = n < step;
      const active = n === step;
      return (
        <div key={l} className="flex items-center gap-3 flex-1">
          <div className={`flex items-center gap-2 ${active ? "text-ink" : done ? "text-ink" : "text-muted-line"}`}>
            <div className={`w-7 h-7 flex items-center justify-center border ${active || done ? "border-ink bg-ink text-white" : "border-border"} font-body text-[12px]`}>
              {done ? <Check className="w-3.5 h-3.5" /> : n}
            </div>
            <span className="font-body text-[12px] uppercase tracking-[0.14em] hidden sm:inline">{l}</span>
          </div>
          {n < labels.length && <div className={`flex-1 h-px ${done ? "bg-ink" : "bg-border"}`} />}
        </div>
      );
    })}
  </div>
);

// ---------------- Step 1 ----------------
const Step1 = ({ t, draft, set }: any) => (
  <div className="space-y-5">
    <SectionTitle>{t.s1.h}</SectionTitle>
    <FieldText label={t.s1.titulo} value={draft.titulo} onChange={(v) => set("titulo", v)} required />
    <FieldText label={t.s1.anyo} value={draft.anyo} onChange={(v) => set("anyo", v.replace(/\D/g, "").slice(0, 4))} required placeholder="2025" />
    <FieldText label={t.s1.tecnica} value={draft.tecnica} onChange={(v) => set("tecnica", v)} required placeholder={t.s1.tecnicaPh} />
    <div>
      <Label>{t.s1.dim} *</Label>
      <div className="grid grid-cols-3 gap-3 mt-2">
        <NumInput value={draft.alto} onChange={(v) => set("alto", v)} placeholder={t.s1.alto} />
        <NumInput value={draft.ancho} onChange={(v) => set("ancho", v)} placeholder={t.s1.ancho} />
        <NumInput value={draft.profundo} onChange={(v) => set("profundo", v)} placeholder={t.s1.prof} />
      </div>
    </div>
    <FieldText label={t.s1.peso} value={draft.peso} onChange={(v) => set("peso", v)} placeholder="kg" />
    <div>
      <Label>{t.s1.edicion} *</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
        {(["unica", "limitada", "reproduccion"] as const).map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => set("edicion", e)}
            className={`border px-4 py-3 font-body text-[13px] text-left transition-colors ${
              draft.edicion === e ? "border-ink bg-ink text-white" : "border-border hover:border-ink"
            }`}
          >
            {t.s1.editionOpts[e]}
          </button>
        ))}
      </div>
      {draft.edicion === "limitada" && (
        <div className="mt-3">
          <NumInput value={draft.ejemplares || ""} onChange={(v) => set("ejemplares", v)} placeholder={t.s1.ejemplaresPh} />
        </div>
      )}
    </div>
    <FieldText label={t.s1.precio} value={draft.precio} onChange={(v) => set("precio", v)} required placeholder="€" />
    <div>
      <Label>{t.s1.desc} *</Label>
      <textarea
        rows={5}
        value={draft.descripcion}
        onChange={(e) => set("descripcion", e.target.value)}
        placeholder={t.s1.descPh}
        className="w-full mt-2 bg-transparent border border-border focus:border-ink outline-none p-3 font-body text-[15px] text-ink resize-none"
      />
      <div className="mt-1 font-body text-[11px] text-muted-line">
        {draft.descripcion.length} / 80 {t.s1.minChars}
      </div>
    </div>
  </div>
);

// ---------------- Step 2 ----------------
const Step2 = ({ t, draft, set, handleFile }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-8">
      <SectionTitle>{t.s2.h}</SectionTitle>

      <div>
        <Label>{t.s2.main} *</Label>
        <Uploader
          accept="image/jpeg,image/png,image/webp"
          maxMB={10}
          file={draft.fotoPrincipal}
          onFile={(f) => handleFile(f, (data: string) => set("fotoPrincipal", data))}
          onClear={() => set("fotoPrincipal", undefined)}
          previewType="image"
          label={t.s2.mainCta}
        />
      </div>

      <div>
        <Label>{t.s2.extra}</Label>
        <p className="font-body text-[12px] text-muted-line mt-1 mb-3">{t.s2.extraHelp}</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {draft.fotosAdicionales.map((src: string, i: number) => (
            <div key={i} className="relative aspect-square bg-secondary">
              <img src={src} alt={`extra-${i}`} className="w-full h-full object-cover" />
              <button onClick={() => set("fotosAdicionales", draft.fotosAdicionales.filter((_: any, idx: number) => idx !== i))}
                className="absolute top-1 right-1 bg-white/90 p-1"><X className="w-3 h-3" /></button>
            </div>
          ))}
          {draft.fotosAdicionales.length < 5 && (
            <label className="aspect-square border border-dashed border-border flex items-center justify-center cursor-pointer hover:border-ink transition-colors">
              <Upload className="w-5 h-5 text-muted-line" />
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0]; if (!f) return;
                handleFile(f, (data: string) => set("fotosAdicionales", [...draft.fotosAdicionales, data]));
              }} />
            </label>
          )}
        </div>
      </div>

      <div>
        <Label>{t.s2.glb}</Label>
        <p className="font-body text-[12px] text-muted-line mt-1 mb-3">{t.s2.glbHelp}</p>
        <Uploader
          accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
          maxMB={50}
          file={draft.archivo3dDataUrl}
          fileName={draft.archivo3dNombre}
          onFile={(f) => {
            set("archivo3dNombre", f.name);
            handleFile(f, (data: string) => set("archivo3dDataUrl", data));
          }}
          onClear={() => { set("archivo3dDataUrl", undefined); set("archivo3dNombre", undefined); }}
          previewType="3d"
          label={t.s2.glbCta}
        />
        <button type="button" onClick={() => setOpen(!open)} className="mt-4 flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.14em] text-ink">
          {t.s2.howH} <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <p className="mt-3 font-body text-[13px] text-gray border-l-2 border-border pl-4">{t.s2.howBody}</p>
        )}
      </div>
    </div>
  );
};

const Uploader = ({ accept, maxMB, file, fileName, onFile, onClear, previewType, label }: {
  accept: string; maxMB: number; file?: string; fileName?: string;
  onFile: (f: File) => void; onClear: () => void; previewType: "image" | "3d"; label: string;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    if (f.size > maxMB * 1024 * 1024) { alert(`Max ${maxMB}MB`); return; }
    onFile(f);
  };
  return (
    <div className="border border-dashed border-border p-4">
      {file ? (
        <div className="flex items-start gap-4">
          {previewType === "image" ? (
            <img src={file} alt="preview" className="w-32 h-32 object-cover bg-secondary" />
          ) : (
            <div className="w-32 h-32 bg-secondary"><GlbPreview src={file} /></div>
          )}
          <div className="flex-1">
            <div className="font-body text-[13px] text-ink">{fileName || (previewType === "image" ? "Imagen subida" : "Archivo 3D")}</div>
            <button onClick={onClear} className="mt-2 font-body text-[11px] uppercase tracking-[0.14em] text-muted-line hover:text-ink">Eliminar ✕</button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()} className="w-full flex flex-col items-center justify-center gap-2 py-10 hover:bg-secondary transition-colors">
          <Upload className="w-6 h-6 text-muted-line" />
          <span className="font-body text-[13px] text-gray">{label}</span>
          <span className="font-body text-[11px] text-muted-line">Max {maxMB} MB</span>
        </button>
      )}
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={onPick} />
    </div>
  );
};

// 3D preview
function GlbPreview({ src }: { src: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <Suspense fallback={null}>
        <GlbModel src={src} />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}
function GlbModel({ src }: { src: string }) {
  const gltf = useGLTF(src);
  return <primitive object={gltf.scene} scale={1} />;
}

// ---------------- Step 3 ----------------
const Step3 = ({ t, draft, certId, hash, confirmed, setConfirmed }: any) => (
  <div className="space-y-6">
    <SectionTitle>{t.s3.h}</SectionTitle>
    <article className="border border-ink p-8 bg-secondary/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-ink" />
          <span className="font-body text-[11px] uppercase tracking-[0.18em] text-ink">Ignia Gallery — {t.s3.issuer}</span>
        </div>
        <span className="font-body text-[11px] text-muted-line">#{certId.slice(0, 8)}</span>
      </div>
      <h3 className="font-display font-bold text-[clamp(24px,3vw,36px)] text-ink leading-tight mb-1">{draft.titulo || "—"}</h3>
      <div className="font-body text-[14px] text-gray mb-6">{draft.artista || "—"} · {draft.anyo || "—"}</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
        <CertRow l={t.s3.tech} v={draft.tecnica} />
        <CertRow l={t.s3.dim} v={`${draft.alto || "—"} × ${draft.ancho || "—"} × ${draft.profundo || "—"} cm`} />
        <CertRow l={t.s3.edition} v={draft.edicion === "unica" ? t.s1.editionOpts.unica : draft.edicion === "limitada" ? `${t.s1.editionOpts.limitada} (${draft.ejemplares || "?"})` : t.s1.editionOpts.reproduccion} />
        <CertRow l={t.s3.date} v={new Date().toLocaleDateString(t.locale)} />
      </div>
      <div className="border-t border-border pt-4 flex items-end justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-line mb-1">{t.s3.certNum}</div>
          <div className="font-mono text-[12px] text-ink break-all">{certId}</div>
          <div className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-line mt-3 mb-1">{t.s3.hash}</div>
          <div className="font-mono text-[11px] text-gray break-all">{hash ? `0x${hash.slice(0, 32)}…` : t.s3.hashWait}</div>
        </div>
        <div className="w-20 h-20 border border-border flex flex-col items-center justify-center text-muted-line">
          <QrCode className="w-8 h-8" />
          <span className="font-body text-[8px] uppercase tracking-[0.14em] mt-1 text-center">QR</span>
        </div>
      </div>
    </article>
    <p className="font-body text-[13px] text-gray">{t.s3.note}</p>
    <label className="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1" />
      <span className="font-body text-[14px] text-ink">{t.s3.consent}</span>
    </label>
  </div>
);

const CertRow = ({ l, v }: { l: string; v: string }) => (
  <div>
    <div className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-line mb-1">{l}</div>
    <div className="font-body text-[14px] text-ink">{v || "—"}</div>
  </div>
);

// ---------------- Step 4 ----------------
const Step4 = ({ t, draft, certId, onEdit }: any) => (
  <div className="space-y-8">
    <SectionTitle>{t.s4.h}</SectionTitle>

    <Block title={t.s4.data}>
      <dl className="grid grid-cols-2 gap-y-2 font-body text-[14px]">
        <Dt>{t.s1.titulo}</Dt><Dd>{draft.titulo}</Dd>
        <Dt>{t.s1.artista}</Dt><Dd>{draft.artista}</Dd>
        <Dt>{t.s1.anyo}</Dt><Dd>{draft.anyo}</Dd>
        <Dt>{t.s1.tecnica}</Dt><Dd>{draft.tecnica}</Dd>
        <Dt>{t.s1.dim}</Dt><Dd>{draft.alto} × {draft.ancho} × {draft.profundo} cm</Dd>
        <Dt>{t.s1.edicion}</Dt><Dd>{draft.edicion === "limitada" ? `${t.s1.editionOpts.limitada} (${draft.ejemplares})` : t.s1.editionOpts[draft.edicion as "unica" | "reproduccion"]}</Dd>
        <Dt>{t.s1.precio}</Dt><Dd>{draft.precio} €</Dd>
      </dl>
      <p className="mt-3 font-body text-[14px] text-gray">{draft.descripcion}</p>
    </Block>

    <Block title={t.s4.images}>
      <div className="flex gap-3 flex-wrap">
        {draft.fotoPrincipal && <img src={draft.fotoPrincipal} className="w-28 h-28 object-cover bg-secondary" alt="main" />}
        {draft.fotosAdicionales.map((s: string, i: number) => <img key={i} src={s} className="w-28 h-28 object-cover bg-secondary" alt={`extra-${i}`} />)}
      </div>
    </Block>

    <Block title={t.s4.glb}>
      {draft.archivo3dNombre ? (
        <div className="flex items-center gap-4">
          <div className="w-28 h-28 bg-secondary"><GlbPreview src={draft.archivo3dDataUrl} /></div>
          <span className="font-body text-[14px] text-ink">{draft.archivo3dNombre}</span>
        </div>
      ) : (
        <p className="font-body text-[14px] text-gray">{t.s4.glbEmpty}</p>
      )}
    </Block>

    <Block title={t.s4.cert}>
      <div className="font-body text-[13px] text-gray">
        <div>#{certId}</div>
        <div className="mt-1">{new Date().toLocaleDateString(t.locale)}</div>
      </div>
    </Block>

    <button onClick={onEdit} className="btn-ghost">{t.s4.edit}</button>
  </div>
);

const SuccessScreen = ({ t, certId, obraId, onAnother }: any) => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-ink flex items-center justify-center mb-8 animate-in zoom-in duration-500">
        <Check className="w-10 h-10 text-white" />
      </div>
      <h1 className="font-display font-bold text-[clamp(28px,3.6vw,44px)] text-ink mb-3">{t.success.h}</h1>
      <p className="font-body text-[14px] text-gray mb-2">{t.success.cert}</p>
      <div className="font-mono text-[12px] text-ink mb-10">#{certId}</div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={() => navigate(`/dashboard/obras`)} className="btn-primary">{t.success.view}</button>
        <button onClick={onAnother} className="btn-ghost">{t.success.another}</button>
      </div>
    </main>
  );
};

// ---------- Inputs ----------
const Label = ({ children }: any) => (
  <span className="block font-body text-[12px] uppercase tracking-[0.18em] text-muted-line">{children}</span>
);
const SectionTitle = ({ children }: any) => (
  <h2 className="font-display font-bold text-[22px] text-ink mb-2">{children}</h2>
);
const FieldText = ({ label, value, onChange, required, placeholder }: any) => (
  <label className="block">
    <Label>{label} {required && "*"}</Label>
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full mt-2 bg-transparent border-0 border-b border-border focus:border-ink outline-none py-2.5 font-body text-[15px] text-ink placeholder:text-muted-line/60" />
  </label>
);
const NumInput = ({ value, onChange, placeholder }: any) => (
  <input value={value} onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
    placeholder={placeholder} inputMode="decimal"
    className="w-full bg-transparent border border-border focus:border-ink outline-none px-3 py-2.5 font-body text-[15px] text-ink placeholder:text-muted-line/60" />
);
const Block = ({ title, children }: any) => (
  <section>
    <h3 className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line mb-3 pb-2 border-b border-border">{title}</h3>
    {children}
  </section>
);
const Dt = ({ children }: any) => <dt className="text-muted-line">{children}</dt>;
const Dd = ({ children }: any) => <dd className="text-ink">{children}</dd>;

// ---------- Copy ----------
const COPY_ES = {
  publishEyebrow: "Publicar escultura",
  publishTitle: "Comparte tu obra con coleccionistas",
  cancel: "Cancelar",
  back: "← Volver",
  next: "Continuar →",
  publishBtn: "Publicar obra ↗",
  steps: ["Información", "Imágenes y 3D", "Certificado", "Revisión"],
  locale: "es-ES",
  s1: {
    h: "Datos de la obra",
    titulo: "Título de la obra",
    artista: "Nombre del artista",
    anyo: "Año de creación",
    tecnica: "Técnica y materiales",
    tecnicaPh: "Ej. Bronce patinado sobre base de piedra",
    dim: "Dimensiones (cm)",
    alto: "Alto", ancho: "Ancho", prof: "Profundo",
    peso: "Peso aproximado (kg)",
    edicion: "Tipo de edición",
    editionOpts: { unica: "Obra única (1/1)", limitada: "Edición limitada", reproduccion: "Reproducción" },
    ejemplaresPh: "Número de ejemplares (máx. 20)",
    precio: "Precio de venta (€)",
    desc: "Descripción editorial",
    descPh: "Cuenta la historia de la obra: inspiración, proceso, materiales…",
    minChars: "caracteres mínimos",
  },
  s2: {
    h: "Imágenes y archivo 3D",
    main: "Foto principal de la obra",
    mainCta: "Subir foto principal (JPG, PNG, WEBP)",
    extra: "Fotos adicionales (hasta 5)",
    extraHelp: "Recomendado: muestra la obra desde distintos ángulos para que los coleccionistas puedan apreciarla mejor.",
    glb: "Archivo 3D de la escultura (opcional)",
    glbCta: "Subir archivo .glb o .gltf",
    glbHelp: "Sube un archivo .glb o .gltf para que los coleccionistas puedan rotar la pieza en 360°. Si no tienes este archivo ahora, puedes añadirlo más tarde desde tu perfil.",
    howH: "¿Cómo consigo un archivo 3D de mi escultura?",
    howBody: "Necesitas hacer fotogrametría: fotografía la pieza desde 20 a 40 ángulos cubriendo 360° y procésalas con software como Meshroom (gratuito), RealityCapture o la app Polycam desde el móvil. El resultado es un archivo .glb que puedes subir aquí.",
  },
  s3: {
    h: "Certificado blockchain",
    issuer: "Entidad emisora",
    tech: "Técnica y materiales",
    dim: "Dimensiones",
    edition: "Tipo de edición",
    date: "Fecha de certificación",
    certNum: "Número único de certificado",
    hash: "Hash de registro en blockchain",
    hashWait: "Se generará en el momento de la publicación",
    note: "Al publicar, esta información quedará registrada de forma permanente en blockchain. El certificado acompaña a la obra y puede verificarse en cualquier momento por compradores, instituciones o aseguradoras.",
    consent: "Confirmo que soy el autor o autora de esta obra, o que tengo los derechos necesarios para publicarla en Ignia Gallery.",
  },
  s4: {
    h: "Revisión y publicación",
    data: "Datos de la obra",
    images: "Imágenes",
    glb: "Archivo 3D",
    glbEmpty: "No incluido — puedes añadirlo más tarde desde tu perfil.",
    cert: "Certificado blockchain",
    edit: "Editar",
  },
  success: {
    h: "¡Tu escultura ya está en Ignia Gallery!",
    cert: "ID del certificado blockchain",
    view: "Ver mi obra publicada",
    another: "Publicar otra escultura",
  },
};

const COPY_EN = {
  ...COPY_ES,
  publishEyebrow: "Publish sculpture",
  publishTitle: "Share your work with collectors",
  cancel: "Cancel",
  back: "← Back",
  next: "Continue →",
  publishBtn: "Publish work ↗",
  steps: ["Information", "Images & 3D", "Certificate", "Review"],
  locale: "en-GB",
};
