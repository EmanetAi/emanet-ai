import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow loopback hosts to load dev resources (Next 16 blocks cross-origin dev by default)
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
