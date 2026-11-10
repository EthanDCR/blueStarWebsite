import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Cache Components rejects `new Date()` during prerender, and a sitemap whose
// lastModified changes on every build tells crawlers the page changed when it
// didn't. Bump this by hand when the page content actually changes.
const LAST_MODIFIED = new Date("2026-11-05T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Service and location pages get added here as they're built. Keep this
    // list honest — a sitemap listing URLs that 404 or redirect wastes crawl
    // budget and is one of the few things Search Console will nag you about.
  ];
}
