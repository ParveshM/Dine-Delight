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

  const getBookingById = async (bookingId: string) =>
    await Booking.findOne({ bookingId }).populate([
      "restaurantId",
      "tableId",
      "tableSlotId",
      "userId",
    ]);

  const updateBooking = async (
    bookingId: string,
    updatingData: Record<string, any>
  ) =>
    await Booking.findOneAndUpdate({ bookingId }, updatingData, {
      new: true,
    });

  const bookings = async (filter: Record<string, any>) =>
    await Booking.find(filter)
      .populate(["restaurantId", "tableId", "tableSlotId", "userId"])
      .sort({ createdAt: -1 });

  return {
    createBooking,
    getBookingById,
    updateBooking,
    bookings,
  };
};
export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;
