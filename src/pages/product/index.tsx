import Header from '../../components/header-component/Header';
import Product from "../../components/product-components/Product";
import Footer from '../../components/footer-component/Footer';


const ProductPage: React.FC = () => {
    return (
      <div>
          <Header/>
          <Product/>
          <Footer />
        {/* Add other components or content here */}
      </div>
    );
  };
  
  export default ProductPage;