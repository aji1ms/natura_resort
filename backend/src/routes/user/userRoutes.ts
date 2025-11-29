import express from "express";
import { register, login, getUser, logoutUser } from "../../controllers/user/authController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);
router.get("/me", authenticateUser(['user'], "userToken"), getUser);

export default router; 