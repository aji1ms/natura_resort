import { useNavigate } from "react-router";
import { galleryImg } from "../../utils/GalleryData";

const GallerySection = () => {
    const navigate = useNavigate();
    return (
        <section id="gallery" className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Gallery</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {galleryImg.map((image) => (
                        <article
                            key={image.id}
                            className="group relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gray-200"
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                                    <p className="text-sm text-gray-200">{image.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
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
