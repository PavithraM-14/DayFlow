import Navbar from "./Navbar";
import styles from "./AuthCard.module.css";

/**
 * Shared centered-card shell for Sign In / Sign Up / Forgot Password —
 * mirrors the "App/Web Logo" + boxed form pattern from the project
 * wireframe (and Odoo's own login screen).
 *
 * Carries the same full-width top header used on the marketing pages
 * (logo only, no "Sign In" CTA since these pages already are the
 * sign-in/sign-up flow) so the Dayflow logo always takes people back to
 * the homepage from a single, consistent spot.
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
      <Navbar showCta={false} />

      <div className={styles.center}>
        <div
          className={styles.card}
          style={maxWidth ? { "--card-max-width": maxWidth } : undefined}
        >
          {heading && <h1 className={styles.heading}>{heading}</h1>}
          {subheading && <p className={styles.subheading}>{subheading}</p>}

          {children}

          {footer && <div className={styles.footerLink}>{footer}</div>}
        </div>
      </div>
    </div>
  );
}
