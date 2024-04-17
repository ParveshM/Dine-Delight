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
import {
  getRestaurantDetails,
  updateRestaurantInfo,
} from "../app/use-cases/restaurant/updateRestaurant";
import { BookingDbRepositoryInterface } from "../app/interfaces/bookingDbRepository";
import { BookingRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";
import {
  getRestaurantReservations,
  updateReservationData,
} from "../app/use-cases/restaurant/reservations";
import { UserDbInterface } from "../app/interfaces/userDbRepository";
import { UserRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { getBookingByBookingId } from "../app/use-cases/user/Booking/reservation";

const restaurantController = (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType,
  bookingDbRepository: BookingDbRepositoryInterface,
  bookingDbRepositoryImpl: BookingRepositoryMongodbType,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongodbType
) => {
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryRestaurants = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );
  const bookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
  const userRepository = userDbRepository(userDbRepositoryImpl());

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
      const { access_token: access, refresh_token: refresh } = req.cookies;
      if (access || refresh) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
      }

      const { accessToken, refreshToken, isEmailExist } = await restaurantLogin(
        email,
        password,
        dbRepositoryRestaurants,
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
  /*
   * METHOD: GET
   * GET restaurant  details
   */
  const get_restaurantDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.seller;
      const restaurant = await getRestaurantDetails(
        id,
        dbRepositoryRestaurants
      );
      return res.status(HttpStatus.OK).json({ success: true, restaurant });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD: GET
   * Retriving all the reservations to the restaurant
   */

  const reservations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const restaurantID = req.seller;
      const page = parseInt(req.query.page as string) ?? 1;
      const status = req.query.status as string;
      const limit = 1;
      const skip = (page - 1) * limit;

      const { bookings, count } = await getRestaurantReservations(
        restaurantID,
        status,
        skip,
        limit,
        bookingRepository
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        count,
        limit,
        reservations: bookings,
        message: "Reservations fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD: GET
   * view booking details
   */
  const getReservationbybookingId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookingID } = req.params;
      const { bookingDetails, preOrder } = await getBookingByBookingId(
        bookingID,
        bookingRepository
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "bookingDetails fetched successfully",
        bookingDetails,
        preOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * * METHOD:PATCH
   * * update booking details by seller
   */
  const updateReservations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookingStatus, userID, foodStatus } = req.body;
      const { bookingID } = req.params;
      const upda = await updateReservationData(
        bookingID,
        bookingStatus,
        foodStatus,
        userID,
        bookingRepository,
        userRepository
      );
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Booking updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  return {
    signup,
    verifyToken,
    login,
    updateRestaurantDetails,
    get_restaurantDetails,
    reservations,
    updateReservations,
    getReservationbybookingId,
  };
};
export default restaurantController;
