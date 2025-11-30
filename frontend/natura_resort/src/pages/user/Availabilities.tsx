import React, { useEffect, useState } from "react";
import { Hotel, Waves, Sparkles, DollarSign } from "lucide-react";
import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchOfferings, type CategoryRef, type Offering } from "../../redux/slices/auth/offeringSlice";

type CategoryKey = "all" | "accommodation" | "adventure" | "wellness";

const AvailabilityPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState<CategoryKey>("all");

    const dispatch = useDispatch<AppDispatch>();
    const { list, loading, error } = useSelector((state: RootState) => state.offering);

    useEffect(() => {
        dispatch(fetchOfferings());
    }, [dispatch]);

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

    const getCategoryKey = (off: Offering) => {
        const catName =
            typeof off.category === "string"
                ? off.category
                : (off.category as CategoryRef | undefined)?.name || "";

        const lower = (catName || "").toLowerCase();
        if (lower.includes("accommodation") || lower.includes("stay") || lower.includes("hotel")) return "accommodation";
        if (lower.includes("adventure") || lower.includes("activity") || lower.includes("trek")) return "adventure";
        if (lower.includes("wellness") || lower.includes("spa") || lower.includes("yoga")) return "wellness";
        return "accommodation";
    };

    const filtered = list.filter((o: Offering) => {
        if (selectedFilter === "all") return true;
        return getCategoryKey(o) === selectedFilter;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="relative h-24 bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center" />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Filter by Category</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const active = selectedFilter === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    className={`p-4 rounded-xl border-2 transition-all border-gray-200 hover:border-gray-300 bg-white ${active ? "ring-2 ring-amber-300" : ""}`}
                                    type="button"
                                    onClick={() => setSelectedFilter(cat.key)}
                                >
                                    <Icon className="mx-auto mb-2 text-gray-500" size={32} />
                                    <p className="font-semibold text-sm">{cat.label}</p>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {loading && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center space-x-2">
                            <span className="loader" /> 
                            <span>Loading offerings...</span>
                        </div>
                    </div>
                )}

                {!loading && !error && filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-600">
                        No offerings found for selected category.
                    </div>
                )}

                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filtered.map((item) => {
                        const categoryKey = getCategoryKey(item);
                        const category = categories.find(cat => cat.key === categoryKey);
                        const badgeColor = getBadgeColor(category?.color || "gray");

                        return (
                            <article
                                key={item._id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-2 ${badgeColor}`}>
                                        <span className="capitalize">{category?.label || categoryKey}</span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.amenities?.slice(0, 3).map((amenity, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                                {amenity}
                                            </span>
                                        ))}
                                        {item.amenities && item.amenities.length > 3 && (
                                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                                +{item.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div>
                                            <div className="flex items-center text-2xl font-bold text-gray-900">
                                                <DollarSign size={20} />
                                                <span className="ml-2">{item.price}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {categoryKey === "accommodation" ? "per night" : "per person"}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/availability/${item._id}`)}
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
