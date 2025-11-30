import express from "express";
import { getAllBookings, getBookingById, updateBookingStatus } from "../../controllers/admin/bookingController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.get("/", authenticateUser(["admin"], 'adminToken'), getAllBookings);
router.get("/:id", authenticateUser(["admin"], "adminToken"), getBookingById);
router.put("/edit/:id", authenticateUser(["admin"], "adminToken"), updateBookingStatus);

export default router; 