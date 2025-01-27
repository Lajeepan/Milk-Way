// pages/index.tsx
import Header from '../../components/user-header-component/Header';
import Hero from '../../components/hero-component/Hero';
import Products from '../../components/product-components/Product';
import Footer from '../../components/footer-component/Footer'

const User: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Products />
      <Footer />
    </div>
    
  );
};

export default User;
