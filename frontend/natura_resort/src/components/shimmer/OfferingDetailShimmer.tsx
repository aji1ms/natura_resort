export const ImageShimmer = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="relative h-96 bg-gray-300" />
        </div>
    );
};

export const TitleSectionShimmer = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="inline-flex bg-gray-200 px-4 py-2 rounded-full mb-4 w-32 h-6" />
            <div className="h-10 bg-gray-300 rounded mb-4 w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
        </div>
    );
};

export const DescriptionShimmer: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-48" />
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
        </div>
    );
};

export const AmenitiesShimmer = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-40" />
            <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 px-4 py-2 rounded-full w-20 h-8"
                    />
                ))}
            </div>
        </div>
    );
};

export const BookingCardShimmer = () => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24 animate-pulse">
            <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                    <div className="w-7 h-7 bg-gray-300 rounded" />
                    <div className="h-10 bg-gray-300 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-32" />
            </div>

            <div className="w-full bg-gray-300 py-4 rounded-lg mb-4 h-14" />

            <div className="h-4 bg-gray-200 rounded w-64 mx-auto" />
        </div>
    );
};

export const BackButtonShimmer = () => {
    return (
        <div className="flex items-center mb-6 animate-pulse">
            <div className="w-5 h-5 bg-gray-300 rounded mr-2" />
            <div className="h-6 bg-gray-300 rounded w-32" />
        </div>
    );
};