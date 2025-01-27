// components/Footer/Footer.tsx

import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        {/* Dairy Mart Section */}
        <div className={styles.footerSection}>
          <h3>Dairy Mart</h3>
          <p>Get 10% off your first order</p>
          <div className={styles.emailSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email subscription input"
            />
            <button aria-label="Subscribe">&#10148;</button>
          </div>
          <div className={styles.socialIcons}>
            <a href="" aria-label="Visit our Facebook page">
              <Image
                src="/icons/footer/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a href="#" aria-label="Visit our Twitter page">
              <Image
                src="/icons/footer/images (1).png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a href="#" aria-label="Visit our Instagram page">
              <Image
                src="/icons/footer/pngtree-instagram-social-media-icon-design-template-vector-png-image_3654775.jpg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a href="#" aria-label="Visit our LinkedIn page">
              <Image
                src="/icons/footer/linkedin-social-media-icon-design-template-vector-png_127013.jpg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        {/* Support Section */}
        <div className={styles.footerSection}>
          <h3>Support</h3>
          <p>64, Puthiya Sinnakulam,<br />Omantai, Vavuniya.</p>
          <p>Email: lajee001@gmail.com</p>
          <p>Phone: +94752929890</p>
        </div>

        {/* Account Section */}
        <div className={styles.footerSection}>
          <h3>Account</h3>
          <ul>
            <li><a href="#">My Account</a></li>
            <li><a href="signup">Login / Register</a></li>
            <li><a href="cart">Cart</a></li>
            <li><a href="shop">Shop</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className={styles.footerBottom}>
        <p>&copy; Copyright Lajeepan 2024. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
