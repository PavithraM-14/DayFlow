import styles from "./SubmitButton.module.css";

export default function SubmitButton({
  children,
  loading = false,
  loadingLabel,
  disabled = false,
  type = "submit",
  onClick,
}) {
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? loadingLabel || "Please wait..." : children}
    </button>
  );
}
