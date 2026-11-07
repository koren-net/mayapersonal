"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  AArrowDown,
  AArrowUp,
  Baseline,
  Contrast,
  Link2,
  MousePointer2,
  Pause,
  RotateCcw,
  WrapText,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useA11y } from "@/components/providers/Providers";
import { FONT_SCALES, type A11ySettings } from "@/lib/a11y";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Toggle = { key: Exclude<keyof A11ySettings, "fontScale">; label: string; icon: LucideIcon };

const toggles: Toggle[] = [
  { key: "contrast", label: "ניגודיות גבוהה", icon: Contrast },
  { key: "links", label: "הדגשת קישורים", icon: Link2 },
  { key: "readableFont", label: "גופן קריא", icon: Baseline },
  { key: "spacing", label: "ריווח טקסט", icon: WrapText },
  { key: "stopMotion", label: "עצירת אנימציות", icon: Pause },
  { key: "bigCursor", label: "סמן מוגדל", icon: MousePointer2 },
];

/**
 * Parses a computed background-color ("rgb(…)", "rgba(…)" or "color(srgb …)").
 * Returns null for transparent / mostly transparent backgrounds so the caller
 * keeps looking further down the stack.
 */
function parseBackground(value: string): [number, number, number] | null {
  const srgb = value.match(/^color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)$/);
  if (srgb) {
    const alpha = srgb[4] === undefined ? 1 : Number(srgb[4]);
    return alpha < 0.5 ? null : [Number(srgb[1]) * 255, Number(srgb[2]) * 255, Number(srgb[3]) * 255];
  }
  const rgb = value.match(/^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/);
  if (rgb) {
    const alpha = rgb[4] === undefined ? 1 : Number(rgb[4]);
    return alpha < 0.5 ? null : [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  }
  return null;
}

function relativeLuminance([r, g, b]: [number, number, number]) {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function AccessibilityWidget() {
  const { settings, update, reset } = useA11y();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, [open]);

  // The trigger is ink-coloured; over a dark section it would vanish, so it
  // switches to violet whenever the background behind it is dark.
  const [onDark, setOnDark] = useState(false);
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const btn = triggerRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      for (const el of stack) {
        if (btn.contains(el)) continue;
        const rgb = parseBackground(getComputedStyle(el).backgroundColor);
        if (!rgb) continue;
        setOnDark(relativeLuminance(rgb) < 0.2);
        return;
      }
      setOnDark(false);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    // Re-check on scroll/resize, and when content changes (mobile menu, route change).
    // Overlays reveal with a clip-path animation and only become hit-testable once
    // it ends, so check again after it settles.
    let settle = 0;
    const observer = new MutationObserver(() => {
      schedule();
      window.clearTimeout(settle);
      settle = window.setTimeout(schedule, 900);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>("button, a[href]");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const scalePct = Math.round(FONT_SCALES[settings.fontScale] * 100);
  const changed =
    settings.fontScale > 0 || toggles.some((t) => settings[t.key]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="תפריט התאמות נגישות"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
        className={`fixed top-1/2 start-0 z-[66] grid h-[4.25rem] w-[3.5rem] -translate-y-1/2 place-items-center rounded-e-2xl shadow-[0_10px_30px_-10px_rgba(14,14,12,0.6)] transition-[width,background-color,color] duration-300 hover:w-[4rem] focus-visible:w-[4rem] ${
          onDark ? "bg-signal text-ink hover:brightness-110" : "bg-ink text-paper hover:bg-ink-3"
        }`}
      >
        <Accessibility className="size-[1.75rem]" aria-hidden />
        {changed && (
          <span
            aria-hidden
            className={`absolute top-2 end-2 size-2 rounded-full ${onDark ? "bg-ink" : "bg-signal"}`}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[66] bg-ink/30 backdrop-blur-[2px]"
            />
            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onKeyDown={onKeyDown}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="fixed inset-x-3 bottom-3 z-[67] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[1.75rem] border border-ink/10 bg-paper p-5 text-ink shadow-[0_30px_80px_-20px_rgba(14,14,12,0.5)] sm:inset-x-auto sm:start-16 sm:top-1/2 sm:bottom-auto sm:w-[20rem] sm:-translate-y-1/2"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 id={titleId} className="flex items-center gap-2 text-xl font-bold">
                  <Accessibility className="size-5" aria-hidden />
                  התאמות נגישות
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="סגירת תפריט הנגישות"
                  className="grid size-10 place-items-center rounded-full bg-ink/[0.06] transition-colors hover:bg-ink hover:text-paper"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              {/* Font size */}
              <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-paper-2 p-2 ps-4">
                <span className="text-sm font-semibold">גודל טקסט</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => update({ fontScale: Math.max(0, settings.fontScale - 1) })}
                    disabled={settings.fontScale === 0}
                    aria-label="הקטנת טקסט"
                    className="grid size-10 place-items-center rounded-full bg-paper transition-colors hover:bg-ink hover:text-paper disabled:opacity-40 disabled:hover:bg-paper disabled:hover:text-ink"
                  >
                    <AArrowDown className="size-5" aria-hidden />
                  </button>
                  <output aria-live="polite" className="w-14 text-center font-mono text-sm tabular-nums">
                    {scalePct}%
                  </output>
                  <button
                    type="button"
                    onClick={() =>
                      update({ fontScale: Math.min(FONT_SCALES.length - 1, settings.fontScale + 1) })
                    }
                    disabled={settings.fontScale === FONT_SCALES.length - 1}
                    aria-label="הגדלת טקסט"
                    className="grid size-10 place-items-center rounded-full bg-paper transition-colors hover:bg-ink hover:text-paper disabled:opacity-40 disabled:hover:bg-paper disabled:hover:text-ink"
                  >
                    <AArrowUp className="size-5" aria-hidden />
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {toggles.map(({ key, label, icon: Icon }) => {
                  const on = settings[key];
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => update({ [key]: !on })}
                        className={`flex w-full flex-col items-start gap-3 rounded-2xl border p-4 text-start text-sm font-semibold transition-colors ${
                          on
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/10 bg-paper hover:border-ink/40"
                        }`}
                      >
                        <span
                          className={`grid size-8 place-items-center rounded-full ${on ? "bg-signal text-ink" : "bg-ink/[0.06]"}`}
                        >
                          <Icon className="size-4" aria-hidden />
                        </span>
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-ink/[0.06]"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  איפוס הגדרות
                </button>
                <Link
                  href="/accessibility"
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold underline decoration-signal decoration-2 underline-offset-4"
                >
                  הצהרת נגישות
                </Link>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink/65">
                ההגדרות נשמרות בדפדפן שלכם בלבד. התפריט הוא כלי עזר — האתר עצמו נבנה בהתאם לת״י 5568
                ברמה AA.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
