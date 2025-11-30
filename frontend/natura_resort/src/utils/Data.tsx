import { User, LogOut, LayoutDashboard, TicketPercent, LayoutList, Bookmark } from 'lucide-react';

export interface SideMenuItem {
    _id: string;
    label: string;
    icon: React.ComponentType<any>;
    path: string;
}

export const SIDE_ADMIN_DATA: SideMenuItem[] = [
    {
        _id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin"
    },
    {
        _id: "02",
        label: "Users",
        icon: User,
        path: "/admin/users"
    },
    {
        _id: "03",
        label: "Category",
        icon: LayoutList,
        path: "/admin/category"
    },
    {
        _id: "04",
        label: "Offering",
        icon: TicketPercent,
        path: "/admin/offering"
    },
    {
        _id: "05",
        label: "Booking",
        icon: Bookmark,
        path: "/admin/booking"

    },
    {
        _id: "06",
        label: "Logout",
        icon: LogOut,
        path: "/logout"
    },
]