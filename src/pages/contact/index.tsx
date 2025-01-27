// pages/index.tsx
import Header from '../../components/header-component/Header';
import Contact from '../../components/contact-component/Contact';
import Footer from '../../components/footer-component/Footer';

const Home: React.FC = () => {
  return (
    <div>
        <Header/>
      <Contact />
      <Footer />
      {/* Add other components or content here */}
    </div>
  );
};

export default Home;
