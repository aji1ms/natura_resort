import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CategoryRef {
    _id: string;
    name: string;
    description: string;
}

export interface Offering {
    _id: string;
    name: string;
    category: CategoryRef;
    description: string;
    amenities: string[];
    image: string;
    price: number;
    createdAt?: string;
    updatedAt?: string;
}

interface OfferingsState {
    list: Offering[];
    selected: Offering | null;
    loading: boolean;
    error: string | null;
}

const initialState: OfferingsState = {
    list: [],
    selected: null,
    loading: false,
    error: null,
};


// Fetch all offerings 

export const fetchOfferings = createAsyncThunk
    <Offering[], { category?: string } | undefined, { rejectValue: string }>(
        "offerings/fetchAll",
        async (params, { rejectWithValue }) => {
            try {
                const query = params?.category ? `?category=${params.category}` : "";
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/auth/offering${query}`,
                    { withCredentials: true }
                );

                return res.data.data;
            } catch (err: any) {
                return rejectWithValue(err.response?.data?.message || "Failed to fetch offerings");
            }
        }
    );

// Fetch offering details by id

export const fetchOfferingDetails = createAsyncThunk(
    'auth/getOfferingDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/offering/${id}`,
                { withCredentials: true }
            );

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to load offering details");
        }
    }
)


const offeringSlice = createSlice({
    name: "offerings",
    initialState,
    reducers: {
        clearOfferingsError(state) {
            state.error = null;
        },
        setSelectedOffering(state, action: PayloadAction<Offering | null>) {
            state.selected = action.payload;
        },
    },
    extraReducers: (builder) => {
        // fetchOfferings
        builder.addCase(fetchOfferings.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOfferings.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(fetchOfferings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // fetchOfferingDetails
        builder.addCase(fetchOfferingDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.selected = null;
        });
        builder.addCase(fetchOfferingDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.selected = action.payload;
        });
        builder.addCase(fetchOfferingDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearOfferingsError, setSelectedOffering } = offeringSlice.actions;
export default offeringSlice.reducer;

