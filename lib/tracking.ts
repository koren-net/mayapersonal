import type { ConsentCategory } from "@/lib/consent";

/**
 * Third-party scripts that require consent. Each one loads only after the
 * visitor opts in to its category (see components/consent/ConsentScripts.tsx).
 *
 * The site currently runs no analytics or marketing tools, so this list is empty.
 * When adding one:
 *   1. add it here,
 *   2. list its cookies on the cookie policy page (app/cookies/page.tsx),
 *   3. allow its domains in the Content-Security-Policy (next.config.ts),
 *   4. bump CONSENT_VERSION in lib/consent.ts so existing visitors are asked again.
 *
 * Example:
 *   { id: "ga4", category: "analytics", src: "https://www.googletagmanager.com/gtag/js?id=G-XXXX" }
 */
export const trackingScripts: { id: string; category: ConsentCategory; src: string }[] = [];
