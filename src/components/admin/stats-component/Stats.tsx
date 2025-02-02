import styles from "./Stats.module.css";

const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.statCard}>
        <h3 className={styles.statNumber}>150</h3>
        <p className={styles.statLabel}>Total Orders</p>
      </div>
      <div className={styles.statCard}>
        <h3 className={styles.statNumber}>50</h3>
        <p className={styles.statLabel}>Active Products</p>
      </div>
      <div className={styles.statCard}>
        <h3 className={styles.statNumber}>20</h3>
        <p className={styles.statLabel}>Pending Orders</p>
      </div>
    </section>
  );
};

export default Stats;
