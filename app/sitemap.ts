import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://emanet-ai.vercel.app/", priority: 1 }];
}
