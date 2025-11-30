import React from 'react';

interface Category {
    _id: string;
    name: string;
}

interface Offering {
    _id: string;
    name: string;
    category: Category;
    description: string;
    amenities: string[];
    image: string;
    price: number;
}

interface Booking {
    _id: string;
    userId?: {
        _id: string;
        name: string;
        email: string;
    };
    offeringId: Offering;
    name: string;
    phone: string;
    email: string;
    guests: number;
    checkIn: string;
    checkOut: string;
    specialRequest: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

interface BookingDetailsModalProps {
    booking: Booking;
    onClose: () => void;
    loading: boolean;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose, loading }) => {
    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const calculateNights = (checkIn: string, checkOut: string) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const timeDiff = end.getTime() - start.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const calculateTotal = (price: number, guests: number, checkIn: string, checkOut: string) => {
        const nights = calculateNights(checkIn, checkOut);
        return price * guests * nights;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Booking Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Booking ID:</span>
                                            <span className="font-medium">#{booking._id.slice(-8)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Created:</span>
                                            <span className="font-medium">
                                                {formatDate(booking.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Name:</span>
                                            <span className="font-medium">{booking.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="font-medium">{booking.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Phone:</span>
                                            <span className="font-medium">{booking.phone}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Guests:</span>
                                            <span className="font-medium">{booking.guests}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dates and Pricing */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Check-in:</span>
                                            <span className="font-medium">
                                                {formatDate(booking.checkIn)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Check-out:</span>
                                            <span className="font-medium">
                                                {formatDate(booking.checkOut)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Duration:</span>
                                            <span className="font-medium">
                                                {calculateNights(booking.checkIn, booking.checkOut)} nights
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Price per guest/night:</span>
                                            <span className="font-medium">${booking.offeringId.price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total:</span>
                                            <span className="font-medium text-lg text-green-600">
                                                ${calculateTotal(
                                                    booking.offeringId.price,
                                                    booking.guests,
                                                    booking.checkIn,
                                                    booking.checkOut
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Offering Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Offering Details</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src={booking.offeringId.image}
                                            alt={booking.offeringId.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{booking.offeringId.name}</h4>
                                            <p className="text-gray-600 text-sm mt-1">{booking.offeringId.description}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-gray-500 text-sm">
                                                    Category: {booking.offeringId.category?.name}
                                                </span>
                                            </div>
                                            {booking.offeringId.amenities && booking.offeringId.amenities.length > 0 && (
                                                <div className="mt-2">
                                                    <span className="text-gray-500 text-sm">Amenities: </span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {booking.offeringId.amenities.map((amenity, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                            >
                                                                {amenity}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Special Request */}
                            {booking.specialRequest && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Request</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700">{booking.specialRequest}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end space-x-3 p-6 border-t">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingDetailsModal;