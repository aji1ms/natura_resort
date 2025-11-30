import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router';
import type { SideMenuItem } from '../../utils/Data';
import toast from 'react-hot-toast';
import { logoutAdmin } from '../../redux/slices/admin/adminAuthSlice';
import type { AppDispatch } from '../../redux/store';

interface SideMenuProps {
    menuData: SideMenuItem[];
    isFixed?: boolean;
}

const Sidemenu = ({ menuData, isFixed = false }: SideMenuProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = async (route: string) => {
        if (route === '/logout') {
            await handleLogout();
        } else {
            navigate(route);
        }
        setIsOpen(false);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutAdmin()).unwrap();
            toast.success('Logged out successfully!');
            navigate('/admin/login'); 
        } catch (error: any) {
            toast.error(error || 'Logout failed');
            dispatch({ type: 'adminAuth/adminLogout' });
            navigate('/admin/login');
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-[60] p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-gray-100 bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                bg-slate-100 border-r border-gray-200 shadow-sm ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed ${isFixed ? 'md:fixed' : 'md:relative'} top-0 left-0 h-screen z-50 md:z-40 w-80 md:w-80 transition-transform duration-300 ease-in-out overflow-y-auto`}>
                <div className="p-6 pt-20 md:pt-6">
                    <nav className="space-y-2 ">
                        {menuData.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            const isLogout = item.path === '/logout';

                            return (
                                <button
                                    onClick={() => handleClick(item.path)}
                                    key={item._id}
                                    className={`w-full flex items-center gap-4 text-sm font-medium cursor-pointer py-3 px-4 rounded-lg transition-all duration-200 ${isActive && !isLogout
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : isLogout
                                            ? 'text-red-600 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500'
                                            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className={`text-lg ${isActive && !isLogout
                                        ? 'text-white'
                                        : isLogout
                                            ? 'text-red-500 group-hover:text-white'
                                            : 'text-gray-500'
                                        }`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    )
};

export default Sidemenu;