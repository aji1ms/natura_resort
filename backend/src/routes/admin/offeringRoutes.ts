import express from "express";
import { addOffering, editOffering, deleteOffering, getAllOfferings } from "../../controllers/admin/offeringController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.post("/add", authenticateUser(['admin'], "adminToken"), addOffering);
router.post("/edit/:id", authenticateUser(['admin'], "adminToken"), editOffering);
router.delete("/delete/:id", authenticateUser(['admin'], "adminToken"), deleteOffering);
router.get("/get", authenticateUser(['admin'], "adminToken"), getAllOfferings);

export default router;