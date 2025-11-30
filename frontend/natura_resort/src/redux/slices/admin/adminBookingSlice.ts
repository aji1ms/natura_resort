import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ICategory {
    _id: string;
    name: string;
}

interface IOffering {
    _id: string;
    name: string;
    category: ICategory;
    description: string;
    amenities: string[];
    image: string;
    price: number;
}

interface IBooking {
    _id: string;
    userId?: {
        _id: string;
        name: string;
        email: string;
    };
    offeringId: IOffering;
    name: string;
    phone: string;
    email: string;
    guests: number;
    checkIn: string;
    checkOut: string;
    specialRequest: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

interface AdminBookingState {
    bookings: IBooking[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    statusFilter: string;
    totalBookings: number;
    modal: {
        isOpen: boolean;
        selectedBooking: IBooking | null;
    };
    formLoading: boolean;
    formError: string | null;
}

const initialState: AdminBookingState = {
    bookings: [],
    loading: false,
    error: null,
    searchQuery: "",
    statusFilter: "all",
    totalBookings: 0,
    modal: {
        isOpen: false,
        selectedBooking: null
    },
    formLoading: false,
    formError: null
};

// Get All Bookings

export const fetchBookings = createAsyncThunk(
    "adminBooking/fetchBookings",
    async ({ search, status }: { search?: string; status?: string }, { rejectWithValue }) => {
        try {
            const params: any = {};
            if (search) params.search = search;
            if (status && status !== 'all') params.status = status;

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/booking`,
                { params, withCredentials: true }
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
        }
    }
);

// Get Booking by ID

export const fetchBookingById = createAsyncThunk(
    "adminBooking/fetchBookingById",
    async (bookingId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/booking/${bookingId}`,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch booking");
        }
    }
);

// Update Booking Status

export const updateBookingStatus = createAsyncThunk(
    "adminBooking/updateBookingStatus",
    async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/booking/edit/${id}`,
                { status },
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update booking status");
        }
    }
);

const adminBookingSlice = createSlice({
    name: "adminBooking",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setStatusFilter: (state, action) => {
            state.statusFilter = action.payload;
        },
        openBookingModal: (state, action) => {
            state.modal.isOpen = true;
            state.modal.selectedBooking = action.payload;
        },
        closeBookingModal: (state) => {
            state.modal.isOpen = false;
            state.modal.selectedBooking = null;
        },
        clearError: (state) => {
            state.error = null;
            state.formError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Bookings
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload.data;
                state.totalBookings = action.payload.count;
                state.error = null;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.bookings = [];
                state.totalBookings = 0;
            })

            // Fetch Booking by ID
            .addCase(fetchBookingById.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.formLoading = false;
                state.modal.selectedBooking = action.payload;
                state.formError = null;
            })
            .addCase(fetchBookingById.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload as string;
            })

            // Update Booking Status
            .addCase(updateBookingStatus.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(updateBookingStatus.fulfilled, (state, action) => {
                state.formLoading = false;
                const index = state.bookings.findIndex(booking => booking._id === action.payload._id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
                if (state.modal.selectedBooking && state.modal.selectedBooking._id === action.payload._id) {
                    state.modal.selectedBooking = action.payload;
                }
                state.formError = null;
            })
            .addCase(updateBookingStatus.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload as string;
            });
    },
});

export const {
    setSearchQuery,
    setStatusFilter,
    openBookingModal,
    closeBookingModal,
    clearError
} = adminBookingSlice.actions;
export default adminBookingSlice.reducer;