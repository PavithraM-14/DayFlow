import styles from "./MarkerHighlight.module.css";

/**
 * Handwritten text over a highlighter-marker swipe — a decorative accent
 * echoing the section headers in the Dayflow requirements doc. Intended
 * for short eyebrow labels only (2-4 words).
 */
export default function MarkerHighlight({ children, fontSize = 22 }) {
  return (
    <span className={styles.wrap} style={{ fontSize }}>
      <span className={styles.swipe} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
    </span>
  );
}
