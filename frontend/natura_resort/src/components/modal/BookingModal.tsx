import React, { useState } from "react";
import { Calendar, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { createBooking } from "../../redux/slices/auth/bookingSlice";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    offeringId: string;
    offeringName: string;
    offeringPrice: number;
}

const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    offeringId,
    offeringName,
    offeringPrice
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { createLoading } = useSelector((state: RootState) => state.booking);
    const { user } = useSelector((state: RootState) => state.auth);

    const [bookingData, setBookingData] = useState({
        checkIn: "",
        checkOut: "",
        guests: 1,
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        specialRequest: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value
        });
    };

    const handleBookingSubmit = async () => {
        if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.name ||
            !bookingData.email || !bookingData.phone) {
            toast.error("Please fill all required fields");
            return;
        }

        const checkInDate = new Date(bookingData.checkIn);
        const checkOutDate = new Date(bookingData.checkOut);
        const today = new Date();

        if (checkInDate < today) {
            toast.error("Check-in date cannot be in the past!");
            return;
        }

        if (checkOutDate <= checkInDate) {
            toast.error("Check-out date must be after check-in date!");
            return;
        }

        try {
            await dispatch(createBooking({
                offeringId,
                name: bookingData.name,
                phone: bookingData.phone,
                email: bookingData.email,
                guests: bookingData.guests,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                specialRequest: bookingData.specialRequest
            })).unwrap();

            toast.success("Booking created successfully!");
            onClose();

            setBookingData({
                checkIn: "",
                checkOut: "",
                guests: 1,
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                specialRequest: ""
            });
        } catch (error) {
            toast.error("Booking failed");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Complete Your Booking</h2>
                            <p className="text-gray-600 mt-1">{offeringName}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition"
                            disabled={createLoading}
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Dates */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Check-in Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="date"
                                        name="checkIn"
                                        value={bookingData.checkIn}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Check-out Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="date"
                                        name="checkOut"
                                        value={bookingData.checkOut}
                                        onChange={handleInputChange}
                                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Guests */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Number of Guests *
                            </label>
                            <input
                                type="number"
                                name="guests"
                                value={bookingData.guests}
                                onChange={handleInputChange}
                                min="1"
                                max="10"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                required
                            />
                        </div>

                        {/* Contact Details */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={bookingData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={bookingData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={bookingData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 234 567 8900"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Special Requests (Optional)
                            </label>
                            <textarea
                                name="specialRequest"
                                value={bookingData.specialRequest}
                                onChange={handleInputChange}
                                placeholder="Any special requirements or requests..."
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-none"
                            />
                        </div>

                        {/* Price Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-2">Price Summary</h3>
                            <div className="flex justify-between items-center">
                                <span>{offeringName.toLowerCase().includes('accommodation') ? "Price per night" : "Price per person"}</span>
                                <span className="font-semibold">₹{offeringPrice}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleBookingSubmit}
                            disabled={createLoading}
                            className={`w-full bg-amber-500 text-white py-4 rounded-lg font-bold text-lg transition transform shadow-lg ${createLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-amber-600 hover:scale-105"
                                }`}
                        >
                            {createLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Creating Booking...
                                </div>
                            ) : (
                                "Confirm Booking"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;