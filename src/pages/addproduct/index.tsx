import AddProduct from "../../components/upload-product-components/Upload";
import Header from "@/src/components/header-component/Header";
import Footer from "@/src/components/footer-component/Footer";



const Product: React.FC = () => {
    return (
      <div>
          <Header />
          <AddProduct/>
          <Footer />
        {/* Add other components or content here */}
      </div>
    );
  };
  
  export default Product;