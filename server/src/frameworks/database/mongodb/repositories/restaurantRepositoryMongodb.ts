import { RestaurantEntityType } from "../../../../entities/restaurantEntity";
import { RestaurantInterface } from "../../../../types/restaurantInterface";
import Restaurant from "../models/restaurant";

export const restaurantRepositoryMongodb = () => {
  const getRestaurantById = async (id: string) =>
    await Restaurant.findById(id).select(
      "-password -isVerified -isApproved -isRejected -verificationToken"
    );

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

  const getAllRestaurants = async () =>
    await Restaurant.find({ isVerified: true, isApproved: true });

  const getListedRestaurants = async (
    filter: Record<string, any>,
    sortBy: Record<string, any>,
    skip: number,
    page: number
  ) => {
    return await Restaurant.find(filter)
      .select(
        "-password -isApproved -isRejected -isVerified -verificationToken -role"
      )
      .sort(sortBy)
      .skip(skip)
      .limit(page);
  };

  const getNewRegistrations = async () =>
    await Restaurant.find({
      isApproved: false,
      isVerified: true,
      isRejected: false,
    });

  const updateRestaurantStatus = async (
    id: string,
    updateFields: Record<string, any>
  ) => {
    return await Restaurant.findByIdAndUpdate(id, updateFields);
  };

  const updateRestaurant = async (
    id: string,
    updateData: RestaurantInterface
  ) => await Restaurant.findByIdAndUpdate(id, updateData);

  return {
    getRestaurantById,
    getRestaurantByemail,
    addRestaurant,
    verifyRestaurant,
    getAllRestaurants,
    getNewRegistrations,
    updateRestaurant,
    updateRestaurantStatus,
    getListedRestaurants,
  };
};

export type restaurantRepositoryMongodbType =
  typeof restaurantRepositoryMongodb;
