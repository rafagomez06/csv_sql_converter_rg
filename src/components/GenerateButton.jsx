const GenerateButton = ({ status, onClick, colors }) => (
  <button
    className="csv-btn-primary"
    onClick={onClick}
    disabled={status === "loading"}
    aria-busy={status === "loading"}
    style={{
      background: colors.accent,
      color: "#fff",
    }}
  >
    {status === "loading" ? (
      <>
        <span className="csv-spinner" aria-hidden="true" />
        Generando script SQL…
      </>
    ) : (
      "Generar script SQL"
    )}
  </button>
);

export default GenerateButton;
