import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "ink" | "signal" | "outline" | "outline-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, { root: string; fill: string; icon: string }> = {
  ink: {
    root: "bg-ink text-paper hover:text-ink",
    fill: "bg-signal",
    icon: "bg-signal text-ink group-hover/pill:bg-ink group-hover/pill:text-signal",
  },
  signal: {
    root: "bg-signal text-ink hover:text-paper",
    fill: "bg-ink",
    icon: "bg-ink text-signal group-hover/pill:bg-signal group-hover/pill:text-ink",
  },
  outline: {
    root: "border border-ink/25 text-ink hover:border-ink hover:text-paper",
    fill: "bg-ink",
    icon: "bg-ink/[0.07] text-ink group-hover/pill:bg-signal group-hover/pill:text-ink",
  },
  "outline-light": {
    root: "border border-paper/30 text-paper hover:border-signal hover:text-ink",
    fill: "bg-signal",
    icon: "bg-paper/10 text-paper group-hover/pill:bg-ink group-hover/pill:text-signal",
  },
};

const sizes: Record<Size, { root: string; icon: string; noIcon: string }> = {
  sm: { root: "h-11 ps-5 pe-1.5 text-sm", icon: "size-8", noIcon: "pe-5" },
  md: { root: "h-14 ps-6 pe-2 text-base", icon: "size-10", noIcon: "pe-6" },
  lg: { root: "h-16 ps-7 pe-2 text-lg md:h-[3.6rem] md:ps-9", icon: "size-12 md:size-14", noIcon: "pe-8" },
};

/**
 * Tactile pill CTA: an elliptical fill rises from below while the label rolls up.
 * Internal paths ("/…") use client-side navigation; external links open in a new tab.
 */
export function PillLink({
  href,
  children,
  variant = "ink",
  size = "md",
  icon,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const isExternal = external ?? href.startsWith("http");
  const v = variants[variant];
  const s = sizes[size];
  const classes = `group/pill relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[color,border-color,transform] duration-500 ease-out-expo active:scale-[0.97] ${v.root} ${s.root} ${icon ? "" : s.noIcon} ${className}`;

  const content = (
    <>
      <span
        aria-hidden
        className={`absolute inset-x-[-15%] top-0 -z-10 h-[260%] translate-y-[40%] rounded-[50%] transition-transform duration-[650ms] ease-out-expo group-hover/pill:-translate-y-[30%] ${v.fill}`}
      />
      <span className="relative block overflow-hidden py-[0.2em]">
        <span className="block transition-transform duration-500 ease-out-expo group-hover/pill:-translate-y-[140%]">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-[140%] py-[0.2em] transition-transform duration-500 ease-out-expo group-hover/pill:translate-y-0"
        >
          {children}
        </span>
      </span>
      {isExternal && <span className="sr-only"> (נפתח בחלון חדש)</span>}
      {icon ? (
        <span
          aria-hidden
          className={`relative grid shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-500 ease-out-expo group-hover/pill:-rotate-[18deg] ${s.icon} ${v.icon}`}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {content}
    </a>
  );
}
