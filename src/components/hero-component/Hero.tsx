// components/Banner.tsx
import styles from './Hero.module.css';
import Image from 'next/image';

const Hero = () => {
  return (

    <section className={styles.banner}>
       
       
      <Image src="/images/hero/banner.jpg" alt="Banner Image" layout="responsive" width={700} height={475} />
     
    </section>
  );
};

export default Hero;
