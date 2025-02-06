import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css'; // Import CSS Module styles
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const data = { email, password };

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        const { user } = result;
        console.log("User role received:", user.role);

        // Handle success based on user role
        switch (user.role) {
          case 'buyer':
            setSuccessMessage(result.message);
            router.push('/home');
            break;
          case 'seller':
            setSuccessMessage(result.message);
            router.push('/seller');
            break;
          case 'admin':
            setSuccessMessage(result.message);
            router.push('/admin/dashboard');
            break;
          default:
            setErrorMessage("Invalid user role. Please contact support.");
            console.error("Invalid user role:", user.role);
            break;
        }
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={styles.passwordField}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
