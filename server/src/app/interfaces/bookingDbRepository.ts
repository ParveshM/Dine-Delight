import { BookingEntityType } from "../../entities/bookingEntity";
import { BookingRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";

export const bookingDbRepository = (
  repository: ReturnType<BookingRepositoryMongodbType>
) => {
  const createBooking = async (reservationData: BookingEntityType) =>
    await repository.createBooking(reservationData);

  return { createBooking };
};
export type BookingDbRepositoryInterface = typeof bookingDbRepository;
