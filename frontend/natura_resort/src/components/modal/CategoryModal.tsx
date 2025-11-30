import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { closeModal, createCategory, setFormData, updateCategory } from "../../redux/slices/admin/adminCategorySlice";
import toast from "react-hot-toast";

const CategoryModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        modal,
        formData,
        formLoading,
    } = useSelector((state: RootState) => state.adminCategory);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({ [name]: value }));
    };

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            return;
        }

        if (modal.mode === "create") {
            await dispatch(createCategory(formData));
            toast.success("Category created successfully!")
        } else if (modal.selectedCategory) {
            await dispatch(updateCategory({
                id: modal.selectedCategory._id,
                categoryData: formData
            }));
            toast.success("Category Edited!")
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-2xl max-w-2xl w-full">
                <div className="p-6">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {modal.mode === "create" ? "Create New Category" : "Edit Category"}
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
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g., Accommodation, Adventure, Wellness"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                disabled={formLoading}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Brief description of this category..."
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none transition"
                                disabled={formLoading}
                            />
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
                                disabled={formLoading || !formData.name.trim()}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {formLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        {modal.mode === "create" ? "Creating..." : "Updating..."}
                                    </div>
                                ) : (
                                    modal.mode === "create" ? "Create Category" : "Update Category"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;