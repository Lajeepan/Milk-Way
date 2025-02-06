// pages/index.tsx
import Header from '../../components/header-component/Header'; 
import Cart from '@/src/components/cart/Cart';
import Footer from '../../components/footer-component/Footer';

const Signup: React.FC = () => {
  return (
    <div>
        <Header/>
      <Cart />
      <Footer />
      {/* Add other components or content here */}
    </div>
  );
};

export default Signup;
