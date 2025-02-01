import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export function withAuth<P extends { user: User }>(Component: React.ComponentType<P>) {
  return function AuthHOC(props: Omit<P, 'user'>) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      // Simulate fetching user data, such as from cookies or session
      const fetchedUser: User = { id: '123', name: 'John Doe', email: 'john@example.com' };
      setUser(fetchedUser);
    }, []);

    if (!user) {
      return <div>Loading...</div>;
    }

    return <Component {...(props as P)} user={user} />;
  };
}
