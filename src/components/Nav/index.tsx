"use client";

import { useEffect, useState } from "react";
import LogoLottie from "@/components/brand/LogoLottie";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  { label: "Approach", href: "#approach" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
] as const;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The bar is transparent over the hero footage and takes on a solid
  // backdrop once it would otherwise sit over a light section. Without this
  // the white links vanish the moment you reach the bone-coloured panels.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerSolid : ""}`}
    >
      <div className={`container-wide ${styles.inner}`}>
        {/* The mark is the home link. It carries the label, so the animation
            itself is hidden from assistive tech rather than announced twice. */}
        <a
          href="#"
          className={styles.homeMark}
          aria-label="Blue Star Welding Co. — home"
        >
          <span className={styles.homeMarkInner}>
            <LogoLottie />
          </span>
        </a>

        <nav aria-label="Main navigation" className={styles.nav}>
          <ul className={styles.links}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className={styles.linkItem}>
                <a href={href} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
            {/* Contact rides in the same row so it takes an equal share of the
                bar's width like every other link. Kept visible on mobile —
                where the section links collapse into the drawer — because
                tap-to-contact is the highest-intent action in the bar. */}
            <li className={`${styles.linkItem} ${styles.contactItem}`}>
              <a href="#contact" className={styles.contact}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className={styles.drawer} aria-label="Mobile navigation">
          <ul>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.drawerLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className={styles.drawerCta}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
