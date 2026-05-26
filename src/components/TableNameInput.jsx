const TableNameInput = ({ value, onChange, error, disabled, colors }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{
      display: "block", fontSize: 12.5, fontWeight: 800,
      color: colors.textMuted, marginBottom: 8,
      letterSpacing: "0.04em", 
    }}>
      Nombre de la tabla SQL:
    </label>

    <input
      className="csv-table-input"
      type="text"
      placeholder="ej. cat_articulos"
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? "table-name-error" : undefined}
      style={{
        background: colors.surfaceAlt,
        border: `1.5px solid ${error ? colors.danger : colors.border}`,
        color: colors.text,
      }}
    />

    {error && (
      <p
        id="table-name-error"
        className="csv-fade-in"
        style={{ margin: "6px 0 0", fontSize: 12.5, color: colors.danger }}
      >
        {error}
      </p>
    )}
  </div>
);

export default TableNameInput;
