import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Emanet AI",
    short_name: "Emanet AI",
    description: "AI automation, web & data engineering studio",
    start_url: "/",
    display: "standalone",
    background_color: "#0B130E",
    theme_color: "#0B130E",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
