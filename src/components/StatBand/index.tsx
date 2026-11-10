"use client";

import { motion } from "motion/react";
import { serviceArea, site } from "@/lib/site";
import styles from "./StatBand.module.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// The lit blue bar across the bottom of the hero in blueStarMockup.png.
//
// ⚠️  The mockup's numbers ("4 operators on call now", "57 mins average
//     dispatch wait", "132 calls last 30 days") are invented placeholder
//     copy. Live metrics like those are a promise to every visitor, and a
//     one-man mobile rig advertising four operators is a false claim, not a
//     design flourish. So: the first two below are derived from site.ts and
//     are true by construction; the last two are marked TODO because only
//     the client can confirm them. Confirm or replace before launch.
const STATS = [
  {
    value: `${site.serviceRadiusMiles} MI`,
    label: "Service radius from Denton",
  },
  {
    value: String(serviceArea.length),
    label: "Counties covered",
  },
  {
    // TODO: confirm with client. If the rig doesn't actually answer overnight
    // call-outs, make this "7a–6p" and say so — an unanswered 2am call earns
    // a one-star review that outranks everything else on the page.
    value: "24/7",
    label: "Emergency call-out",
  },
  {
    // TODO: confirm with client.
    value: "SAME WEEK",
    label: "Typical scheduling",
  },
] as const;

export default function StatBand() {
  return (
    <div className={styles.band}>
      <div className={`container-wide ${styles.grid}`}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.item}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 1.1 + i * 0.1 }}
          >
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
