import { Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import jwt from "jsonwebtoken";
import configKeys from "../config";

const tokenContoller = (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService
) => {
  const authService = authServiceInterface(authServiceImpl());
  /**
   ** method : POST
   */
  // refresh access token
  const getNewAccessToken = (req: Request, res: Response) => {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, error: "Invalid refresh token" });
    }
    // verify the recieved refresh token and create new access token
    jwt.verify(
      refresh_token,
      configKeys.RERESH_SECRET,
      (err: any, user: any) => {
        if (err) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: "Refresh token is expired" });
        } else {
          const { id, name, role } = user;
          const { accessToken } = authService.createTokens(id, name, role);
          res.cookie("access_token", accessToken);
          res
            .status(HttpStatus.OK)
            .json({ success: true, message: "Token refreshed successfully" });
        }
      }
    );
  };
  return { getNewAccessToken };
};
export default tokenContoller;
