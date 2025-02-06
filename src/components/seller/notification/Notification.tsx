import styles from "./Notification.module.css";

interface NotificationProps {
  count: number;
}

export default function NotificationBell({ count }: NotificationProps) {
  return (
    <div className={styles.bellContainer}>
      <span className={styles.bell}>🔔</span>
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </div>
  );
}
