import { NextFunction, Request, Response } from "express";
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

  /*
   * METHOD:POST,
   * Return acces token to client
   */

  const returnAccessToClient = (req: Request, res: Response) => {
    const { access_token } = req.cookies;
    return res.status(HttpStatus.OK).json({ success: true, access_token });
  };

  const clearToken = (req: Request, res: Response) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.json({ success: false, message: "Logout successfull" });
  };

  return { getNewAccessToken, returnAccessToClient, clearToken };
};
export default tokenContoller;
