"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { inbox } from "@/lib/guides/vacation";
import { EASE_OUT_EXPO } from "@/lib/motion";

/** "Tuesday on vacation, 14:12": the same three messages, without and with the automations. */
export function InboxDemo() {
  const [on, setOn] = useState(false);

  return (
    <div>
      <div role="group" aria-label="איך נראה החופש" className="inline-flex rounded-full bg-ink/[0.07] p-1">
        {[
          { value: false, label: "בלי אוטומציות" },
          { value: true, label: "עם 3 האוטומציות" },
        ].map((opt) => {
          const active = on === opt.value;
          return (
            <button
              key={opt.label}
              type="button"
              aria-pressed={active}
              onClick={() => setOn(opt.value)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300 md:px-5 ${
                active ? (opt.value ? "bg-signal text-ink" : "bg-saffron text-ink") : "text-ink/70 hover:text-ink"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div
        className={`mt-4 rounded-[2rem] bg-ink p-4 text-paper ring-2 transition-[box-shadow] duration-500 md:p-6 ${
          on ? "ring-signal/70" : "ring-saffron/70"
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-paper/60">
          <span>וואטסאפ ביזנס</span>
          <span>יום ג׳ בחופש · 14:12</span>
        </div>
        <ul className="mt-4 flex flex-col gap-2.5">
          {inbox.map((item) => (
            <li key={item.message} className="rounded-2xl bg-paper/[0.06] p-4">
              <div className="flex items-center justify-between gap-3 text-xs text-paper/60">
                <span>{item.from}</span>
                <span>{item.time}</span>
              </div>
              <p className="mt-1 font-semibold">{item.message}</p>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3 text-sm text-signal-soft">
                      <span className="shrink-0 rounded-full bg-signal px-2 py-0.5 font-mono text-xs font-bold text-ink">
                        {item.fix}
                      </span>
                      {item.reply}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
        <p role="status" className="mt-4 flex items-center gap-2 text-sm font-bold">
          <span
            aria-hidden
            className={`size-2.5 rounded-full ${on ? "bg-signal" : "animate-pulse bg-saffron motion-reduce:animate-none"}`}
          />
          {on ? "הכול נענה. ואתם? בחופש." : "3 הודעות מחכות לכם. ואתם על החוף."}
        </p>
      </div>
    </div>
  );
}
