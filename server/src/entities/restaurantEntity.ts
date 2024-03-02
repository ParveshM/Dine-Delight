export default function restaurantEntity(
  restaurantName: string,
  email: string,
  password: string,
  verificationToken: string
) {
  return {
    getRestaurantName: (): string => restaurantName,
    getEmail: (): string => email,
    getPassword: (): string => password,
    getVerificationToken: (): string => verificationToken,
  };
}
export type RestaurantEntityType = ReturnType<typeof restaurantEntity>;
