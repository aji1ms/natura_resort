import { BrowserRouter, Route, Routes } from "react-router"
import SignupPage from "./pages/user/SignupPage"
import LoginPage from "./pages/user/LoginPage"
import Home from "./pages/user/Home"
import AvailabilityPage from "./pages/user/Availabilities"
import ServicesPage from "./pages/user/ServicesPage"
import GalleryPage from "./pages/user/GalleryPage"
import ViewDetailsPage from "./pages/user/ViewDetailsPage"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./redux/store"
import { useEffect } from "react"
import { fetchUser } from "./redux/slices/auth/authSlice"
import { Toaster } from "react-hot-toast"
import UserProtectedRoutes from "./helper/UserProtectedRoute"
import AdminProtectedRoute from "./helper/AdminProtectedRoute"
import AdminLogin from "./pages/admin/AdminLogin"
import Dashboard from "./pages/admin/Dashboard"
import { fetchAdmin } from "./redux/slices/admin/adminAuthSlice"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminCategory from "./pages/admin/AdminCategory"
import AdminOffering from "./pages/admin/AdminOffering"
import AdminBooking from "./pages/admin/AdminBooking"

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAdmin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<UserProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/availability" element={<AvailabilityPage />} />
          <Route path="/availability/:id" element={<ViewDetailsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>

        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="category" element={<AdminCategory />} />
          <Route path="offering" element={<AdminOffering />} />
          <Route path="booking" element={<AdminBooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
