import { RestaurantInterface } from "../../../types/restaurantInterface";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";

export const updateRestaurantInfo = async (
  id: string,
  updateData: RestaurantInterface,
  restaurantRepository: ReturnType<restaurantDbInterface>
) => await restaurantRepository.updateRestaurant(id, updateData);
