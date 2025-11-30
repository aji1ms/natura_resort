import { Request, Response } from "express";
import User from "../../models/userSchema";
import { generateJWT } from "../../utils/jwtUtils";

// Register User

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            res.status(400).json({ message: "Missing credentials!" });
            return;
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully!", newUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Login User

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing credentials!" });
            return;
        }

        const user = await User.findOne({ isAdmin: false, email });
        if (!user) {
            res.status(400).json({ message: "User not found!" });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password!" });
            return;
        }

        const token = generateJWT(res, user._id.toString(), "userToken");

        res.status(200).json({
            message: "Login successful!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get User Info

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Not authorized!" });
            return;
        }

        const user = await User.findById(userId).select("-password -__v");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Logout User

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("userToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error during logout" });
    }
};