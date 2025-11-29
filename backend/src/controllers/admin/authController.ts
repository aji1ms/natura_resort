import { Request, Response } from "express";
import User from "../../models/userSchema";

// Users Info

export const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;

        let query: any = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        const users = await User.find(query)
            .select('-password')

        const totalUsers = await User.countDocuments();

        if (!users) {
            res.status(500).json({ message: "User not found!" });
            return;
        }

        res.status(200).json({
            message: "Users retrieved successfully!",
            data: users,
            totalUsers,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}