// ─── Site configuration ──────────────────────────────────────────────────────
// Single source of truth for everything SEO touches: NAP (name/address/phone),
// service areas, and the service list. Metadata, JSON-LD, the sitemap, and the
// visible footer/contact copy all read from here — so a fact changes in ONE
// place and stays consistent everywhere, which is exactly what local SEO wants.
//
// ⚠️  EVERY VALUE MARKED `TODO` IS A PLACEHOLDER. Fill these in before launch.
//     NAP consistency is a real ranking factor: the name, address, and phone
//     here must match your Google Business Profile and every directory listing
//     EXACTLY — same abbreviations, same punctuation, same suite number.

export const site = {
  // ── Identity ──────────────────────────────────────────────────────────────
  /** Must match the DBA you file and your Google Business Profile name. */
  name: "Blue Star Welding Co.",
  /** TODO: your LLC's legal name, for the schema `legalName` field. */
  legalName: "Blue Star Welding Co.",

  /** TODO: register this and update. Used for canonicals, sitemap, OG tags. */
  url: "https://bluestarweldingco.com",

  tagline: "Mobile Welding in Denton, TX",
  description:
    "Mobile welding in Denton, TX and the surrounding counties. Ranch fence, " +
    "gates, cattle guards, trailer and equipment repair — we come to you.",

  // ── Contact (NAP) ─────────────────────────────────────────────────────────
  /** TODO: a real 940 number. A Denton area code is a small but free signal. */
  phone: "(940) 555-0142",
  /** E.164 for tel: links and schema. TODO: keep in sync with `phone`. */
  phoneE164: "+19405550142",
  /** TODO: use the domain, not gmail — it's a trust signal and a citation field. */
  email: "quotes@bluestarweldingco.com",

  address: {
    /**
     * TODO: your real street address.
     *
     * Mobile welding is a "service-area business" in Google's terms. You still
     * need a real verifiable address (a home address is fine), but you HIDE it
     * on the Google Business Profile and set a service area instead. When the
     * address is hidden on GBP, leave `showStreet` false here too — publishing
     * a street address the GBP hides is an NAP inconsistency.
     */
    street: "",
    showStreet: false,
    locality: "Denton",
    region: "TX",
    regionName: "Texas",
    postalCode: "76201",
    country: "US",
  },

  /** Denton, TX. TODO: replace with your actual coordinates once sited. */
  geo: { latitude: 33.2148, longitude: -97.1331 },

  /** Radius you'll actually drive, in miles. Drives the schema service area. */
  serviceRadiusMiles: 60,

  /** TODO: confirm. Mobile welding often runs later than a shop would. */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { days: ["Saturday"], opens: "08:00", closes: "14:00" },
  ],

  /** Google shows this in the pack. $$ reads as mid-market for trade services. */
  priceRange: "$$",

  /** TODO: add once the Google Business Profile and Facebook page exist. */
  profiles: [] as string[],
};
// Deliberately NOT `as const` — `showStreet` needs to stay a plain boolean so
// flipping it to true doesn't make TypeScript treat the other branch as dead.

// ─── Service area ────────────────────────────────────────────────────────────
// Denton County is home turf; the rest are the surrounding counties you said
// you'd cover. Ranch and fence work is heaviest in Cooke, Wise, and Montague —
// those are rural counties where the money queries are "pipe fence" and
// "cattle guard", not "welding".
//
// These towns are the raw material for location pages LATER. Do not spin up a
// page per town yet: a dozen near-identical pages on a brand-new domain is the
// textbook doorway-page pattern, and it is a manual-action risk. Earn rankings
// in Denton first, then expand one town at a time with real job photos from
// that town.

export type County = {
  county: string;
  label: string;
  towns: readonly string[];
  primary: boolean;
};

export const serviceArea: readonly County[] = [
  {
    county: "Denton County",
    label: "Home County",
    towns: ["Denton", "Sanger", "Krum", "Ponder", "Argyle", "Aubrey", "Pilot Point", "Justin"],
    primary: true,
  },
  {
    county: "Cooke County",
    label: "Ranch Country",
    towns: ["Gainesville", "Muenster", "Valley View", "Era"],
    primary: true,
  },
  {
    county: "Wise County",
    label: "Ranch Country",
    towns: ["Decatur", "Bridgeport", "Boyd", "Alvord"],
    primary: true,
  },
  {
    county: "Grayson County",
    label: "Scheduled Runs",
    towns: ["Sherman", "Whitesboro", "Collinsville"],
    primary: false,
  },
  {
    county: "Collin County",
    label: "Scheduled Runs",
    towns: ["McKinney", "Celina", "Prosper"],
    primary: false,
  },
] as const;

/** Flat list for schema `areaServed`. */
export const servedPlaces = serviceArea.flatMap((c) => [c.county, ...c.towns]);

// ─── Services ────────────────────────────────────────────────────────────────
// Ordered by how much you actually want the work, which is also how Google
// should read your relevance. `slug` is reserved for service pages later.

export const services = [
  {
    slug: "mobile-welding",
    name: "Mobile Welding & On-Site Repair",
    short: "Mobile Welding",
    summary:
      "The rig comes to you. Cracked buckets, snapped trailer tongues, broken " +
      "implements, handrail, hitches — welded where it sits, so you aren't hauling " +
      "a broken machine across the county.",
  },
  {
    slug: "ranch-fence",
    name: "Ranch Fence, Gates & Cattle Guards",
    short: "Ranch Fence",
    summary:
      "Pipe fence, entry gates, corral panels, and cattle guards built and hung on " +
      "your property. Cut and welded on site to fit the ground you actually have.",
  },
  {
    slug: "equipment-repair",
    name: "Farm & Equipment Repair",
    short: "Equipment Repair",
    summary:
      "Trailers, gooseneck hitches, loader buckets, augers, and shop equipment. If " +
      "it's steel and it broke, bring it by or we'll come to it.",
  },
] as const;

export type Service = (typeof services)[number];
