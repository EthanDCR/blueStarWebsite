"use client";

import { motion } from "motion/react";
import RoughStar from "@/components/brand/RoughStar";
import StatBand from "@/components/StatBand";
import { site } from "@/lib/site";
import styles from "./Hero.module.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE_OUT, delay },
});

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* ── Background loop ──
          Muted + playsInline are both required or mobile Safari refuses to
          autoplay. The footage is already dark and warm, so it only needs a
          gradient at top and bottom to carry the type — not a full scrim. */}
      <video
        className={styles.bgVideo}
        src="/hero-loop.mp4"
        poster="/hero-loop-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />

      {/* ── Sketched star, bottom right, overlapping the band ── */}
      <motion.div
        className={styles.roughStar}
        aria-hidden="true"
        initial={{ opacity: 0, rotate: -14, scale: 0.9 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.7 }}
      >
        <RoughStar />
      </motion.div>

      {/* ── Headline block, anchored to the bottom above the band ── */}
      <div className={`container-wide ${styles.content}`}>
        <motion.p className={styles.eyebrow} {...rise(0.35)}>
          Denton County &amp; Surrounding Counties
        </motion.p>

        <motion.div
          className={styles.rule}
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.4 }}
        />

        {/* The H1 still carries "Denton, TX" verbatim — it's the strongest
            on-page relevance signal there is. The service line sits under the
            big word rather than wedged beside it, which is what was making
            the lockup feel cramped. */}
        <motion.h1 className={styles.headline} {...rise(0.55)}>
          <span className={styles.headlineMain}>Mobile Welding</span>
          <span className={styles.headlineSub}>
            Field Repair
            <span className={styles.dot} aria-hidden="true" />
            Denton, TX
          </span>
        </motion.h1>

        <motion.p className={styles.subhead} {...rise(0.65)}>
          Ranch fence, gates, cattle guards, and on-site repair across Denton
          and the surrounding counties. We bring the rig to you.
        </motion.p>

        <motion.div className={styles.actions} {...rise(0.75)}>
          <a href="#contact" className={styles.ctaPrimary}>
            Get a Free Quote
          </a>
          {/* A tap-to-call link is the highest-intent action on a trade site,
              and most of this traffic arrives on a phone. */}
          <a href={`tel:${site.phoneE164}`} className={styles.ctaSecondary}>
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
            {site.phone}
          </a>
        </motion.div>
      </div>

      <StatBand />
    </section>
  );
}
