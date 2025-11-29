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