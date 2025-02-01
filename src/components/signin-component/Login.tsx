import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css'; // External module for CSS
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const login = async () => {
    setError(''); // Reset any existing error before trying login

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/protected');
    } else {
      setError(data.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Signin</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className={styles.inputField}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className={styles.inputField}
      />
      <button className={styles.submitButton} onClick={login}>
        Login
      </button>
      <div className={styles.redirect}>
        <p> Don&apos;t have an account?</p>
        <Link href="/signup">
          Sign in here
        
        </Link>
      </div>
    </div>
  );
};

export default Login;
