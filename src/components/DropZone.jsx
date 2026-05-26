import { FileIcon, UploadIcon, XIcon } from "../icons/icons";
import { formatSize } from "../utils/formatSize";

const DropZone = ({
  file,
  dragging,
  fileInputRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
  onRemoveFile,
  openFilePicker,
  colors,
}) => {
  const borderColor = dragging
    ? colors.accent
    : file
    ? colors.success
    : colors.dropBorder;

  const bgColor = dragging
    ? colors.accentLight
    : file
    ? colors.successLight
    : colors.dropBg;

  return (
    <div
      className={`csv-dropzone ${file ? "csv-dropzone--has-file" : ""}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => !file && openFilePicker()}
      role={!file ? "button" : undefined}
      tabIndex={!file ? 0 : undefined}
      aria-label={!file ? "Seleccionar archivo CSV" : undefined}
      onKeyDown={(e) => { if (!file && e.key === "Enter") openFilePicker(); }}
      style={{
        border: `2px dashed ${borderColor}`,
        background: bgColor,
      }}
    >
      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={onFileChange}
        aria-hidden="true"
      />

      {/* Estado vacío / dragging */}
      {!file && (
        <>
          <div style={{ color: dragging ? colors.accent : colors.textMuted, marginBottom: 10 }}>
            <UploadIcon />
          </div>
          <p style={{ margin: "0 0 4px", fontSize: 14.5, fontWeight: 800, color: colors.text }}>
            {dragging ? "Suelta el archivo aquí" : "Suelta tu archivo .csv aquí"}
          </p>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: colors.textMuted }}>
            o haz clic para explorar tus archivos locales
          </p>
          <span style={{
            display: "inline-block", fontSize: 12, fontWeight: 800,
            border: `1px solid ${colors.border}`, borderRadius: 20,
            padding: "5px 16px", color: colors.textMuted,
            background: colors.surface,
          }}>
            Solo archivos .csv · Máx 50 MB
          </span>
        </>
      )}

      {/* Archivo cargado */}
      {file && (
        <div className="csv-fade-in" style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center" }}>
          <div style={{ color: colors.success }}>
            <FileIcon />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: colors.text }}>
              {file.name}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 12.5, color: colors.textMuted }}>
              {formatSize(file.size)}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onRemoveFile(); }}
            aria-label="Quitar archivo"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: colors.textMuted, padding: 4, borderRadius: 6, marginLeft: 8,
            }}
          >
            <XIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default DropZone;
