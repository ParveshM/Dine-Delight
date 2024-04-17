import { RatingEntityType } from "../../entities/ratingEntity";
import { RestaurantEntityType } from "../../entities/restaurantEntity";
import { restaurantRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import {
  PaginateInterface,
  RestaurantInterface,
} from "../../types/restaurantInterface";

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

  const getAllRestaurants = async (paginate: PaginateInterface) =>
    await repository.getAllRestaurants(paginate);

  const getNewRegisteredRestaurants = async (paginate: PaginateInterface) =>
    await repository.getNewRegistrations(paginate);

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
    page: number,
    coordinates?: [number, number] | null
  ) =>
    await repository.getListedRestaurants(
      filter,
      sortBy,
      skip,
      page,
      coordinates
    );

  const countRestaurants = async () => await repository.countRestaurants();

  const addRating = async (ratingData: RatingEntityType) =>
    await repository.addRating(ratingData);

  const getRatings = async (filter: Record<string, any>) =>
    await repository.getRatings(filter);

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
