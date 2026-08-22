import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/i18n/LanguageContext";

type CardItem = {
  key: string;
  title: string;
  description: string;
  cta: string;
  to: string;
  status: "open" | "applications-open";
};

const CONTENT: Record<"es" | "en", { eyebrow: string; title: string; subtitle: string; cards: CardItem[] }> = {
  en: {
    eyebrow: "THE INSTITUTION",
    title: "Five ways in. One standard.",
    subtitle:
      "Sculptors, collectors, galleries, curators and advisors. Ignia is built as a place for all of them, held to the same criteria.",
    cards: [
      {
        key: "sculptors",
        title: "Sculptors",
        description: "Your work, treated fairly.",
        cta: "Explore Sculptors →",
        to: "/sculptors",
        status: "open",
      },
      {
        key: "collectors",
        title: "Collectors",
        description: "Verified sculpture, forever.",
        cta: "Explore Sculptures →",
        to: "/sculptures",
        status: "open",
      },
      {
        key: "galleries",
        title: "Galleries",
        description: "One more channel for your collection.",
        cta: "Let's talk →",
        to: "/galleries",
        status: "open",
      },
      {
        key: "curators",
        title: "Curators",
        description: "Your criteria, added to ours.",
        cta: "Apply as Curator →",
        to: "/guidance/curator",
        status: "applications-open",
      },
      {
        key: "advisors",
        title: "Advisors",
        description: "Guide the market with us.",
        cta: "Apply as Advisor →",
        to: "/guidance/advisor",
        status: "applications-open",
      },
    ],
  },
  es: {
    eyebrow: "LA INSTITUCIÓN",
    title: "Cinco formas de entrar. Un solo estándar.",
    subtitle:
      "Escultores, coleccionistas, galerías, curadores y advisors. Ignia está construido como un lugar para todos ellos, sometido a los mismos criterios.",
    cards: [
      {
        key: "sculptors",
        title: "Escultores",
        description: "Tu obra, tratada con justicia.",
        cta: "Explorar Escultores →",
        to: "/sculptors",
        status: "open",
      },
      {
        key: "collectors",
        title: "Coleccionistas",
        description: "Escultura verificada, para siempre.",
        cta: "Explorar Esculturas →",
        to: "/sculptures",
        status: "open",
      },
      {
        key: "galleries",
        title: "Galerías",
        description: "Un canal más para tu colección.",
        cta: "Hablemos →",
        to: "/galleries",
        status: "open",
      },
      {
        key: "curators",
        title: "Curadores",
        description: "Tu criterio, sumado al nuestro.",
        cta: "Aplicar como Curador →",
        to: "/guidance/curator",
        status: "applications-open",
      },
      {
        key: "advisors",
        title: "Advisors",
        description: "Guía el mercado con nosotros.",
        cta: "Aplicar como Advisor →",
        to: "/guidance/advisor",
        status: "applications-open",
      },
    ],
  },
};

const STATUS_LABEL: Record<"es" | "en", Record<"open" | "applications-open", string>> = {
  en: { open: "Open", "applications-open": "Applications open" },
  es: { open: "Abierto", "applications-open": "Solicitudes abiertas" },
};

export const FiveWaysIn = () => {
  const lang = useLang();
  const t = CONTENT[lang];

  return (
    <section className="bg-surface px-6 md:px-12 py-16 md:py-20">
      <div className="max-w-[1180px] mx-auto">
        <header className="text-center mb-10 md:mb-12">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink mb-4">
            {t.title}
          </h2>
          <p className="font-body text-[16px] font-normal text-gray max-w-[680px] mx-auto leading-[1.7]">
            {t.subtitle}
          </p>
        </header>

        <ul
          className="flex flex-col items-center gap-6 list-none p-0 m-0"
          aria-label="Ignia profiles"
        >
          {t.cards.map((item) => (
            <li key={item.key} className="w-full max-w-[640px]">
              <Link
                to={item.to}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-5 w-full border border-white/20 bg-[#121212] p-5 md:px-6 md:py-5 text-white hover:bg-white hover:text-[#121212] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
                style={{ borderRadius: 0 }}
              >
                <div className="flex flex-col items-start">
                  <Badge
                    variant={item.status === "open" ? "secondary" : "default"}
                    className="rounded-none mb-2 w-fit"
                  >
                    {STATUS_LABEL[lang][item.status]}
                  </Badge>
                  <h3
                    className="group-hover:text-[#121212] transition-colors"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: 32,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-[15px] font-normal text-white/65 group-hover:text-[#666666] transition-colors mt-1"
                    style={{ lineHeight: 1.6 }}
                  >
                    {item.description}
                  </p>
                </div>
                <span
                  className="inline-block font-body font-medium text-[13px] uppercase tracking-[0.2em] px-6 py-3 bg-transparent border border-white text-white group-hover:text-[#121212] group-hover:border-[#121212] transition-colors whitespace-nowrap"
                  style={{ textDecoration: "none" }}
                >
                  {item.cta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
