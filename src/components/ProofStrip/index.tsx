"use client";

import { motion } from "motion/react";
import styles from "./ProofStrip.module.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// ⚠️  These are the differentiators a small mobile operation can actually
//     claim without a certification binder. The previous copy asserted AWS
//     D1.1 certification and stamped shop drawings — invented, and removed.
//     Swap in real credentials once the client confirms them.
//
// Not numbered 01/02/03 anymore: three parallel reasons aren't a sequence,
// so numbering them implied an order that doesn't exist.
const POINTS = [
  {
    title: "We Come to You",
    body: "The rig travels. Broken gate, cracked bucket, snapped trailer tongue — it gets welded where it sits, which beats loading a broken machine and hauling it to town.",
  },
  {
    title: "You Talk to the Welder",
    body: "No dispatcher, no account manager, no handoff. The person who quotes your job is the person who shows up and runs the bead.",
  },
  {
    title: "Straight Answers on Scope",
    body: "If a repair won't hold and the part needs replacing, we'll say so. If it's outside what we do well, we'll tell you that too instead of learning on your equipment.",
  },
] as const;

export default function ProofStrip() {
  return (
    <section id="approach" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {POINTS.map((point, i) => (
          <motion.div
            key={point.title}
            className={styles.item}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.13 }}
          >
            <h3 className={styles.title}>{point.title}</h3>
            <p className={styles.body}>{point.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
