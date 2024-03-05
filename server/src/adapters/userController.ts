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
  authenticateGoogleSignInUser,
  sendResetVerificationCode,
  verifyTokenAndRestPassword,
} from "../app/use-cases/auth/userAuth";
import { HttpStatus } from "../types/httpStatus";
import { GoogleResponseType } from "../types/googleResponseType";
// Controller will be passing all the necessaary parameers to the repositories

const userController = (
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
        const { accessToken, refreshToken, isEmailExist } = await login(
          req.body,
          dbRepositoryUser,
          authService
        );
        // setting access token in the cookie
        res.cookie("access_token", accessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
        });
        res
          .status(HttpStatus.OK)
          .json({ message: "login success", user: isEmailExist });
      } catch (error) {
        next(error);
      }
    }
  );

  /**
   ** method : POST
   ** Google Signin with user credentials
   */

  const googleSignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: GoogleResponseType = req.body.user;
      const { accessToken, refreshToken, isEmailExist, createdUser } =
        await authenticateGoogleSignInUser(
          userData,
          dbRepositoryUser,
          authService
        );
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
      });
      const user = isEmailExist ? isEmailExist : createdUser;
      res.status(HttpStatus.OK).json({ message: "login success", user });
    } catch (error) {
      next(error);
    }
  };

  /**
   ** METHOD:POST
   ** Send verification code to the forget password requested email address
   */

  const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      console.log(email);
      await sendResetVerificationCode(email, dbRepositoryUser, authService);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Reset password code sent to your email.",
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   ** METHOD:POST
   ** Verify the code ,and reset the password
   */
  const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password } = req.body;
      const { token } = req.params;
      await verifyTokenAndRestPassword(
        token,
        password,
        dbRepositoryUser,
        authService
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Reset password success,you can login with your new password",
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    registerUser,
    verifyOtp,
    resendOtp,
    userLogin,
    googleSignIn,
    forgotPassword,
    resetPassword,
  };
};
export default userController;
