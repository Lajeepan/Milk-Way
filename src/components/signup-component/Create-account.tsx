import { useRouter } from 'next/router';
import Image from 'next/image'
import { useState } from 'react'
import styles from '../signup-component/Create-account.module.css'

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Use router for navigation

  interface RegisterResponse {
    error?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data: RegisterResponse = await res.json();

    if (res.status === 201) {
      alert('Account created successfully!');
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
          <h3>Enter your details below</h3>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit" className={styles.submitBtn}>Create Account</button>
          </form>
          <p className={styles.loginLink}>Already have an account? <a href="signin">Log in</a></p>
        </div>
      </div>
    </div>
  )
}
