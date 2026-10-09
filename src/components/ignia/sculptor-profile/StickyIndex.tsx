import { useEffect, useRef, useState } from "react";

type IndexItem = { id: string; label: string };

// Sticks below the global floating header on scroll, and highlights
// whichever section is currently in view.
export const StickyIndex = ({ items }: { items: IndexItem[] }) => {
  const [active, setActive] = useState(items[0]?.id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-[88px] z-30 bg-white border-b border-border"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center gap-8 overflow-x-auto">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => goTo(it.id)}
            className="font-body text-[12px] uppercase tracking-[0.14em] whitespace-nowrap py-5 border-b-2 transition-colors"
            style={{
              borderColor: active === it.id ? "#121212" : "transparent",
              color: active === it.id ? "#121212" : "#8a8a8a",
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
