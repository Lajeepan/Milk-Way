// app/components/user-header-components/Header.tsx
import { useState } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn] = useState(true); // Assuming user is logged in

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Dairy Mart</h1>
      </div>

      <nav>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className={styles.searchCart}>
        <input
          type="text"
          placeholder="What are you looking for?"
          className={styles.searchBar}
        />
        <Image
          src="/Assets/navAssets/search-interface-symbol.png"
          alt="Search Icon"
          width={24}
          height={24}
        />
        <Image
          src="/Assets/navAssets/shopping-cart.png"
          alt="Cart Icon"
          width={24}
          height={24}
        />
      </div>

      {/* Display dropdown if the user is logged in */}
      {isLoggedIn && (
        <div className={styles.account} onClick={toggleDropdown}>
          <Image
            src="/Assets/navAssets/shopping-cart.png"
            alt="Account Icon"
            width={30}
            height={30}
          />
        </div>
      )}

      {dropdownVisible && (
        <ul className={styles.dropdownMenu}>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/orders">Orders</Link></li>
          <li><Link href="/logout">Logout</Link></li>
        </ul>
      )}
    </header>
  );
};

export default Header;
