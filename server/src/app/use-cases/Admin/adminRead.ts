import { UserDbInterface } from "../../interfaces/userDbRepository";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";

export const getUsers = async (userDbRepository: ReturnType<UserDbInterface>) =>
  await userDbRepository.getAllUsers();

export const getRestaurants = async (
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => await restaurantDbRepository.getAllRestaurants();

export const getNewRegisteredRestaurants = async (
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => await restaurantDbRepository.getNewRegisteredRestaurants();
