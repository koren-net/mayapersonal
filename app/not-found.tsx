import { ArrowUpLeft } from "lucide-react";
import type { Metadata } from "next";
import { PillLink } from "@/components/ui/PillLink";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "העמוד לא נמצא",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-5 pt-36 pb-24 md:px-8">
      <p className="font-mono text-sm text-ink/65">שגיאה 404</p>
      <h1 className="mt-6 text-[clamp(2.6rem,7vw,6.25rem)] leading-[0.92] font-black tracking-[-0.045em]">
        העמוד הזה
        <span className="block font-serif font-normal">נפל בין הכיסאות.</span>
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">
        קורה גם למערכות הכי טובות. הקישור שגוי או שהעמוד הועבר — אבל אפשר לחזור לדרך מכאן.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <PillLink href="/" icon={<ArrowUpLeft className="size-5" />}>
          לעמוד הבית
        </PillLink>
        <PillLink href={whatsappHref()} variant="outline" icon={<WhatsAppIcon className="size-5" />}>
          לשאול אותנו בוואטסאפ
        </PillLink>
      </div>
    </main>
  );
}
