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

  return {
    getRestaurantById,
    getRestaurantByemail,
    addRestaurant,
    verifyRestaurant,
  };
};

export type restaurantDbInterface = typeof restaurantDbRepository;
