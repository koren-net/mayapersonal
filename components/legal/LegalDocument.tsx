import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { mailHref, site, telHref } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Long-form legal page: hero, "last updated", sticky table of contents, sections. */
export function LegalDocument({
  label,
  title,
  intro,
  sections,
}: {
  label: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main id="main">
      <PageHero label={label} title={title} intro={intro}>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/75">
          <span aria-hidden className="size-2 rounded-full bg-signal ring-1 ring-ink" />
          עודכן לאחרונה: <time dateTime={site.legalUpdated.iso}>{site.legalUpdated.display}</time>
        </p>
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 md:px-8 lg:grid-cols-12">
        <nav aria-label="תוכן העניינים" className="self-start lg:sticky lg:top-28 lg:col-span-3">
          <h2 className="text-sm font-semibold text-ink/65">תוכן העניינים</h2>
          <ol className="mt-4 flex flex-col gap-1 border-s border-ink/15">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="-ms-px flex gap-3 border-s-2 border-transparent py-1.5 ps-4 text-[15px] text-ink/75 transition-colors hover:border-ink hover:text-ink"
                >
                  <span className="font-mono text-xs leading-6 text-ink/70">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="border-t border-ink/10 py-10 first:border-t-0 first:pt-0">
              <h2 id={`${s.id}-title`} className="flex items-baseline gap-4 text-2xl font-bold tracking-tight md:text-3xl">
                <span className="font-mono text-sm font-normal text-ink/70">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="legal-prose mt-5">{s.body}</div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}

/** Operator identity block — shows only the fields filled in lib/site.ts. */
export function OperatorDetails() {
  const { entityName, businessId, address } = site.legal;
  return (
    <ul>
      <li>
        <strong>שם האתר והמותג:</strong> {site.name}
      </li>
      <li>
        <strong>כתובת האתר:</strong>{" "}
        <a href={site.url} dir="ltr">
          {site.domain}
        </a>
      </li>
      {entityName && (
        <li>
          <strong>מפעיל האתר:</strong> {entityName}
        </li>
      )}
      {businessId && (
        <li>
          <strong>מספר עוסק / ח.פ.:</strong> {businessId}
        </li>
      )}
      {address && (
        <li>
          <strong>כתובת:</strong> {address}
        </li>
      )}
      <li>
        <strong>טלפון:</strong>{" "}
        <a href={telHref} dir="ltr">
          {site.phoneDisplay}
        </a>
      </li>
      <li>
        <strong>דוא״ל:</strong> <a href={mailHref}>{site.email}</a>
      </li>
    </ul>
  );
}
