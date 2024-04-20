import { BookingEntityType } from "../../../../entities/bookingEntity";
import { CartItemInterface } from "../../../../types/BookingInterface";
import Booking from "../models/Booking";
import Preorder from "../models/Preorder";

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
    const graphData = await Booking.aggregate([
      {
        $match: {
          bookingStatus: "Completed",
          adminPayment: { $exists: true },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          profit: { $sum: "$adminPayment" },
        },
      },
      {
        $project: {
          month: "$_id.month",
          profit: 1,
          _id: 0,
        },
      },
    ]);

    const totalProfit = graphData.reduce((acc, curr) => {
      return (acc += curr.profit);
    }, 0);

    return { totalProfit, graphData };
  };

  const createPreorderedFood = async (
    bookingId: string,
    predorderData: CartItemInterface
  ) => {
    const { _id, price, quantity } = predorderData;
    return await Preorder.create({ bookingId, itemId: _id, price, quantity });
  };
  const getOrderItem = async (filter: Record<string, any>) =>
    await Preorder.findOne(filter);

  const deletOrderItem = async (filter: Record<string, any>) =>
    await Preorder.deleteOne(filter);

  const getPreOrder = async (bookingId: string) =>
    await Preorder.find({ bookingId }).populate("itemId");

  const updatePreOrderItem = async (
    filter: Record<string, any>,
    updateData: Record<string, any>
  ) => await Preorder.findOneAndUpdate(filter, updateData);

  return {
    createBooking,
    getBookingById,
    updateBooking,
    bookings,
    updateAdminPayment,
    countBookings,
    paginatedBookings,
    totalAdminPayment,
    createPreorderedFood,
    getPreOrder,
    updatePreOrderItem,
    getOrderItem,
    deletOrderItem,
  };
};
export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;
