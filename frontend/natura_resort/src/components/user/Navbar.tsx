import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import type { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/slices/auth/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/login");
        } catch (err) {
            toast.error("Logout failed!");
        }
    };
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div onClick={() => navigate("/")} className="text-white text-2xl font-bold cursor-pointer">Natura Resort</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 text-white">
                        <Link to={"/services"} className="hover:text-amber-300 transition">Services</Link>
                        <Link to={"/gallery"} className="hover:text-amber-300 transition">Gallery</Link>
                        <Link to={"/availability"} className="hover:text-amber-300 transition">Book Now</Link>
                        <button
                            onClick={handleLogout}
                            className="hover:text-amber-300 transition text-red-500"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white rounded-lg shadow-lg py-4 mb-4">
                        <Link to={"/services"} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Services</Link>
                        <Link to={"/gallery"} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Gallery</Link>
                        <Link to={"/availability"} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Book Now</Link>
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
