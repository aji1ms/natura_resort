import { CheckCircle } from "lucide-react";
import { services } from "../../utils/ServicesData";
import Navbar from "../../components/user/Navbar";
import HeroSection from "../../components/user/HeroSection";
import Footer from "../../components/user/Footer";

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <HeroSection title={"Our Services"} />

            {/* Services Details */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {services.map((service, index) => {
                    const MainIcon = service.icon;
                    const isEven = index % 2 === 0;

                    return (
                        <article
                            key={service.id}
                            className="mb-24 last:mb-0"
                        >
                            {/* Service Header */}
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-4">
                                    <MainIcon className="text-white" size={40} />
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                    {service.title}
                                </h2>
                                <p className="text-xl text-blue-600 font-semibold">
                                    {service.tagline}
                                </p>
                            </div>

                            {/* Main Content Grid */}
                            <div className={`grid lg:grid-cols-2 gap-8 items-center mb-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <p className="text-gray-600 text-lg mb-6">
                                        {service.description}
                                    </p>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        {service.fullDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {service.features.map((feature, featureIndex) => {
                                        const FeatureIcon = feature.icon;
                                        return (
                                            <div
                                                key={featureIndex}
                                                className="bg-blue-50 p-6 rounded-xl border-2 border-blue-500 border-opacity-20 hover:border-opacity-50 transition"
                                            >
                                                <div className="flex items-start space-x-4">
                                                    <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                                                        <FeatureIcon className="text-white" size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 mb-2">
                                                            {feature.title}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {service.benefits.map((benefit, benefitIndex) => (
                                        <div
                                            key={benefitIndex}
                                            className="flex items-center space-x-3"
                                        >
                                            <CheckCircle className="text-blue-600" size={20} />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;