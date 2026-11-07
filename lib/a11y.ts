/**
 * Accessibility preferences — shared by the widget, the provider and the
 * pre-paint init script (so preferences apply before first render, no flash).
 */
export type A11ySettings = {
  fontScale: number; // index into FONT_SCALES
  contrast: boolean;
  links: boolean;
  readableFont: boolean;
  stopMotion: boolean;
  spacing: boolean;
  bigCursor: boolean;
};

export const A11Y_STORAGE_KEY = "koren_a11y";
export const FONT_SCALES = [1, 1.125, 1.25, 1.375, 1.5];

export const defaultA11y: A11ySettings = {
  fontScale: 0,
  contrast: false,
  links: false,
  readableFont: false,
  stopMotion: false,
  spacing: false,
  bigCursor: false,
};

export const a11yClassMap = {
  contrast: "a11y-contrast",
  links: "a11y-links",
  readableFont: "a11y-font",
  stopMotion: "a11y-still",
  spacing: "a11y-spacing",
  bigCursor: "a11y-cursor",
} as const;

export function applyA11y(s: A11ySettings) {
  const el = document.documentElement;
  for (const [key, cls] of Object.entries(a11yClassMap)) {
    el.classList.toggle(cls, Boolean(s[key as keyof typeof a11yClassMap]));
  }
  // Multiplies the responsive root size defined in globals.css.
  if (s.fontScale > 0) el.style.setProperty("--a11y-scale", String(FONT_SCALES[s.fontScale]));
  else el.style.removeProperty("--a11y-scale");
}

export function loadA11y(): A11ySettings {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    return raw ? { ...defaultA11y, ...(JSON.parse(raw) as Partial<A11ySettings>) } : defaultA11y;
  } catch {
    return defaultA11y;
  }
}

export function saveA11y(s: A11ySettings) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable (private mode) — settings still apply for this visit */
  }
}

/** Inline, dependency-free version of applyA11y that runs before paint. */
export const a11yInitScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  A11Y_STORAGE_KEY,
)})||"null");if(!s)return;var m=${JSON.stringify(a11yClassMap)},e=document.documentElement;for(var k in m){if(s[k])e.classList.add(m[k]);}var f=${JSON.stringify(
  FONT_SCALES,
)};if(s.fontScale>0&&f[s.fontScale])e.style.setProperty("--a11y-scale",String(f[s.fontScale]));}catch(_){}})();`;
