import express from "express";
import { createBooking, getUserBookings, getBookingDetails } from "../../controllers/user/bookingController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.post("/create", authenticateUser(['user'], 'userToken'), createBooking);
router.get("/", authenticateUser(['user'], 'userToken'), getUserBookings);
router.get("/:bookingId", authenticateUser(['user'], 'userToken'), getBookingDetails);

export default router; 