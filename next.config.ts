import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Photo-heavy event cards render at quality 90 (default 75 reads soft).
    qualities: [75, 90],
  },
};

export default nextConfig;
