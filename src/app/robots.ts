import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { PRELAUNCH } from "../../next.config";

export default function robots(): MetadataRoute.Robots {
  // Pre-launch, crawling stays ALLOWED on purpose while the X-Robots-Tag
  // header (set in next.config.ts) carries noindex.
  //
  // It looks backwards, but a Disallow here would be worse: a blocked URL
  // can still be indexed from inbound links, and because the crawler never
  // fetches the page it never sees the noindex telling it to drop it. Letting
  // it crawl and read the header is what actually keeps the page out.
  if (PRELAUNCH) {
    return {
      rules: [{ userAgent: "*", allow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
