import { CartItemInterface } from "../../../../types/BookingInterface";
import { HttpStatus } from "../../../../types/httpStatus";
import CustomError from "../../../../utils/customError";
import { BookingDbRepositoryInterface } from "../../../interfaces/bookingDbRepository";

export const createPreOrderForBooking = async (
  bookingID: string,
  cartItems: CartItemInterface[],
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) => {
  if (!bookingID)
    throw new CustomError(
      "Please provide a booking ID",
      HttpStatus.BAD_REQUEST
    );

  const booking = bookingRepository.getBookingById(bookingID);
  if (!booking)
    throw new CustomError(
      "Please provide a booking ID",
      HttpStatus.BAD_REQUEST
    );

  for (const item of cartItems) {
    await bookingRepository.createPreOrder(bookingID, item);
  }
  await bookingRepository.updateBookingDetails(bookingID, {
    foodStatus: "Accepted",
  });
};
