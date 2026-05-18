/**
 * validateFile.js
 * Valida que el archivo sea .csv y no supere 50 MB.
 * Retorna { valid: boolean, error: string | null }
 */
const MAX_SIZE_MB = 50;

export const validateFile = (file) => {
  if (!file) return { valid: false, error: "No se seleccionó ningún archivo." };

  if (!file.name.toLowerCase().endsWith(".csv")) {
    return { valid: false, error: "Solo se aceptan archivos .csv" };
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { valid: false, error: `El archivo supera el límite de ${MAX_SIZE_MB} MB` };
  }

  return { valid: true, error: null };
};

/**
 * Valida el nombre de la tabla SQL.
 * Retorna string de error o null si es válido.
 */
export const validateTableName = (name) => {
  if (!name.trim()) return "El nombre de la tabla es requerido";
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name.trim())) {
    return "Solo letras, números y guiones bajos. No puede iniciar con número.";
  }
  return null;
};
