/**
 * useConverter.js
 * Hook que orquesta la conversión CSV-SQL completamente en el frontend.
 * Lee el archivo con FileReader, convierte con csvToSql y genera el Blob descargable.
 */
import { useState } from "react";
import { validateTableName } from "../utils/validateFile";
import { csvToSql }          from "../utils/csvToSql";

export const useConverter = () => {
  const [status,         setStatus]         = useState("idle");
  const [errorMsg,       setErrorMsg]       = useState("");
  const [tableNameError, setTableNameError] = useState("");
  const [sqlBlob,        setSqlBlob]        = useState(null);
  const [insertCount,    setInsertCount]    = useState(0);

  const convert = (tableName, file) => {
    // 1 — Validar nombre de tabla
    const nameError = validateTableName(tableName);
    if (nameError) { setTableNameError(nameError); return; }

    // 2 — Validar que haya archivo
    if (!file) {
      setErrorMsg("Por favor, sube un archivo .csv antes de continuar.");
      setStatus("error");
      return;
    }

    setTableNameError("");
    setErrorMsg("");
    setStatus("loading");

    // 3 — Leer el archivo como texto plano con FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;

        // 4 — Convertir CSV → SQL usando la lógica de csvToSql.js
        const { sql, count } = csvToSql(csvText, tableName.trim());

        // 5 — Crear el Blob descargable
        const blob = new Blob([sql], { type: "text/plain;charset=utf-8" });

        setSqlBlob(blob);
        setInsertCount(count);
        setStatus("done");

      } catch (err) {
        setErrorMsg(err.message || "Error al procesar el archivo CSV.");
        setStatus("error");
      }
    };

    reader.onerror = () => {
      setErrorMsg("No se pudo leer el archivo. Intenta de nuevo.");
      setStatus("error");
    };

    // Leer como texto con encoding UTF-8 (equivalente al encoding='utf-8' de Python)
    reader.readAsText(file, "UTF-8");
  };

  const reset = () => {
    setStatus("idle");
    setErrorMsg("");
    setTableNameError("");
    setSqlBlob(null);
    setInsertCount(0);
  };

  const clearTableNameError = () => setTableNameError("");
  return {
    status,
    errorMsg,
    tableNameError,
    sqlBlob,
    insertCount,
    convert,
    reset,
    clearTableNameError,
  };
};