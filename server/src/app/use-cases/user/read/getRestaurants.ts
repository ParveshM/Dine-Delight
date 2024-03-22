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
  guest: number,
  date: string,
  restaurantRepository: ReturnType<restaurantDbInterface>,
  tableSlotRepository: ReturnType<TableSlotDbInterface>
) => {
  const capacity = guest ?? 2;
  const startTime = "$startTime";
  const currentDate = date ?? new Date();
  const restaurant = await restaurantRepository.getRestaurantById(restaurantID);
  const tableSlots = await tableSlotRepository.getAvailableTableSlotsByFilter(
    restaurantID,
    capacity,
    startTime,
    currentDate
  );

  return { restaurant, tableSlots };
};
