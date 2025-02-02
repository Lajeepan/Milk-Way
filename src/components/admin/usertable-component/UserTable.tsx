import React from "react";
import styles from "./UserTable.module.css";

const UserTable: React.FC = () => {
  // Static user data
  const users = [
    { _id: "1", name: "John Doe", role: "Admin", email: "john@example.com" },
    { _id: "2", name: "Jane Smith", role: "User", email: "jane@example.com" },
    { _id: "3", name: "Michael Lee", role: "Editor", email: "michael@example.com" }
  ];

  return (
    <section className={styles.tableSection}>
      <h3 className={styles.sectionTitle}>Users</h3>
      {users.length === 0 ? <p>No users found.</p> : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>User ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className={styles.td}>{user._id}</td>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.role}</td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>
                  <button className={styles.actionButton}>View</button>
                  <button className={styles.actionButton}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UserTable;
