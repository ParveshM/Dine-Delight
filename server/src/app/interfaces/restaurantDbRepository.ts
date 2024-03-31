import { RatingEntityType } from "../../entities/ratingEntity";
import { RestaurantEntityType } from "../../entities/restaurantEntity";
import { restaurantRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import { RestaurantInterface } from "../../types/restaurantInterface";

export const restaurantDbRepository = (
  repository: ReturnType<restaurantRepositoryMongodbType>
) => {
  const getRestaurantById = async (id: string) =>
    await repository.getRestaurantById(id);

  const getRestaurantByemail = async (email: string) =>
    await repository.getRestaurantByemail(email);

  const addRestaurant = async (restaurantData: RestaurantEntityType) =>
    await repository.addRestaurant(restaurantData);

  const verifyRestaurant = async (token: string) =>
    await repository.verifyRestaurant(token);

  const getAllRestaurants = async () => await repository.getAllRestaurants();

  const getNewRegisteredRestaurants = async () =>
    await repository.getNewRegistrations();

  const updateRestaurant = async (
    id: string,
    updateData: RestaurantInterface
  ) => await repository.updateRestaurant(id, updateData);

  const updateRestaurantStatus = async (
    id: string,
    updateFields: Record<string, any>
  ) => {
    return await repository.updateRestaurantStatus(id, updateFields);
  };

  const getListedRestaurants = async (
    filter: Record<string, any>,
    sortBy: Record<string, any>,
    skip: number,
    page: number
  ) => await repository.getListedRestaurants(filter, sortBy, skip, page);

  const countRestaurants = async () => await repository.countRestaurants();

  const addRating = async (ratingData: RatingEntityType) =>
    await repository.addRating(ratingData);
  const getRatings = async (restaurantId: string) =>
    await repository.getRatings(restaurantId);

  return {
    getRestaurantById,
    getRestaurantByemail,
    addRestaurant,
    verifyRestaurant,
    getAllRestaurants,
    getNewRegisteredRestaurants,
    updateRestaurant,
    updateRestaurantStatus,
    getListedRestaurants,
    countRestaurants,
    addRating,
    getRatings,
  };
};

export type restaurantDbInterface = typeof restaurantDbRepository;
