"use client";

import { checkPassword } from "@/utils/passwordPolicy";
import styles from "./PasswordRequirements.module.css";

/**
 * Live checklist under a password field on the sign-up forms.
 *
 * Shows the whole policy up front rather than revealing it one failed
 * submit at a time, and ticks each rule off as it is met. Unmet rules are
 * shown neutral, not red — while the field is still being typed into,
 * nothing is wrong yet.
 */
export default function PasswordRequirements({ password = "", title = "Your password needs:" }) {
  const rules = checkPassword(password);

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{title}</p>
      {/* aria-live so a screen reader hears rules being satisfied. */}
      <ul className={styles.list} aria-live="polite">
        {rules.map((rule) => (
          <li
            key={rule.key}
            className={`${styles.item} ${rule.met ? styles.met : styles.pending}`}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {rule.met ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <circle cx="12" cy="12" r="9" />
              )}
            </svg>
            <span>{rule.label}</span>
            {/* Text equivalent of the icon, for assistive tech only. */}
            <span className="sr-only">{rule.met ? " — met" : " — not met yet"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
