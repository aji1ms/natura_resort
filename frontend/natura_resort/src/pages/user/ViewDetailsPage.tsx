import React, { useEffect, useState } from "react";
import { ArrowLeft, DollarSign } from "lucide-react";
import Footer from "../../components/user/Footer";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchOfferingDetails } from "../../redux/slices/auth/offeringSlice";
import BookingModal from "../../components/modal/BookingModal";
import { AmenitiesShimmer, BackButtonShimmer, BookingCardShimmer, DescriptionShimmer, ImageShimmer, TitleSectionShimmer } from "../../components/shimmer/OfferingDetailShimmer";

const ViewDetailsPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { selected, loading } = useSelector((state: RootState) => state.offering);
    const [showBookingModal, setShowBookingModal] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchOfferingDetails(id));
        }
    }, [dispatch, id]);

    const handleOpenBooking = () => {
        setShowBookingModal(true);
    };

    const handleCloseBooking = () => {
        setShowBookingModal(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <BackButtonShimmer />

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <ImageShimmer />
                            <TitleSectionShimmer />
                            <DescriptionShimmer />
                            <AmenitiesShimmer />
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <BookingCardShimmer />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
    
    if (!selected) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-500 text-lg">Offering not found.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

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
                                    src={selected.image}
                                    alt={selected.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Title and Category */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full mb-4">
                                <span className="text-sm font-semibold text-blue-600">
                                    {selected?.category?.name}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {selected.name}
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {selected.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                            <div className="flex flex-wrap gap-2">
                                {selected.amenities?.map((amenity, index) => (
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
                                        {selected.price}
                                    </span>
                                    <span className="text-gray-600">
                                        {selected?.category?.name === "Accommodation" ? "/ night" : "/ person"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Best price guarantee
                                </p>
                            </div>

                            <button
                                onClick={handleOpenBooking}
                                className="w-full bg-amber-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition transform hover:scale-105 shadow-lg mb-4"
                            >
                                Book Now
                            </button>

                            <p className="text-center text-sm text-gray-600">
                                Free cancellation up to 24 hours before check-in
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Booking Modal */}
            <BookingModal
                isOpen={showBookingModal}
                onClose={handleCloseBooking}
                offeringId={selected._id}
                offeringName={selected.name}
                offeringPrice={selected.price}
            />

            <Footer />
        </div>
    );
};

export default ViewDetailsPage;