import { useNavigate } from "react-router";
import { GalleryImage1, GalleryImage2, GalleryImage3 } from "../../utils/Constants";

const GallerySection = () => {
    const navigate = useNavigate();
    return (
        <section id="gallery" className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Gallery</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group h-64 md:h-80">
                        <img
                            src={GalleryImage1}
                            alt="Resort pool"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>

                    <div className="relative overflow-hidden rounded-2xl shadow-lg group h-64 md:h-80">
                        <img
                            src={GalleryImage2}
                            alt="Resort beach"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>

                    <div className="relative overflow-hidden rounded-2xl shadow-lg group h-64 md:h-80">
                        <img
                            src={GalleryImage3}
                            alt="Resort interior"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate("/gallery")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                        View All Photos
                    </button>
                </div>
            </div>
        </section>
    )
}

export default GallerySection;
