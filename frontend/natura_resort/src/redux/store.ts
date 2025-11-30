import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/admin/adminAuthSlice";
import adminUserReducer from "./slices/admin/adminUserSlice";
import adminCategoryReducer from "./slices/admin/adminCategorySlice";
import adminOfferingReducer from "./slices/admin/adminOfferingSlice";
import adminBookingReducer from "./slices/admin/adminBookingSlice";
import authReducer from "./slices/auth/authSlice";
import OfferingSlice from "./slices/auth/offeringSlice";
import bookingSlice from "./slices/auth/bookingSlice";

const store = configureStore({
    reducer: {
        // Admin
        adminAuth: adminAuthReducer,
        adminUser: adminUserReducer,
        adminCategory: adminCategoryReducer,
        adminOffering: adminOfferingReducer,
        adminBooking: adminBookingReducer,

        // Auth
        auth: authReducer,
        offering: OfferingSlice,
        booking: bookingSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;