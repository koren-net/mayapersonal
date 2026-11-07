import type { ReactNode } from "react";

/**
 * Brand wordmark: קורן · נט with the signature dot.
 * The dot is a real "." (visually replaced by a circle), so the visible text and
 * the accessible name are both "קורן.נט" (WCAG 2.5.3 Label in Name).
 */
export function Wordmark({
  className = "",
  dotClassName = "bg-signal ring-[0.06em] ring-ink",
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span className={`inline-flex items-baseline font-black tracking-[-0.04em] ${className}`}>
      קורן
      <span
        className={`mx-[0.07em] inline-block size-[0.26em] overflow-hidden rounded-full leading-none text-transparent select-none ${dotClassName}`}
      >
        .
      </span>
      נט
    </span>
  );
}

/** Oversized decorative wordmark — drawn with CSS content so it isn't read as page text. */
export function DecorativeWordmark({ className = "", dotClassName = "" }: { className?: string; dotClassName?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-baseline font-black tracking-[-0.04em] ${className}`}>
      <span data-t="קורן" className="before:content-[attr(data-t)]" />
      <span className={`mx-[0.07em] inline-block size-[0.26em] rounded-full ${dotClassName}`} />
      <span data-t="נט" className="before:content-[attr(data-t)]" />
    </span>
  );
}

/** Editorial section label: (02) ── למי זה */
export function SectionLabel({
  index,
  children,
  tone = "ink",
}: {
  index: string;
  children: ReactNode;
  tone?: "ink" | "paper" | "accent";
}) {
  const toneClass = { ink: "text-ink/65", paper: "text-paper/55", accent: "text-ink" }[tone];
  return (
    <p className={`flex items-center gap-3 text-sm font-medium ${toneClass}`}>
      <span className="font-mono text-xs tracking-widest">({index})</span>
      <span aria-hidden className="h-px w-10 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}

/** Small status tag with a coloured dot. */
export function Tag({
  children,
  tone,
  className = "",
}: {
  children: ReactNode;
  tone: "saffron" | "signal";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      <span
        aria-hidden
        className={`size-2 rounded-full ${tone === "saffron" ? "bg-saffron" : "bg-signal"}`}
      />
      {children}
    </span>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.6l-4.5.9z" />
      <path
        fill="currentColor"
        stroke="none"
        d="M9.1 8.2c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.4.2.1.4.1.6 0l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.2.6-.5.8-.5.3-1.1.5-1.8.4-1.6-.2-3.1-1-4.3-2.2S9 11.3 8.8 9.7c-.1-.6.1-1.1.3-1.5z"
      />
    </svg>
  );
}
