import FlagBadge from "@/components/brand/FlagBadge";
import { site, services, serviceArea } from "@/lib/site";
import styles from "./Footer.module.css";

// Cache Components rejects `new Date()` during prerender — bump this at
// launch, or swap in a cached/client-rendered year if it needs to be live.
const YEAR = 2026;

// ⚠️  The mock previously listed "AWS D1.1 Certified", "$2M General Liability",
//     "Fully Bonded", and a contractor number. Those were invented filler and
//     are removed. Publishing credentials a business doesn't hold is deceptive
//     advertising — put them back only once the client confirms each one, and
//     only with the real numbers.

const COLUMNS = [
  { heading: "Services", items: services.map((s) => s.name) },
  {
    heading: "Service Area",
    items: serviceArea.map((a) => a.county),
  },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Flag stripe bookends the page */}
      <div className={styles.stripe} aria-hidden="true" />

      <div className={`container-wide ${styles.inner}`}>
        <div className={styles.brandCol}>
          <div className={styles.lockup}>
            <FlagBadge size={34} />
            <span className={styles.wordmark}>
              <span className={styles.wordmarkTop}>Blue Star</span>
              <span className={styles.wordmarkBottom}>Welding Co.</span>
            </span>
          </div>
          <p className={styles.tagline}>
            Mobile welding, ranch fence, and on-site repair out of Denton, Texas.
            We bring the rig to you.
          </p>

          {/* Crawlable NAP in the footer of every page. Marked up with
              microdata so the address is machine-readable even on a page that
              doesn't carry the full JSON-LD block. */}
          <address className={styles.nap} itemScope itemType="https://schema.org/LocalBusiness">
            <meta itemProp="name" content={site.name} />
            <span
              className={styles.napLine}
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              {site.address.showStreet && site.address.street ? (
                <>
                  <span itemProp="streetAddress">{site.address.street}</span>,{" "}
                </>
              ) : null}
              <span itemProp="addressLocality">{site.address.locality}</span>,{" "}
              <span itemProp="addressRegion">{site.address.region}</span>{" "}
              <span itemProp="postalCode">{site.address.postalCode}</span>
            </span>
            <a className={styles.napLink} href={`tel:${site.phoneE164}`} itemProp="telephone">
              {site.phone}
            </a>
            <a className={styles.napLink} href={`mailto:${site.email}`} itemProp="email">
              {site.email}
            </a>
          </address>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading} className={styles.col}>
            <p className={styles.colHeading}>{col.heading}</p>
            <ul className={styles.colList}>
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`container-wide ${styles.legal}`}>
        <span>&copy; {YEAR} {site.name}</span>
        <span>
          {site.address.locality}, {site.address.regionName}
        </span>
      </div>
    </footer>
  );
}
