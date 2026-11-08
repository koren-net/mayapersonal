"use client";

import { Check, Clock, Copy } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import type { Lines } from "@/lib/guides/vacation";

/** Message text: the reader's own details are marked; missing ones show in saffron. */
export function SegLines({ lines }: { lines: Lines }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={i > 0 ? "mt-1.5 block" : "block"}>
          {line.map((s, j) =>
            typeof s === "string" ? (
              <Fragment key={j}>{s}</Fragment>
            ) : (
              <mark
                key={j}
                className={`rounded-md px-1 font-bold text-ink [box-decoration-break:clone] ${
                  s.filled ? "bg-paper/45" : "bg-saffron"
                }`}
              >
                {s.value}
              </mark>
            ),
          )}
        </span>
      ))}
    </>
  );
}

/** Copy-to-clipboard button with a spoken confirmation. */
export function CopyButton({ text, label, tone = "ink" }: { text: string; label: string; tone?: "ink" | "paper" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers / non-secure contexts: copy through a temporary textarea.
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  const colors =
    tone === "ink"
      ? copied
        ? "bg-paper text-ink"
        : "bg-signal text-ink hover:bg-paper"
      : copied
        ? "bg-signal text-ink"
        : "bg-ink text-paper hover:bg-ink-3";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex h-12 items-center gap-2.5 rounded-full ps-5 pe-6 text-base font-bold transition-colors duration-300 ${colors}`}
      >
        {copied ? <Check className="size-5" strokeWidth={3} aria-hidden /> : <Copy className="size-5" aria-hidden />}
        {copied ? "הועתק" : label}
      </button>
      <span role="status" className="sr-only">
        {copied ? "הנוסח הועתק" : ""}
      </span>
    </>
  );
}

/** Small header row on each automation card: number, where, how long. */
export function StepHeader({
  index,
  where,
  minutes,
  tone,
}: {
  index: string;
  where: string;
  minutes: string;
  tone: "ink" | "paper";
}) {
  const pill = tone === "ink" ? "border-white/15 text-paper/75" : "border-ink/15 text-ink/70";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${
          tone === "ink" ? "bg-signal text-ink" : "bg-ink text-paper"
        }`}
      >
        {index}
      </span>
      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${pill}`}>{where}</span>
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${pill}`}>
        <Clock className="size-3.5" aria-hidden />
        {minutes}
      </span>
    </div>
  );
}

/** "N details still missing" / "ready to paste" note under a message. */
export function MissingNote({ count, tone = "ink" }: { count: number; tone?: "ink" | "paper" }) {
  const muted = tone === "ink" ? "text-paper/70" : "text-ink/70";
  if (count === 0) {
    return (
      <p className={`inline-flex items-center gap-2 text-sm font-semibold ${muted}`}>
        <span aria-hidden className="grid size-5 place-items-center rounded-full bg-signal text-ink">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        מוכן להדבקה
      </p>
    );
  }
  return (
    <p className={`text-sm ${muted}`}>
      <span aria-hidden className="me-1.5 inline-block size-2.5 rounded-full bg-saffron align-middle" />
      {count === 1 ? "פרט אחד עוד חסר." : `${count} פרטים עוד חסרים.`}{" "}
      <a
        href="#details"
        className="font-semibold underline decoration-signal decoration-2 underline-offset-4 hover:decoration-current"
      >
        להשלמה
      </a>
      , או אחרי ההדבקה.
    </p>
  );
}
