import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";

export const getAllListedRestaurants = async (
  restaurantRepository: ReturnType<restaurantDbInterface>
) => await restaurantRepository.getListedRestaurants();

export const getSingleRestaurantById = async (
  restaurantID: string,
  restaurantRepository: ReturnType<restaurantDbInterface>
) => await restaurantRepository.getRestaurantById(restaurantID);
