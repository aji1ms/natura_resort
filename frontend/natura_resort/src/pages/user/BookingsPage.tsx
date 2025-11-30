import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import { Calendar, Users, MapPin, DollarSign, Eye, Clock, CheckCircle, XCircle, Loader } from "lucide-react";
import { fetchUserBookings, fetchBookingDetails, cancelBooking } from "../../redux/slices/auth/bookingSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Booking } from "../../redux/slices/auth/bookingSlice";
import UserBookingModal from "../../components/modal/UserBookingModal";
import toast from "react-hot-toast";

const BookingsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bookings, loading, cancelLoading } = useSelector((state: RootState) => state.booking);

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        dispatch(fetchUserBookings(statusFilter === 'all' ? '' : statusFilter));
    }, [dispatch, statusFilter]);

    const filteredBookings = bookings.filter(booking =>
        statusFilter === "all" || booking.status === statusFilter
    );

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

    const handleViewDetails = async (booking: Booking) => {
        try {
            await dispatch(fetchBookingDetails(booking._id)).unwrap();
            setSelectedBooking(booking);
            setShowDetailsModal(true);
        } catch (error) {
            toast.error('Failed to fetch booking details!');
        }
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedBooking(null);
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await dispatch(cancelBooking(bookingId)).unwrap();
                setShowDetailsModal(false);
                dispatch(fetchUserBookings(statusFilter === 'all' ? '' : statusFilter));
            } catch (error) {
                toast.error('Failed to cancel booking!');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header Section */}
            <div className="relative bg-purple-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Filter Bookings</h2>
                            <p className="text-sm text-gray-600">View bookings by status</p>
                        </div>
                        <div className="flex space-x-2">
                            {["all", "pending", "confirmed", "cancelled"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${statusFilter === status
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader className="w-8 h-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-gray-600">Loading bookings...</span>
                    </div>
                )}

                {/* Bookings List */}
                <div className="space-y-6">
                    {!loading && filteredBookings.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                            <div className="flex flex-col items-center">
                                <Calendar className="w-16 h-16 text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                                <p className="text-gray-600 mb-6">
                                    {statusFilter !== "all"
                                        ? `No ${statusFilter} bookings available`
                                        : "You haven't made any bookings yet"
                                    }
                                </p>
                                <button
                                    onClick={() => window.location.href = '/availability'}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    Explore Offerings
                                </button>
                            </div>
                        </div>
                    ) : (
                        !loading && filteredBookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                        {/* Offering Image */}
                                        <div className="shrink-0">
                                            <img
                                                src={booking.offeringId.image}
                                                alt={booking.offeringId.name}
                                                className="w-32 h-32 rounded-xl object-cover"
                                            />
                                        </div>

                                        {/* Booking Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                        {booking.offeringId.name}
                                                    </h3>
                                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                                        <MapPin size={16} className="mr-1" />
                                                        {booking.offeringId.category.name}
                                                    </div>
                                                </div>
                                                {getStatusBadge(booking.status)}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar size={16} className="mr-2 text-blue-500" />
                                                    <div>
                                                        <div className="font-medium">Check-in</div>
                                                        <div>{formatDate(booking.checkIn)}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar size={16} className="mr-2 text-green-500" />
                                                    <div>
                                                        <div className="font-medium">Check-out</div>
                                                        <div>{formatDate(booking.checkOut)}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users size={16} className="mr-2 text-purple-500" />
                                                    <div>
                                                        <div className="font-medium">Guests</div>
                                                        <div>{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <DollarSign size={16} className="mr-2 text-amber-500" />
                                                    <div>
                                                        <div className="font-medium">Total</div>
                                                        <div className="font-semibold">
                                                            ${calculateTotal(
                                                                booking.offeringId.price,
                                                                booking.guests,
                                                                booking.checkIn,
                                                                booking.checkOut
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {booking.specialRequest && (
                                                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                                    <p className="text-sm text-blue-800">
                                                        <span className="font-semibold">Special Request:</span> {booking.specialRequest}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <div className="shrink-0">
                                            <button
                                                onClick={() => handleViewDetails(booking)}
                                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <Eye size={16} className="mr-2" />
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Booking Details Modal */}
            <UserBookingModal
                isOpen={showDetailsModal}
                onClose={handleCloseDetails}
                booking={selectedBooking}
                onCancelBooking={handleCancelBooking}
                cancelLoading={cancelLoading}
            />

            <Footer />
        </div>
    );
};

export default BookingsPage;