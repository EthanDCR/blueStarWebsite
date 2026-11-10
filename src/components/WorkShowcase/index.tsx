"use client";

import { motion } from "motion/react";
import styles from "./WorkShowcase.module.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// ⚠️  PLACEHOLDER SECTION. These are empty slots, not work the business has
//     claimed — nothing here asserts a job that didn't happen.
//
//     Fill each one with a real photo. Whatever lands here should ALSO be
//     posted to the Google Business Profile once that profile exists — see
//     the TODO on `site.profiles` in lib/site.ts. Google reads a site and its
//     listing together, so the same job photos in both places is a local-SEO
//     signal, and it means one shoot feeding both instead of two libraries
//     that drift apart.
//
//     To fill a slot: replace the <div className={styles.slot}> with
//     <div className={styles.media}><img …/></div> plus the .overlay block,
//     whose styles are already below.
const SLOTS = ["01", "02", "03", "04"] as const;

export default function WorkShowcase() {
  return (
    <section id="work" className={`panel panel-dark ${styles.section}`}>
      <div className="container-wide">

        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="sec-eyebrow">The Work</p>
          <motion.div
            className="sec-rule"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
          />
          <h2 className="sec-title">Work Examples Go Here</h2>
          <p className="sec-sub">
            Four Slots
            <span className="sec-dot" aria-hidden="true" />
            Reuse These on the Google Business Profile
          </p>
          <p className="sec-lede">
            Drop in four job photos. Whatever goes here should go on the
            Google Business Profile too once it&rsquo;s set up — Google reads the
            site and the listing together, and the same work showing in both
            is a local-SEO signal worth having. Wide shots of finished jobs
            beat close-ups of beads.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {SLOTS.map((id, i) => (
            <motion.div
              key={id}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.08 }}
            >
              <div className={styles.slot}>
                <svg
                  className={styles.slotIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2a1 1 0 0 0 .8-.4l1-1.3a1 1 0 0 1 .8-.4h5.4a1 1 0 0 1 .8.4l1 1.3a1 1 0 0 0 .8.4h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z" />
                  <circle cx="12" cy="12.5" r="3.5" />
                </svg>
                <span className={styles.slotNum}>Photo {id}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
