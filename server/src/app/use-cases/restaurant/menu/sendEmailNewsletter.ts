import { startEmailSendingJob } from "../../../../frameworks/services/mailService";
import {
  MenuItemInterface,
  SenderListInterface,
} from "../../../../types/restaurantInterface";
import { BookingDbRepositoryInterface } from "../../../interfaces/bookingDbRepository";
import { UserDbInterface } from "../../../interfaces/userDbRepository";

export const sendEmailNewsLetter = async (
  restaurantId: string,
  userRepository: ReturnType<UserDbInterface>,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>,
  data: MenuItemInterface
) => {
  let senderList: SenderListInterface[] = [];
  const bookings: any[] = await bookingRepository.bookings({
    restaurantId,
  });
  const uniqueEmail = new Map();
  if (bookings) {
    for (const booking of bookings) {
      const isSubscribed = await userRepository.isUserSubscribed(
        booking.userId._id,
        restaurantId
      );
      if (!isSubscribed && !uniqueEmail.has(booking.userId.email)) {
        uniqueEmail.set(booking.userId.email, true);
        senderList.push({
          userName: booking.userId.name,
          email: booking.userId.email,
          restaurantId,
          restaurantName: booking.restaurantId.restaurantName,
          userId: booking.userId._id,
        });
      }
    }
    senderList.length && startEmailSendingJob(senderList, data);
  }
};
