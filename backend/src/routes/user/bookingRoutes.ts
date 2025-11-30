import express from "express";
import { createBooking, getUserBookings, getBookingDetails, cancelBooking } from "../../controllers/user/bookingController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.post("/create", authenticateUser(['user'], 'userToken'), createBooking);
router.get("/", authenticateUser(['user'], 'userToken'), getUserBookings);
router.get("/:bookingId", authenticateUser(['user'], 'userToken'), getBookingDetails);
router.patch("/cancel/:bookingId", authenticateUser(['user'], 'userToken'), cancelBooking);

export default router; 