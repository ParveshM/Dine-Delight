import { RestaurantEntityType } from "../../../../entities/restaurantEntity";
import { RestaurantInterface } from "../../../../types/restaurantInterface";
import Restaurant from "../models/restaurant";

export const restaurantRepositoryMongodb = () => {
  const getRestaurantById = async (id: string) => await Restaurant.findById(id);

  const getRestaurantByemail = async (email: string) => {
    const restaurant: RestaurantInterface | null = await Restaurant.findOne({
      email,
    });
    return restaurant;
  };
  const addRestaurant = async (restaurantData: RestaurantEntityType) => {
    const newRestaurant = new Restaurant({
      restaurantName: restaurantData.getRestaurantName(),
      email: restaurantData.getEmail(),
      mobile: restaurantData.getMobile(),
      password: restaurantData.getPassword(),
      verificationToken: restaurantData.getVerificationToken(),
    });
    return await newRestaurant.save();
  };

  const verifyRestaurant = async (token: string) =>
    await Restaurant.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null }
    );

  return {
    getRestaurantById,
    getRestaurantByemail,
    addRestaurant,
    verifyRestaurant,
  };
};

export type restaurantRepositoryMongodbType =
  typeof restaurantRepositoryMongodb;
