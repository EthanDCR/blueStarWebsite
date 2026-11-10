import type { Metadata } from "next";
import { Anton, Bitter, Inter, IBM_Plex_Mono } from "next/font/google";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { site } from "@/lib/site";
import "./globals.css";

// ─── Font loading ────────────────────────────────────────────────────────────
// Bitter: a sturdy slab serif with a true italic — display only
const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Anton: the ultra-condensed poster face from the mockup. Single weight by
// design — it only ever appears at display sizes.
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poster",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Site metadata ───────────────────────────────────────────────────────────
// Target query: "welding denton tx". The title leads with the service + city
// because Google bolds query matches in the SERP and the first ~60 characters
// are what render — brand goes last, where truncation costs the least.

export const metadata: Metadata = {
  // Makes every relative URL below (canonical, OG image) absolute.
  metadataBase: new URL(site.url),

  title: {
    default: "Mobile Welding in Denton, TX | Blue Star Welding Co.",
    // Child pages set only their own name; this appends the brand for them.
    template: "%s | Blue Star Welding Co.",
  },
  description:
    "Mobile welding in Denton, TX and surrounding counties. Ranch fence, gates, " +
    "cattle guards, trailer and equipment repair — we bring the rig to you. " +
    "Free quotes, straight answers.",

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Mobile Welding in Denton, TX | Blue Star Welding Co.",
    description:
      "Ranch fence, gates, cattle guards, and on-site repair across Denton County " +
      "and the surrounding counties. We bring the rig to you.",
    // TODO: add an opengraph-image.png (1200x630) in src/app/ — Next picks it
    // up by filename. Social previews with no image get far fewer clicks.
  },

  // Only meaningful once the business is actually operating in these places.
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Denton, Texas",
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // TODO: paste the token from Google Search Console once you verify the site.
  // verification: { google: "..." },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bitter.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {children}
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
