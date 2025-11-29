import { Request, Response } from "express";
import User from "../../models/userSchema";
import { generateJWT, clearJWT } from "../../utils/jwtUtils";

// Admin Login

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing credentials!" });
            return;
        }

        const admin = await User.findOne({ isAdmin: true, email });
        if (!admin) {
            res.status(400).json({ message: "Admin not found!" });
            return;
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password!" })
        }
        const token = generateJWT(res, admin._id.toString(), "adminToken");

        res.status(200).json({ message: "Login successfull!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get Admin

export const getAdminInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Not authorized!" });
            return;
        }

        const user = await User.findById(userId).select("-password -__v");
        if (!user) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }

        if (!user.isAdmin) {
            res.status(403).json({ message: "Access denied. Admin privileges required!" });
            return;
        }

        res.status(200).json({
            message: "Admin info retrieved successfully!",
            admin: user
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


// Admin Logout

export const adminLogout = async (req: Request, res: Response): Promise<void> => {
    try {
        clearJWT(res, "adminToken");
        res.status(200).json({ message: "Logout successfull!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

