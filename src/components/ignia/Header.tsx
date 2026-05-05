import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const navItems = ["Colección", "Escultores", "Aprende", "Editorial", "Ignia gallery"];

export const Header = () => (
  <header className="sticky top-0 z-[100] h-14 bg-white border-b border-border flex items-center px-6 md:px-12">
    <div className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center" aria-label="Ignia Gallery">
        <Logo />
      </Link>
      <nav className="hidden md:flex items-center gap-9">
        {navItems.map(item => (
          <a key={item} href="#" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Link to="/login" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">Entrar</Link>
      </div>
    </div>
  </header>
);
