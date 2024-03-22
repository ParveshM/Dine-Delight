import { Request, Response, NextFunction } from "express";
import { ReservationServiceInterface } from "../app/services-Interface/reservationserviceinterface";
import { ReservationServiceType } from "../frameworks/services/reservationservice";
import { BookingDbRepositoryInterface } from "../app/interfaces/bookingdbrepository";
import { BookingRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";
import { restaurantDbInterface } from "../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import { TableDbInterface } from "../app/interfaces/tableDbRepository";
import { TableRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/tableRepositoryMongoDb";
import { reserveATable } from "../app/use-cases/user/Booking/reservation";
import { HttpStatus } from "../types/httpStatus";

const bookingController = (
  reservationServiceInterface: ReservationServiceInterface,
  reservationServiceImpl: ReservationServiceType,
  bookingDbRepository: BookingDbRepositoryInterface,
  bookingDbRepositoryImpl: BookingRepositoryMongodbType,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType,
  tableDbRepository: TableDbInterface,
  tableDbRepositoryImpl: TableRepositoryMongodbType
) => {
  const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
  const dbResaurantRepository = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );
  const dbTableRepository = tableDbRepository(tableDbRepositoryImpl());

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
      if (createBooking) {
        res.status(HttpStatus.OK).json({
          success: true,
          message: "Booking created successfully",
          createBooking,
        });
      }
    } catch (error) {
      next(error);
    }
  };
  return {
    reserveTable,
  };
};

export default bookingController;
