import { newRestaurantInterface } from "../types/RestaurantInterface";

export const filterNewRegistrations = (
  id: string | undefined,
  newRegistrations: newRestaurantInterface[]
) => {
  return newRegistrations.filter((res) => {
    return res._id !== id;
  });
};
