import Link from "next/link";
import Logo from "./Logo";
import styles from "./AuthCard.module.css";

/**
 * Shared centered-card shell for Sign In / Sign Up / Forgot Password —
 * mirrors the "App/Web Logo" + boxed form pattern from the project
 * wireframe (and Odoo's own login screen).
 */
export default function AuthCard({
  heading,
  subheading,
  children,
  footer,
  maxWidth,
}) {
  return (
    <div className={styles.shell}>
      <div className={styles.center}>
        <div
          className={styles.card}
          style={maxWidth ? { "--card-max-width": maxWidth } : undefined}
        >
          <div className={styles.logoRow}>
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {heading && <h1 className={styles.heading}>{heading}</h1>}
          {subheading && <p className={styles.subheading}>{subheading}</p>}

          {children}

          {footer && <div className={styles.footerLink}>{footer}</div>}
        </div>
      </div>
    </div>
  );
}
