import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface } from "../app/interfaces/userDbRepository";
import { UserRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { AuthService } from "../frameworks/services/authService";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import {
  userRegister,
  verifyOtpUser,
  deleteOtp,
  login,
} from "../app/use-cases/auth/userAuth";
import { HttpStatus } from "../types/httpStatus";

// Controller will be passing all the necessaary parameers to the repositories

const authController = (
  authServiceInterface: AuthServiceInterfaceType, // parameters from router
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userRepositoryImpl: UserRepositoryMongodbType
) => {
  const dbRepositoryUser = userDbRepository(userRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  /**
   ** method : POST
   */
  // Register new User
  const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.body;
      const newUser = await userRegister(user, dbRepositoryUser, authService);
      res.json({
        message: "User registration successful,please verify email",
        newUser,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   ** method : POST
   */
  // Verify OTP
  const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { otp, userId } = req.body;
      const isVerified = await verifyOtpUser(otp, userId, dbRepositoryUser);
      if (isVerified) {
        return res
          .status(HttpStatus.OK)
          .json({ message: "User account verified,please login" });
      }
    } catch (error) {
      next(error);
    }
  };
  /**
   ** method : POST
   */
  // Resend OTP
  const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      await deleteOtp(userId, dbRepositoryUser, authService);
      res.json({ message: "New otp sent to email" });
    } catch (error) {
      next(error);
    }
  };
  /**
   ** method : POST
   */
  // User login with credentials and create access and refresh token for authorization
  const userLogin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { getAccessToken, getRefreshToken } = await login(
          req.body,
          dbRepositoryUser,
          authService
        );
        // setting access token in the cookie
        res.cookie("access_token", getAccessToken, {
          httpOnly: true,
        });
        res.cookie("refresh_token", getRefreshToken, {
          httpOnly: true,
        });
        res.status(HttpStatus.OK).json({ message: "login success" });
      } catch (error) {
        next(error);
      }
    }
  );

  return { registerUser, verifyOtp, resendOtp, userLogin };
};
export default authController;
