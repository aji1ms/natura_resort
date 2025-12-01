import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    createdAt: string;
}

interface AdminUsersState {
    users: IUser[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalUsers: number;
    stats: {
        total: number;
        admins: number;
        regularUsers: number;
    };
}

const initialState: AdminUsersState = {
    users: [],
    loading: false,
    error: null,
    searchQuery: "",
    totalUsers: 0,
    stats: {
        total: 0,
        admins: 0,
        regularUsers: 0
    }
};

// Get All Users

export const fetchUsers = createAsyncThunk(
    "adminUsers/fetchUsers",
    async (search: string, { rejectWithValue }) => {
        try {
            const params = search ? { search } : {};
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`,
                { params, withCredentials: true }
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);

const adminUsersSlice = createSlice({
    name: "adminUsers",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearUsers: (state) => {
            state.users = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.totalUsers = action.payload.totalUsers;

                const admins = action.payload.data.filter((user: IUser) => user.isAdmin).length;
                const regularUsers = action.payload.data.filter((user: IUser) => !user.isAdmin).length;

                state.stats = {
                    total: action.payload.totalUsers,
                    admins,
                    regularUsers
                };

                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.users = [];
                state.stats = {
                    total: 0,
                    admins: 0,
                    regularUsers: 0
                };
            });
    },
});

export const {
    setSearchQuery,
    clearError,
    clearUsers
} = adminUsersSlice.actions;
export default adminUsersSlice.reducer;