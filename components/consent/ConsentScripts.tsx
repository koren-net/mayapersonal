"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, readConsent, type Consent } from "@/lib/consent";
import { trackingScripts } from "@/lib/tracking";

/** Loads registered third-party scripts only for categories the visitor opted in to. */
export function ConsentScripts() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- consent lives in a cookie, readable only after mount
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!consent || trackingScripts.length === 0) return null;

  return (
    <>
      {trackingScripts
        .filter((s) => consent[s.category])
        .map((s) => (
          <Script key={s.id} id={s.id} src={s.src} strategy="afterInteractive" />
        ))}
    </>
  );
}
