import Link from "next/link";
import NotificationBell from "../../seller/notification/Notification";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  onLogout: () => void;
  notifications: number;
}

export default function SellerSidebar({ onLogout, notifications }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Seller Panel</h2>
      
      {/* Notification Bell */}
      <div className={styles.notificationContainer}>
        <NotificationBell count={notifications} />
      </div>
      
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/seller/dashboard" className={styles.navLink}>Dashboard</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/seller/products" className={styles.navLink}>Products</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/seller/addproduct" className={styles.navLink}>Add Product</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/seller/orders" className={styles.navLink}>Orders</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/seller/account" className={styles.navLink}>Account</Link>
        </li>
        <li className={styles.navItem}>
          <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}
