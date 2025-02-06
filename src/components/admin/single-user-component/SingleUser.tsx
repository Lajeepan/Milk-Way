import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UserDetails = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query; // Get the user ID from the URL

  useEffect(() => {
    if (id) {
      const fetchUserDetails = async () => {
        try {
          const res = await fetch(`/api/user/list/${id}`);
          const data = await res.json();
          setUser(data.user);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Details</h2>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default UserDetails;
