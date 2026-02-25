import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Articles contain external images from various domains
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
