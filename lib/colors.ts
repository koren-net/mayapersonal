/**
 * Palette for values animated in JS (Framer Motion can't read CSS variables
 * mid-tween). Keep in sync with the @theme tokens in app/globals.css.
 */
export const colors = {
  signal: "#9b7bff", // brand violet — accent, "after" states
  saffron: "#ffb21e", // warm alert — friction, "before" states
  ink2: "#171714",
} as const;

/** "#rrggbb" + alpha → "rgba(r,g,b,a)" */
export function rgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}
