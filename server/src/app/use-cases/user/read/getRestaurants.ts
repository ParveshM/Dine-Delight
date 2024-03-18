import { TableSlotDbInterface } from "../../../interfaces/TableSlotdbRepository";
import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";

export const getAllListedRestaurants = async (
  restaurantRepository: ReturnType<restaurantDbInterface>
) => await restaurantRepository.getListedRestaurants();

export const getSingleRestaurantById = async (
  restaurantID: string,
  restaurantRepository: ReturnType<restaurantDbInterface>,
  tableSlotRepository: ReturnType<TableSlotDbInterface>
) => {
  const capacity = 2;
  const startTime = "$startTime";
  const currentDate = new Date();
  const restaurant = await restaurantRepository.getRestaurantById(restaurantID);
  const tableSlots = await tableSlotRepository.getAvailableTableSlotsByFilter(
    restaurantID,
    capacity,
    startTime,
    currentDate
  );

  return { restaurant, tableSlots };
};
