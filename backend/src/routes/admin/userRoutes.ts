import express from "express";
import { allUsers } from "../../controllers/admin/authController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.get("/", authenticateUser(['admin'], 'adminToken'), allUsers)

export default router; 