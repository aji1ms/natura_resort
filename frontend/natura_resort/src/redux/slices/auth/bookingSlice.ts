import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
    _id: string;
    name: string;
    description?: string;
}

interface Offering {
    _id: string;
    name: string;
    category: Category;
    description: string;
    amenities: string[];
    image: string;
    price: number;
}

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

interface Booking {
    _id: string;
    userId: User;
    offeringId: Offering;
    name: string;
    phone: string;
    email: string;
    guests: number;
    checkIn: string;
    checkOut: string;
    specialRequest: string;
    totalPrice?: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

interface BookingState {
    bookings: Booking[];
    currentBooking: Booking | null;
    loading: boolean;
    error: string | null;
    createLoading: boolean;
    createError: string | null;
}

const initialState: BookingState = {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
};

// Create Booking

export const createBooking = createAsyncThunk(
    "booking/createBooking",
    async (bookingData: {
        offeringId: string;
        name: string;
        phone: string;
        email: string;
        guests: number;
        checkIn: string;
        checkOut: string;
        specialRequest?: string;
    }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/booking/create`,
                bookingData,
                { withCredentials: true }
            );

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create booking");
        }
    }
);

// Get User Bookings

export const fetchUserBookings = createAsyncThunk(
    "booking/fetchUserBookings",
    async (status: string, { rejectWithValue }) => {
        try {
            const params = status ? { status } : {};
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/booking`,
                { params, withCredentials: true }
            );

            console.log(res.data)
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
        }
    }
);

// Get Booking Details

export const fetchBookingDetails = createAsyncThunk(
    "booking/fetchBookingDetails",
    async (bookingId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/booking/${bookingId}`,
                { withCredentials: true }
            );

            console.log(res.data)
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch booking details");
        }
    }
);

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.createError = null;
        },
        clearCurrentBooking: (state) => {
            state.currentBooking = null;
        },
        clearBookings: (state) => {
            state.bookings = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Booking
            .addCase(createBooking.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.createLoading = false;
                state.bookings.unshift(action.payload);
                state.createError = null;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.payload as string;
            })

            // Fetch User Bookings
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
                state.error = null;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.bookings = [];
            })

            // Fetch Booking Details
            .addCase(fetchBookingDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBooking = action.payload;
                state.error = null;
            })
            .addCase(fetchBookingDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.currentBooking = null;
            });
    },
});

export const {
    clearError,
    clearCurrentBooking,
    clearBookings
} = bookingSlice.actions;
export default bookingSlice.reducer;