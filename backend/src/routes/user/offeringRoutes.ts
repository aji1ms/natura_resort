import express from "express";
import { offerings, getOfferingDetails } from "../../controllers/user/offeringController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.get("/", authenticateUser(['user'], 'userToken'), offerings);
router.get("/:id", authenticateUser(['user'], 'userToken'), getOfferingDetails);

export default router; 