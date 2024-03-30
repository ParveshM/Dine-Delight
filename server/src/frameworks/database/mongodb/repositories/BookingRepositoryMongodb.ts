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
    updatingData: Record<any, any>
  ) =>
    await Booking.findOneAndUpdate({ bookingId }, updatingData, {
      new: true,
      upsert: true,
    });

  const updateAdminPayment = async (bookingId: string, Amount: number) => {
    const update = await Booking.updateOne(
      { bookingId },
      {
        $set: { adminPayment: Amount },
      }
    );
  };

  const bookings = async (filter: Record<string, any>) =>
    await Booking.find(filter)
      .populate(["restaurantId", "tableId", "tableSlotId", "userId"])
      .sort({ createdAt: -1 });

  const paginatedBookings = async (
    filter: Record<string, any>,
    skip: number,
    limit: number
  ) => {
    const count = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .populate(["restaurantId", "tableId", "tableSlotId", "userId"])
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    return { count, bookings };
  };
  const countBookings = async () => Booking.countDocuments();

  const totalAdminPayment = async () => {
    const result = await Booking.aggregate([
      {
        $match: {
          bookingStatus: "Completed",
          adminPayment: { $exists: true },
        },
      },
      {
        $group: {
          _id: null,
          totalProfit: {
            $sum: "$adminPayment",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalProfit: 1,
        },
      },
    ]);

    return result[0].totalProfit;
  };

  return {
    createBooking,
    getBookingById,
    updateBooking,
    bookings,
    updateAdminPayment,
    countBookings,
    paginatedBookings,
    totalAdminPayment,
  };
};
export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;
