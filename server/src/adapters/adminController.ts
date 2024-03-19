import { NextFunction, Request, Response } from "express";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import { loginAdmin } from "../app/use-cases/Admin/adminAuth";
import { getUsers, getRestaurants } from "../app/use-cases/Admin/adminRead";
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
   * METHOD:GET
   * Retrieve all the restaurants in the system
   */
  const getAllRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const new_registrations = req.query.new_registrations as
        | boolean
        | undefined; // if there is a query return the new registration
      console.log(typeof new_registrations);
      const restaurants = await getRestaurants(
        new_registrations,
        dbResaurantRepository
      );
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
   * Approve/reject restaurant and inform through email
   */
  const validateRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { action } = req.body;
      // if request body action is apporved , approve the registration
      if (action === "approved") {
        await updateRestaurantApproval(id, dbResaurantRepository);
        return res
          .status(HttpStatus.OK)
          .json({ success: true, message: "Restaurant approved successfully" });
      } else {
        await updateRestaurantRejected(id, dbResaurantRepository);
        res
          .status(HttpStatus.OK)
          .json({ success: true, message: "Restaurant rejected successfully" });
      }
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
    validateRestaurant,
    listRestaurant,
  };
};
