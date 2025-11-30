import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchBookings,
    setSearchQuery,
    setStatusFilter,
    updateBookingStatus,
    openBookingModal,
    fetchBookingById,
    closeBookingModal
} from '../../redux/slices/admin/adminBookingSlice';
import BookingDetailsModal from '../../components/modal/BookingDetailsModal';
import type { AppDispatch, RootState } from '../../redux/store';
import { SIDE_ADMIN_DATA } from '../../utils/Data';
import Sidemenu from '../../components/admin/Sidemenu';
import { useDebounce } from '../../hooks/useDebounce';
import toast from 'react-hot-toast';
import StatsCard from '../../components/admin/StatsCard';
import { Ticket } from 'lucide-react';

const BookingList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        bookings,
        loading,
        searchQuery,
        statusFilter,
        modal,
        formLoading
    } = useSelector((state: RootState) => state.adminBooking);

    const [localSearch, setLocalSearch] = useState(searchQuery);
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
        dispatch(setSearchQuery(debouncedSearch));
    }, [debouncedSearch, dispatch]);

    useEffect(() => {
        dispatch(fetchBookings({ search: searchQuery, status: statusFilter }));
    }, [dispatch, searchQuery, statusFilter]);

    const handleStatusChange = async (bookingId: string, newStatus: string) => {
        try {
            await dispatch(updateBookingStatus({ id: bookingId, status: newStatus })).unwrap();
        } catch (error) {
            toast.error('Failed to update status!');
        }
    };

    const handleViewDetails = async (bookingId: string) => {
        try {
            await dispatch(fetchBookingById(bookingId)).unwrap();
            const booking = bookings.find(b => b._id === bookingId);
            if (booking) {
                dispatch(openBookingModal(booking));
            }
        } catch (error) {
            toast.error('Failed to fetch booking details!');
        }
    };

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidemenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
                <main className="flex-1 p-8 md:ml-80 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </main>
            </div>
        );
    }

    const totalPending = bookings.filter(item => item.status === 'pending')
    const totalCancelled = bookings.filter(item => item.status === 'cancelled')
    const totalConfirmed = bookings.filter(item => item.status === 'confirmed')

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidemenu menuData={SIDE_ADMIN_DATA} isFixed={true} />

            <main className="flex-1 p-6 md:ml-80 w-full">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Booking Management
                    </h1>
                    <p className="text-gray-600">
                        Manage all bookings and their status
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Booking"
                        value={bookings.length}
                        icon={<Ticket className="text-blue-600" size={28} />}
                    />
                    <StatsCard
                        title="Pending"
                        value={totalPending.length}
                        icon={<Ticket className="text-yellow-600" size={28} />}
                    />
                    <StatsCard
                        title="Cancelled"
                        value={totalCancelled.length}
                        icon={<Ticket className="text-red-600" size={28} />}
                    />
                    <StatsCard
                        title="Confirmed"
                        value={totalConfirmed.length}
                        icon={<Ticket className="text-green-600" size={28} />}
                    />
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Search Input */}
                        <div className="lg:col-span-2">
                            <label
                                htmlFor="search"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Search by Offering Name
                            </label>
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    id="search"
                                    value={localSearch}
                                    onChange={(e) => setLocalSearch(e.target.value)}
                                    placeholder="Enter offering name..."
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                />
                                {localSearch && (
                                    <button
                                        onClick={() => setLocalSearch('')}
                                        className="bg-gray-500 text-white px-4 py-2.5 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Filter by Status
                            </label>
                            <select
                                id="status"
                                value={statusFilter}
                                onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Booking Details
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Offering
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Guest Info
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Dates
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            <div className="flex flex-col items-center">
                                                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <p className="text-lg font-medium text-gray-900 mb-1">
                                                    No bookings found
                                                </p>
                                                <p className="text-gray-500">
                                                    {searchQuery || statusFilter !== 'all'
                                                        ? 'Try adjusting your search or filter criteria'
                                                        : 'No bookings have been made yet'
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr
                                            key={booking._id}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    #{booking._id.slice(-8)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {formatDate(booking.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {booking.offeringId.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ${booking.offeringId.price} • {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {booking.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {booking.email}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {booking.phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {formatDate(booking.checkIn)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {formatDate(booking.checkOut)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <select
                                                        value={booking.status}
                                                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                                        disabled={formLoading}
                                                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleViewDetails(booking._id)}
                                                        disabled={formLoading}
                                                        className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Booking Details Modal */}
                {modal.isOpen && modal.selectedBooking && (
                    <BookingDetailsModal
                        booking={modal.selectedBooking}
                        onClose={() => dispatch(closeBookingModal())}
                        loading={formLoading}
                    />
                )}
            </main>
        </div>
    );
};

export default BookingList;