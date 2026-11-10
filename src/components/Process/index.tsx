"use client";

import { motion } from "motion/react";
import styles from "./Process.module.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "Walk & Measure",
    body: "We come out, put hands on the work, and take our own field measurements. No quoting off a photo and no surprises at install.",
  },
  {
    num: "02",
    title: "Drawings & Quote",
    body: "You get shop drawings and a line-item quote with material, labor, and coating broken out. Nothing gets cut until you sign off on the print.",
  },
  {
    num: "03",
    title: "Fabrication",
    body: "Cut, fit, and welded in our shop to the approved drawings, with a fit-up check before final weld and a bead that gets looked at twice.",
  },
  {
    num: "04",
    title: "Field Install",
    body: "Our crew hauls it out, sets it plumb, and ties it in. We coordinate around your schedule, including nights and weekends on live sites.",
  },
  {
    num: "05",
    title: "Inspection & Warranty",
    body: "Visual inspection on every weld, NDT when the spec calls for it, and a written warranty on workmanship. We come back if anything moves.",
  },
] as const;

export default function Process() {
  return (
    <section id="process" className={`panel panel-dark ${styles.section}`}>
      <div className="container-wide">

        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="sec-eyebrow">How It Works</p>
          <motion.div
            className="sec-rule"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
          />
          <h2 className="sec-title">Five Steps. One Crew. Done Right.</h2>
          <p className="sec-sub">
            Walk It
            <span className="sec-dot" aria-hidden="true" />
            Quote It
            <span className="sec-dot" aria-hidden="true" />
            Build It
            <span className="sec-dot" aria-hidden="true" />
            Stand Behind It
          </p>
        </motion.div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: i * 0.1 }}
            >
              {/* Number + connecting line */}
              <div className={styles.indicator}>
                <span className={styles.num}>{step.num}</span>
                {i < STEPS.length - 1 && <div className={styles.connector} />}
              </div>

              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
