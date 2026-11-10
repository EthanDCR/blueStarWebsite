import styles from "./WorkShowcase.module.css";

// Blanked out while the work content is reworked. The section shell stays so
// the page keeps its background band and the #work anchor the nav links to.
// `.placeholder` holds the band open until real content goes back in.
export default function WorkShowcase() {
  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className={styles.placeholder} />
	</div>
    </section>
  );
}
