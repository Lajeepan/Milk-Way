// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        // Fetch the user data from the /api/cookie endpoint
        const fetchUserRole = async () => {
            try {
                const res = await fetch("/api/cookie");
                const data = await res.json();

                if (res.status === 200) {
                    // Extract the user's role from the response
                    setRole(data.user.role); // Assuming your JWT payload has 'role'
                } else {
                    // Handle unauthorized or error response
                    router.push("/signin"); // Redirect to login if token is invalid or expired
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/signin"); // Redirect to login in case of failure
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (role === "admin") {
        return <AdminDashboard />;
    } else if (role === "buyer") {
        return <BuyerDashboard />;
    } else if (role === "seller") {
        return <SellerDashboard />;
    } else if (role === "courier") {
        return <CourierDashboard />;
    } else {
        // If no role or unauthorized role, redirect or show an error
        return <p>Unauthorized access</p>;
    }
};

const AdminDashboard = () => <div>Welcome, Admin!</div>;
const BuyerDashboard = () => <div>Welcome, Buyer!</div>;
const SellerDashboard = () => <div>Welcome, Seller!</div>;
const CourierDashboard = () => <div>Welcome, Courier!</div>;

export default Dashboard;
