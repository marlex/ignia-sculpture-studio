import type { CSSProperties } from "react";
import { NavLink } from "react-router-dom";

export type AppSidebarItem = {
  key: string;
  label: string;
  to?: string;
  end?: boolean;
  active?: boolean;
  onClick?: () => void;
};

const itemStyle = (active: boolean): CSSProperties => ({
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "14px 32px",
  fontFamily: "Hanken Grotesk, sans-serif",
  fontWeight: 400,
  fontSize: 15,
  color: "#121212",
  background: "transparent",
  border: "none",
  borderLeft: active ? "2px solid #121212" : "2px solid transparent",
  cursor: "pointer",
  borderRadius: 0,
  textDecoration: "none",
});

// Shared sidebar used by both Admin and My Studio so the two app
// shells don't drift into their own one-off nav styles.
export const AppSidebar = ({ items }: { items: AppSidebarItem[] }) => (
  <aside style={{ borderRight: "1px solid #E5E5E5", padding: "40px 0" }}>
    {items.map((item) =>
      item.to ? (
        <NavLink key={item.key} to={item.to} end={item.end} style={({ isActive }) => itemStyle(isActive)}>
          {item.label}
        </NavLink>
      ) : (
        <button key={item.key} type="button" onClick={item.onClick} style={itemStyle(!!item.active)}>
          {item.label}
        </button>
      ),
    )}
  </aside>
);
