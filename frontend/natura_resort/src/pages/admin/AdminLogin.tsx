import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { validateEmail, validatePassword } from "../../utils/helper";
import toast from "react-hot-toast";
import { adminLogin } from "../../redux/slices/admin/adminAuthSlice";

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, admin } = useSelector((state: RootState) => state.adminAuth);

    useEffect(() => {
        if (admin) {
            navigate("/admin/users");
        }
    }, [admin, navigate])

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [err, setError] = useState<string>("");

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("please enter a valid email address");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters with letters and numbers");
            return;
        }

        await dispatch(adminLogin({ email, password })).unwrap();
        toast.success("Login successfull!", { duration: 2000 });
        setError("")
    };

    return (
        <div className="min-h-screen bg-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Login</h1>
                    <p className="text-gray-600">Sign in to your Natura Resort account</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={({ target }) => setEmail(target.value)}
                                    placeholder="john@example.com"
                                    className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition border-gray-200 focus:border-amber-500 focus:ring-amber-200"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-gray-400 hover:text-gray-600" size={20} />
                                    ) : (
                                        <Eye className="text-gray-400 hover:text-gray-600" size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {err && (
                            <p className="text-red-500 text-sm mt-1">{err}</p>
                        )}

                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            type="button"
                            disabled={loading}
                            className={`w-full bg-amber-500 text-white py-3 rounded-lg font-bold text-lg transition transform shadow-lg ${loading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:from-amber-600 hover:to-orange-600 hover:scale-105"
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;