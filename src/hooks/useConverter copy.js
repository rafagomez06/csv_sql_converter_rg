/**
 * useConverter.js
 * Hook que orquesta la lógica de conversión CSV → SQL.
 * Aquí se conecta con el backend Flask.
 */
import { useState } from "react";
import { validateTableName } from "../utils/validateFile";

// Estados posibles: "idle" | "loading" | "done" | "error"

export const useConverter = () => {
  const [status,         setStatus]         = useState("idle");
  const [errorMsg,       setErrorMsg]       = useState("");
  const [tableNameError, setTableNameError] = useState("");
  const [sqlBlob,        setSqlBlob]        = useState(null); // blob real del backend

  const convert = async (tableName, file) => {
    // 1 — Validar nombre de tabla
    const nameError = validateTableName(tableName);
    if (nameError) { setTableNameError(nameError); return; }

    // 2 — Validar que haya archivo
    if (!file) {
      setErrorMsg("Por favor, sube un archivo .csv antes de continuar");
      setStatus("error");
      return;
    }

    setTableNameError("");
    setErrorMsg("");
    setStatus("loading");

    try {
      // ── Llamada real al backend Flask ──────────────────────────────────
      // Descomenta esto cuando tengas el backend listo:
      //
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("table_name", tableName.trim());
      //
      // const res = await fetch("http://localhost:5000/convert", {
      //   method: "POST",
      //   body: formData,
      // });
      //
      // if (!res.ok) {
      //   const { message } = await res.json().catch(() => ({}));
      //   throw new Error(message || `Error del servidor: ${res.status}`);
      // }
      //
      // const blob = await res.blob();
      // setSqlBlob(blob);
      // ──────────────────────────────────────────────────────────────────

      // Simulación temporal (quitar cuando conectes Flask):
      await new Promise((r) => setTimeout(r, 2200));
      const mockSql = `-- SQL generado para: ${tableName}\nINSERT INTO [${tableName}] VALUES ('ejemplo', 1, '2024-01-01');`;
      setSqlBlob(new Blob([mockSql], { type: "text/plain" }));

      setStatus("done");
    } catch (err) {
      setErrorMsg(err.message || "Ocurrió un error inesperado. Intenta de nuevo.");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMsg("");
    setTableNameError("");
    setSqlBlob(null);
  };

  const clearTableNameError = () => setTableNameError("");

  return {
    status,
    errorMsg,
    tableNameError,
    sqlBlob,
    convert,
    reset,
    clearTableNameError,
  };
};
