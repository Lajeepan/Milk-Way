import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.logo}>Milk Way Admin</h1>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarItem}><Link href="/admin/dashboard">Dashboard</Link></div>
        <div className={styles.sidebarItem}><Link href="/admin/orders">Orders</Link></div>
        <div className={styles.sidebarItem}><Link href="/admin/products">Products</Link></div>
        <div className={styles.sidebarItem}><Link href="/admin/users">Users</Link></div>
        <div className={styles.sidebarItem}><Link href="/admin/settings">Settings</Link></div>
        <div className={styles.sidebarItem}><Link href="/logout">Logout</Link></div>
      </div>
    </aside>
  );
};

export default Sidebar;
