"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useStillness } from "@/components/providers/Providers";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";
import { colors } from "@/lib/colors";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { whatsappHref } from "@/lib/site";

const STEP_MS = 7000;

/* A small system map that "lights up" as the process advances. */
const NODES: [number, number][] = [
  [24, 80],
  [92, 32],
  [92, 128],
  [160, 80],
  [228, 32],
  [228, 128],
];
const EDGES: { from: number; to: number; step: number }[] = [
  { from: 0, to: 1, step: 1 },
  { from: 0, to: 2, step: 1 },
  { from: 1, to: 3, step: 2 },
  { from: 2, to: 3, step: 2 },
  { from: 3, to: 4, step: 3 },
  { from: 3, to: 5, step: 3 },
  { from: 4, to: 5, step: 4 },
];
const NODE_STEP = [0, 1, 1, 2, 3, 3];

function SystemMap({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 252 160" className="h-auto w-44 -scale-x-100 md:w-60" aria-hidden>
      {EDGES.map((e) => {
        const [x1, y1] = NODES[e.from];
        const [x2, y2] = NODES[e.to];
        const lit = step >= e.step;
        return (
          <g key={`${e.from}-${e.to}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3 5" />
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colors.signal}
              strokeWidth="1.5"
              initial={false}
              animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            />
          </g>
        );
      })}
      {NODES.map(([cx, cy], i) => {
        const lit = step >= NODE_STEP[i];
        const newest = NODE_STEP[i] === step;
        return (
          <g key={i}>
            {newest && (
              <motion.circle
                cx={cx}
                cy={cy}
                r={9}
                fill="none"
                stroke={colors.signal}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            )}
            <motion.circle
              cx={cx}
              cy={cy}
              r={8}
              initial={false}
              animate={{
                fill: lit ? colors.signal : colors.ink2,
                stroke: lit ? colors.signal : "rgba(255,255,255,0.25)",
              }}
              strokeWidth="1.5"
              transition={{ duration: 0.5 }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const progress = useMotionValue(0);
  // Reduced motion / "stop animations": steps change only on click.
  const still = useStillness();

  useEffect(() => {
    if (!auto || still) {
      progress.set(1);
      return;
    }
    if (!inView) return;
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: STEP_MS / 1000,
      ease: "linear",
      onComplete: () => setActive((a) => (a + 1) % processSteps.length),
    });
    return () => controls.stop();
  }, [active, auto, still, inView, progress]);

  const step = processSteps[active];

  return (
    <section id="method" className="px-3 md:px-5">
      <div
        ref={sectionRef}
        className="relative overflow-hidden rounded-[2.5rem] bg-ink px-5 py-20 text-paper md:rounded-[3.5rem] md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="03" tone="paper">
                השיטה
              </SectionLabel>
              <h2 className="mt-8 text-[clamp(2.3rem,4.85vw,4.5rem)] leading-[0.95] font-black tracking-[-0.04em]">
                <MaskLines
                  lines={[
                    "מצוואר בקבוק —",
                    <span key="2" className="font-serif font-normal tracking-[-0.02em] text-signal">
                      למערכת שעובדת בשבילכם.
                    </span>,
                  ]}
                />
              </h2>
            </div>
            <Reveal className="lg:col-span-5" delay={0.15}>
              <p className="text-lg leading-relaxed text-paper/65">
                חמישה שלבים, סדר אחד ברור. כל שלב בנוי כך שהעסק ממשיך לעבוד כרגיל — בלי לעצור, ובלי
                ״פרויקט מערכות״ שגוזל חצי שנה ונגמר במגירה.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-12 lg:gap-10">
            {/* Step selector */}
            <ol className="lg:col-span-5">
              {processSteps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.index}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setAuto(false);
                        setActive(i);
                      }}
                      className="group relative flex w-full items-center gap-5 border-t border-white/10 py-5 text-start md:py-6"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="process-progress"
                          className="absolute inset-x-0 -top-px h-0.5 overflow-hidden"
                          transition={{ type: "spring", stiffness: 300, damping: 34 }}
                        >
                          <motion.span
                            style={{ scaleX: progress }}
                            className="block h-full origin-right bg-signal"
                          />
                        </motion.span>
                      )}
                      <span
                        className={`font-mono text-xs transition-colors ${isActive ? "text-signal" : "text-paper/60"}`}
                      >
                        {s.index}
                      </span>
                      <span
                        className={`text-3xl font-bold tracking-tight transition-colors duration-300 md:text-4xl ${
                          isActive ? "text-paper" : "text-paper/60 group-hover:text-paper/65"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`ms-auto hidden text-sm transition-colors sm:block ${
                          isActive ? "text-paper/60" : "text-paper/60"
                        }`}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Step detail */}
            <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-ink-2 p-7 md:p-10 lg:col-span-7">
              <div className="flex items-start justify-between gap-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={step.index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="font-serif text-[5rem] leading-[0.8] text-signal md:text-[7rem]"
                  >
                    {step.index}
                  </motion.span>
                </AnimatePresence>
                <SystemMap step={active} />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="mt-8"
                >
                  <p className="flex flex-wrap items-center gap-3 text-sm text-paper/60">
                    <span className="rounded-full bg-signal px-3 py-1 text-xs font-bold text-ink">{step.name}</span>
                  </p>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{step.title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/65">{step.body}</p>
                  <p className="mt-8 text-xs font-semibold text-paper/60">מה יוצא מזה</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {step.outputs.map((o) => (
                      <li
                        key={o}
                        className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-paper/85"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center">
            <p className="max-w-xl text-xl leading-snug font-semibold md:text-2xl">
              לא בטוחים איפה העסק שלכם נתקע?{" "}
              <span className="font-serif font-normal text-paper/60">בדיוק בשביל זה מתחילים באבחון.</span>
            </p>
            <PillLink
              href={whatsappHref("היי, אשמח לשמוע על שלב האבחון של קורן.נט.")}
              variant="signal"
              icon={<ArrowUpLeft className="size-5" />}
            >
              מתחילים באבחון
            </PillLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
