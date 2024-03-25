import { BookingEntityType } from "../../entities/bookingEntity";
import { BookingRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";

export const bookingDbRepository = (
  repository: ReturnType<BookingRepositoryMongodbType>
) => {
  const createBooking = async (reservationData: BookingEntityType) =>
    await repository.createBooking(reservationData);

  const getBookingById = async (bookingId: string) =>
    await repository.getBookingById(bookingId);

  const updateBookingDetails = async (
    bookingId: string,
    updatingData: Record<string, any>
  ) => await repository.updateBooking(bookingId, updatingData);

  const bookings = async (filter: Record<string, any>) =>
    await repository.bookings(filter);

  return { createBooking, getBookingById, updateBookingDetails, bookings };
};
export type BookingDbRepositoryInterface = typeof bookingDbRepository;
