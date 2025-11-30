import { User, LogOut, TicketPercent, LayoutList, Bookmark } from 'lucide-react';

export interface SideMenuItem {
    _id: string;
    label: string;
    icon: React.ComponentType<any>;
    path: string;
}

export const SIDE_ADMIN_DATA: SideMenuItem[] = [
    {
        _id: "01",
        label: "Users",
        icon: User,
        path: "/admin/users"
    },
    {
        _id: "02",
        label: "Category",
        icon: LayoutList,
        path: "/admin/category"
    },
    {
        _id: "03",
        label: "Offering",
        icon: TicketPercent,
        path: "/admin/offering"
    },
    {
        _id: "04",
        label: "Booking",
        icon: Bookmark,
        path: "/admin/booking"

    },
    {
        _id: "05",
        label: "Logout",
        icon: LogOut,
        path: "/logout"
    },
]