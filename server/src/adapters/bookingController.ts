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
  reserveATable,
} from "../app/use-cases/user/Booking/reservation";
import { HttpStatus } from "../types/httpStatus";
import Stripe from "stripe";
import configKeys from "../config";
import { getUserById } from "../app/use-cases/user/auth/userAuth";
import { UserDbInterface } from "../app/interfaces/userDbRepository";
import { UserRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";

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
  userDbRepositoryImpl: UserRepositoryMongodbType
) => {
  const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
  const dbResaurantRepository = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );
  const dbTableRepository = tableDbRepository(tableDbRepositoryImpl());
  const userRepository = userDbRepository(userDbRepositoryImpl());

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
        dbResaurantRepository,
        dbTableRepository
      );
      if (createBooking.paymentMethod === "Online") {
        const user = await getUserById(userId, userRepository);
        const sessionId = await createPayment(
          user?.name,
          user?.email,
          createBooking._id,
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
      const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: { name: "Guests" },
              unit_amount: 100,
            },
          },
        ],
        mode: "payment",
        success_url: `${configKeys.CLIENT_PORT}/payment_completed?success=true`,
        cancel_url: `${configKeys.CLIENT_PORT}/payment_completed?canceled=true`,
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    reserveTable,
    updatePaymentStatus,
  };
};

export default bookingController;
