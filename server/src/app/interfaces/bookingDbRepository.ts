import { BookingEntityType } from "../../entities/bookingEntity";
import { BookingRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";
import { CartItemInterface } from "../../types/BookingInterface";

export const bookingDbRepository = (
  repository: ReturnType<BookingRepositoryMongodbType>
) => {
  const createBooking = async (reservationData: BookingEntityType) =>
    await repository.createBooking(reservationData);

  const getBookingById = async (bookingId: string) =>
    await repository.getBookingById(bookingId);

  const updateBookingDetails = async (
    bookingId: string,
    updatingData: Record<any, any>
  ) => await repository.updateBooking(bookingId, updatingData);

  const paginatedBookings = async (
    filter: Record<string, any>,
    skip: number,
    limit: number
  ) => await repository.paginatedBookings(filter, skip, limit);

  const bookings = async (filter: Record<string, any>) =>
    await repository.bookings(filter);

  const countBookings = async () => await repository.countBookings();
  const calculateProfit = async () => await repository.totalAdminPayment();

  const createPreOrder = async (
    bookingId: string,
    preOrderData: CartItemInterface
  ) => await repository.createPreorderedFood(bookingId, preOrderData);

  const getPreoOrderbyBookingId = async (bookingId: string) =>
    await repository.getPreOrder(bookingId);

  return {
    createBooking,
    getBookingById,
    updateBookingDetails,
    paginatedBookings,
    bookings,
    countBookings,
    calculateProfit,
    createPreOrder,
    getPreoOrderbyBookingId,
  };
};
export type BookingDbRepositoryInterface = typeof bookingDbRepository;
