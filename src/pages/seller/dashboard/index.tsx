import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SellerDashboard = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      router.push('/login');
      return;
    }

    if (role !== 'seller') {
      router.push('/unauthorized');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return null;

  return <div>Welcome to the Seller Dashboard!</div>;
};

export default SellerDashboard;
