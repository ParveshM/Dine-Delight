import { BookingEntityType } from "../../entities/bookingEntity";
import { BookingRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";

export const bookingDbRepository = (
  repository: ReturnType<BookingRepositoryMongodbType>
) => {
  const createBooking = async (reservationData: BookingEntityType) =>
    await repository.createBooking(reservationData);

  const updateBookingDetails = async (
    bookingId: string,
    updatingData: Record<string, any>
  ) => await repository.updateBooking(bookingId, updatingData);

  return { createBooking, updateBookingDetails };
};
export type BookingDbRepositoryInterface = typeof bookingDbRepository;
