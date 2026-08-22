import Link from "next/link";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/login" className={styles.cta}>
          Sign In
        </Link>
      </div>
    </header>
  );
}
