"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site";
import styles from "./Contact.module.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
});

// Sourced from the site config — the phone and email here must stay identical
// to the footer, the schema, and the Google Business Profile.
const DETAILS = [
  { label: "Phone", value: site.phone, href: `tel:${site.phoneE164}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Based In",
    value: `${site.address.locality}, ${site.address.region}`,
    href: null,
  },
] as const;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className={`panel panel-light ${styles.section}`}>
      <div className="container-wide">

        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="sec-eyebrow">Get In Touch</p>
          <motion.div
            className="sec-rule"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
          />
          <h2 className="sec-title">
            Tell Us What Needs <span className={styles.accent}>Welding</span>
          </h2>
          <p className="sec-sub">
            Free Quotes
            <span className="sec-dot" aria-hidden="true" />
            Denton County &amp; Surrounding
          </p>
        </motion.div>

        <div className={styles.layout}>
          <motion.div className={styles.info} {...fadeUp()}>
            <p className={styles.sub}>
              Send over the scope — or just a photo and a measurement — and we&rsquo;ll
              come walk it, put a number on it, and tell you straight whether we&rsquo;re
              the right shop for the job.
            </p>

            {/* The fastest path to a job is a phone call, so it gets the same
                solid red plate the hero's primary CTA uses rather than being
                buried as the first row of a details list. */}
            <a href={`tel:${site.phoneE164}`} className={styles.callCta}>
              <svg
                className={styles.phoneIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z" />
              </svg>
              Call {site.phone}
            </a>

            <ul className={styles.details}>
              {DETAILS.map((d) => (
                <li key={d.label} className={styles.detailItem}>
                  <span className={styles.detailLabel}>{d.label}</span>
                  <div className={styles.detailRow}>
                    {d.href ? (
                      <a href={d.href} className={styles.detailValue}>
                        {d.value}
                      </a>
                    ) : (
                      <span className={styles.detailValue}>{d.value}</span>
                    )}
                    <button
                      className={styles.copyBtn}
                      onClick={() => handleCopy(d.value)}
                      aria-label={`Copy ${d.label}`}
                    >
                      {copied === d.value ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className={styles.success}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                <p className={styles.successTitle}>Quote request received.</p>
                <p className={styles.successBody}>
                  We&rsquo;ll call you back within one business day to set up a site
                  walk.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                {...fadeUp(0.15)}
                // TODO: wire to a server action + mail provider before launch
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.label}>Name</span>
                    <input type="text" name="name" className={styles.input} required />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Email</span>
                    <input type="email" name="email" className={styles.input} required />
                  </label>
                </div>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.label}>Phone</span>
                    <input type="tel" name="phone" className={styles.input} />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Job Site</span>
                    <input type="text" name="site" className={styles.input} />
                  </label>
                </div>

                <label className={styles.field}>
                  <span className={styles.label}>What do you need built or fixed?</span>
                  <textarea
                    name="scope"
                    className={styles.textarea}
                    placeholder="Material, rough dimensions, and whether it's shop or field work."
                  />
                </label>

                <button type="submit" className={styles.submit}>
                  Request a Quote
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
