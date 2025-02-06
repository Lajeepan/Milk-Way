import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Create-account.module.css';
import Link from 'next/link';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrorMessage('');
    setSuccessMessage('');
    
    const data = { firstName, lastName, email, phoneNumber, password };
    
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    
      const result = await response.json();
    
      if (response.ok) {
        setSuccessMessage(result.message);
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/home');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.signupContainer}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className={styles.inputField}
          />
          <div className={styles.passwordField}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
            />
            <span className={styles.eyeIcon}>👁️</span>
          </div>
          <button type="submit" className={styles.submitButton}>Sign Up</button>
        </form>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <p>
          Already have an account? <Link href="/signin" className={styles.loginLink}>Sign In</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
