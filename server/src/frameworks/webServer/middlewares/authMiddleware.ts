import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../../../types/httpStatus";
import configKeys from "../../../config";

// extending the request interface to include the user object in the req
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
// verify the token and validate user
export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { access_token } = req.cookies;
  console.log(req.cookies, "tokens stored in cookies");
  if (!access_token) {
    return res.status(HttpStatus.FORBIDDEN).json("Your are not authenticated");
  }
  jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ success: false, message: "Token is not valid" });
    } else {
      req.user = user.id;
    }
  });
  next();
}

// Admin authorization to get the access to routes in admin
export function authenticateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { access_token } = req.cookies;
  if (!access_token)
    return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");

  jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ success: false, message: "Token is not valid" });
    } else {
      if (user.role === "admin") {
        return next();
      }
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Your are not allowed to access this resource",
        user,
      });
    }
  });
}
