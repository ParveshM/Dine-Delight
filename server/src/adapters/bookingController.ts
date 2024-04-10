import { Request, Response, NextFunction } from "express";
import { ReservationServiceInterface } from "../app/services-Interface/reservationServiceInterface";
import { ReservationServiceType } from "../frameworks/services/reservationService";
import { BookingDbRepositoryInterface } from "../app/interfaces/bookingDbRepository";
import { BookingRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";
import { restaurantDbInterface } from "../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import { TableDbInterface } from "../app/interfaces/tableDbRepository";
import { TableRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/tableRepositoryMongoDb";
import {
  createPayment,
  getBookingByBookingId,
  getBookings,
  getReviewsByUserId,
  reserveATable,
  updateBookingStatus,
} from "../app/use-cases/user/Booking/reservation";
import { HttpStatus } from "../types/httpStatus";
import { getUserById } from "../app/use-cases/user/auth/userAuth";
import { UserDbInterface } from "../app/interfaces/userDbRepository";
import { UserRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { TableSlotDbInterface } from "../app/interfaces/TableSlotdbRepository";
import { TableSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/TableSlotRepositoryMongodb";
import { cancelBookingAndUpdateWallet } from "../app/use-cases/user/Booking/cancellation";
import { createPreOrderForBooking } from "../app/use-cases/user/Booking/preorderFood";

const bookingController = (
  reservationServiceInterface: ReservationServiceInterface,
  reservationServiceImpl: ReservationServiceType,
  bookingDbRepository: BookingDbRepositoryInterface,
  bookingDbRepositoryImpl: BookingRepositoryMongodbType,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType,
  tableDbRepository: TableDbInterface,
  tableDbRepositoryImpl: TableRepositoryMongodbType,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongodbType,
  tablSlotDbRepository: TableSlotDbInterface,
  tablSlotDbRepositoryImpl: TableSlotRepositoryMongodbType
) => {
  const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
  const restaurantRepository = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );
  const dbTableRepository = tableDbRepository(tableDbRepositoryImpl());
  const userRepository = userDbRepository(userDbRepositoryImpl());
  const dbTableSlotRepository = tablSlotDbRepository(
    tablSlotDbRepositoryImpl()
  );

  const reservationService = reservationServiceInterface(
    reservationServiceImpl()
  );

  const reserveTable = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const createBooking = await reserveATable(
        req.body,
        userId,
        reservationService,
        dbBookingRepository,
        restaurantRepository,
        dbTableRepository,
        dbTableSlotRepository,
        userRepository
      );
      if (createBooking.paymentMethod === "Online") {
        const user = await getUserById(userId, userRepository);
        const sessionId = await createPayment(
          user?.name,
          user?.email,
          createBooking.bookingId,
          createBooking.totalAmount
        );
        res.status(HttpStatus.OK).json({
          success: true,
          message: "Booking created successfully",
          id: sessionId,
        });
      } else {
        res.status(HttpStatus.OK).json({
          success: true,
          message: "Booking created successfully using Wallet",
          booking: createBooking,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * *METHOD :PATCH
   * * Update payment status and table slot information if payment status is failed
   */

  const updatePaymentStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { paymentStatus } = req.body;
      await updateBookingStatus(
        id,
        paymentStatus,
        dbBookingRepository,
        dbTableSlotRepository
      );
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Booking status updated" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * *METHOD :GET
   * * Retrieve all bookings done by user
   */
  const getAllbookings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userID = req.user;
      const bookings = await getBookings(userID, dbBookingRepository);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Bookings fetched successfully",
        bookings,
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :GET
   * * Retrieve booking details
   */
  const getBookingDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookingID } = req.params;
      const userID = req.user;
      const { bookingDetails, preOrder } = await getBookingByBookingId(
        bookingID,
        dbBookingRepository
      );
      let reviews = null;
      if (bookingDetails?.restaurantId && userID) {
        reviews = await getReviewsByUserId(
          userID,
          bookingDetails.restaurantId,
          restaurantRepository
        );
      }
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Bookings details fetched successfully",
        bookingDetails,
        reviews,
        preOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :POST
   * * Cancel booking and update the amount in wallet
   */

  const cancelBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userID = req.user;
      const { bookingID } = req.params;

      const updateBooking = await cancelBookingAndUpdateWallet(
        userID,
        bookingID,
        dbBookingRepository,
        userRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Booking cancelled successfully",
        booking: updateBooking,
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :PATCH
   * * Update preorder
   */
  const updatePreOrderedFood = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookingId, cartItems } = req.body;
      await createPreOrderForBooking(bookingId, cartItems, dbBookingRepository);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Preorder placed successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    reserveTable,
    updatePaymentStatus,
    getAllbookings,
    cancelBooking,
    getBookingDetails,
    updatePreOrderedFood,
  };
};

export default bookingController;
