import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { useAuth } from "@/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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

  const t = lang === "es" ? { signout: "Salir" } : { signout: "Sign out" };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid #E5E5E5", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/admin/dashboard" style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400, color: "#121212", fontSize: 20, letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase" }}>
          Admin
        </Link>
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
            <span style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14 }}>
              {user.email}
            </span>
          )}
          <button
            onClick={async () => { await signOut(); navigate("/login"); }}
            style={{ background: "none", border: "none", color: "#121212", fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, textDecoration: "underline", cursor: "pointer" }}
          >
            {t.signout}
          </button>
        </div>
      </header>
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 32 }}>
          <aside style={{ borderRight: "1px solid #eee", paddingRight: 16 }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: 100 }}>
              {ADMIN_SECTIONS.map((s) => (
                <NavLink
                  key={s.key}
                  to={s.path}
                  end={s.path === "/admin/dashboard"}
                  style={({ isActive }) => ({
                    fontFamily: "Hanken Grotesk, sans-serif",
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
          <section style={{ minWidth: 0, minHeight: 760, paddingBottom: 80 }}>
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}
