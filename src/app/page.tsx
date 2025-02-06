// pages/index.tsx
import Link from 'next/link';
import Header from '../components/header-component/Header'
import Hero from '../components/hero-component/Hero'  ;

 import Products from '../components/top-product-component/Product'

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <div>
        <Products />
        <Link href="/product">
        <button style={{ padding: '10px 40px', backgroundColor: '#f04e45', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '50%', transform: 'translateX(-50%)', marginTop: '30px' }}>
          View All Products
        </button>
        </Link>
      </div>
      
    </div>
  );
};

export default Home;
