import { Request, Response, NextFunction } from "express";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import { restaurantDbInterface } from "../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import {
  addNewRestaurant,
  verifyAccount,
} from "../app/use-cases/restaurant/authRestaurant";
import { HttpStatus } from "../types/httpStatus";

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
      console.log(req.body);
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

  return { signup, verifyToken };
};
export default restaurantController;
