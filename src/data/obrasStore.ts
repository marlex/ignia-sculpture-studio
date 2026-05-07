// LocalStorage-backed mock store for published works
export type ObraEstado = "Publicada" | "En revisión" | "Borrador" | "Vendida";

export type ObraDraft = {
  // Step 1
  titulo: string;
  artista: string;
  anyo: string;
  tecnica: string;
  alto: string;
  ancho: string;
  profundo: string;
  peso?: string;
  edicion: "unica" | "limitada" | "reproduccion";
  ejemplares?: string;
  precio: string;
  descripcion: string;
  // Step 2
  fotoPrincipal?: string; // dataURL
  fotosAdicionales: string[]; // dataURLs
  archivo3dNombre?: string;
  archivo3dDataUrl?: string; // base64 .glb (small files only)
};

export type Obra = ObraDraft & {
  id: string;
  certificadoId: string;
  hash: string;
  fechaPublicacion: string;
  ownerEmail: string;
  estado: ObraEstado;
  visitas: number;
  favoritos: number;
};

const KEY = "ignia.obras";

export const listObras = (email?: string): Obra[] => {
  try {
    const all: Obra[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    return email ? all.filter((o) => o.ownerEmail === email) : all;
  } catch {
    return [];
  }
};

export const saveObra = (o: Obra) => {
  const all = listObras();
  all.unshift(o);
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const getObra = (id: string): Obra | undefined => listObras().find((o) => o.id === id);

// Simple SHA-256 hash
export const sha256 = async (text: string): Promise<string> => {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const newCertId = () =>
  (crypto.randomUUID?.() || Math.random().toString(36).slice(2)).toUpperCase();
