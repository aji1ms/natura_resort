import { Hotel, Sparkles, Waves } from "lucide-react";
import { useNavigate } from "react-router";

const ServiceSection = () => {
    const navigate = useNavigate();
    return (
        <section id="services" className="py-10 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Services</h2>

                <div className="grid md:grid-cols-3 gap-8 cursor-pointer">
                    <div className="bg-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                        <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <Hotel className="text-white" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Accommodation</h3>
                        <p className="text-gray-600">
                            Luxurious rooms with stunning views, modern amenities, and world-class comfort for an unforgettable stay.
                        </p>
                    </div>

                    <div className="bg-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                        <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <Waves className="text-white" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Adventure Activities</h3>
                        <p className="text-gray-600">
                            Thrilling water sports, hiking trails, and outdoor adventures that will get your adrenaline pumping.
                        </p>
                    </div>

                    <div className="bg-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                        <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <Sparkles className="text-white" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Wellness & Spa</h3>
                        <p className="text-gray-600">
                            Rejuvenate your body and mind with our premium spa treatments and wellness programs.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate("/services")}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
                        Read More
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ServiceSection;
