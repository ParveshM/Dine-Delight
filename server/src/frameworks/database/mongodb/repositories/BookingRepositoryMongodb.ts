import mongoose from "mongoose";
import { BookingEntityType } from "../../../../entities/bookingEntity";
import { CartItemInterface } from "../../../../types/BookingInterface";
import Booking from "../models/Booking";
import Preorder from "../models/Preorder";
import { RestaurantReportFilter } from "../../../../types/restaurantInterface";
import { Types } from "mongoose";

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

  const updateAdminPayment = async (bookingId: string, Amount: number) =>
    await Booking.updateOne(
      { bookingId },
      {
        $set: { adminPayment: Amount },
      }
    );

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

  const getAdminReport = async (startDate: string, endDate: string) =>
    await Booking.aggregate([
      {
        $match: {
          bookingStatus: "Completed",
          adminPayment: {
            $exists: true,
          },
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $unwind: {
          path: "$restaurant",
        },
      },
      {
        $project: {
          _id: 1,
          restaurant: 1,
          adminPayment: 1,
          createdAt: 1,
        },
      },
    ]);

  const getRestaurantReport = async (filter: RestaurantReportFilter) =>
    await Booking.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "table",
        },
      },
      {
        $unwind: {
          path: "$table",
        },
      },
      {
        $lookup: {
          from: "tableslots",
          localField: "tableSlotId",
          foreignField: "_id",
          as: "tableSlot",
        },
      },
      {
        $unwind: {
          path: "$tableSlot",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          _id: 1,
          tableSlot: 1,
          table: 1,
          user: 1,
          paymentMethod: 1,
          paymentStatus: 1,
          bookingStatus: 1,
          totalAmount: 1,
          bookingId: 1,
          createdAt: 1,
        },
      },
    ]);

  const restaurantGraphData = async (restaurantId: string) => {
    const graphData = await Booking.aggregate([
      {
        $match: {
          restaurantId: new Types.ObjectId(restaurantId),
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          profit: { $sum: "$totalAmount" },
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

    const bookingStatistics = await Booking.aggregate([
      {
        $match: {
          restaurantId: new Types.ObjectId(restaurantId),
        },
      },
      {
        $group: {
          _id: "$bookingStatus",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          bookingStatus: "$_id",
          _id: 0,
          count: 1,
        },
      },
    ]);

    return { graphData, bookingStatistics };
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
    getAdminReport,
    getRestaurantReport,
    restaurantGraphData,
  };
};
export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;
