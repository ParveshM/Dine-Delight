import { Request, Response, NextFunction } from "express";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import { restaurantDbInterface } from "../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import {
  addNewRestaurant,
  restaurantLogin,
  verifyAccount,
} from "../app/use-cases/restaurant/authRestaurant";
import { HttpStatus } from "../types/httpStatus";
import { updateRestaurantInfo } from "../app/use-cases/restaurant/updateRestaurant";

const restaurantController = (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType
) => {
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryRestaurants = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );

  /*
   * METHOD: POST
   * Register new restaurant to the system
   */
  const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantdata = req.body;
      const registerRestaurant = await addNewRestaurant(
        restaurantdata,
        dbRepositoryRestaurants,
        authService
      );
      if (registerRestaurant) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: "Registration success, please verify your email",
        });
      }
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD: GET
   * Verify newly registerd restaurant
   */
  const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;

      const verifying = await verifyAccount(token, dbRepositoryRestaurants);
      if (verifying)
        return res.status(HttpStatus.OK).json({
          success: true,
          message: "Account is verified, you can login after admin approval.",
        });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD: POST
   * Login restaurant account with credentials
   */
  const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, isEmailExist } = await restaurantLogin(
        email,
        password,
        dbRepositoryRestaurants,
        authService
      );
      res.cookie("access_token", accessToken, { httpOnly: true });
      res.cookie("refresh_token", refreshToken, { httpOnly: true });
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Login successful",
        restaurant: isEmailExist,
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD: PUT
   * Update restaurant account details
   */
  const updateRestaurantDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.seller;
      await updateRestaurantInfo(id, req.body, dbRepositoryRestaurants);
      res.json({ success: true, message: "Restaurants updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  return { signup, verifyToken, login, updateRestaurantDetails };
};
export default restaurantController;
