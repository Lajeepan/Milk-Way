// pages/index.tsx
import Header from '../components/header-component/Header'
import Hero from '../components/hero-component/Hero'  ;

 import Products from '../components/product-components/Product'

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <div>
        <Products />
        <button>viewallproduct</button>
      </div>
      
    </div>
  );
};

export default Home;
