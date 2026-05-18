import { XIcon } from "../icons/icons";

const ErrorBanner = ({ message, colors }) => {
  if (!message) return null;

  return (
    <div
      className="csv-fade-in"
      role="alert"
      style={{
        background: colors.dangerLight,
        border: `1px solid ${colors.danger}`,
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 18,
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: colors.danger,
      }}
    >
      <XIcon />
      <p style={{ margin: 0, fontSize: 13.5 }}>{message}</p>
    </div>
  );
};

export default ErrorBanner;
