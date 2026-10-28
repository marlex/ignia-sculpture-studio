import { Link } from "react-router-dom";
import { Logo } from "./Logo";

// Shared app-shell brand mark (Ignia logo + app label) used by both
// Admin and My Studio headers, so the two don't drift into their own
// one-off header styles.
export const AppBrand = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
    <Logo variant="dark" width={72} />
    <span style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 500, color: "#121212", fontSize: 16, letterSpacing: "-0.04em" }}>
      {label}
    </span>
  </Link>
);
