import { NextFunction, Request, Response } from "express";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import { loginAdmin } from "../app/use-cases/Admin/adminAuth";
import { HttpStatus } from "../types/httpStatus";

// adminAuthController
export default (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService
) => {
  const authService = authServiceInterface(authServiceImpl());

  const adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await loginAdmin(
        email,
        password,
        authService
      );
      res.cookie("access_token", accessToken, { httpOnly: true });
      res.cookie("refresh_token", refreshToken, { httpOnly: true });
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Admin login success" });
    } catch (error) {
      next(error);
    }
  };

  return { adminLogin };
};
