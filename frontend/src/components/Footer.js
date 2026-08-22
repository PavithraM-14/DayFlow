import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>© {year} Dayflow. All rights reserved.</span>
        <span>Human Resource Management System</span>
      </div>
    </footer>
  );
}
