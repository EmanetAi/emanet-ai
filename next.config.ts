import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow loopback hosts to load dev resources (Next 16 blocks cross-origin dev by default)
  allowedDevOrigins: ["127.0.0.1"],
  // consolidate the duplicate host: the *.vercel.app deployment URL 308s to the real domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "emanet-ai.vercel.app" }],
        destination: "https://emanet-ai.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
