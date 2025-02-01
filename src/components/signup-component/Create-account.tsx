import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Create-account.module.css'; // Import your CSS module
import Link from 'next/link';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer', // Default role
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.status === 201) {
      alert('User created successfully');
      router.push('/protected'); // Redirect to login after successful registration
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className={styles.inputField}
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className={styles.inputField}
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className={styles.inputField}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className={styles.inputField}
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="courier">Courier</option>
        </select>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      <div className={styles.redirect}>
        <p> Already have an account?</p>

        <Link href="/signin">
          Sign up here
        
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
