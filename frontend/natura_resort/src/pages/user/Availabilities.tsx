import React, { useState } from "react";
import { Hotel, Waves, Sparkles, DollarSign, Clock } from "lucide-react";
import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import { useNavigate } from "react-router";

type CategoryKey = "all" | "accommodation" | "adventure" | "wellness";

type Availability = {
    id: number;
    name: string;
    description: string;
    image: string;
    category: Exclude<CategoryKey, "all">;
    price: number;
    amenities: string[];
    duration?: string;
};

const AvailabilityPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState<CategoryKey>("all");

    const availabilities: Availability[] = [
        {
            id: 1,
            category: "accommodation",
            name: "Deluxe Ocean View Suite",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            price: 350,
            description: "Spacious suite with panoramic ocean views, king-size bed, and private balcony.",
            amenities: ["WiFi", "AC", "Mini Bar", "Ocean View", "Balcony"]
        },
        {
            id: 2,
            category: "accommodation",
            name: "Family Garden Villa",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            price: 500,
            description: "Perfect for families with two bedrooms, private garden, and kids play area.",
            amenities: ["WiFi", "AC", "Kitchen", "Garden", "Play Area"]
        },
        {
            id: 3,
            category: "accommodation",
            name: "Luxury Beachfront Bungalow",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            price: 450,
            description: "Direct beach access with stunning sunset views and premium amenities.",
            amenities: ["WiFi", "AC", "Beach Access", "Private Pool", "Butler Service"]
        },
        {
            id: 4,
            category: "adventure",
            name: "Scuba Diving Experience",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
            price: 120,
            duration: "5 hours",
            description: "Explore vibrant coral reefs and marine life with certified instructors.",
            amenities: ["Equipment Included", "Certified Guide", "Photos", "Refreshments"]
        },
        {
            id: 5,
            category: "adventure",
            name: "Mountain Hiking Tour",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
            price: 80,
            duration: "5 hours",
            description: "Trek through scenic mountain trails with breathtaking viewpoints.",
            amenities: ["Guide Included", "Lunch", "Safety Gear", "Transportation"]
        },
        {
            id: 6,
            category: "adventure",
            name: "Jet Ski Adventure",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
            price: 150,
            duration: "1 hour",
            description: "Feel the thrill of riding waves on a high-speed jet ski.",
            amenities: ["Equipment Included", "Life Jacket", "Instructor", "Photos"]
        },
        {
            id: 7,
            category: "wellness",
            name: "Balinese Massage Therapy",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
            price: 90,
            description: "Traditional Balinese massage for complete relaxation and rejuvenation.",
            amenities: ["Aromatherapy", "Hot Stones", "Essential Oils", "Herbal Tea"]
        },
        {
            id: 8,
            category: "wellness",
            name: "Couples Spa Package",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
            price: 250,
            description: "Romantic spa experience with massage, facial, and champagne.",
            amenities: ["Couples Suite", "Champagne", "Massage", "Facial", "Jacuzzi"]
        },
        {
            id: 9,
            category: "wellness",
            name: "Yoga & Meditation Session",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
            price: 45,
            description: "Morning yoga session followed by guided meditation by the beach.",
            amenities: ["Yoga Mat", "Instructor", "Beach View", "Refreshments"]
        }
    ];

    const filteredAvailabilities = selectedFilter === "all"
        ? availabilities
        : availabilities.filter((item) => item.category === selectedFilter);

    const categories = [
        { key: "all" as CategoryKey, icon: Hotel, label: "All Services", color: "gray" },
        { key: "accommodation" as CategoryKey, icon: Hotel, label: "Accommodation", color: "blue" },
        { key: "adventure" as CategoryKey, icon: Waves, label: "Adventure Activities", color: "green" },
        { key: "wellness" as CategoryKey, icon: Sparkles, label: "Wellness & Spa", color: "purple" }
    ];

    const getBadgeColor = (color: string) => {
        if (color === "blue") return "bg-blue-500 text-white";
        if (color === "green") return "bg-green-500 text-white";
        if (color === "purple") return "bg-purple-500 text-white";
        return "bg-gray-500 text-white";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="relative h-24 bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center" />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filter Section */}
                <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Filter by Category</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            className="p-4 rounded-xl border-2 transition-all border-gray-200 hover:border-gray-300 bg-white"
                            type="button"
                        >
                            <Hotel className="mx-auto mb-2  text-gray-500" size={32} />
                            <p className="font-semibold text-sm">All Services</p>
                        </button>
                        <button
                            className="p-4 rounded-xl border-2 transition-all border-gray-200 hover:border-gray-300 bg-white"
                            type="button"
                        >
                            <Hotel className="mx-auto mb-2  text-gray-500" size={32} />
                            <p className="font-semibold text-sm">Accommodation</p>
                        </button>
                        <button
                            className="p-4 rounded-xl border-2 transition-all border-gray-200 hover:border-gray-300 bg-white"
                            type="button"
                        >
                            <Waves className="mx-auto mb-2  text-gray-500" size={32} />
                            <p className="font-semibold text-sm">Adventure Activities</p>
                        </button>
                        <button
                            className="p-4 rounded-xl border-2 transition-all border-gray-200 hover:border-gray-300 bg-white"
                            type="button"
                        >
                            <Sparkles className="mx-auto mb-2  text-gray-500" size={32} />
                            <p className="font-semibold text-sm">Wellness & Spa</p>
                        </button>
                    </div>
                </section>

                {/* Availability Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredAvailabilities.map((item) => {
                        const category = categories.find(cat => cat.key === item.category);
                        const badgeColor = getBadgeColor(category?.color || "gray");

                        return (
                            <article
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-2 ${badgeColor}`}>
                                        <span className="capitalize">{item.category}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {item.name}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Duration */}
                                    {item.duration && (
                                        <div className="flex items-center text-gray-600 text-sm mb-4">
                                            <Clock size={16} className="mr-2 text-gray-400" />
                                            <span>{item.duration}</span>
                                        </div>
                                    )}

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.amenities.slice(0, 3).map((amenity, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                                {amenity}
                                            </span>
                                        ))}
                                        {item.amenities.length > 3 && (
                                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                                +{item.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Price & Book Button */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div>
                                            <div className="flex items-center text-2xl font-bold text-gray-900">
                                                <DollarSign size={20} />
                                                <span className="ml-2">{item.price}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {item.category === "accommodation" ? "per night" : "per person"}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/availability/${item.id}`)}
                                            className="px-6 py-2 rounded-full font-semibold transition bg-amber-500 hover:bg-amber-600 text-white"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AvailabilityPage;