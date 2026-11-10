import type { NextConfig } from "next";

// ─── Launch gate ─────────────────────────────────────────────────────────────
// While true, every response carries X-Robots-Tag: noindex, nofollow and the
// robots.txt route refuses crawlers a reason to index anything.
//
// This is on because the deployed site is a client mockup: placeholder phone
// number, stand-in project photos, and service claims nobody has confirmed. A
// page like that indexed under the client's brand is worse than no page — it
// outranks nothing and misrepresents the business.
//
// FLIP TO false WHEN THE CONTENT IS REAL AND THE DOMAIN IS LIVE. Nothing else
// needs changing; robots.ts reads the same flag.
export const PRELAUNCH = true;

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,

  async headers() {
    if (!PRELAUNCH) return [];
    return [
      {
        // Every route, including the sitemap and robots routes themselves.
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
