import {
  BookingInterface,
  TransactionDataType,
} from "../../../../types/BookingInterface";
import { HttpStatus } from "../../../../types/httpStatus";
import CustomError from "../../../../utils/customError";
import { parseTimeSlot } from "../../../../utils/utilityFunctions";
import { TableSlotDbInterface } from "../../../interfaces/TableSlotdbRepository";
import { BookingDbRepositoryInterface } from "../../../interfaces/bookingDbRepository";
import { UserDbInterface } from "../../../interfaces/userDbRepository";
import { updateWallet } from "./updateWallet";

export const cancelBookingAndUpdateWallet = async (
  userID: string,
  bookingID: string,
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
      bookingStatus: "Cancelled",
    }
  );
  const booking = (await bookingRepository.getBookingById(
    bookingID
  )) as unknown as BookingInterface;

  if (bookingDetails) {
    const data: TransactionDataType = {
      newBalance: bookingDetails?.totalAmount,
      type: "Credit",
      description: "Booking cancellation refund amount",
    };
    const updateWalletDetails = await updateWallet(
      userID,
      data,
      userRepository
    );
  }
};
