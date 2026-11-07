"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Clock, Flame, TrendingUp, TriangleAlert, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useStillness } from "@/components/providers/Providers";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { dashboard } from "@/lib/content";
import { colors, rgba } from "@/lib/colors";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Mode = "before" | "after";

const SIGNAL = colors.signal;
const SAFFRON = colors.saffron;
const RADIUS = 30;
const CIRC = 2 * Math.PI * RADIUS;
const FEED_ROW_REM = 2.55; // row pitch; rows are h-11 (2.2rem)

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
    return [2, 1, 0].map((o) => items[(start + o) % items.length]);
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

        <div className="grid grid-cols-2 gap-2">
          {/* Manual hours */}
          <Cell className="col-span-2">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-xs text-paper/55">
                <Clock className="size-3.5" />
                שעות עבודה ידנית בשבוע
              </p>
              <motion.span
                animate={{ backgroundColor: isAfter ? rgba(colors.signal, 0.14) : rgba(colors.saffron, 0.14), color: accent }}
                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[13px] font-bold"
              >
                {!isAfter && <TrendingUp className="size-3" />}
                <span dir="ltr">{d.hoursDelta}</span>
              </motion.span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-6">
              <p className="flex items-baseline gap-1.5">
                <AnimatedNumber
                  value={d.hours}
                  className="text-6xl leading-none font-black tracking-tight tabular-nums"
                />
                <span className="text-lg text-paper/60">ש׳</span>
              </p>
              <div className="flex h-16 flex-1 items-end gap-1" aria-hidden>
                {d.bars.map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-full"
                    initial={false}
                    animate={{ height: `${h}%`, backgroundColor: accent, opacity: isAfter ? 1 : 0.85 }}
                    transition={{ type: "spring", stiffness: 110, damping: 15, delay: i * 0.035 }}
                  />
                ))}
              </div>
            </div>
          </Cell>

          {/* Response time */}
          <Cell>
            <p className="text-xs text-paper/55">זמן תגובה לליד</p>
            <p className="mt-3 flex items-baseline gap-1.5">
              <AnimatedNumber value={d.response.value} className="text-4xl font-black tabular-nums" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={d.response.unit}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-base text-paper/60"
                >
                  {d.response.unit}
                </motion.span>
              </AnimatePresence>
            </p>
            <motion.p animate={{ color: accent }} className="mt-3 text-[13px] font-semibold">
              {d.response.note}
            </motion.p>
          </Cell>

          {/* Owner load gauge */}
          <Cell className="flex items-center gap-3">
            <div className="relative size-[4.25rem] shrink-0">
              <svg viewBox="0 0 76 76" className="size-full -rotate-90" aria-hidden>
                <circle cx="38" cy="38" r={RADIUS} fill="none" strokeWidth="7" className="stroke-white/10" />
                <motion.circle
                  cx="38"
                  cy="38"
                  r={RADIUS}
                  fill="none"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  initial={false}
                  animate={{ strokeDashoffset: CIRC * (1 - d.load / 100), stroke: accent }}
                  transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
                />
              </svg>
              <p className="absolute inset-0 grid place-items-center text-sm font-black tabular-nums">
                <span dir="ltr">
                  <AnimatedNumber value={d.load} />%
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs leading-snug text-paper/55">המעורבות שלכם בתפעול</p>
              <p className="mt-1.5 text-[13px] leading-snug font-semibold text-paper/85">{d.loadNote}</p>
            </div>
          </Cell>

          {/* Activity feed */}
          <Cell className="col-span-2">
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
            <ul className="relative mt-3 h-[7.35rem] overflow-hidden">
              <AnimatePresence initial={false}>
                {feed.map((item, idx) => (
                  <motion.li
                    key={`${mode}-${item.text}`}
                    initial={{ opacity: 0, y: `${-FEED_ROW_REM}rem` }}
                    animate={{ opacity: 1, y: `${idx * FEED_ROW_REM}rem` }}
                    exit={{ opacity: 0, y: `${3 * FEED_ROW_REM}rem` }}
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

      <p className="mt-4 text-xs text-ink/65">* נתוני המחשה לתרחיש טיפוסי של עסק בצמיחה</p>
    </motion.div>
  );
}
