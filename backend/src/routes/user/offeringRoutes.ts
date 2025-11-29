import express from "express";
import { offerings } from "../../controllers/user/offeringController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.get("/", authenticateUser(['user'], 'userToken'), offerings);

export default router; 