// pages/index.tsx
import Header from '../../components/header-component/Header';
import SignIn from '../../components/signin-component/Login';
import Footer from '../../components/footer-component/Footer';

const Signup: React.FC = () => {
  return (
    <div>
        <Header/>
      <SignIn />
      <Footer />
      {/* Add other components or content here */}
    </div>
  );
};

export default Signup;
