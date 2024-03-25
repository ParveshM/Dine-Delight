import { Types } from "mongoose";
import { BookingDbRepositoryInterface } from "../../interfaces/bookingDbRepository";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import { updateWallet } from "../user/Booking/updateWallet";
import { TransactionDataType } from "../../../types/BookingInterface";

export const getRestaurantReservations = async (
  restaurantID: string,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) =>
  await bookingRepository.bookings({
    restaurantId: new Types.ObjectId(restaurantID),
  });

export const updateReservationData = async (
  bookingID: string,
  status: string,
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
    }
  );
  if (bookingDetails && status === "Cancelled") {
    const data: TransactionDataType = {
      newBalance: bookingDetails?.totalAmount,
      type: "Credit",
      description: "Booking cancelled by the seller",
    };
    const updateWalletDetails = await updateWallet(
      userID,
      data,
      userRepository
    );
    await bookingRepository.updateBookingDetails(bookingID, {
      paymentStatus: "Refunded",
    });
  }
  return bookingDetails;
};
