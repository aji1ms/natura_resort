import React, { useState } from "react";
import {
    ArrowLeft,
    Clock,
    DollarSign,
    CheckCircle,
    Calendar,
    X,
    Hotel,
    Waves,
    Sparkles
} from "lucide-react";
import Footer from "../../components/user/Footer";

type Availability = {
    id: number;
    name: string;
    description: string;
    image: string;
    category: "accommodation" | "adventure" | "wellness";
    price: number;
    amenities: string[];
    duration?: string;
    rating: number;
    reviews: number;
    location?: string;
    capacity?: number;
    fullDescription: string;
    highlights: string[];
};

const ViewDetailsPage: React.FC = () => {
    const availabilityData: Availability = {
        id: 1,
        category: "accommodation",
        name: "Deluxe Ocean View Suite",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        price: 350,
        rating: 4.9,
        reviews: 128,
        location: "North Wing, 3rd Floor",
        capacity: 2,
        duration: undefined,
        description: "Spacious suite with panoramic ocean views, king-size bed, and private balcony.",
        fullDescription: "Experience luxury at its finest in our Deluxe Ocean View Suite. This spacious accommodation features floor-to-ceiling windows offering breathtaking panoramic views of the pristine ocean. The suite includes a king-size bed with premium linens, a separate living area, and a private balcony perfect for watching stunning sunsets. Modern amenities and elegant décor create an atmosphere of refined comfort and relaxation.",
        amenities: ["WiFi", "AC", "Mini Bar", "Ocean View", "Balcony", "Room Service", "Safe", "Smart TV"],
        highlights: [
            "Panoramic ocean views from every angle",
            "King-size bed with luxury linens",
            "Private balcony with outdoor seating",
            "Spacious bathroom with rain shower",
            "Separate living area with sofa",
            "24/7 concierge service"
        ],
    };

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        checkIn: "",
        checkOut: "",
        guests: 1,
        name: "",
        email: "",
        phone: "",
        specialRequests: ""
    });

    const getCategoryInfo = (category: string) => {
        if (category === "accommodation") {
            return { icon: Hotel, color: "blue", label: "Accommodation" };
        }
        if (category === "adventure") {
            return { icon: Waves, color: "green", label: "Adventure" };
        }
        return { icon: Sparkles, color: "purple", label: "Wellness" };
    };

    const categoryInfo = getCategoryInfo(availabilityData.category);

    const handleOpenBooking = () => {
        setShowBookingModal(true);
    };

    const handleCloseBooking = () => {
        setShowBookingModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value
        });
    };

    const handleBookingSubmit = () => {
        console.log("Booking submitted:", bookingData);
        alert("Booking request submitted successfully!\n(Backend integration pending)");
        setShowBookingModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    <span className="font-semibold">Back to Availability</span>
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="relative h-96 bg-gray-200">
                                <img
                                    src={availabilityData.image}
                                    alt={availabilityData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Title and Rating */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full mb-4">
                                <span className="text-sm font-semibold text-blue-600">
                                    {categoryInfo.label}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {availabilityData.name}
                            </h1>

                            <div className="flex items-center space-x-6 text-gray-600">
                                {availabilityData.duration && (
                                    <div className="flex items-center space-x-2">
                                        <Clock size={20} className="text-gray-400" />
                                        <span>{availabilityData.duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {availabilityData.fullDescription}
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {availabilityData.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="text-green-500 mt-1" size={20} />
                                        <span className="text-gray-700">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                            <div className="flex flex-wrap gap-2">
                                {availabilityData.amenities.map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
                            <div className="mb-6">
                                <div className="flex items-baseline space-x-2 mb-2">
                                    <DollarSign className="text-gray-900" size={28} />
                                    <span className="text-4xl font-bold text-gray-900">
                                        {availabilityData.price}
                                    </span>
                                    <span className="text-gray-600">
                                        {availabilityData.category === "accommodation" ? "/ night" : "/ person"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Best price guarantee
                                </p>
                            </div>

                            <button
                                onClick={handleOpenBooking}
                                className="w-full bg-amber-500 text-white py-4 rounded-lg font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg mb-4"
                            >
                                Book Now
                            </button>

                            <p className="text-center text-sm text-gray-600 mb-6">
                                Free cancellation up to 24 hours before check-in
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Complete Your Booking</h2>
                                <button
                                    onClick={handleCloseBooking}
                                    className="text-gray-400 hover:text-gray-600 transition"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Dates */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Check-in Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="date"
                                                name="checkIn"
                                                value={bookingData.checkIn}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Check-out Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="date"
                                                name="checkOut"
                                                value={bookingData.checkOut}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Guests */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Number of Guests
                                    </label>
                                    <input
                                        type="number"
                                        name="guests"
                                        value={bookingData.guests}
                                        onChange={handleInputChange}
                                        min="1"
                                        max={availabilityData.capacity || 10}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                    />
                                </div>

                                {/* Contact Details */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={bookingData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={bookingData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={bookingData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 234 567 8900"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Special Requests */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        name="specialRequests"
                                        value={bookingData.specialRequests}
                                        onChange={handleInputChange}
                                        placeholder="Any special requirements or requests..."
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleBookingSubmit}
                                    className="w-full bg-amber-500 text-white py-4 rounded-lg font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ViewDetailsPage;