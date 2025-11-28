import React, { useState } from "react";
import { Hotel, Waves, Sparkles, Utensils, Sunset, Users } from "lucide-react";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import HeroSection from "../../components/user/HeroSection";
import { galleryImages, type GalleryCategory } from "../../utils/GalleryData";

const GalleryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");

    const categories = [
        { key: "all" as GalleryCategory, label: "All Photos", icon: Hotel, },
        { key: "rooms" as GalleryCategory, label: "Rooms & Suites", icon: Hotel },
        { key: "beach" as GalleryCategory, label: "Beach & Nature", icon: Sunset },
        { key: "activities" as GalleryCategory, label: "Activities", icon: Waves },
        { key: "dining" as GalleryCategory, label: "Dining", icon: Utensils },
        { key: "spa" as GalleryCategory, label: "Spa & Wellness", icon: Sparkles },
        { key: "events" as GalleryCategory, label: "Events", icon: Users }
    ];

    const filteredImages = selectedCategory === "all"
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <HeroSection title={"Photo Gallery"} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filters */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = selectedCategory === category.key;

                                return (
                                    <button
                                        key={category.key}
                                        onClick={() => setSelectedCategory(category.key)}
                                        className={`p-4 rounded-xl border-2 transition-all ${isActive
                                            ? "border-amber-500 bg-amber-50 shadow-md"
                                            : "border-gray-200 bg-white hover:border-gray-300"
                                            }`}
                                        type="button"
                                    >
                                        <Icon
                                            className={`mx-auto mb-2 ${isActive ? "text-amber-500" : "text-gray-400"}`}
                                            size={28}
                                        />
                                        <p className={`font-semibold text-xs mb-1 ${isActive ? "text-amber-700" : "text-gray-600"}`}>
                                            {category.label}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {filteredImages.map((image) => (
                        <article
                            key={image.id}
                            className="group relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gray-200"
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                                    <p className="text-sm text-gray-200">{image.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default GalleryPage;