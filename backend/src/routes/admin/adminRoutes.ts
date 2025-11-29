import express from "express";
import { adminLogin, getAdminInfo, adminLogout } from "../../controllers/admin/adminController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.post("/login", adminLogin);
router.get("/get", authenticateUser(["admin"], "adminToken"), getAdminInfo);
router.post("/logout", authenticateUser(["admin"], "adminToken"), adminLogout);

export default router; 