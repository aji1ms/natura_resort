import { Response, Request } from "express";
import Offering from "../../models/inventorySchema";

// Get All Offering

export const offerings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.query;

        const query: any = {};

        if (category) {
            query.category = category;
        }

        const offerings = await Offering.find(query)
            .populate("category", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Offerings retrieved successfully!",
            data: offerings,
        });

    } catch (error) {
        console.error("Error fetching offerings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Offering Details

export const getOfferingDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const offering = await Offering.findById(id)
            .populate("category", "name description")
            .select("-__v");

        if (!offering) {
            res.status(404).json({ message: "Offering not found!" });
            return;
        }

        res.status(200).json({
            message: "Offering details retrieved successfully!",
            data: offering,
        });

    } catch (error) {
        console.error("Error fetching offering details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};