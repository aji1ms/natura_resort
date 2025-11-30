import { DollarSign, ImageIcon, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { closeModal, setFormData, createOffering, updateOffering } from "../../redux/slices/admin/adminOfferingSlice";

const OfferingModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        modal,
        formData,
        formLoading,
        categories
    } = useSelector((state: RootState) => state.adminOffering);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({ [name]: value }));
    };

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            return;
        }
        if (!formData.category) {
            return;
        }
        if (!formData.description.trim()) {
            return;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            return;
        }
        if (!formData.image.trim()) {
            return;
        }

        const amenitiesArray = formData.amenities
            .split(",")
            .map(a => a.trim())
            .filter(a => a.length > 0);

        const submitData = {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            amenities: amenitiesArray,
            image: formData.image,
            price: parseFloat(formData.price)
        };

        if (modal.mode === "create") {
            dispatch(createOffering(submitData));
        } else if (modal.selectedOffering) {
            dispatch(updateOffering({
                id: modal.selectedOffering._id,
                offeringData: submitData
            }));
        }
    };

    const isFormValid = formData.name.trim() &&
        formData.category &&
        formData.description.trim() &&
        formData.price &&
        parseFloat(formData.price) > 0 &&
        formData.image.trim();

    return (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {modal.mode === "create" ? "Create New Offering" : "Edit Offering"}
                        </h2>
                        <button
                            onClick={handleClose}
                            disabled={formLoading}
                            className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* Modal Form */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Offering Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g., Deluxe Ocean View Suite"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                disabled={formLoading}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                disabled={formLoading}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe the offering..."
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none transition"
                                disabled={formLoading}
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price ($) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                    disabled={formLoading}
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Image URL <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                    disabled={formLoading}
                                />
                            </div>
                            {formData.image && (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="mt-2 w-full h-48 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                                    }}
                                />
                            )}
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Amenities (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="amenities"
                                value={formData.amenities}
                                onChange={handleInputChange}
                                placeholder="WiFi, AC, Mini Bar, Ocean View"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                disabled={formLoading}
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate each amenity with a comma</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                onClick={handleClose}
                                disabled={formLoading}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={formLoading || !isFormValid}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {formLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        {modal.mode === "create" ? "Creating..." : "Updating..."}
                                    </div>
                                ) : (
                                    modal.mode === "create" ? "Create Offering" : "Update Offering"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferingModal;