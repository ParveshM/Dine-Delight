import mongoose, { Types } from "mongoose";
import { RestaurantReportFilter } from "../../../types/restaurantInterface";
import { BookingDbRepositoryInterface } from "../../interfaces/bookingDbRepository";

export const generateRestaurantReport = async (
  restaurantID: string,
  startDate: string,
  endDate: string,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>,
  status?: string
) => {
  const filter: RestaurantReportFilter = {
    restaurantId: new Types.ObjectId(restaurantID),
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  };
  if (status) filter.bookingStatus = status;
  return await bookingRepository.getRestaurantReport(filter);
};

export const dashBoardData = async (
  restaurantID: string,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) => {
  const skip = 0;
  const limit = 5;
  const { bookings } = await bookingRepository.paginatedBookings(
    { restaurantId: restaurantID },
    skip,
    limit
  );
  const { graphData, bookingStatistics } =
    await bookingRepository.restaurantGraphData(restaurantID);
  return { graphData, bookings, bookingStatistics };
};
