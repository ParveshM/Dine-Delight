import { BookingEntityType } from "../../../../entities/bookingEntity";
import Booking from "../models/Booking";

export const bookingRepositoryMongodb = () => {
  const createBooking = async (reservationData: BookingEntityType) =>
    await Booking.create({
      userId: reservationData.getUserId(),
      restaurantId: reservationData.getRestaurantId(),
      tableId: reservationData.getTableId(),
      tableSlotId: reservationData.getTableSlotId(),
      paymentMethod: reservationData.getPaymentMethod(),
      gstAmount: reservationData.getGstAmount(),
      totalAmount: reservationData.getTotalAmount(),
    });

  const updateBooking = async (id: string, updatingData: Record<string, any>) =>
    await Booking.findByIdAndUpdate(id, updatingData);

  return {
    createBooking,
    updateBooking,
  };
};
export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;
