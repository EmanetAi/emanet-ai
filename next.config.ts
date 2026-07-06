import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow loopback hosts to load dev resources (Next 16 blocks cross-origin dev by default)
  allowedDevOrigins: ["127.0.0.1"],
  // static export for GitHub Pages; redirects()/rewrites() don't work in this mode.
  // GitHub itself 301s the *.github.io URL to the custom domain once one is set, so the
  // old Vercel-only host redirect isn't needed here.
  output: "export",
};

export default nextConfig;
