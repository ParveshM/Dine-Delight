import ratingEntity from "../../../entities/ratingEntity";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";

export const addNewRating = async (
  userId: string,
  ratingData: { restaurantId: string; rating: number; description: string },
  restaurantRepostory: ReturnType<restaurantDbInterface>
) => {
  const { restaurantId, rating, description } = ratingData;
  const newRatingEntity = ratingEntity(
    userId,
    restaurantId,
    rating,
    description
  );

  return await restaurantRepostory.addRating(newRatingEntity);
};

export const ratings = async (
  restaurantId: string,
  restaurantRepostory: ReturnType<restaurantDbInterface>
) => await restaurantRepostory.getRatings(restaurantId);
