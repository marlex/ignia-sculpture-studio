// Sidebar config for the admin dashboard. Extend by adding a new entry.
export type AdminSection = {
  key: string;
  path: string; // absolute path
  labelEs: string;
  labelEn: string;
};

export const ADMIN_SECTIONS: AdminSection[] = [
  { key: "overview", path: "/admin/dashboard", labelEs: "Overview", labelEn: "Overview" },
  { key: "solicitudes", path: "/admin/dashboard/solicitudes", labelEs: "Solicitudes", labelEn: "Applications" },
  { key: "artistas", path: "/admin/dashboard/artistas", labelEs: "Artistas", labelEn: "Artists" },
  { key: "obras", path: "/admin/dashboard/obras", labelEs: "Obras", labelEn: "Artworks" },
  { key: "metricas", path: "/admin/dashboard/metricas", labelEs: "Métricas", labelEn: "Metrics" },
];
