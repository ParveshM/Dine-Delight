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
import {
  dashBoardData,
  generateRestaurantReport,
} from "../app/use-cases/restaurant/dashboard";
import { OrderDbRepositoryInterface } from "../app/interfaces/OrderDbRepository";
import { OrderRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/OrderRepositoryMongodb";
import {
  getAllOrders,
  updateOrderItem,
} from "../app/use-cases/user/foodOrder/order";

const restaurantController = (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType,
  bookingDbRepository: BookingDbRepositoryInterface,
  bookingDbRepositoryImpl: BookingRepositoryMongodbType,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongodbType,
  orderDbRepository: OrderDbRepositoryInterface,
  orderDbRepositoryImpl: OrderRepositoryMongodbType
) => {
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryRestaurants = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );
  const bookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
  const userRepository = userDbRepository(userDbRepositoryImpl());
  const orderRepository = orderDbRepository(orderDbRepositoryImpl());

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

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Login successful",
        restaurant: isEmailExist,
        access_token: accessToken,
        refresh_token: refreshToken,
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
      console.log("rest id", req.seller);
      const page = parseInt(req.query.page as string) ?? 1;
      const status = req.query.status as string;
      const limit = 10;
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

  const restaurantDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { graphData, bookings, bookingStatistics } = await dashBoardData(
        req.seller,
        bookingRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        graphData,
        bookings,
        bookingStatistics,
        message: "Dashboard data fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * * METHOD:GET
   * * Generate Report for restaurant
   */
  const generateReports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { startDate, endDate, status } = req.query as {
        startDate: string;
        endDate: string;
        status: string;
      };
      const restaurantID = req.seller;
      const report = await generateRestaurantReport(
        restaurantID,
        startDate,
        endDate,
        bookingRepository,
        status
      );
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Report generated successfully",
        report,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * * METHOD:GET
   * * Get orders for the  restaurant
   */
  const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantID = req.seller;
      const page = parseInt(req.query.page as string) || 1;
      const limit = 2;
      const skip = (page - 1) * limit;
      const { orders, count } = await getAllOrders(
        { restaurant: restaurantID },
        { skip, limit },
        orderRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        message: "orders fetched successfully",
        orders,
        limit,
        count,
      });
    } catch (error) {
      next(error);
    }
  };
  /**
   * * METHOD:PATCH
   * * Update order status
   */
  const updateOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await updateOrderItem(orderId, { status }, orderRepository);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "order updated successfully",
        order,
      });
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
    generateReports,
    restaurantDashboard,
    getOrders,
    updateOrder,
  };
};
export default restaurantController;
