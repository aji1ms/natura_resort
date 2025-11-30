import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ICategory {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface AdminCategoryState {
    categories: ICategory[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalCategories: number;
    modal: {
        isOpen: boolean;
        mode: 'create' | 'edit';
        selectedCategory: ICategory | null;
    };
    formData: {
        name: string;
        description: string;
    };
    formLoading: boolean;
    formError: string | null;
}

const initialState: AdminCategoryState = {
    categories: [],
    loading: false,
    error: null,
    searchQuery: "",
    totalCategories: 0,
    modal: {
        isOpen: false,
        mode: 'create',
        selectedCategory: null
    },
    formData: {
        name: "",
        description: ""
    },
    formLoading: false,
    formError: null
};

// Get All Categories

export const fetchCategories = createAsyncThunk(
    "adminCategory/fetchCategories",
    async (search: string, { rejectWithValue }) => {
        try {
            const params = search ? { search } : {};
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/category`,
                { params, withCredentials: true }
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
);

// Create Category

export const createCategory = createAsyncThunk(
    "adminCategory/createCategory",
    async (categoryData: { name: string; description: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/category/add`,
                categoryData,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create category");
        }
    }
);

// Update Category

export const updateCategory = createAsyncThunk(
    "adminCategory/updateCategory",
    async ({ id, categoryData }: { id: string; categoryData: { name: string; description: string } }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/category/edit/${id}`,
                categoryData,
                { withCredentials: true }
            );
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update category");
        }
    }
);

// Delete Category

export const deleteCategory = createAsyncThunk(
    "adminCategory/deleteCategory",
    async (categoryId: string, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/category/delete/${categoryId}`,
                { withCredentials: true }
            );
            return categoryId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete category");
        }
    }
);

const adminCategorySlice = createSlice({
    name: "adminCategory",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        openCreateModal: (state) => {
            state.modal.isOpen = true;
            state.modal.mode = 'create';
            state.modal.selectedCategory = null;
            state.formData = { name: "", description: "" };
            state.formError = null;
        },
        openEditModal: (state, action) => {
            state.modal.isOpen = true;
            state.modal.mode = 'edit';
            state.modal.selectedCategory = action.payload;
            state.formData = {
                name: action.payload.name,
                description: action.payload.description
            };
            state.formError = null;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
            state.modal.selectedCategory = null;
            state.formData = { name: "", description: "" };
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
            // Fetch Categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.data;
                state.totalCategories = action.payload.totalCategories;
                state.error = null;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.categories = [];
                state.totalCategories = 0;
            })
            // Create Category
            .addCase(createCategory.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.formLoading = false;
                state.categories.unshift(action.payload);
                state.totalCategories += 1;
                state.modal.isOpen = false;
                state.formData = { name: "", description: "" };
                state.formError = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload as string;
            })
            // Update Category
            .addCase(updateCategory.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.formLoading = false;
                const index = state.categories.findIndex(cat => cat._id === action.payload._id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
                state.modal.isOpen = false;
                state.formData = { name: "", description: "" };
                state.formError = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload as string;
            })
            // Delete Category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(cat => cat._id !== action.payload);
                state.totalCategories -= 1;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {
    setSearchQuery,
    openCreateModal,
    openEditModal,
    closeModal,
    setFormData,
    clearError
} = adminCategorySlice.actions;
export default adminCategorySlice.reducer;