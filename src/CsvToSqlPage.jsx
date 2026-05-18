import { useState } from "react";

import { useDarkMode }   from "./hooks/useDarkMode";
import { useFileUpload } from "./hooks/useFileUpload";
import { useConverter }  from "./hooks/useConverter";
import { getColors }     from "./styles/colors";

import CardHeader      from "./components/CardHeader";
import TableNameInput  from "./components/TableNameInput";
import DropZone        from "./components/DropZone";
import ErrorBanner     from "./components/ErrorBanner";
import SuccessPanel    from "./components/SuccessPanel";
import GenerateButton  from "./components/GenerateButton";
import PageFooter      from "./components/PageFooter";

import "./styles/CsvToSql.css";

const CsvToSqlPage = () => {
  const { dark, toggle } = useDarkMode();
  const colors           = getColors(dark);

  const [tableName, setTableName] = useState("");

  const {
    status, errorMsg, tableNameError, sqlBlob,
    convert, reset, clearTableNameError,
  } = useConverter();

  const {
    file, dragging, fileInputRef,
    onDrop, onDragOver, onDragLeave,
    openFilePicker, removeFile, onFileChange,
  } = useFileUpload((err) => {
    if (err) {
      // mejor disparamos directamente el estado de error
    }
  });

  //Descarga del archivo .sql
  const handleDownload = () => {
    if (!sqlBlob) return;
    const url = URL.createObjectURL(sqlBlob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = `${tableName || "output"}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  //Reset completo
  const handleReset = () => {
    reset();
    setTableName("");
    removeFile();
  };

  //Lanzar conversión
  const handleGenerate = () => convert(tableName, file);

  return (
    <div
      className="csv-sql-page"
      style={{ background: colors.bg }}
    >
      {/*Card principal */}
      <div
        className="csv-card"
        style={{
          background:   colors.surface,
          border:       `1px solid ${colors.border}`,
          boxShadow:    colors.shadow,
        }}
      >
        <CardHeader
          dark={dark}
          onToggle={toggle}
          colors={colors}
        />

        <TableNameInput
          value={tableName}
          onChange={(e) => { setTableName(e.target.value); clearTableNameError(); }}
          error={tableNameError}
          disabled={status === "loading" || status === "done"}
          colors={colors}
        />

        {status !== "done" && (
          <DropZone
            file={file}
            dragging={dragging}
            fileInputRef={fileInputRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onFileChange={onFileChange}
            onRemoveFile={removeFile}
            openFilePicker={openFilePicker}
            colors={colors}
          />
        )}

        <ErrorBanner
          message={status === "error" ? errorMsg : ""}
          colors={colors}
        />

        {status === "done" && (
          <SuccessPanel
            tableName={tableName}
            sqlBlob={sqlBlob}
            onDownload={handleDownload}
            onReset={handleReset}
            colors={colors}
          />
        )}

        {status !== "done" && (
          <GenerateButton
            status={status}
            onClick={handleGenerate}
            colors={colors}
          />
        )}

        <PageFooter colors={colors} />
      </div>
    </div>
  );
};

export default CsvToSqlPage;
