"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line-by-line reveal for display headings.
 * Vertical padding keeps Hebrew ascenders (ל) and descenders (ק ן ך) from being clipped.
 */
export function MaskLines({
  lines,
  delay = 0,
  stagger = 0.09,
}: {
  lines: ReactNode[];
  delay?: number;
  stagger?: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        // The observed element is the visible mask, not the translated line
        // (a line pushed outside an overflow-hidden parent never intersects).
        <motion.span
          key={i}
          className="-my-[0.12em] block overflow-hidden py-[0.12em]"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "115%" }, shown: { y: "0%" } }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}
