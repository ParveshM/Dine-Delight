import { paginateFilter } from "../../../../types/restaurantInterface";
import { TableSlotDbInterface } from "../../../interfaces/TableSlotdbRepository";
import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";

export const getAllListedRestaurants = async (
  queryFilters: Record<string, any>,
  sortBy: Record<string, any>,
  skip: number,
  limit: number,
  userCoordinates: (string | number)[],
  restaurantRepository: ReturnType<restaurantDbInterface>
) => {
  const filter = {
    isListed: true,
    ...queryFilters,
    ...(userCoordinates &&
      userCoordinates.length === 2 && {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: userCoordinates,
            },
            $minDistance: 0,
            $maxDistance: 10000,
          },
        },
      }),
  };
  return await restaurantRepository.getListedRestaurants(
    filter,
    sortBy,
    skip,
    limit
  );
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
  const ratings = await restaurantRepository.getRatings({
    restaurantId: restaurantID,
  });

  return { restaurant, tableSlots, ratings };
};
