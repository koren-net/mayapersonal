import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowToStart } from "@/components/sections/HowToStart";
import { Manifesto } from "@/components/sections/Manifesto";
import { Marquee } from "@/components/sections/Marquee";
import { Tracks } from "@/components/sections/Tracks";
import { Transformation } from "@/components/sections/Transformation";
import { WebsitesTeaser } from "@/components/sections/WebsitesTeaser";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: "IL",
  inLanguage: "he",
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Shortened home (Maya, 2026-11-07). The marquee band came back at
          Maya's request; the 5-step Process section is kept for later use. */}
      <Hero />
      <Marquee />
      <Manifesto />
      <Transformation />
      <WebsitesTeaser />
      <HowToStart />
      <Tracks />
      <Faq />
      <FinalCta />
    </main>
  );
}
