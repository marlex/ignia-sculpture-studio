import { Link, useParams } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import { ArrowUp, ArrowDown, Heart, Eye, Box, TrendingUp } from "lucide-react";
import caida from "@/assets/perfil-escultura-caida.jpg";
import eco from "@/assets/perfil-escultura-eco.jpg";
import umbral from "@/assets/perfil-escultura-umbral.jpg";
import vertice from "@/assets/perfil-escultura-vertice.jpg";
import quietud from "@/assets/perfil-escultura-quietud.jpg";
import resto from "@/assets/perfil-escultura-resto.jpg";

type ObraInfo = {
  titulo: string; anyo: number; tecnica: string; img: string;
  visitas: number; deltaVisitas: number;
  favoritos: number; deltaFavoritos: number;
  inter3D: number | null;
  paises: { name: string; visitas: number }[];
  edad: string; comprador: string; canal: string;
  actividad: { t: string; cuando: string }[];
  vsMedia: number;
};

const OBRAS: Record<string, ObraInfo> = {
  caida: {
    titulo: "Caída", anyo: 2023, tecnica: "Fundición en bronce", img: caida,
    visitas: 4280, deltaVisitas: 18, favoritos: 312, deltaFavoritos: 24, inter3D: 1450,
    paises: [{ name: "España", visitas: 1820 }, { name: "México", visitas: 920 }, { name: "Estados Unidos", visitas: 720 }, { name: "Francia", visitas: 480 }, { name: "Argentina", visitas: 340 }],
    edad: "35-44 años", comprador: "Coleccionista privado", canal: "Búsqueda en catálogo",
    actividad: [
      { t: "Guardada como favorita", cuando: "hace 2 horas" },
      { t: "Vista en 3D desde España", cuando: "hace 5 horas" },
      { t: "Visita desde México", cuando: "hace 1 día" },
      { t: "Compartida por correo", cuando: "hace 2 días" },
      { t: "Vista en 3D desde Francia", cuando: "hace 3 días" },
    ],
    vsMedia: 32,
  },
  "eco-ondas": {
    titulo: "Eco", anyo: 2022, tecnica: "Construcción en acero", img: eco,
    visitas: 1820, deltaVisitas: -6, favoritos: 98, deltaFavoritos: 12, inter3D: null,
    paises: [{ name: "España", visitas: 720 }, { name: "Francia", visitas: 410 }, { name: "México", visitas: 290 }, { name: "Estados Unidos", visitas: 240 }, { name: "Argentina", visitas: 160 }],
    edad: "45-54 años", comprador: "Galerista", canal: "Newsletter Ignia",
    actividad: [
      { t: "Visita desde Francia", cuando: "hace 4 horas" },
      { t: "Guardada como favorita", cuando: "hace 1 día" },
      { t: "Visita desde España", cuando: "hace 1 día" },
      { t: "Consulta de precio", cuando: "hace 3 días" },
      { t: "Visita desde Argentina", cuando: "hace 4 días" },
    ],
    vsMedia: -14,
  },
  umbral: {
    titulo: "Umbral", anyo: 2021, tecnica: "Talla directa en piedra", img: umbral,
    visitas: 6940, deltaVisitas: 41, favoritos: 528, deltaFavoritos: 36, inter3D: 2380,
    paises: [{ name: "España", visitas: 2840 }, { name: "Estados Unidos", visitas: 1620 }, { name: "México", visitas: 1080 }, { name: "Francia", visitas: 820 }, { name: "Argentina", visitas: 580 }],
    edad: "55-64 años", comprador: "Coleccionista institucional", canal: "Editorial Ignia",
    actividad: [
      { t: "Vista en 3D desde EE. UU.", cuando: "hace 1 hora" },
      { t: "Guardada como favorita", cuando: "hace 3 horas" },
      { t: "Consulta de precio", cuando: "hace 6 horas" },
      { t: "Vista en 3D desde España", cuando: "hace 1 día" },
      { t: "Compartida en Instagram", cuando: "hace 2 días" },
    ],
    vsMedia: 58,
  },
  vertice: {
    titulo: "Vértice", anyo: 2024, tecnica: "Modelado en arcilla", img: vertice,
    visitas: 3160, deltaVisitas: 22, favoritos: 204, deltaFavoritos: 18, inter3D: 980,
    paises: [{ name: "España", visitas: 1380 }, { name: "México", visitas: 620 }, { name: "Estados Unidos", visitas: 480 }, { name: "Francia", visitas: 380 }, { name: "Argentina", visitas: 300 }],
    edad: "25-34 años", comprador: "Coleccionista emergente", canal: "Búsqueda en catálogo",
    actividad: [
      { t: "Visita desde España", cuando: "hace 30 minutos" },
      { t: "Vista en 3D desde México", cuando: "hace 4 horas" },
      { t: "Guardada como favorita", cuando: "hace 8 horas" },
      { t: "Visita desde Argentina", cuando: "hace 1 día" },
      { t: "Consulta de precio", cuando: "hace 2 días" },
    ],
    vsMedia: 9,
  },
  quietud: {
    titulo: "Quietud", anyo: 2021, tecnica: "Madera tallada", img: quietud,
    visitas: 2240, deltaVisitas: -3, favoritos: 142, deltaFavoritos: 7, inter3D: 640,
    paises: [{ name: "España", visitas: 960 }, { name: "Francia", visitas: 480 }, { name: "México", visitas: 340 }, { name: "Estados Unidos", visitas: 280 }, { name: "Argentina", visitas: 180 }],
    edad: "35-44 años", comprador: "Coleccionista privado", canal: "Recomendación curador",
    actividad: [
      { t: "Guardada como favorita", cuando: "hace 5 horas" },
      { t: "Vista en 3D desde Francia", cuando: "hace 1 día" },
      { t: "Visita desde España", cuando: "hace 2 días" },
      { t: "Visita desde México", cuando: "hace 3 días" },
      { t: "Compartida por correo", cuando: "hace 4 días" },
    ],
    vsMedia: -8,
  },
  resto: {
    titulo: "Resto", anyo: 2020, tecnica: "Técnica mixta", img: resto,
    visitas: 1280, deltaVisitas: 5, favoritos: 64, deltaFavoritos: 3, inter3D: null,
    paises: [{ name: "España", visitas: 580 }, { name: "México", visitas: 240 }, { name: "Francia", visitas: 180 }, { name: "Estados Unidos", visitas: 160 }, { name: "Argentina", visitas: 120 }],
    edad: "45-54 años", comprador: "Galerista", canal: "Búsqueda en catálogo",
    actividad: [
      { t: "Visita desde España", cuando: "hace 6 horas" },
      { t: "Guardada como favorita", cuando: "hace 1 día" },
      { t: "Visita desde México", cuando: "hace 2 días" },
      { t: "Consulta de precio", cuando: "hace 5 días" },
      { t: "Visita desde Francia", cuando: "hace 1 semana" },
    ],
    vsMedia: -22,
  },
};

