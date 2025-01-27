// pages/index.tsx
import Header from '../../components/header-component/Header'; 
import Form from '../../components/signup-component/Create-account';
import Footer from '../../components/footer-component/Footer';

const Signup: React.FC = () => {
  return (
    <div>
        <Header/>
      <Form />
      <Footer />
      {/* Add other components or content here */}
    </div>
  );
};

export default Signup;
