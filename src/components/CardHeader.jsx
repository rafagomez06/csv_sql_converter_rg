import { SunIcon, MoonIcon } from "../icons/icons";

const CardHeader = ({ dark, onToggle, colors }) => (
  <div className="csv-header">
    {/* Título y descripción */}
    <div>
      <h1 style={{
        margin: 0, fontSize: 26, fontWeight: 600,
        color: colors.text, lineHeight: 1.2, letterSpacing: "-0.02em",
      }}>
       Convertidor CSV <span style={{ color: colors.accent }}>a</span> SQL 
      </h1>
    </div>

    {/* Toggle dark mode */}
    <button
      className="csv-toggle"
      onClick={onToggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      style={{
        background: colors.toggle,
        border: `1px solid ${colors.border}`,
        color: colors.toggleIcon,
      }}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
      <span style={{ fontSize: 12, fontWeight: 500, color: colors.textMuted }}>
        {dark ? "Claro" : "Oscuro"}
      </span>
    </button>
  </div>
);

export default CardHeader;
