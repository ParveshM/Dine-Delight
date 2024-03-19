import { Request } from "express";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";

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

// export const getNewRegisteredRestaurants = async (
//   restaurantDbRepository: ReturnType<restaurantDbInterface>
// ) =>
