import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";

export const getAllListedRestaurants = async (
  restaurantRepository: ReturnType<restaurantDbInterface>
) => await restaurantRepository.getListedRestaurants();
