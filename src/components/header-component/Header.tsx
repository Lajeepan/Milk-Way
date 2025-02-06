'use client'; // Add this directive to mark the component as a client-side component

import React, { useState } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    // Handle sign-out logic (e.g., clear user data, token, etc.)
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/images/logo/Milk Way.png"
          alt="Dairy Mart Logo"
          width={1000}
          height={1000}
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
          {!isLoggedIn && (
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleSignOut} className={styles.signOutBtn}>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div className={styles.searchCart}>
        <input
          type="text"
          placeholder="What are you looking for?"
          id="search-bar"
          className={styles.searchBar}
          aria-label="Search for products"
        />
        <Image
          src="/icons/navbar/search-interface-symbol.png"
          alt="Search Icon"
          width={30}
          height={30}
          id="search-box"
          aria-label="Search"
        />
        <Image
          src="/icons/navbar/shopping-cart.png"
          alt="Cart Icon"
          width={30}
          height={30}
          id="cart-b"
          aria-label="Shopping Cart"
        />
        {isLoggedIn && (
          <div className={styles.accountIcon}>
            <Image
              src="/icons/navbar/account-icon.png"
              alt="Account Icon"
              width={30}
              height={30}
              id="account-icon"
              aria-label="Account"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <p>Account</p> {/* You can update this in the future */}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
