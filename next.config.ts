import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Netlify added this header itself; the Worker does not.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
  images: {
    // Photo-heavy event cards render at quality 90 (default 75 reads soft).
    qualities: [75, 90],
  },
};

export default nextConfig;
