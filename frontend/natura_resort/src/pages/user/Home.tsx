import GallerySection from '../../components/user/GallerySection';
import Footer from '../../components/user/Footer';
import ServiceSection from '../../components/user/ServiceSection';
import HeroSection from '../../components/user/HeroSection';
import Navbar from '../../components/user/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* Services Section */}
            <ServiceSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;