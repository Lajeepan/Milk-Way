import Header from '../../components/header-component/Header';
import Order from '../../components/order/Order';
import Footer from '../../components/footer-component/Footer';


const OrderPage: React.FC = () => {
    return (
      <div>
          <Header/>
          <Order/>
          <Footer />
        {/* Add other components or content here */}
      </div>
    );
  };
  
  export default OrderPage;