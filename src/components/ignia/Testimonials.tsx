export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Ignia changed how I think about selling my work online. The 3D viewer alone is worth everything.",
      name: "Helena Vásquez",
      role: "Sculptor · Mexico City",
    },
    {
      quote:
        "Finally a platform that treats sculpture as sculpture, not as a flat image.",
      name: "Juan Moreno",
      role: "Sculptor · Barcelona",
    },
    {
      quote:
        "The commission is fair, the experience is clean, and my collectors love the detail they can see.",
      name: "Sofía Ramos",
      role: "Sculptor · Buenos Aires",
    },
  ];

  return (
    <section style={{ background: "#fff", padding: "120px 0" }}>
      <div className="px-6 md:px-12">
        <h2
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#999999",
            marginBottom: "64px",
          }}
        >
          ARTISTS ON IGNIA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`md:px-12 ${i < testimonials.length - 1 ? "md:border-r" : ""}`}
              style={{ borderColor: "#EEEEEE" }}
            >
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "16px",
                  color: "#1A1A1A",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {t.quote}
              </p>
              <div style={{ height: "24px" }} />
              <p
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#1A1A1A",
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#999999",
                  marginTop: "4px",
                }}
              >
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
