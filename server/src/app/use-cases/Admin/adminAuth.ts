import configKeys from "../../../config";
import { HttpStatus } from "../../../types/httpStatus";
import CustomError from "../../../utils/customError";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import { AuthServiceInterfaceType } from "../../services-Interface/authServiceInterface";

export const loginAdmin = async (
  email: string,
  password: string,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  if (
    email === configKeys.ADMIN_EMAIL &&
    password === configKeys.ADMIN_PASSWORD
  ) {
    const { accessToken, refreshToken } = authService.createTokens(
      email,
      "Admin_User",
      "admin"
    );
    return { accessToken, refreshToken };
  }
  throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
};

export const getUsers = async (userDbRepository: ReturnType<UserDbInterface>) =>
  await userDbRepository.getAllUsers();

export const getRestaurants = async (
  restaurantDbRepository: ReturnType<restaurantDbInterface>
) => await restaurantDbRepository.getAllRestaurants();
