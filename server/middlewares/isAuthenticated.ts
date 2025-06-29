import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
       res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const verifyToken = Jwt.verify(token, process.env.SECRET_KEY!) as Jwt.JwtPayload;

    if (!verifyToken) {
       res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = verifyToken.userId;
    next();
  } catch (error) {
     res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
