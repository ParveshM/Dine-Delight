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
  getUserById,
} from "../app/use-cases/user/auth/userAuth";
import { HttpStatus } from "../types/httpStatus";
import { GoogleResponseType } from "../types/googleResponseType";
import { restaurantRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import { restaurantDbInterface } from "../app/interfaces/restaurantDbRepository";
import {
  getAllListedRestaurants,
  getSingleRestaurantById,
} from "../app/use-cases/user/read/getRestaurants";
import { TableSlotDbInterface } from "../app/interfaces/TableSlotdbRepository";
import { TableSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/TableSlotRepositoryMongodb";
import { TableDbInterface } from "../app/interfaces/tableDbRepository";
import { TableRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/tableRepositoryMongoDb";
import { getTableDetails } from "../app/use-cases/user/read/getTable";
import {
  WalletTransactions,
  getUserProfile,
  updateUser,
} from "../app/use-cases/user/read/profile";
// Controller will be passing all the necessaary parameers to the repositories

const userController = (
  authServiceInterface: AuthServiceInterfaceType, // parameters from router
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userRepositoryImpl: UserRepositoryMongodbType,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType,
  tableSlotDbRepository: TableSlotDbInterface,
  tableSlotDbRepositoryImpl: TableSlotRepositoryMongodbType,
  tableDbRepository: TableDbInterface,
  tableDbRepositoryImpl: TableRepositoryMongodbType
) => {
  const dbRepositoryUser = userDbRepository(userRepositoryImpl());
  const restaurantRepository = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );
  const tableSlotRepository = tableSlotDbRepository(
    tableSlotDbRepositoryImpl()
  );
  const tableRepository = tableDbRepository(tableDbRepositoryImpl());
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
          secure: true,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
        secure: true,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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

  const getRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const q = req.query.q as string;
      const location = req.query.location as (string | number)[];
      const page = req.query.page as string;
      const cost = req.query.cost as string;
      const rating = req.query.rating as string;
      const sort = req.query.sort as string;

      const costPerPerson = parseInt(cost, 10);
      const parsedPage = parseInt(page, 10) || 1;
      const limit = 1;
      const skip = (parsedPage - 1) * limit;

      const restaurants = await getAllListedRestaurants(
        q,
        skip,
        limit,
        location,
        restaurantRepository
      );
      res.status(200).json({ success: true, restaurants });
    } catch (error) {
      next(error);
    }
  };

  const getSingleRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { restaurantID } = req.params;
      const guest =
        typeof req?.query?.guest === "string" ? parseInt(req.query.guest) : 2;
      const date = req.query.date as string;
      const { restaurant, tableSlots } = await getSingleRestaurantById(
        restaurantID,
        guest,
        date,
        restaurantRepository,
        tableSlotRepository
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Restaurant details fetched successfully",
        restaurant,
        tableSlots,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * * METHOD :GET
   * * @param tableID {string}
   * * Retrieve table details by Id
   */
  const tableDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { tableID } = req.params;
      const userId = req.query.userId as string;
      const tableData = await getTableDetails(tableID, tableRepository);
      const user = await getUserById(userId, dbRepositoryUser);

      res.status(200).json({ success: true, tableData, user });
    } catch (error) {
      next(error);
    }
  };

  /**
   * * METHOD :GET
   * * Retrieve  user profile , wallet
   */
  const userProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const { user, wallet, transactions } = await getUserProfile(
        userId,
        dbRepositoryUser
      );
      res.status(200).json({ success: true, user, wallet, transactions });
    } catch (error) {
      next(error);
    }
  };
  /**
   * * METHOD :PATCH
   * * update user profile
   */
  const updateUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const updateData = req.body;
      console.log(req.body);
      const user = await updateUser(userId, updateData, dbRepositoryUser);
      res
        .status(200)
        .json({ success: true, user, message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  const getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const transaction = await WalletTransactions(userId, dbRepositoryUser);
      res.status(200).json({
        success: true,
        transaction,
        message: "Transactions fetched successfully",
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
    getRestaurants,
    getSingleRestaurant,
    tableDetails,
    userProfile,
    updateUserInfo,
    getTransactions,
  };
};
export default userController;
