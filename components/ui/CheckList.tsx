import { Check } from "lucide-react";

/** Rounded checklist rows used across the inner pages. */
export function CheckList({ items, tone = "paper" }: { items: readonly string[]; tone?: "paper" | "ink" }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-[15px] leading-snug font-medium ${
            tone === "ink" ? "bg-ink-2" : "bg-paper-2"
          }`}
        >
          <span
            aria-hidden
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
              tone === "ink" ? "bg-signal text-ink" : "bg-ink text-signal"
            }`}
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
