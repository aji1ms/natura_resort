import { BrowserRouter, Route, Routes } from "react-router"
import SignupPage from "./pages/user/SignupPage"
import LoginPage from "./pages/user/LoginPage"
import Home from "./pages/user/Home"
import AvailabilityPage from "./pages/user/Availabilities"
import ServicesPage from "./pages/user/ServicesPage"
import GalleryPage from "./pages/user/GalleryPage"
import ViewDetailsPage from "./pages/user/ViewDetailsPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/availability/:id" element={<ViewDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
