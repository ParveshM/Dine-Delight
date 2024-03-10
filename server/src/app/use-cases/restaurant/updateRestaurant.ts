import { RestaurantInterface } from "../../../types/restaurantInterface";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";

export const updateRestaurantInfo = async (
  id: string,
  updateData: RestaurantInterface,
  restaurantRepository: ReturnType<restaurantDbInterface>
) => await restaurantRepository.updateRestaurant(id, updateData);

export const getRestaurantDetails = async (
  id: string,
  restaurnatRepository: ReturnType<restaurantDbInterface>
) => {
  return await restaurnatRepository.getRestaurantById(id);
};
