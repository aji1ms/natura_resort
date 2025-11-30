import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../redux/store";

const UserProtectedRoutes: React.FC = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );

    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default UserProtectedRoutes;