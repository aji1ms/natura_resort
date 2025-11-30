import { useNavigate } from "react-router";
import { services } from "../../utils/ServicesData";

const ServiceSection = () => {
    const navigate = useNavigate();
    return (
        <section id="services" className="py-10 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Services</h2>

                <div className="grid md:grid-cols-3 gap-8 cursor-pointer">
                    {services.map((service, index) => (
                        <div key={index} className={`${service.bg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2`}>
                            <div className={`${service.icon_color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                                <service.icon className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">{service?.title}</h3>
                            <p className="text-gray-600">
                                {service?.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate("/services")}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
                        Read More
                    </button>
                </div>
            </div>
        </section >
    )
}

export default ServiceSection;
