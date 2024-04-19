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
    const isItemExists = await bookingRepository.getOrderItem({
      bookingId: bookingID,
      itemId: item._id,
    });
    if (isItemExists) {
      const updateData: Record<string, any> = {
        $set: { quantity: item.quantity },
      };
      await bookingRepository.updatePreOrderItem(
        {
          bookingId: bookingID,
          itemId: item._id,
        },
        updateData
      );
    } else {
      await bookingRepository.createPreOrder(bookingID, item);
    }
  }
  await bookingRepository.updateBookingDetails(bookingID, {
    foodStatus: "Accepted",
  });
};

export const deletePreOrderForBooking = async (
  bookingID: string,
  cartItemId: string,
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
  await bookingRepository.deleteOrderItem({
    bookingId: bookingID,
    itemId: cartItemId,
  });
};
