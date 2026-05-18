/**
 * useFileUpload.js
 * Hook para manejar la selección, drag & drop y validación del archivo CSV.
 */
import { useState, useRef, useCallback } from "react";
import { validateFile } from "../utils/validateFile";

export const useFileUpload = (onError) => {
  const [file, setFile]       = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef            = useRef(null);

  const handleFile = useCallback((f) => {
    const { valid, error } = validateFile(f);
    if (!valid) {
      onError(error);
      setFile(null);
      return;
    }
    onError(null);
    setFile(f);
  }, [onError]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const onDragOver  = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = ()  => setDragging(false);

  const openFilePicker = () => fileInputRef.current?.click();

  const removeFile = () => {
    setFile(null);
    onError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    file,
    dragging,
    fileInputRef,
    onDrop,
    onDragOver,
    onDragLeave,
    openFilePicker,
    removeFile,
    onFileChange: (e) => handleFile(e.target.files[0]),
  };
};
