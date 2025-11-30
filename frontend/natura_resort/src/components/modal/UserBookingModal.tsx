import React from 'react';
import { Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import type { Booking } from '../../redux/slices/auth/bookingSlice';

interface UserBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
    onCancelBooking: (bookingId: string) => void;
    cancelLoading: boolean;
}

const UserBookingModal: React.FC<UserBookingModalProps> = ({
    isOpen,
    onClose,
    booking,
    onCancelBooking,
    cancelLoading
}) => {
    if (!isOpen || !booking) return null;

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pending" },
            confirmed: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Confirmed" },
            cancelled: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Cancelled" }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                <Icon size={16} className="mr-1" />
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const calculateTotal = (price: number, guests: number, checkIn: string, checkOut: string) => {
        const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24));
        return price * guests * nights;
    };

    const canCancelBooking = (booking: Booking) => {
        if (booking.status !== 'pending' && booking.status !== 'confirmed') return false;

        const checkInDate = new Date(booking.checkIn);
        const now = new Date();
        const hoursDifference = (checkInDate.getTime() - now.getTime()) / (1000 * 3600);

        return hoursDifference >= 24;
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-md">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                            disabled={cancelLoading}
                        >
                            &times;
                        </button>
                    </div>

                    {/* Offering Info */}
                    <div className="flex items-start space-x-4 mb-6">
                        <img
                            src={booking.offeringId.image}
                            alt={booking.offeringId.name}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {booking.offeringId.name}
                            </h3>
                            <p className="text-gray-600">{booking.offeringId.category.name}</p>
                            <div className="mt-2">
                                {getStatusBadge(booking.status)}
                            </div>
                        </div>
                    </div>

                    {/* Booking Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Booking Information</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booking ID:</span>
                                        <span className="font-medium">#{booking._id.slice(-8)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booked On:</span>
                                        <span className="font-medium">{formatDate(booking.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Guest Information</h4>
                                <div className="space-y-2 text-sm">
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

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Stay Details</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Check-in:</span>
                                        <span className="font-medium">{formatDate(booking.checkIn)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Check-out:</span>
                                        <span className="font-medium">{formatDate(booking.checkOut)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-medium">
                                            {Math.ceil(
                                                (new Date(booking.checkOut).getTime() -
                                                    new Date(booking.checkIn).getTime()) /
                                                (1000 * 3600 * 24)
                                            )} nights
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Price per guest:</span>
                                        <span className="font-medium">${booking.offeringId.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Amount:</span>
                                        <span className="font-semibold text-lg text-green-600">
                                            ${calculateTotal(
                                                booking.offeringId.price,
                                                booking.guests,
                                                booking.checkIn,
                                                booking.checkOut
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Special Request */}
                    {booking.specialRequest && (
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <h4 className="font-semibold text-blue-900 mb-2">Special Request</h4>
                            <p className="text-blue-800 text-sm">{booking.specialRequest}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            disabled={cancelLoading}
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium disabled:opacity-50"
                        >
                            Close
                        </button>
                        {canCancelBooking(booking) && (
                            <button
                                onClick={() => onCancelBooking(booking._id)}
                                disabled={cancelLoading}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 flex items-center"
                            >
                                {cancelLoading && <Loader className="w-4 h-4 animate-spin mr-2" />}
                                Cancel Booking
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBookingModal;