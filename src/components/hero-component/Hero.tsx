import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.banner}>
      <Image
        src="/images/hero/banner.jpg"
        alt="Banner Image"
        layout="fill"
        // objectFit=""
        className={styles.image}
        priority
      />
      <div className={styles.overlay}>
        <h1 className={styles.text}>Welcome to Our Milk Way</h1>
      </div>
    </section>
  );
};

export default Hero;
