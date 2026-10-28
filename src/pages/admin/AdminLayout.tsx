import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { useAuth } from "@/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AppBrand } from "@/components/ignia/AppBrand";
import { AppSidebar } from "@/components/ignia/AppSidebar";
import { AppAccountMenu } from "@/components/ignia/AppAccountMenu";
import { ADMIN_SECTIONS } from "./sections";

export default function AdminLayout() {
  const lang = useLang();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      if (!alive) return;
      if (profile?.role !== "admin") { navigate("/login"); return; }
      setChecking(false);
    })();
    return () => { alive = false; };
  }, [navigate]);

  if (checking) return null;

  const t = lang === "es" ? { signout: "Cerrar sesión", config: "Configuración" } : { signout: "Sign out", config: "Settings" };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid #E5E5E5", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AppBrand to="/admin/dashboard" label="Admin" />
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14, textDecoration: "underline" }}
          >
            {lang === "es" ? "Ver sitio público ↗" : "View public site ↗"}
          </a>
          {user && (
            <AppAccountMenu
              name={user.email || ""}
              items={[
                { key: "config", label: t.config, onClick: () => navigate("/admin/dashboard/configuracion") },
                { key: "signout", label: t.signout, onClick: async () => { await signOut(); navigate("/login"); } },
              ]}
            />
          )}
        </div>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 65px)" }}>
        <AppSidebar
          items={ADMIN_SECTIONS.map((s) => ({
            key: s.key,
            label: lang === "es" ? s.labelEs : s.labelEn,
            to: s.path,
            end: s.path === "/admin/dashboard",
          }))}
        />
        <section style={{ padding: "56px 56px 80px" }}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
