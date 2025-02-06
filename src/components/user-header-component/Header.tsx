'use client'; // Mark the component as a client-side component

import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header: React.FC = () => {
  const router = useRouter(); //  Corrected placement

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/user/logout', {
        method: 'GET',
      });

      if (response.ok) {
        localStorage.removeItem('user'); // Clear localStorage
        toast.success('Logged out successfully');
        router.push('/signin'); // Redirect to login
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while logging out.');
    }
  };

  return (
    <>
      <ToastContainer /> {/* ✅ Added this to enable toast notifications */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/images/logo/Milk Way.png"
            alt="Dairy Mart Logo"
            width={150}
            height={150}
            priority
          />
        </div>

        <nav aria-label="Main Navigation">
          <ul className={styles.navLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="">
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.searchCart}>
          <input
            type="text"
            placeholder="What are you looking for?"
            className={styles.searchBar}
            aria-label="Search for products"
          />
           <Link href="">
          <Image
            src="/icons/navbar/search-interface-symbol.png"
            alt="Search Icon"
            width={30}
            height={30}
            aria-label="Search"
          />
          </Link>
           <Link href="">
          <Image
            src="/icons/navbar/shopping-cart.png"
            alt="Cart Icon"
            width={30}
            height={30}
            aria-label="Shopping Cart"
          />
          </Link>
           <Link href="">
          <Image
           
            src="/icons/navbar/account-icon.png"
            alt="Account Icon"
            width={30}
            height={30}
            aria-label="Account"
          
          />
            </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
