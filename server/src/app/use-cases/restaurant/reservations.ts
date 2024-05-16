import { Types } from "mongoose";
import { BookingDbRepositoryInterface } from "../../interfaces/bookingDbRepository";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import { updateWallet } from "../user/Booking/updateWallet";
import { TransactionDataType } from "../../../types/BookingInterface";

export const getRestaurantReservations = async (
  restaurantId: string,
  status: string,
  skip: number,
  limit: number,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) => {
  const filter: Record<string, any> = { restaurantId };
  if (status) {
    filter.bookingStatus = status;
  }
  return await bookingRepository.paginatedBookings(filter, skip, limit);
};
export const updateReservationData = async (
  bookingID: string,
  status: string,
  newFoodStatus: string,
  userID: string,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>,
  userRepository: ReturnType<UserDbInterface>
) => {
  if (!bookingID)
    throw new CustomError(
      "Please provide a booking ID",
      HttpStatus.BAD_REQUEST
    );

  const bookingDetails = await bookingRepository.updateBookingDetails(
    bookingID,
    {
      bookingStatus: status,
      foodStatus: newFoodStatus,
    }
  );
  if (bookingDetails && status === "Completed") {
    const commissionAmount = Math.floor(
      (bookingDetails.totalAmount * 10) / 100
    );
    await bookingRepository.updateBookingDetails(bookingID, {
      $set: { adminPayment: commissionAmount },
    });
  }
  if (bookingDetails && status === "Cancelled") {
    const data: TransactionDataType = {
      newBalance: bookingDetails?.totalAmount,
      type: "Credit",
      description: "Booking cancelled by the seller",
    };
    await updateWallet(userID, data, userRepository);
    await bookingRepository.updateBookingDetails(bookingID, {
      paymentStatus: "Refunded",
    });
  }
  return bookingDetails;
};
