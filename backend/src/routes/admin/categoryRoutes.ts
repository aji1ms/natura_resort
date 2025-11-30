import express from "express";
import { addCategory, editCategory, deleteCategory, getAllCategories } from "../../controllers/admin/categoryController";
import authenticateUser from "../../middlewares/authMiddleware";
const router = express.Router();

router.post("/add", authenticateUser(["admin"], "adminToken"), addCategory);
router.post("/edit/:id", authenticateUser(["admin"], "adminToken"), editCategory);
router.delete("/delete/:id", authenticateUser(["admin"], "adminToken"), deleteCategory);
router.get("/", authenticateUser(["admin"], "adminToken"), getAllCategories);

export default router; 