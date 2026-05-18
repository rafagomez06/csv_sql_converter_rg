/**
 * Detecta si un valor es numérico (entero o decimal).
 * Equivalente a: valor.replace('.', '', 1).isdigit()
 */
const isNumeric = (value) => {
  if (value.trim() === "") return false;
  return !isNaN(Number(value)) && value.trim() !== "";
};


const parseCsv = (text) => {
  // Normaliza saltos de línea (Windows \r\n, Mac \r, Linux \n)
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  // Elimina líneas vacías al final
  const cleanLines = lines.filter((line) => line.trim() !== "");

  if (cleanLines.length === 0) throw new Error("El archivo CSV está vacío.");
  if (cleanLines.length === 1) throw new Error("El archivo CSV no contiene registros, solo cabeceros.");

  const parseRow = (line) => {
    const result = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"' && !insideQuotes) {
        insideQuotes = true;
      } else if (char === '"' && insideQuotes) {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          insideQuotes = false;
        }
      } else if (char === "," && !insideQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  };

  const headers = parseRow(cleanLines[0]);
  const rows    = cleanLines.slice(1).map((line) => parseRow(line));

  return { headers, rows };
};

const formatValue = (value) => {
  if (value === null || value === undefined || value.trim() === "") {
    return "NULL";
  }

  if (isNumeric(value)) {
    return value.trim();
  }
  const escaped = value.replace(/'/g, "''");
  return `'${escaped}'`;
};

/**
 * Función principal.
 * Recibe el texto crudo del CSV y el nombre de la tabla,
 * retorna el string completo con todos los INSERT INTO.
 *
 * @param {string} csvText    - Contenido del archivo .csv como string
 * @param {string} tableName  - Nombre de la tabla SQL destino
 * @returns {{ sql: string, count: number }}
 */
export const csvToSql = (csvText, tableName) => {
  const { headers, rows } = parseCsv(csvText);

  const columnasSql = headers.map((col) => `${col.trim()}`).join(", ");

  const inserts = rows.map((row) => {
    const valores = headers.map((_, index) => {
      const valor = row[index] !== undefined ? row[index] : "";
      return formatValue(valor);
    });

    const valoresSql = valores.join(", ");
    return `INSERT INTO ${tableName} (${columnasSql}) VALUES (${valoresSql});`;
  });

  return {
    sql:   inserts.join("\n"),
    count: inserts.length,
  };
};