import { Link } from "react-router-dom";
import { Logo } from "./Logo";

// Shared app-shell brand mark (Ignia logo + app label) used by both
// Admin and My Studio headers, so the two don't drift into their own
// one-off header styles. Pass onClick (and omit `to`-based navigation
// by intercepting it) when the caller needs to guard navigation, e.g.
// confirming before leaving a form with unsaved changes.
export const AppBrand = ({ to, label, onClick }: { to: string; label: string; onClick?: (e: React.MouseEvent) => void }) => {
  const content = (
    <>
      <Logo variant="dark" width={58} style={{ display: "block" }} />
      <span style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 500, color: "#121212", fontSize: 16, letterSpacing: "-0.04em" }}>
        {label}
      </span>
    </>
  );
  const sharedStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 12, textDecoration: "none" };

  if (onClick) {
    return (
      <a href={to} onClick={onClick} style={sharedStyle}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to} style={sharedStyle}>
      {content}
    </Link>
  );
};
