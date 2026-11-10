import { site, servedPlaces, services } from "@/lib/site";

// ─── LocalBusiness JSON-LD ───────────────────────────────────────────────────
// This is the single highest-value piece of markup on the site for local
// search. It tells Google what the business is, where it works, and what it
// sells, in a format it doesn't have to infer from prose.
//
// Type note: schema.org has no "WeldingService". `HomeAndConstructionBusiness`
// is the accurate LocalBusiness subtype for a welding/fence contractor and is
// supported for local rich results.
//
// Service-area business: because the rig travels and the GBP hides the street
// address, `address` carries locality/region only and `areaServed` does the
// real work. Publishing a street address here that the GBP hides would be an
// NAP mismatch — so it's gated on `site.address.showStreet`.
//
// ⚠️  Do NOT add `aggregateRating` or `review` here. Self-serving review markup
//     on your own site is against Google's guidelines, and reviews belong on
//     the Google Business Profile anyway, where they actually move the pack.

export default function LocalBusinessSchema() {
  const businessId = `${site.url}/#business`;

  const graph = [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": businessId,
      name: site.name,
      legalName: site.legalName,
      description: site.description,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      priceRange: site.priceRange,
      currenciesAccepted: "USD",
      ...(site.profiles.length > 0 ? { sameAs: site.profiles } : {}),

      address: {
        "@type": "PostalAddress",
        ...(site.address.showStreet && site.address.street
          ? { streetAddress: site.address.street }
          : {}),
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },

      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },

      // Both forms: the circle states the honest driving radius, the named
      // places give Google exact strings to match against local queries.
      areaServed: [
        {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: site.geo.latitude,
            longitude: site.geo.longitude,
          },
          // Schema expects metres.
          geoRadius: Math.round(site.serviceRadiusMiles * 1609.34),
        },
        ...servedPlaces.map((place) => ({ "@type": "Place", name: place })),
      ],

      openingHoursSpecification: site.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),

      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Welding Services",
        itemListElement: services.map((svc) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: svc.name,
            description: svc.summary,
            serviceType: svc.short,
            areaServed: { "@type": "Place", name: "Denton County, Texas" },
            provider: { "@id": businessId },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": businessId },
      inLanguage: "en-US",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Content is fully author-controlled (no user input), so there's nothing
      // to inject here. `<` is still escaped to keep the tag from closing early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
