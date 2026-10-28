import { useEffect, useRef, useState } from "react";

export type AppAccountMenuItem = { key: string; label: string; onClick: () => void };

// Shared account/avatar dropdown used by both Admin and My Studio
// headers, so the two don't drift into their own one-off account UI.
export const AppAccountMenu = ({
  name,
  subtitle,
  items,
}: {
  name: string;
  subtitle?: string;
  items: AppAccountMenuItem[];
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <div
          aria-hidden
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#121212", color: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Albert Sans', sans-serif", fontWeight: 500, fontSize: 13,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ lineHeight: 1.3, textAlign: "left" }}>
          <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 500, color: "#121212", fontSize: 14 }}>
            {name}
          </div>
          {subtitle && (
            <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 12 }}>
              {subtitle}
            </div>
          )}
        </div>
        <span aria-hidden style={{ fontSize: 10, color: "#666666", transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute", right: 0, top: "calc(100% + 10px)", minWidth: 180,
            background: "#FFFFFF", border: "1px solid #E5E5E5", boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            zIndex: 50,
          }}
        >
          {items.map((item, idx) => (
            <button
              key={item.key}
              role="menuitem"
              onClick={() => { item.onClick(); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left", padding: "12px 16px",
                background: "none", border: "none", borderTop: idx > 0 ? "1px solid #E5E5E5" : "none", cursor: "pointer",
                fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
