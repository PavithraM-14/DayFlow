import styles from "./SubmitButton.module.css";

export default function SubmitButton({ children }) {
  return (
    <button type="submit" className={styles.button}>
      {children}
    </button>
  );
}
