import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_SECTIONS } from "./sections";

export default function AdminLayout() {
  const lang = useLang();
  const navigate = useNavigate();
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

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 32 }}>
          <aside style={{ borderRight: "1px solid #eee", paddingRight: 16 }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: 100 }}>
              {ADMIN_SECTIONS.map((s) => (
                <NavLink
                  key={s.key}
                  to={s.path}
                  end={s.path === "/admin/dashboard"}
                  style={({ isActive }) => ({
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "10px 12px",
                    color: isActive ? "#121212" : "#666",
                    background: isActive ? "#f4f4f4" : "transparent",
                    borderLeft: isActive ? "2px solid #121212" : "2px solid transparent",
                    textDecoration: "none",
                  })}
                >
                  {lang === "es" ? s.labelEs : s.labelEn}
                </NavLink>
              ))}
            </nav>
          </aside>
          <section style={{ minWidth: 0, paddingBottom: 80 }}>
            <Outlet />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
