const BLOCKS = [
  {
    n: "01",
    title: "Ve la obra desde todos los ángulos",
    desc: "Visor 3D interactivo en cada pieza. Gira, examina y entiende la escala real antes de comprar. Sin fotos planas.",
  },
  {
    n: "02",
    title: "Propiedad certificada para siempre",
    desc: "Certificado blockchain vía Verisart en cada venta. El historial de propiedad viaja con la pieza, incluso en reventas futuras.",
  },
  {
    n: "03",
    title: "El valor de la obra, en tus manos",
    desc: "El artista decide su precio. Se queda con el 82–85% de cada venta. Sin exclusividad. Sin letra pequeña. El mercado más justo que existe para la escultura.",
  },
];

export const ConstruidaPara = ({ onInvite }: { onInvite: () => void }) => {
  return (
    <section style={{ background: "#0a0a0a", padding: "100px 40px", borderRadius: 0 }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 48,
          color: "#FFFFFF",
          lineHeight: 1.15,
          letterSpacing: "0.01em",
          textAlign: "center",
          margin: 0,
        }}
      >
        Construida para la escultura. Solo para eso.
      </h2>
      <div
        style={{
          marginTop: 64,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
        }}
      >
        {BLOCKS.map((b, i) => (
          <div
            key={b.n}
            style={{
              padding: "0 40px",
              borderLeft: i === 0 ? "none" : "0.5px solid #333333",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                color: "#FFFFFF",
                opacity: 0.1,
                fontSize: 80,
                lineHeight: 1,
              }}
            >
              {b.n}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                color: "#FFFFFF",
                fontSize: 22,
                marginTop: 16,
                lineHeight: 1.25,
              }}
            >
              {b.title}
            </div>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                fontSize: 16,
                lineHeight: 1.8,
                marginTop: 12,
              }}
            >
              {b.desc}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
        <button
          onClick={onInvite}
          style={{
            background: "#0a0a0a",
            color: "#FFFFFF",
            border: "0.5px solid #FFFFFF",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.13em",
            fontSize: 10,
            padding: "14px 32px",
            borderRadius: 0,
            cursor: "pointer",
            boxShadow: "none",
          }}
        >
          Únete a Ignia
        </button>
      </div>
    </section>
  );
};
