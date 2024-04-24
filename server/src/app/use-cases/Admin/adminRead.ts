import { UserDbInterface } from "../../interfaces/userDbRepository";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";
import { BookingDbRepositoryInterface } from "../../interfaces/bookingDbRepository";
import { PaginateInterface } from "../../../types/restaurantInterface";
import { AdminDbRepositoryInterface } from "../../interfaces/AdminDbRepository";

export const getUsers = async (
  paginate: PaginateInterface,
  userDbRepository: ReturnType<UserDbInterface>
) => await userDbRepository.getAllUsers(paginate);

export const getRestaurants = async (
  new_registrations: boolean | undefined,
  paginate: PaginateInterface,
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => {
  if (new_registrations) {
    return await restaurantDbRepository.getNewRegisteredRestaurants(paginate);
  }
  return await restaurantDbRepository.getAllRestaurants(paginate);
};

export const getDashBoardData = async (
  status: string,
  skip: number,
  limit: number,
  userRepository: ReturnType<UserDbInterface>,
  restaurantRepository: ReturnType<restaurantDbInterface>,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) => {
  const filter: Record<string, any> = {};
  if (status) {
    filter.bookingStatus = status;
  }
  const totalUsers = await userRepository.countUsers();
  const totalRestaurants = await restaurantRepository.countRestaurants();
  const { graphData, totalProfit } = await bookingRepository.calculateProfit();
  const totalBookings = await bookingRepository.countBookings();
  const { count, bookings } = await bookingRepository.paginatedBookings(
    filter,
    skip,
    limit
  );

  return {
    totalRestaurants,
    totalBookings,
    totalProfit,
    totalUsers,
    graphData,
    bookings,
    count,
  };
};

export const generateReportforAdmin = async (
  startDate: string,
  endDate: string,
  bookingRepository: ReturnType<BookingDbRepositoryInterface>
) => await bookingRepository.getAdminReport(startDate, endDate);
