/**
 * colors.js
 * Tokens de color para modo claro y oscuro.
 * Uso: import { getColors } from "../styles/colors";
 *      const colors = getColors(isDark);
 */

export const getColors = (dark) => ({
  bg:              dark ? "#0f1117" : "#f5f6fa",
  surface:         dark ? "#1a1d27" : "#ffffff",
  surfaceAlt:      dark ? "#22263a" : "#f0f2f8",
  border:          dark ? "#2e3352" : "#dde1ef",
  borderFocus:     dark ? "#5b7fff" : "#4361ee",
  text:            dark ? "#e8eaf6" : "#1a1d2e",
  textMuted:       dark ? "#7c8ab0" : "#6b7280",
  textPlaceholder: dark ? "#4a5280" : "#9ca3af",
  accent:          dark ? "#5b7fff" : "#4361ee",
  accent_table:    dark ? "#eed443" : "#eed443",
  accentLight:     dark ? "#1e2d5a" : "#eef1fd",
  accentHover:     dark ? "#7091ff" : "#3451d1",
  success:         dark ? "#34d399" : "#059669",
  successLight:    dark ? "#0d3326" : "#ecfdf5",
  danger:          dark ? "#f87171" : "#dc2626",
  dangerLight:     dark ? "#3b1010" : "#fef2f2",
  dropBg:          dark ? "#1c2236" : "#f8f9ff",
  dropBorder:      dark ? "#3b4a80" : "#c7d0f8",
  toggle:          dark ? "#22263a" : "#e8eaf6",
  toggleIcon:      dark ? "#a5b4fc" : "#4361ee",
  badge:           dark ? "#1e2d5a" : "#eef1fd",
  badgeText:       dark ? "#a5b4fc" : "#4361ee",
  shadow:          dark
    ? "0 4px 32px rgba(0,0,0,0.5)"
    : "0 4px 32px rgba(67,97,238,0.08)",
});
