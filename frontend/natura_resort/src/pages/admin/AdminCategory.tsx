import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../../components/admin/Sidemenu";
import { SIDE_ADMIN_DATA } from "../../utils/Data";
import { Plus, Edit2, Trash2, Tag, Search } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDebounce } from "../../hooks/useDebounce";
import { deleteCategory, fetchCategories, openCreateModal, openEditModal } from "../../redux/slices/admin/adminCategorySlice";
import { setSearchQuery } from "../../redux/slices/admin/adminUserSlice";
import CategoryModal from "../../components/modal/CategoryModal";
import toast from "react-hot-toast";

const AdminCategory: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        categories,
        loading,
        searchQuery,
        totalCategories,
        modal
    } = useSelector((state: RootState) => state.adminCategory);

    const [localSearch, setLocalSearch] = useState("");
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
        dispatch(fetchCategories(debouncedSearch));
    }, [dispatch, debouncedSearch]);

    useEffect(() => {
        dispatch(setSearchQuery(debouncedSearch));
    }, [dispatch, debouncedSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };

    const handleCreate = () => {
        dispatch(openCreateModal());
    };

    const handleEdit = (category: any) => {
        dispatch(openEditModal(category));
    };

    const handleDelete = async (category: any) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${category.name}"? This action cannot be undone.`
        );
        if (confirmDelete) {
            await dispatch(deleteCategory(category._id));
            toast.success("Category deleted!")
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />

            <main className="flex-1 p-6 md:ml-80 w-full">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories Management</h1>
                        <p className="text-gray-600">Create and manage service categories</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
                    >
                        <Plus size={20} />
                        <span>Add Category</span>
                    </button>
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Categories"
                        value={totalCategories}
                        icon={<Tag className="text-blue-600" size={28} />}
                    />
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={localSearch}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.length === 0 ? (
                            <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                                <Tag className="mx-auto text-gray-400 mb-4" size={48} />
                                <p className="text-gray-500 text-lg font-semibold mb-1">
                                    {searchQuery ? "No categories found" : "No categories available"}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {searchQuery ? "Try adjusting your search" : "Create your first category to get started"}
                                </p>
                            </div>
                        ) : (
                            categories.map((category) => (
                                <div
                                    key={category._id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="bg-blue-100 p-3 rounded-lg">
                                                <Tag className="text-blue-600" size={24} />
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition"
                                                    title="Edit category"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category)}
                                                    className="p-2 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-lg transition"
                                                    title="Delete category"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {category.name}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {category.description || "No description provided"}
                                        </p>

                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>Created: {formatDate(category.createdAt)}</span>
                                                <span>Updated: {formatDate(category.updatedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Category Modal */}
                {modal.isOpen && <CategoryModal />}
            </main>
        </div>
    );
};

export default AdminCategory;