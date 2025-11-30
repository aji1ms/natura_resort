import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../../components/admin/Sidemenu";
import { SIDE_ADMIN_DATA } from "../../utils/Data";
import { Search, Users, Mail, Phone, Shield, User, Calendar } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchUsers, setSearchQuery } from "../../redux/slices/admin/adminUserSlice";

const AdminUsers: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        users,
        loading,
        searchQuery,
        stats
    } = useSelector((state: RootState) => state.adminUser);

    const [localSearch, setLocalSearch] = useState("");
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
        dispatch(fetchUsers(debouncedSearch));
    }, [dispatch, debouncedSearch]);

    useEffect(() => {
        dispatch(setSearchQuery(debouncedSearch));
    }, [dispatch, debouncedSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
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

            <main className="flex-1 p-8 ml-64 md:ml-80">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
                    <p className="text-gray-600">View and manage all registered users</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Users"
                        value={stats.total}
                        icon={<Users className="text-blue-600" size={28} />}
                    />
                    <StatsCard
                        title="Admins"
                        value={stats.admins}
                        icon={<Shield className="text-purple-600" size={28} />}
                    />
                    <StatsCard
                        title="Regular Users"
                        value={stats.regularUsers}
                        icon={<User className="text-green-600" size={28} />}
                    />
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="grid">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={localSearch}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Joined Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <Users className="mx-auto text-gray-400 mb-4" size={48} />
                                                <p className="text-gray-500 text-lg font-semibold mb-1">
                                                    {searchQuery ? "No users found" : "No users available"}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    {searchQuery ? "Try adjusting your search" : "Users will appear here once registered"}
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{user.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2 text-gray-700">
                                                        <Mail size={16} className="text-gray-400" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2 text-gray-700">
                                                        <Phone size={16} className="text-gray-400" />
                                                        <span>{user.phone}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.isAdmin ? (
                                                        <span className="inline-flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                            <Shield size={14} />
                                                            <span>Admin</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                            <User size={14} />
                                                            <span>User</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2 text-gray-700">
                                                        <Calendar size={16} className="text-gray-400" />
                                                        <span>{formatDate(user.createdAt)}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminUsers;