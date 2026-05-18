# Proyecto CSV a SQL 

Herramienta para convertir archivos `.csv` a scripts de inserción de SQL Server,
facilitando la carga de datos para pruebas directamente en base de datos,
sin necesidad de servidores ni dependencias externas.

## ¿Cómo funciona?

1. Ingresa el nombre de la tabla SQL destino.
2. Sube tu archivo `.csv` (drag & drop o explorador de archivos).
3. Genera el script la conversión ocurre completamente en el navegador.
4. Descarga el archivo `.sql` e insértalo directo en tu base de datos.

## Reglas de conversión

- Los **cabeceros** del CSV se mapean como columnas: `[columna1], [columna2], ...`
- Valores **vacíos o nulos** se convierten en `NULL`
- Valores **numéricos** (enteros y decimales) se insertan sin comillas
- Valores de **texto** se envuelven en comillas simples con escape de `'` → `''`
- Cada fila genera una sentencia `INSERT INTO` independiente

## Tecnologías

- **React** — UI y manejo de estado
- **FileReader API** — lectura del CSV en el navegador (sin envío al servidor)
- **CSS** — estilos con soporte de modo claro / oscuro

## Hecho por:
-  **@rafagomez06**