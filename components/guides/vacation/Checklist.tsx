"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { checklist } from "@/lib/guides/vacation";

/** "10 minutes before you leave": a real checklist, kept only in this page view. */
export function Checklist() {
  const [done, setDone] = useState<boolean[]>(() => checklist.map(() => false));
  const count = done.filter(Boolean).length;
  const all = count === checklist.length;

  return (
    <div className="rounded-[2rem] bg-ink p-5 text-paper md:p-8">
      <fieldset>
        <legend className="sr-only">רשימת בדיקה לפני החופש</legend>
        <ul className="divide-y divide-white/10">
          {checklist.map((item, i) => {
            const checked = done[i];
            return (
              <li key={item.text}>
                <label className="flex cursor-pointer items-center gap-4 py-4">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setDone((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={`grid size-8 shrink-0 place-items-center rounded-lg border-2 border-signal transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-paper ${
                      checked ? "bg-signal text-ink" : "text-transparent"
                    }`}
                  >
                    <Check className="size-5" strokeWidth={3} />
                  </span>
                  <span className={`transition-opacity duration-300 ${checked ? "opacity-55" : ""}`}>
                    <span className={`block text-lg font-bold md:text-xl ${checked ? "line-through decoration-signal decoration-2" : ""}`}>
                      {item.text}
                    </span>
                    {"note" in item && <span className="mt-0.5 block text-sm text-paper/65">{item.note}</span>}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="flex items-center justify-between text-sm font-semibold text-paper/70">
          <span>
            {count} מתוך {checklist.length}
          </span>
          <span role="status" className={all ? "text-signal" : ""}>
            {all ? "זהו. אתם בחופש 🌴" : ""}
          </span>
        </div>
        <div aria-hidden className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-signal transition-[width] duration-500 ease-out-expo"
            style={{ width: `${(count / checklist.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
