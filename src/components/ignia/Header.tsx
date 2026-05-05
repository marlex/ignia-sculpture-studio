import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const navItems: { label: string; to: string }[] = [
  { label: "Colección", to: "/coleccion" },
  { label: "Escultores", to: "/escultores" },
  { label: "Aprende", to: "/aprende" },
  { label: "Editorial", to: "/editorial" },
  { label: "Ignia gallery", to: "/ignia-gallery" },
];

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-[100] h-14 bg-white/95 backdrop-blur border-b border-border flex items-center px-6 md:px-12">
    <div className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center" aria-label="Ignia Gallery">
        <Logo />
      </Link>
      <nav className="hidden md:flex items-center gap-9">
        {navItems.map(item => (
          <Link key={item.label} to={item.to} className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Link to="/login" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">Entrar</Link>
      </div>
    </div>
  </header>
);
