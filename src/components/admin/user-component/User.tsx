import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter to navigate
import styles from './User.module.css'; // Import the CSS module

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter(); // Use Next.js router to navigate to the user details page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/list"); 
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (userId: string) => {
    // Redirect to the user details page using the user's ID
    router.push(`/admin/users/${userId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user._id} 
              className={styles.tableRow} 
              onClick={() => handleRowClick(user._id)} // Add the click handler here
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
