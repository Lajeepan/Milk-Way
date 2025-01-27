import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Dairy Mart</h1>
      </div>

      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="contact">Contact</Link>
          </li>
          <li>
            <Link href="about">About</Link>
          </li>
          <li>
            <Link href="signup">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.searchCart}>
        <input
          type="text"
          placeholder="What are you looking for?"
          id="search-bar"
          className={styles.searchBar}
        />
        <Image
          src="/icons/navbar/search-interface-symbol.png"
          alt="Search Icon"
          width={24}
          height={24}
          id="search-box"
        />
        <Image
          src="/icons/navbar/shopping-cart.png"
          alt="Cart Icon"
          width={24}
          height={24}
          id="cart-b"
        />
      </div>
    </header>
  );
};

export default Header;
