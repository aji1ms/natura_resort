export const OfferingShimmer = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="relative h-48 bg-gray-300" />

            <div className="p-5">
                <div className="h-6 bg-gray-300 rounded mb-3" />
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />

                <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                    <div className="h-6 bg-gray-200 rounded-full w-14" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <div className="h-8 bg-gray-300 rounded w-20 mb-1" />
                        <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                    <div className="h-10 bg-gray-300 rounded-full w-24" />
                </div>
            </div>
        </div>
    );
};

export const CategoryFilterShimmer = () => {
    return (
        <section className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-48 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="p-4 rounded-xl border-2 border-gray-200 bg-white">
                        <div className="mx-auto mb-2 w-8 h-8 bg-gray-300 rounded" />
                        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                    </div>
                ))}
            </div>
        </section>
    );
};