import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Rail } from "@/components/layout/Rail";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GridGuides } from "@/components/graphics/GridGuides";
import { Grain } from "@/components/graphics/Grain";
import { MotionGate } from "@/components/motion/MotionGate";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteUrl, siteName } from "@/lib/site";

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter-tight",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const description =
  "Собираю системы, веб и автоматизации — от разбора контекста до работающего продукта.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EVAN — системы, веб, автоматизации",
    template: "%s",
  },
  description,
  applicationName: siteName,
  authors: [{ name: "Evan" }],
  creator: "Evan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName,
    title: "EVAN — системы, веб, автоматизации",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "EVAN — системы, веб, автоматизации",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${interTight.variable} ${plexMono.variable}`}>
      <body>
        <noscript>
          {/* without JS nothing is ever hidden: reveals resolve to their final state */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          К содержимому
        </a>
        <StructuredData />
        <MotionGate />
        <GridGuides />
        <Grain />
        <div className="page">
          <Rail />
          <div className="page-main relative z-10">
            <SiteHeader />
            {/* #top is the footer's way back and has to exist on every page, not only
                where the hero happens to be */}
            <main id="main">
              <span id="top" aria-hidden="true" />
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
