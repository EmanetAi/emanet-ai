import type { Metadata, Viewport } from "next";
import { SITE } from "./site";
import "./globals.css";

/* Search-intent title (this single page is 100% of our SEO); the amanah
   poetry lives on in the description and the page itself. */
const TITLE = "Emanet AI — AI automation, web & data engineering studio · first build €200";
const DESC =
  "Four-person engineering studio for AI automation, websites & apps, data platforms, cloud and security. First build €200, no retainer. أمانة — a trust kept and returned whole.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Emanet AI",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Emanet AI — the seal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emanet AI — أمانة",
    description: DESC,
    images: ["/og.png"],
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
  logo: SITE + "/og.png",
  email: "info@emanet-ai.com",
  description: DESC,
  sameAs: ["https://github.com/EmanetAi"],
  foundingDate: "2026",
  founder: [
    { "@type": "Person", name: "Ajdin Salihović", jobTitle: "Data Engineer", sameAs: "https://www.linkedin.com/in/ajdin-salihovic/" },
    { "@type": "Person", name: "Tarik Topalović", jobTitle: "AI Automation Engineer", sameAs: "https://www.linkedin.com/in/tarik-topalovic-a83770263/" },
    { "@type": "Person", name: "Eman Čičkušić", jobTitle: "DevOps Engineer", sameAs: "https://www.linkedin.com/in/eman-cickusic/" },
    { "@type": "Person", name: "Aner Atović", jobTitle: "Full-Stack Engineer", sameAs: "https://www.linkedin.com/in/aner-atovic-55830522a/" },
  ],
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
        {/* set lang/dir from the saved (or browser) language before first paint so a
            returning Arabic visitor never sees the LTR layout flash to RTL. The full
            copy swap happens in Deck's effect; this only fixes direction early. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=localStorage.getItem('emanet-lang');if(!l){var n=(navigator.language||'').toLowerCase();l=n.indexOf('ar')===0?'ar':(n.indexOf('bs')===0?'bs':'en');}var d=document.documentElement;d.lang=l;d.dir=(l==='ar')?'rtl':'ltr';}catch(e){}})();",
          }}
        />
        {/* Fonts: Fraunces (display), Spline Sans Mono (technical), Amiri (Arabic), Switzer (body) */}
        {/* eslint-disable @next/next/no-page-custom-font -- CDN fonts kept per spec (no next/font) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.fontshare.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..500&family=Spline+Sans+Mono:wght@300..600&family=Amiri:wght@400&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap"
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
      <body>
        {children}
      </body>
    </html>
  );
}
