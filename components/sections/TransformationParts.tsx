"use client";

import { motion, useInView } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useStillness } from "@/components/providers/Providers";
import { Tag } from "@/components/ui/primitives";
import { chaosNotes, flowSteps, homeTransformations } from "@/lib/content";
import { colors, rgba } from "@/lib/colors";
import { EASE_OUT_EXPO } from "@/lib/motion";

const noteTones = {
  paper: "bg-paper text-ink border border-ink/10",
  saffron: "bg-saffron text-ink",
  ink: "bg-ink text-paper",
} as const;

/* ------------------------------------------------------------------ */
/* Chaos: draggable sticky notes                                       */
/* ------------------------------------------------------------------ */

export function ChaosCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setCanDrag(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[30rem] overflow-hidden rounded-[2rem] bg-paper-2 p-7 md:h-[32rem] md:p-10"
    >
      <Tag tone="saffron" className="bg-paper text-ink/70">
        היום
      </Tag>
      <h3 className="mt-5 text-5xl font-black tracking-tight md:text-6xl">הכאוס.</h3>
      <p className="mt-3 max-w-[16rem] text-[15px] leading-relaxed text-ink/70">
        הכול דחוף, שום דבר לא במקום, וכל שאלה מגיעה אליכם.
        <span className="hidden pointer-fine:inline"> נסו לסדר את זה — גררו את הפתקים.</span>
      </p>

      {chaosNotes.map((note, i) => (
        <motion.div
          key={note.text}
          drag={canDrag}
          dragConstraints={ref}
          dragElastic={0.15}
          whileDrag={{ scale: 1.08, rotate: 0, zIndex: 30 }}
          whileHover={canDrag ? { scale: 1.05 } : undefined}
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: note.rotate }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.15 + i * 0.08 }}
          style={{ left: note.x, top: note.y }}
          className={`absolute z-10 rounded-full px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap shadow-[0_14px_30px_-14px_rgba(14,14,12,0.45)] select-none md:text-sm ${
            canDrag ? "cursor-grab active:cursor-grabbing" : ""
          } ${noteTones[note.tone]}`}
        >
          {note.text}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flow: a process that completes itself, on loop                     */
/* ------------------------------------------------------------------ */

export function FlowCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const still = useStillness();
  const [loopStep, setStep] = useState(-1);
  const last = flowSteps.length - 1;
  // With reduced motion the flow is shown complete and doesn't loop.
  const step = still ? last : loopStep;

  useEffect(() => {
    if (!inView || still) return;
    const id = setTimeout(
      () => setStep((s) => (s >= last ? -1 : s + 1)),
      loopStep === -1 ? 500 : loopStep >= last ? 2600 : 850,
    );
    return () => clearTimeout(id);
  }, [inView, still, loopStep, last]);

  const fill = Math.max(step, 0) / last;

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[30rem] flex-col overflow-hidden rounded-[2rem] bg-ink p-7 text-paper md:min-h-[32rem] md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-signal/10 blur-3xl"
      />
      <Tag tone="signal" className="self-start bg-white/[0.07] text-paper/80">
        עם קורן.נט
      </Tag>
      <h3 className="mt-5 text-5xl font-black tracking-tight md:text-6xl">הזרימה.</h3>
      <p className="mt-3 max-w-[16rem] text-[15px] leading-relaxed text-paper/60">
        אותו עסק, אותם אנשים. רק שהעבודה עוברת מתחנה לתחנה — בלי שמישהו ידחוף.
      </p>

      <ol className="relative mt-auto flex flex-col gap-3 pt-10">
        <span aria-hidden className="absolute top-[3.6rem] bottom-[1.1rem] start-[15px] w-px bg-white/10" />
        <motion.span
          aria-hidden
          className="absolute top-[3.6rem] bottom-[1.1rem] start-[15px] w-px origin-top bg-signal"
          animate={{ scaleY: fill }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        />
        {flowSteps.map((label, i) => {
          const done = i <= step;
          return (
            <li key={label} className="relative flex items-center gap-4">
              <motion.span
                animate={{
                  backgroundColor: done ? colors.signal : colors.ink2,
                  borderColor: done ? colors.signal : "rgba(255,255,255,0.15)",
                  scale: i === step ? 1.12 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="relative grid size-[1.9rem] shrink-0 place-items-center rounded-full border text-ink"
              >
                <motion.span animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.4 }}>
                  <Check className="size-4" strokeWidth={3} />
                </motion.span>
              </motion.span>
              <motion.span
                animate={{ opacity: done ? 1 : 0.62 }}
                className="text-[15px] font-medium md:text-base"
              >
                {label}
              </motion.span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before → after rows                                                 */
/* ------------------------------------------------------------------ */

export function TransformRows() {
  return (
    <div className="mt-20 md:mt-28">
      <div className="hidden grid-cols-[4rem_1fr_4rem_1fr] gap-6 pb-5 text-sm font-semibold md:grid">
        <span />
        <span className="flex items-center gap-2 text-ink/65">
          <span className="size-2 rounded-full bg-saffron" /> היום
        </span>
        <span />
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-signal ring-1 ring-ink" /> עם קורן.נט
        </span>
      </div>
      <ol>
        {homeTransformations.map((row, i) => (
          <motion.li
            key={row.pain}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -18% 0px" }}
            className="group grid grid-cols-[2.5rem_1fr] items-center gap-x-4 gap-y-3 border-t border-ink/10 py-7 transition-colors duration-500 last:border-b md:grid-cols-[4rem_1fr_4rem_1fr] md:gap-6 md:py-9"
          >
            <span className="row-span-2 self-start pt-1 font-mono text-xs text-ink/65 md:row-span-1 md:self-center md:pt-0">
              0{i + 1}
            </span>
            <motion.p
              variants={{
                // Dim the text colour only, so the strike line keeps full strength.
                hidden: { color: "rgba(14,14,12,1)", textDecorationColor: rgba(colors.saffron, 0) },
                shown: { color: "rgba(14,14,12,0.62)", textDecorationColor: rgba(colors.saffron, 1) },
              }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg leading-snug line-through decoration-[3px] md:text-xl"
            >
              {row.pain}
            </motion.p>
            <span
              aria-hidden
              className="hidden size-11 place-items-center justify-self-center rounded-full border border-ink/15 transition-all duration-500 ease-out-expo group-hover:-translate-x-1 group-hover:border-ink group-hover:bg-ink group-hover:text-signal md:grid"
            >
              <ArrowLeft className="size-4" />
            </span>
            <motion.p
              variants={{ hidden: { opacity: 0, x: 24 }, shown: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.45 }}
              className="text-lg leading-snug font-bold md:text-2xl md:leading-snug"
            >
              {row.after}
            </motion.p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
