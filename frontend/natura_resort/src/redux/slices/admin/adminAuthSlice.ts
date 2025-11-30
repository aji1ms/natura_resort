import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Admin {
    _id: string;
    name: string;
    email: string;
}

interface AdminAuthState {
    admin: Admin | null;
    loading: boolean;
    error: string | null;
}

const initialState: AdminAuthState = {
    admin: null,
    loading: true,
    error: null,
}

export const adminLogin = createAsyncThunk(
    "admin/login",
    async (credentials: { email: string, password: string }, { rejectWithValue }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
                credentials,
                { withCredentials: true }
            );

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/get`,
                { withCredentials: true }
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Admin login failed");
        }
    }
)

export const fetchAdmin = createAsyncThunk(
    "admin/fetchAdmin",
    async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/get`,
                { withCredentials: true }
            );
            return res.data.admin;
        } catch {
            return null;
        }
    }
);

export const logoutAdmin = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/logout`,
                {},
                { withCredentials: true }
            );

            console.log("Logout successful");
            return null;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLogout: (state) => {
            state.admin = null;
        },
        setAdmin: (state, action: PayloadAction<Admin | null>) => {
            state.admin = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload.admin;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Admin
            .addCase(fetchAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
            })
            .addCase(fetchAdmin.rejected, (state) => {
                state.loading = false;
                state.admin = null;
            })

            // Admin Logout
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.admin = null;
                state.error = null;
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { adminLogout, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;