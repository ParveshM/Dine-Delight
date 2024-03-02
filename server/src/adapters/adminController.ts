import { NextFunction, Request, Response } from "express";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import {
  getRestaurants,
  getUsers,
  loginAdmin,
} from "../app/use-cases/Admin/adminAuth";
import { HttpStatus } from "../types/httpStatus";
import { UserDbInterface } from "../app/interfaces/userDbRepository";
import { UserRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { restaurantDbInterface } from "../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import {
  blockUser,
  updateRestaurantApproval,
  updateRestaurantRejected,
  updateRestaurantListing,
} from "../app/use-cases/Admin/adminUpdate";

// adminAuthController
export default (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongodbType,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType
) => {
  const dbUserRepository = userDbRepository(userDbRepositoryImpl());
  const dbResaurantRepository = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );
  const authService = authServiceInterface(authServiceImpl());
  /*
   * METHOD:POST
   * Admin login with Credentials
   */
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
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Admin login success",
        admin: { name: "Admin User", role: "admin" },
      });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:GET
   * Retrieve all the users from db
   */
  const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await getUsers(dbUserRepository);
      console.log(users, "=====");
      return res.status(HttpStatus.OK).json({ success: true, users });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:POST
   * Retrieve all the restaurants in the system
   */
  const getAllRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const restaurants = await getRestaurants(dbResaurantRepository);
      return res.status(HttpStatus.OK).json({ success: true, restaurants });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:PATCH
   * Block or Unblock user
   */
  const userBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await blockUser(id, dbUserRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "User block status updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD:PATCH
   * Approve restaurant and inform through email
   */
  const approveRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await updateRestaurantApproval(id, dbResaurantRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Restaurant approved successfully" });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:PATCH
   * Reject restaurant
   */
  const rejectRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await updateRestaurantRejected(id, dbResaurantRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Restaurant rejected successfully" });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:PATCH
   * List or unlist restaurants
   */
  const listRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await updateRestaurantListing(id, dbResaurantRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "status updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  return {
    adminLogin,
    getAllUser,
    getAllRestaurants,
    userBlock,
    approveRestaurant,
    rejectRestaurant,
    listRestaurant,
  };
};
