
import Image from 'next/image'
import { useState } from 'react'
import styles from './Login.module.css'
import { useRouter } from 'next/router';

export default function SignIn() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Use router for navigation
  
    interface LoginResponse {
      error?: string;
      token?: string;
      user?: string; // Add user property
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
      
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      
  
      const data: LoginResponse = await res.json();
  
    
  if (res.status === 200) {
    alert('Login successful!');
    if (data.token) {
      localStorage.setItem('token', data.token); // Store the token
    }
    console.log('User details:', data.user);
    router.push('/user'); 
  } else {
    setError(data.error || 'Something went wrong');
  }
};

return (
    <div>

      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <Image
            src="/images/login/istockphoto-1296363649-612x612.jpg"
            alt="Child drinking milk"
            width={800}
            height={800}
            objectFit="cover"
          />
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.toggleButtons}>
            <button className={`${styles.btn} ${styles.active}`}>Buyer</button>
            <button className={styles.btn}>Seller</button>
          </div>
          <h2>Create an account</h2>
          <p>Enter your details below</p>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
           
            <input
              type="email"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitBtn}>Log In </button>
          </form>
          <a href='' className={styles.forgotPassword}>Forgot Password</a> 
        </div>
      </div>
    </div>
  )
}
