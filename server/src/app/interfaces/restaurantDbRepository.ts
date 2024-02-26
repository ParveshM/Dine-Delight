import { RestaurantEntityType } from "../../entities/restaurantEntity";
import { restaurantRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";

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

  const updateRestaurantApproval = async (id: string) =>
    await repository.updateRestaurantApproval(id);

  const updateRestaurantRejected = async (id: string) =>
    await repository.updateRestaurantRejected(id);

  const updateRestaurantListing = async (id: string, status: boolean) =>
    await repository.updateRestaurantListing(id, status);

  const getAllRestaurants = async () => await repository.getAllRestaurants();

  return {
    getRestaurantById,
    getRestaurantByemail,
    addRestaurant,
    verifyRestaurant,
    getAllRestaurants,
    updateRestaurantApproval,
    updateRestaurantRejected,
    updateRestaurantListing,
  };
};

export type restaurantDbInterface = typeof restaurantDbRepository;
