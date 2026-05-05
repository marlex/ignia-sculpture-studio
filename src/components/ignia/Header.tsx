import { Logo } from "./Logo";

const navItems = ["Colección", "Artistas", "Aprende", "Editorial", "Ignia gallery"];

export const Header = () => (
  <header className="sticky top-0 z-[100] h-14 bg-white border-b border-border flex items-center px-6 md:px-12">
    <div className="flex items-center justify-between w-full">
      <a href="#" className="flex items-center" aria-label="Ignia Gallery">
        <Logo />
      </a>
      <nav className="hidden md:flex items-center gap-9">
        {navItems.map(item => (
          <a key={item} href="#" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a href="#" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">Entrar</a>
        <button className="btn-primary !py-2 !px-5">Publicar obra ↗</button>
      </div>
    </div>
  </header>
);
