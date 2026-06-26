import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://emanet-ai.vercel.app";
const DESC =
  "Emanet AI — an engineering studio that holds your technology in trust. AI automation, websites & apps, data, cloud and security, kept with care.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Emanet AI — أمانة, a trust held in safekeeping",
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Emanet AI",
    title: "Emanet AI — أمانة, a trust held in safekeeping",
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Emanet AI — the seal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emanet AI — أمانة",
    description: DESC,
    images: ["/og.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230B130E'/%3E%3Cg fill='none' stroke='%23C6A867' stroke-width='1.1'%3E%3Ccircle cx='16' cy='16' r='10'/%3E%3Cpath d='M16 6 L23.07 23.07 L6 16 L23.07 8.93 L16 26 L8.93 8.93 L26 16 L8.93 23.07 Z'/%3E%3C/g%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B130E",
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Emanet AI",
  url: SITE,
  email: "salam@emanet.ai",
  description: DESC,
  foundingDate: "2026",
  knowsAbout: ["AI automation", "Web & app development", "Data engineering", "Cloud & DevOps", "Security"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="gated">
      <head>
        {/* Fonts: Fraunces (display), Spline Sans Mono (technical), Amiri (Arabic), Switzer (body) */}
        {/* eslint-disable @next/next/no-page-custom-font -- CDN fonts kept per spec (no next/font) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.fontshare.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..500&family=Spline+Sans+Mono:wght@300..600&family=Amiri:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400&display=swap"
          rel="stylesheet"
        />
        {/* fail-open: if the bundle never runs (JS off / parse error), don't trap the
            visitor behind the scroll-locked gate */}
        <noscript>
          <style>{`html.gated, html.gated body { overflow:auto !important; height:auto !important; }
            #gate { display:none !important; }
            .reveal { opacity:1 !important; transform:none !important; }
            .corner { opacity:1 !important; transform:none !important; }`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
