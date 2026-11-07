import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Heebo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AccessibilityWidget } from "@/components/a11y/AccessibilityWidget";
import { ConsentScripts } from "@/components/consent/ConsentScripts";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/providers/Providers";
import { a11yInitScript } from "@/lib/a11y";
import { site } from "@/lib/site";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: site.name,
    title: `${site.name} — עסק שרץ גם כשאתם לא בחדר`,
    description: site.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f2efe7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the a11y init script may add classes / font-size
    // to <html> before React hydrates.
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frank.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          דילוג לתוכן
        </a>
        <Providers>
          <Header />
          {children}
          <Footer />
          <AccessibilityWidget />
          <CookieConsent />
          <ConsentScripts />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
