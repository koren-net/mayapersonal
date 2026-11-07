"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import { useStillness } from "@/components/providers/Providers";
import { SectionLabel } from "@/components/ui/primitives";
import { manifesto } from "@/lib/content";

function Word({
  children,
  progress,
  range,
  em,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  em?: boolean;
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.45, 1]);
  return (
    <>
      <motion.span
        style={still ? undefined : { opacity }}
        className={em ? "mark-signal font-serif font-normal tracking-[-0.01em]" : undefined}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const still = useStillness();

  const words = useMemo(
    () =>
      manifesto.flatMap((seg) =>
        seg.text.split(" ").map((w) => ({ w, em: seg.em ?? false })),
      ),
    [],
  );

  return (
    <section aria-label="הגישה" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-40">
      <SectionLabel index="01">הגישה</SectionLabel>
      <p
        ref={ref}
        className="mt-10 max-w-6xl text-[clamp(1.65rem,3.45vw,3.2rem)] leading-[1.14] font-bold tracking-[-0.03em] text-balance"
      >
        {words.map((item, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            em={item.em}
            still={still}
          >
            {item.w}
          </Word>
        ))}
      </p>
    </section>
  );
}
