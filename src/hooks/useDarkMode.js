/**
 * useDarkMode.js
 * Hook para manejar el modo oscuro.
 * Sincroniza el fondo del body con el modo activo.
 */
import { useState, useEffect } from "react";
import { getColors } from "../styles/colors";

export const useDarkMode = () => {
  const [dark, setDark] = useState(false);

  // Sincroniza el background del body con el modo activo
  useEffect(() => {
    const colors = getColors(dark);
    document.body.style.background = colors.bg;
    document.body.style.transition = "background 0.3s";

    return () => {
      document.body.style.background = "";
      document.body.style.transition = "";
    };
  }, [dark]);

  const toggle = () => setDark((prev) => !prev);

  return { dark, toggle };
};
