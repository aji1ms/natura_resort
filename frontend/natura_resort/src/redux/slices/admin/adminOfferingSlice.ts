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
    createdAt: string;
    updatedAt: string;
}

interface AdminOfferingState {
    offerings: IOffering[];
    categories: ICategory[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    filterCategory: string;
    totalOfferings: number;
    modal: {
        isOpen: boolean;
        mode: 'create' | 'edit';
        selectedOffering: IOffering | null;
    };
    formData: {
        name: string;
        category: string;
        description: string;
        amenities: string;
        image: string;
        price: string;
    };
    formLoading: boolean;
    formError: string | null;
}

const initialState: AdminOfferingState = {
    offerings: [],
    categories: [],
    loading: false,
    error: null,
    searchQuery: "",
    filterCategory: "all",
    totalOfferings: 0,
    modal: {
        isOpen: false,
        mode: 'create',
        selectedOffering: null
    },
    formData: {
        name: "",
        category: "",
        description: "",
        amenities: "",
        image: "",
        price: ""
    },
    formLoading: false,
    formError: null
};

// Get All Offerings

export const fetchOfferings = createAsyncThunk(
    "adminOffering/fetchOfferings",
    async ({ search, category }: { search?: string; category?: string }, { rejectWithValue }) => {
        try {
            const params: any = {};
            if (search) params.search = search;
            if (category && category !== "all") params.category = category;

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/offering/get`,
                { params, withCredentials: true }
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch offerings");
        }
    }
);

// Get Categories 

export const fetchCategories = createAsyncThunk(
    "adminOffering/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/category`,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
);

// Create Offering

export const createOffering = createAsyncThunk(
    "adminOffering/createOffering",
    async (offeringData: {
        name: string;
        category: string;
        description: string;
        amenities: string[];
        image: string;
        price: number;
    }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/offering/add`,
                offeringData,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create offering");
        }
    }
);

// Update Offering

export const updateOffering = createAsyncThunk(
    "adminOffering/updateOffering",
    async ({ id, offeringData }: {
        id: string;
        offeringData: {
            name: string;
            category: string;
            description: string;
            amenities: string[];
            image: string;
            price: number;
        }
    }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/offering/edit/${id}`,
                offeringData,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update offering");
        }
    }
);

// Delete Offering

export const deleteOffering = createAsyncThunk(
    "adminOffering/deleteOffering",
    async (offeringId: string, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/offering/delete/${offeringId}`,
                { withCredentials: true }
            );
            return offeringId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete offering");
        }
    }
);

const adminOfferingSlice = createSlice({
    name: "adminOffering",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload;
        },
        openCreateModal: (state) => {
            state.modal.isOpen = true;
            state.modal.mode = 'create';
            state.modal.selectedOffering = null;
            state.formData = {
                name: "",
                category: "",
                description: "",
                amenities: "",
                image: "",
                price: ""
            };
            state.formError = null;
        },
        openEditModal: (state, action) => {
            state.modal.isOpen = true;
            state.modal.mode = 'edit';
            state.modal.selectedOffering = action.payload;
            state.formData = {
                name: action.payload.name,
                category: action.payload.category._id,
                description: action.payload.description,
                amenities: action.payload.amenities.join(", "),
                image: action.payload.image,
                price: action.payload.price.toString()
            };
            state.formError = null;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
            state.modal.selectedOffering = null;
            state.formData = {
                name: "",
                category: "",
                description: "",
                amenities: "",
                image: "",
                price: ""
            };
            state.formError = null;
        },
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        clearError: (state) => {
            state.error = null;
            state.formError = null;
        }
    },
    extraReducers: (builder) => {
        builder

            // Fetch Offerings
            .addCase(fetchOfferings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOfferings.fulfilled, (state, action) => {
                state.loading = false;
                state.offerings = action.payload.data;
                state.totalOfferings = action.payload.data.length;
                state.error = null;
            })
            .addCase(fetchOfferings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.offerings = [];
                state.totalOfferings = 0;
            })

            // Fetch Categories
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })

            // Create Offering
            .addCase(createOffering.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(createOffering.fulfilled, (state, action) => {
                state.formLoading = false;
                state.offerings.unshift(action.payload);
                state.totalOfferings += 1;
                state.modal.isOpen = false;
                state.formData = {
                    name: "",
                    category: "",
                    description: "",
                    amenities: "",
                    image: "",
                    price: ""
                };
                state.formError = null;
            })
            .addCase(createOffering.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload as string;
            })

            // Update Offering
            .addCase(updateOffering.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(updateOffering.fulfilled, (state, action) => {
                state.formLoading = false;
                const index = state.offerings.findIndex(offering => offering._id === action.payload._id);
                if (index !== -1) {
                    state.offerings[index] = action.payload;
                }
                state.modal.isOpen = false;
                state.formData = {
                    name: "",
                    category: "",
                    description: "",
                    amenities: "",
                    image: "",
                    price: ""
                };
                state.formError = null;
            })
            .addCase(updateOffering.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload as string;
            })

            // Delete Offering
            .addCase(deleteOffering.fulfilled, (state, action) => {
                state.offerings = state.offerings.filter(offering => offering._id !== action.payload);
                state.totalOfferings -= 1;
            })
            .addCase(deleteOffering.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {
    setSearchQuery,
    setFilterCategory,
    openCreateModal,
    openEditModal,
    closeModal,
    setFormData,
    clearError
} = adminOfferingSlice.actions;
export default adminOfferingSlice.reducer;