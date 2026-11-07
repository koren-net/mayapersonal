"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Flame, TriangleAlert, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useStillness } from "@/components/providers/Providers";
import { dashboard } from "@/lib/content";
import { colors } from "@/lib/colors";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Mode = "before" | "after";

const SIGNAL = colors.signal;
const SAFFRON = colors.saffron;
const FEED_ROW_REM = 2.55; // row pitch; rows are h-11 (2.2rem)
const FEED_ROWS = 5; // visible rows in the activity feed

function Cell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.35rem] border border-white/[0.06] bg-ink-2 p-4 md:p-5 ${className}`}>
      {children}
    </div>
  );
}

export function HeroDashboard() {
  const [mode, setMode] = useState<Mode>("before");
  const [auto, setAuto] = useState(true);
  const [tick, setTick] = useState(0);
  // Reduced motion / "stop animations": no auto-play, no rotating feed.
  const still = useStillness();
  const d = dashboard[mode];
  const isAfter = mode === "after";
  const accent = isAfter ? SIGNAL : SAFFRON;

  // Auto-play the before → after story until the visitor takes over.
  useEffect(() => {
    if (!auto || still) return;
    const id = setTimeout(
      () => setMode((m) => (m === "before" ? "after" : "before")),
      mode === "before" ? 3400 : 7000,
    );
    return () => clearTimeout(id);
  }, [mode, auto, still]);

  // Rotate the activity feed.
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setTick((t) => t + 1), 2300);
    return () => clearInterval(id);
  }, [still]);

  const feed = useMemo(() => {
    const items = d.feed;
    const start = tick % items.length;
    return Array.from({ length: FEED_ROWS }, (_, i) => items[(start + FEED_ROWS - 1 - i) % items.length]);
  }, [d, tick]);

  // Subtle 3D tilt that follows the pointer.
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (still || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  function choose(m: Mode) {
    setAuto(false);
    setMode(m);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.4 }}
      className="relative mx-auto w-full max-w-[28rem]"
      style={{ perspective: 1400 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY }}
        className="relative rounded-[2rem] bg-ink p-2.5 text-paper shadow-[0_50px_100px_-40px_rgba(14,14,12,0.7)] md:p-3"
      >
        {/* Cut-out notch carrying the live status */}
        <div className="absolute -top-6 right-8 z-10 rounded-full bg-paper p-1.5">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mode}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-bold ${
                isAfter ? "bg-signal text-ink" : "bg-saffron text-ink"
              }`}
            >
              {isAfter ? <Zap className="size-3.5" /> : <Flame className="size-3.5" />}
              {d.status}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Header */}
        <div className="flex items-end justify-between gap-3 px-3 pt-9 pb-3">
          <div>
            <p className="text-[13px] tracking-wide text-paper/60">לוח תפעול · השבוע</p>
            <p className="mt-0.5 text-sm font-semibold">העסק שלכם</p>
          </div>
          <div className="flex rounded-full bg-white/[0.06] p-1 text-xs font-semibold">
            {(["before", "after"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => choose(m)}
                className={`relative rounded-full px-3.5 py-1.5 transition-colors duration-300 ${
                  mode === m ? "text-ink" : "text-paper/55 hover:text-paper"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="dash-toggle"
                    className={`absolute inset-0 rounded-full ${m === "after" ? "bg-signal" : "bg-paper"}`}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{m === "before" ? "היום" : "עם קורן.נט"}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          {/* Activity feed — situations, not metrics */}
          <Cell>
            <div className="flex items-center justify-between">
              <p className="text-xs text-paper/55">פעילות אחרונה</p>
              <span className="flex items-center gap-1.5 font-mono text-[12.5px] tracking-widest text-paper/60">
                <motion.span
                  animate={{ backgroundColor: accent }}
                  className="size-1.5 animate-pulse rounded-full"
                />
                LIVE
              </span>
            </div>
            {/* Rows are positioned explicitly (no layout measurement), so the
                rotation stays stable however often it ticks. */}
            <ul
              className="relative mt-3 overflow-hidden"
              style={{ height: `${FEED_ROWS * FEED_ROW_REM - 0.35}rem` }}
            >
              <AnimatePresence initial={false}>
                {feed.map((item, idx) => (
                  <motion.li
                    key={`${mode}-${item.text}`}
                    initial={{ opacity: 0, y: `${-FEED_ROW_REM}rem` }}
                    animate={{ opacity: 1, y: `${idx * FEED_ROW_REM}rem` }}
                    exit={{ opacity: 0, y: `${FEED_ROWS * FEED_ROW_REM}rem` }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    className="absolute inset-x-0 top-0 flex h-11 items-center gap-3 rounded-xl bg-white/[0.04] px-3 text-[14px]"
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full ${
                        isAfter ? "bg-signal text-ink" : "bg-saffron/15 text-saffron"
                      }`}
                    >
                      {isAfter ? (
                        <Check className="size-3.5" strokeWidth={3} />
                      ) : (
                        <TriangleAlert className="size-3.5" />
                      )}
                    </span>
                    <span className="flex-1 truncate">{item.text}</span>
                    <span className="font-mono text-[12.5px] text-paper/60">{item.source}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </Cell>
        </div>
      </motion.div>

      <p className="mt-4 text-xs text-ink/65">* דוגמה להמחשה</p>
    </motion.div>
  );
}
