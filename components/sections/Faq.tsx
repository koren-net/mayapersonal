"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/primitives";
import { MaskLines } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { whatsappHref } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-5 pt-8 pb-24 md:px-8 md:pb-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-4">
          <SectionLabel index="06">שאלות</SectionLabel>
          <h2 className="mt-8 text-[clamp(2rem,3.45vw,2.9rem)] leading-[0.98] font-black tracking-[-0.04em]">
            <MaskLines
              lines={[
                "שאלות שעולות",
                <span key="2" className="font-serif font-normal">
                  בשיחה הראשונה.
                </span>,
              ]}
            />
          </h2>
          <p className="mt-6 text-ink/70">
            יש לכם שאלה אחרת?{" "}
            <a
              href={whatsappHref("היי, יש לי שאלה לגבי העבודה עם קורן.נט:")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-signal decoration-[3px] underline-offset-4 transition-colors hover:decoration-ink"
            >
              שלחו אותה בוואטסאפ
            </a>
            .
          </p>
        </div>

        <ul className="lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-t border-ink/15 last:border-b">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-start"
                >
                  <span className="text-xl font-bold tracking-tight md:text-2xl">{f.q}</span>
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo ${
                      isOpen ? "rotate-45 bg-ink text-signal" : "bg-ink/[0.06] group-hover:bg-signal"
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 text-lg leading-relaxed text-ink/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
