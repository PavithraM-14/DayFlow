import styles from "./AlertMessage.module.css";

const ICONS = {
  error: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
  success: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
};

/**
 * Inline form-level feedback (API errors, confirmations, dev hints).
 * Renders nothing when there is no message, so callers can drop it in
 * unconditionally.
 */
export default function AlertMessage({ tone = "error", children }) {
  if (!children) return null;

  return (
    <div className={`${styles.alert} ${styles[tone]}`} role={tone === "error" ? "alert" : "status"}>
      <svg
        className={styles.icon}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[tone] || ICONS.info}
      </svg>
      <span>{children}</span>
    </div>
  );
}
