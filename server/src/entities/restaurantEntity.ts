export default function restaurantEntity(
  restaurantName: string,
  email: string,
  mobile: string,
  password: string,
  verificationToken: string
) {
  return {
    getRestaurantName: (): string => restaurantName,
    getEmail: (): string => email,
    getMobile: (): string => mobile,
    getPassword: (): string => password,
    getVerificationToken: (): string => verificationToken,
  };
}
export type RestaurantEntityType = ReturnType<typeof restaurantEntity>;
