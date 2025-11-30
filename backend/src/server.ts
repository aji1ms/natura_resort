import express from "express";
import cors from "cors";
require("dotenv").config();
import cookieParser from "cookie-parser";
const connectDB = require("./config/db");
import authRoute from "./routes/user/userRoutes";
import userOfferingRoute from "./routes/user/offeringRoutes";
import bookingRoute from "./routes/user/bookingRoutes";
import adminRoute from "./routes/admin/adminRoutes";
import adminUserRoute from "./routes/admin/userRoutes";
import categoryRoute from "./routes/admin/categoryRoutes";
import offeringRoute from "./routes/admin/offeringRoutes";
import adminBookingRoute from "./routes/admin/adminBookingRoutes";

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:5173',
        "https://natura-resort.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// Auth Routes

app.use("/api/auth", authRoute);
app.use("/api/auth/offering", userOfferingRoute);
app.use("/api/auth/booking", bookingRoute);

// Admin Routes

app.use("/api/admin", adminRoute);
app.use("/api/admin/user", adminUserRoute);
app.use("/api/admin/category", categoryRoute);
app.use("/api/admin/offering", offeringRoute);
app.use("/api/admin/booking", adminBookingRoute);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log("server running..."));