export default function ObraAnalytics() {
  const { slug = "caida", obraSlug = "caida" } = useParams();
  const obra = OBRAS[obraSlug] ?? OBRAS.caida;
  const maxPais = Math.max(...obra.paises.map((p) => p.visitas));
  const tasaInteres = ((obra.favoritos / obra.visitas) * 100).toFixed(1);

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <Link to={`/perfil/escultor/${slug}`} className="font-body text-[13px] text-gray hover:opacity-65 transition-opacity">Salir</Link>
      </header>

      <section className="max-w-[1120px] mx-auto px-6 py-10 md:py-14">
        <Link to={`/perfil/escultor/${slug}`} className="font-body text-[12px] uppercase tracking-[0.16em] text-gray hover:opacity-65 transition-opacity inline-block mb-8">← Mis obras</Link>

        {/* Cabecera obra */}
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-12 pb-10 border-b border-border">
          <div className="w-32 h-40 sm:w-40 sm:h-52 bg-secondary overflow-hidden flex-shrink-0">
            <img src={obra.img} alt={obra.titulo} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="eyebrow mb-2">Analítica de obra</div>
            <h1 className="font-display font-bold text-[clamp(32px,4vw,52px)] tracking-[-0.02em] text-ink leading-[1.05] mb-2">{obra.titulo}</h1>
            <div className="font-body text-[14px] text-gray">{obra.anyo} · {obra.tecnica}</div>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <Metric icon={<Eye className="w-4 h-4" />} label="Visitas totales" value={obra.visitas.toLocaleString("es-ES")} delta={obra.deltaVisitas} />
          <Metric icon={<Heart className="w-4 h-4" />} label="Veces guardada" value={obra.favoritos.toLocaleString("es-ES")} delta={obra.deltaFavoritos} />
          <Metric icon={<Box className="w-4 h-4" />} label="Interacciones 3D" value={obra.inter3D !== null ? obra.inter3D.toLocaleString("es-ES") : "—"} />
          <Metric icon={<TrendingUp className="w-4 h-4" />} label="Tasa de interés" value={`${tasaInteres} %`} sublabel="favoritos / visitas únicas" />
        </div>

        {/* Países */}
        <Section title="De dónde viene tu audiencia">
          <div className="space-y-3">
            {obra.paises.map((p) => (
              <div key={p.name} className="flex items-center gap-4">
                <div className="w-32 font-body text-[13px] text-ink">{p.name}</div>
                <div className="flex-1 h-2 bg-secondary relative">
                  <div className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${(p.visitas / maxPais) * 100}%` }} />
                </div>
                <div className="w-20 text-right font-body text-[12px] text-muted-line tabular-nums">{p.visitas.toLocaleString("es-ES")}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Perfil visitante */}
        <Section title="Perfil del visitante">
          <div className="flex flex-wrap gap-3">
            <Pill label="Edad" value={obra.edad} />
            <Pill label="Tipo" value={obra.comprador} />
            <Pill label="Canal" value={obra.canal} />
          </div>
        </Section>

        {/* Actividad */}
        <Section title="Actividad reciente">
          <ul className="divide-y divide-border border-y border-border">
            {obra.actividad.map((a, i) => (
              <li key={i} className="flex items-center justify-between py-3">
                <span className="font-body text-[14px] text-ink">{a.t}</span>
                <span className="font-body text-[12px] text-muted-line">{a.cuando}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Rendimiento */}
        <Section title="Rendimiento comparado">
          <p className="font-body text-[16px] text-gray">
            Esta obra recibe un <span className={`font-normal ${obra.vsMedia >= 0 ? "text-ink" : "text-amber-600"}`}>{Math.abs(obra.vsMedia)} %</span>{" "}
            {obra.vsMedia >= 0 ? "más" : "menos"} de visitas que la media de tu catálogo.
          </p>
        </Section>
      </section>
    </main>
  );
}

const Metric = ({ icon, label, value, delta, sublabel }: { icon: React.ReactNode; label: string; value: string; delta?: number; sublabel?: string }) => (
  <div className="border-t border-ink pt-4">
    <div className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.16em] text-muted-line mb-3">{icon} {label}</div>
    <div className="font-display font-bold text-[clamp(28px,3vw,40px)] text-ink leading-none mb-2">{value}</div>
    {delta !== undefined && (
      <div className={`inline-flex items-center gap-1 font-body text-[12px] ${delta >= 0 ? "text-green-600" : "text-amber-600"}`}>
        {delta >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        {Math.abs(delta)} % vs mes anterior
      </div>
    )}
    {sublabel && <div className="font-body text-[11px] text-muted-line mt-1">{sublabel}</div>}
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="font-display font-bold text-[20px] text-ink mb-5">{title}</h2>
    {children}
  </div>
);

const Pill = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-border px-4 py-3">
    <div className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-line mb-1">{label}</div>
    <div className="font-body text-[14px] text-ink">{value}</div>
  </div>
);
