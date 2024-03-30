import { Request } from "express";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";
import { BookingDbRepositoryInterface } from "../../interfaces/bookingDbRepository";

export const getUsers = async (userDbRepository: ReturnType<UserDbInterface>) =>
  await userDbRepository.getAllUsers();

export const getRestaurants = async (
  new_registrations: boolean | undefined,
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => {
  if (new_registrations) {
    return await restaurantDbRepository.getNewRegisteredRestaurants();
  }
  return await restaurantDbRepository.getAllRestaurants();
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
  const totalProfit = await bookingRepository.calculateProfit();
  const totalBookings = await bookingRepository.countBookings();
  const { count, bookings } = await bookingRepository.paginatedBookings(
    filter,
    skip,
    limit
  );

  return {
    totalUsers,
    totalBookings,
    totalRestaurants,
    totalProfit,
    bookings,
    count,
  };
};
