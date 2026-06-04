const logos = [
  { name: "Coca-Cola", src: "/logos/coca-cola.svg" },
  { name: "NTT DATA", src: "/logos/ntt-data.svg" },
  { name: "Verisart", src: "/logos/verisart.svg" },
  { name: "Hiscox", src: "/logos/hiscox.svg" },
  { name: "Google", src: "/logos/google.svg" },
];

export const Sponsors = () => {
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div className="px-6 md:px-12">
        <p
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#CCCCCC",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          BACKED BY
        </p>

        <div className="hidden md:flex items-center justify-center" style={{ gap: "64px" }}>
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              style={{
                maxHeight: "28px",
                width: "auto",
                filter: "grayscale(1)",
                opacity: 0.45,
                transition: "opacity 300ms ease, filter 300ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.45";
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(1)";
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:hidden justify-items-center" style={{ gap: "32px" }}>
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              style={{
                maxHeight: "38px",
                width: "auto",
                filter: "grayscale(1)",
                opacity: 0.45,
                transition: "opacity 300ms ease, filter 300ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.45";
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(1)";
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
