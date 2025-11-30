import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../../components/admin/Sidemenu";
import { SIDE_ADMIN_DATA } from "../../utils/Data";
import { Plus, Edit2, Trash2, Package, Search, DollarSign, Tag } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDebounce } from "../../hooks/useDebounce";
import { deleteOffering, fetchCategories, fetchOfferings, openCreateModal, openEditModal, setFilterCategory, setSearchQuery } from "../../redux/slices/admin/adminOfferingSlice";
import OfferingModal from "../../components/modal/OfferingModal";

const AdminOffering: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        offerings,
        categories,
        loading,
        searchQuery,
        filterCategory,
        totalOfferings,
        modal
    } = useSelector((state: RootState) => state.adminOffering);

    const [localSearch, setLocalSearch] = useState("");
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchOfferings({
            search: debouncedSearch,
            category: filterCategory !== "all" ? filterCategory : undefined
        }));
    }, [dispatch, debouncedSearch, filterCategory]);

    useEffect(() => {
        dispatch(setSearchQuery(debouncedSearch));
    }, [dispatch, debouncedSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };

    const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilterCategory(e.target.value));
    };

    const handleCreate = () => {
        dispatch(openCreateModal());
    };

    const handleEdit = (offering: any) => {
        dispatch(openEditModal(offering));
    };

    const handleDelete = (offering: any) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${offering.name}"? This action cannot be undone.`
        );
        if (confirmDelete) {
            dispatch(deleteOffering(offering._id));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />

            <main className="flex-1 p-6 md:ml-80 w-full">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Offerings Management</h1>
                        <p className="text-gray-600">Create and manage resort offerings</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
                    >
                        <Plus size={20} />
                        <span>Add Offering</span>
                    </button>
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Offerings"
                        value={totalOfferings}
                        icon={<Package className="text-blue-600" size={28} />}
                    />
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search offerings..."
                                value={localSearch}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <select
                            value={filterCategory}
                            onChange={handleCategoryFilterChange}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Offerings Table */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Offering
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Amenities
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {offerings.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <Package className="mx-auto text-gray-400 mb-4" size={48} />
                                                <p className="text-gray-500 text-lg font-semibold mb-1">
                                                    {searchQuery || filterCategory !== "all" ? "No offerings found" : "No offerings available"}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    {searchQuery || filterCategory !== "all" ? "Try adjusting your search" : "Create your first offering to get started"}
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        offerings.map((offering) => (
                                            <tr key={offering._id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={offering.image}
                                                            alt={offering.name}
                                                            className="w-16 h-16 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{offering.name}</p>
                                                            <p className="text-sm text-gray-500 line-clamp-1">{offering.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                        <Tag size={14} />
                                                        <span>{offering.category.name}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-1 text-gray-900 font-semibold">
                                                        <DollarSign size={18} />
                                                        <span>{offering.price}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {offering.amenities.slice(0, 2).map((amenity, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                                            >
                                                                {amenity}
                                                            </span>
                                                        ))}
                                                        {offering.amenities.length > 2 && (
                                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                                +{offering.amenities.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(offering)}
                                                            className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition"
                                                            title="Edit offering"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(offering)}
                                                            className="p-2 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-lg transition"
                                                            title="Delete offering"
                                                        >
                                                            <Trash2 size={18} />
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
                )}

                {/* Offering Modal */}
                {modal.isOpen && <OfferingModal />}
            </main>
        </div>
    );
};

export default AdminOffering;