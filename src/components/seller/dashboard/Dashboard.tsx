import { useState, useEffect } from "react";
import SellerSidebar from "../../seller/sidebar/Sidebar";
import styles from "./Dashboard.module.css";

interface Order {
  id: number;
  product: string;
  status: "Pending" | "Accepted" | "Declined";
}

export default function Dashboard() {
  const [orders] = useState<Order[]>([
    { id: 1, product: "Milk", status: "Pending" },
    { id: 2, product: "Paneer", status: "Accepted" },
    { id: 3, product: "Butter", status: "Declined" }
  ]);
  
  const products = 5; // Example product count (removed setProducts)
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Count new orders (Pending) as notifications
    const newOrderCount = orders.filter(order => order.status === "Pending").length;
    setNotifications(newOrderCount);
  }, [orders]);

  return (
    <div className={styles.container}>
      <SellerSidebar onLogout={() => console.log("Logout")} notifications={notifications} />
      <div className={styles.content}>
        <h1>Seller Dashboard</h1>
        
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className={styles.card}>
            <h3>Pending Orders</h3>
            <p>{orders.filter(order => order.status === "Pending").length}</p>
          </div>
          <div className={styles.card}>
            <h3>Total Products</h3>
            <p>{products}</p>
          </div>
        </div>

        <h2>Recent Orders</h2>
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <span>{order.product}</span>
              <span>Status: {order.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
