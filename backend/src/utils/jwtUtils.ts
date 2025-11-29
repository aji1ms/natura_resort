import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const generateJWT = (res: Response, userId: string, cookieName: string = "jwt") => {
    const token = jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: "1d" });
    const cookieMaxAge = 24 * 60 * 60 * 1000;

    res.cookie(cookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: cookieMaxAge,
        path: '/',
    });
}

const clearJWT = (res: Response, cookieName: string = "jwt") => {
    res.cookie(cookieName, "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
        path: '/',
    });
}

export {
    generateJWT, clearJWT
}; 