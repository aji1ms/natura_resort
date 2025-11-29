import { Request, Response } from "express";
import Category from "../../models/categorySchema"

// Add Category

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({ message: "Name and description are required!" });
            return;
        }

        const cleanName = name.trim();

        const existingCategory = await Category.findOne({
            name: { $regex: `^${cleanName}$`, $options: 'i' }
        });
        
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists!" });
            return;
        }

        const newCategory = new Category({ name: cleanName, description });
        await newCategory.save();

        res.status(201).json({
            message: "Category created successfully!",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Edit Category

export const editCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({ message: "Name and description are required!" });
            return;
        }

        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            res.status(404).json({ message: "Category not found!" });
            return;
        }

        const duplicateCategory = await Category.findOne({
            name: { $regex: `^${name.trim()}$`, $options: 'i' },
            _id: { $ne: id }
        });

        if (duplicateCategory) {
            res.status(401).json({ message: "Category name already exists!" });
            return;
        }

        const updateCategory = await Category.findByIdAndUpdate(id, {
            name,
            description,
        }, { new: true });

        res.status(200).json({
            message: "Category updated successfully!",
            data: updateCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete Category

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        const category = await Category.findById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        await category.deleteOne();

        res.status(200).json({ message: "Category deleted successfully!", });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get Category 

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;

        let query: any = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const categories = await Category.find(query)
            .sort({ createdAt: -1 })

        const totalCategories = await Category.countDocuments(query);

        if (!categories) {
            res.status(500).json({ message: "Category not found!" });
            return
        }

        res.status(200).json({
            message: "Categories retrieved successfully!",
            data: categories,
            totalCategories,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
