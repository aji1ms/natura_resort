import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../models/userSchema";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const authenticateUser = (allowedRoles: string[] = [], cookieName: string = "jwt") => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = req.cookies?.[cookieName];
            if (!token) {
                res.status(401).json({ message: "please login!" });
                return;
            }

            const JWT_SECRET = process.env.JWT_SECRET;
            if (!JWT_SECRET) {
                res.status(500).json({ message: "JWT secret is not defined" });
                return;
            }

            const decode = jwt.verify(token, JWT_SECRET) as { userId: string };
            const user = await User.findById(decode.userId);

            if (!user) {
                res.status(401).json({ message: "Not authorized, user not found" });
                return;
            }

            const userRole = user.isAdmin ? 'admin' : 'user';

            if (allowedRoles.length && !allowedRoles.includes(userRole)) {
                res.status(403).json({ message: "Insufficient permissions" });
                return;
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ message: "Token expired" });
                return;
            }
            if (error instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ message: "Invalid token" });
                return;
            }

            res.status(500).json({ message: "Server error during authentication" });
        }
    };
};

export default authenticateUser;