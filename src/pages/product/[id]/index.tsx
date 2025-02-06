import Header from "@/src/components/header-component/Header";
import Product from "../../../components/singleproduct/Single-product";
import Products from "../../../components/product-components/Product"
import Footer from "@/src/components/footer-component/Footer";

const ProductPage: React.FC = () => {
    return (
      <div>
          <Header />
          <Product/>
          <Products/>
          <Footer/>
        {/* Add other components or content here */}
      </div>
    );
  };
  
  export default ProductPage;