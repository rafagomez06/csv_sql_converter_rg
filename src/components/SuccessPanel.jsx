/**
 * SuccessPanel.jsx
 * Panel que aparece cuando el script SQL fue generado exitosamente.
 * Muestra botones de descarga y nueva conversión.
 */
import { CheckIcon, DownloadIcon } from "../icons/icons";

const SuccessPanel = ({ tableName, sqlBlob, onDownload, onReset, colors }) => (
  <div
    className="csv-fade-in"
    role="status"
    aria-live="polite"
    style={{
      background: colors.successLight,
      border: `1px solid ${colors.success}`,
      borderRadius: 14,
      padding: "24px 20px",
      marginBottom: 20,
      textAlign: "center",
    }}
  >
    <div style={{ color: colors.success, marginBottom: 10 }}>
      <CheckIcon />
    </div>

    <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: colors.text }}>
      ¡Script generado exitosamente!
    </p>
    <p style={{ margin: "0 0 18px", fontSize: 13, color: colors.textMuted }}>
      Tu archivo SQL para la tabla{" "}<br></br>
      <code style={{ fontFamily: "'DM Mono', monospace", color: colors.accent_table }}>
        {tableName}
      </code>{" "}<br></br>
      está listo.
    </p>

    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
      <button
        className="csv-btn-primary"
        onClick={onDownload}
        style={{
          width: "auto",
          background: colors.accent,
          color: "#fff",
          borderRadius: 10,
          padding: "11px 22px",
          fontSize: 14,
        }}
      >
        <DownloadIcon /> Descargar .sql
      </button>

      <button
        className="csv-btn-secondary"
        onClick={onReset}
        style={{
          border: `1.5px solid ${colors.border}`,
          color: colors.textMuted,
        }}
      >
        Nueva conversión
      </button>
    </div>
  </div>
);

export default SuccessPanel;
