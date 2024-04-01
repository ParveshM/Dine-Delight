export default function ratingEntity(
  userId: string,
  restaurantId: string,
  rating: number,
  description: string
) {
  return {
    getUserId: (): string => userId,
    getRestaurantId: (): string => restaurantId,
    getRating: (): number => rating,
    getDescription: (): string => description,
  };
}
export type RatingEntityType = ReturnType<typeof ratingEntity>;
