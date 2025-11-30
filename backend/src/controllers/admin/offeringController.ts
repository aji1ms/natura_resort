import { Request, Response } from "express";
import Category from "../../models/categorySchema";
import Offering from "../../models/inventorySchema";

// Add Offering

export const addOffering = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name,
            category,
            description,
            amenities = [],
            image,
            price,
        } = req.body;

        if (!name || !category || !image || !price || !description) {
            res.status(400).json({
                message: "Name, category, description, image and price are required!"
            });
            return;
        }

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            res.status(400).json({ message: "Invalid category selected!" });
            return;
        }

        const existingOffering = await Offering.findOne({
            name: { $regex: `^${name.trim()}$`, $options: "i" },
            category: category
        });

        if (existingOffering) {
            res.status(409).json({
                message: "An offering with this name already exists in the selected category!"
            });
            return;
        }

        const newOffering = await Offering.create({
            name: name.trim(),
            category: category,
            description: description.trim(),
            amenities: Array.isArray(amenities) ? amenities : [],
            image,
            price: Number(price),
        });

        await newOffering.populate("category", "name type");

        res.status(201).json({
            message: "Offering created successfully!",
            data: newOffering
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Edit Offering

export const editOffering = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const {
            name,
            category,
            description,
            amenities,
            image,
            price,
        } = req.body;

        if (!name || !category || !image || !price || !description) {
            res.status(400).json({
                message: "Name, category, description, image and price are required!"
            });
            return;
        }

        const existingOffering = await Offering.findById(id);
        if (!existingOffering) {
            res.status(404).json({ message: "Offering not found!" });
            return;
        }

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            res.status(400).json({ message: "Invalid category selected!" });
            return;
        }

        const updatedOffering = await Offering.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                category: category,
                description: description.trim(),
                amenities: Array.isArray(amenities) ? amenities : [],
                image,
                price: Number(price),
            }
        ).populate("category", "name");

        res.status(200).json({
            message: "Offering updated successfully!",
            data: updatedOffering
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Offering

export const deleteOffering = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        const offering = await Offering.findById(id);
        if (!offering) {
            res.status(404).json({ message: "Offering not found!" });
            return;
        }

        await offering.deleteOne();

        res.status(200).json({ message: "Offering deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get All Offering

export const getAllOfferings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, search } = req.query;

        const query: any = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search as string, $options: "i" };
        }

        const offerings = await Offering.find(query)
            .populate("category", "name") 
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Offerings retrieved successfully!",
            data: offerings,
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
 