import { Filter } from "../../../../types/restaurantInterface";
import { TableSlotDbInterface } from "../../../interfaces/TableSlotdbRepository";
import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";

export const getAllListedRestaurants = async (
  searchText: string,
  userCoordinates: (string | number)[],
  restaurantRepository: ReturnType<restaurantDbInterface>
) => {
  const filter = {
    isListed: true,
    restaurantName: { $regex: new RegExp(searchText, "i") },
    ...(userCoordinates &&
      userCoordinates.length === 2 && {
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: userCoordinates,
            },
            $maxDistance: 10000,
          },
        },
      }),
  };
  return await restaurantRepository.getListedRestaurants(filter);
};

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
