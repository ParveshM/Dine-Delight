import { TableSlotDbInterface } from "../../../interfaces/TableSlotdbRepository";
import { restaurantDbInterface } from "../../../interfaces/restaurantDbRepository";

export const getAllListedRestaurants = async (
  queryFilters: Record<string, any>,
  sortBy: Record<string, any>,
  skip: number,
  limit: number,
  userCoordinates: [number, number],
  restaurantRepository: ReturnType<restaurantDbInterface>
) => {
  const filter = {
    isListed: true,
    ...queryFilters,
  };
  const long_lat = userCoordinates && userCoordinates.map(Number);
  const coordinates: [number, number] | null = userCoordinates
    ? [long_lat[0], long_lat[1]]
    : null;

  return await restaurantRepository.getListedRestaurants(
    filter,
    sortBy,
    skip,
    limit,
    coordinates
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
  let currentDate, endDate;
  currentDate = endDate = date ?? new Date();

  const restaurant = await restaurantRepository.getRestaurantById(restaurantID);
  const tableSlots = await tableSlotRepository.getAvailableTableSlotsByFilter(
    restaurantID,
    capacity,
    startTime,
    currentDate,
    endDate
  );
  const allSlots = await tableSlotRepository.getAvailableTableSlotsByFilter(
    restaurantID,
    capacity,
    startTime,
    currentDate
  );
  const ratings = await restaurantRepository.getRatings({
    restaurantId: restaurantID,
  });

  return { restaurant, tableSlots, ratings, allSlots };
};
