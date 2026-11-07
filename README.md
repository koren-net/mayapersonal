# קורן.נט — mayakoren.net

Marketing site for קורן.נט: operational infrastructure, automations and systems for growing businesses.

The brand name is written only in Hebrew. Never "Koren.net" in Latin letters: koren.net is someone else's domain. In Latin, use the real domain, `mayakoren.net`.

**Stack:** Next.js 16 (App Router, Turbopack) · Tailwind CSS 4 · Framer Motion · Lucide · TypeScript. Native RTL (`<html dir="rtl" lang="he">`) with logical spacing utilities throughout. Every route is statically prerendered.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | שירותים ומוצרים — entry product, tracks, retainer, comparison, pricing approach |
| `/about` | אודות |
| `/contact` | יצירת קשר — channels + form (opens WhatsApp / email, stores nothing) |
| `/accessibility` | הצהרת נגישות |
| `/privacy` | מדיניות פרטיות |
| `/terms` | תקנון ותנאי שימוש |
| `/cookies` | מדיניות עוגיות |
| `/sitemap.xml`, `/robots.txt` | generated |

## Settings to complete

Edit [`lib/site.ts`](lib/site.ts):

- `url` — the production domain (metadata, sitemap, canonical URLs).
- `legal.entityName`, `legal.businessId`, `legal.address` — the operator's legal identity, shown on the privacy policy and terms.
- `legal.accessibilityCoordinator` — name of the person handling accessibility requests (shown on the accessibility statement).
- `legalUpdated` — bump on every revision of the legal pages.

Copy lives in [`lib/content.ts`](lib/content.ts) (home) and [`lib/pages.ts`](lib/pages.ts) (inner pages).

## Compliance (Israel)

| Requirement | Where |
| --- | --- |
| Accessibility — Service Accessibility Regulations 2013 (reg. 35), IS 5568 level AA | Built to WCAG 2.1 AA; audited with axe-core (0 violations on all pages). Statement at `/accessibility`. |
| Accessibility menu | `components/a11y/AccessibilityWidget.tsx` — text size, contrast, links, readable font, spacing, stop motion, big cursor. Preferences in `localStorage` (`koren_a11y`), applied before paint. |
| Reduced motion / WCAG 2.2.2 | OS "reduce motion" and the menu's "stop animations" both pause auto-playing content (`useStillness()`). |
| Privacy — Privacy Protection Law incl. Amendment 13 | `/privacy`; collection-point notice under the contact form. The form stores no data. |
| Cookies — PPA consent position paper (Feb 2026) | `components/consent/CookieConsent.tsx` — opt-in, reject as easy as accept, re-openable from the footer. Choice stored in the `koren_consent` cookie (12 months). |
| Third-party tracking | None today. Register tools in [`lib/tracking.ts`](lib/tracking.ts) — they load only after consent. Also update `/cookies`, the CSP and `CONSENT_VERSION`. |
| Marketing messages — Communications Law s. 30A | Stated in `/privacy`; no marketing without explicit opt-in. |

The legal texts are professional drafts based on the laws above. Have them reviewed by an Israeli lawyer before launch, and re-review whenever the law or the site's data use changes.

## Security & performance

- **HTTPS:** HSTS (2 years) + `upgrade-insecure-requests`. The TLS certificate itself is issued by the host (see Deploy).
- **Headers** (`next.config.ts`): CSP (production), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, no `X-Powered-By`.
- **Images:** use `next/image` — it serves AVIF/WebP automatically, resized per device.
- **Caching:** static HTML on the CDN; hashed JS/CSS cached for a year as `immutable`. Fonts are self-hosted.

## Deploy

Recommended: **Vercel**, connected to the GitHub repo.

- Free automatic TLS certificate and HTTP→HTTPS redirect for the custom domain.
- Global CDN for the static pages.
- Every deploy is immutable and can be rolled back instantly. Together with the Git history, this is the backup: the site has no database, so the repository *is* the full source of truth.

## Design tokens

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#f2efe7` | page background |
| `ink` | `#0e0e0c` | text, dark sections |
| `signal` | `#9b7bff` | brand violet ("the dot"), CTAs, "after" states |
| `signal-soft` | `#d9ccff` | highlighter strokes, text selection |
| `saffron` | `#ffb21e` | friction / "before" states, chaos notes |

Colors animated in JS (Framer Motion) come from [`lib/colors.ts`](lib/colors.ts) — keep it in sync with `app/globals.css`.

Fonts are Google fonts self-hosted via `next/font`. To use a licensed font such as Ploni, load it with `next/font/local` in `app/layout.tsx` and point `--font-heebo` at it.
